// app/api/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import { getWorkingProxies, pickRandomProxy, formatProxyUrl } from "@/lib/proxy";

function safeFilename(name: string) {
  return path.basename(name).replace(/[^a-zA-Z0-9_\-\.]/g, "_");
}

function runYtdlpWithProxy(args: string[], proxy: string | null, timeoutSec: number) {
  return new Promise<{ code: number | null; stdout: string; stderr: string }>((resolve, reject) => {
    const finalArgs = proxy ? ["--proxy", proxy, ...args] : args;
    const proc = spawn("yt-dlp", finalArgs, { stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (c) => (stdout += c.toString()));
    proc.stderr.on("data", (c) => (stderr += c.toString()));

    const killTimer = setTimeout(() => proc.kill("SIGKILL"), timeoutSec * 1000);

    proc.on("close", (code) => {
      clearTimeout(killTimer);
      resolve({ code, stdout, stderr });
    });
    proc.on("error", (err) => {
      clearTimeout(killTimer);
      reject(err);
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const { url, format_id } = await req.json();
    if (!url || !format_id)
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });

    const downloadsDir = path.join(process.cwd(), "downloads");
    if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e6)}.mp4`;
    const filePath = path.join(downloadsDir, safeFilename(fileName));

    const proxies = await getWorkingProxies();
    const timeoutSec = Number(process.env.YTDLP_TIMEOUT_SEC || 300);

    // Shuffle proxies
    const pool = proxies.length ? [...proxies] : [null];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    let lastErr: any = null;
    for (const p of pool) {
      try {
        const proxyStr = p ? formatProxyUrl(p) : null;
        const { code, stderr } = await runYtdlpWithProxy(
          ["-f", format_id, "-o", filePath, url],
          proxyStr,
          timeoutSec
        );

        if (code === 0 && fs.existsSync(filePath)) {
          return NextResponse.json({
            downloadUrl: `/api/download/file?name=${encodeURIComponent(path.basename(filePath))}`,
            used_proxy: proxyStr,
          });
        } else {
          lastErr = stderr || `yt-dlp exited with code ${code}`;
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
      } catch (e) {
        lastErr = e;
      }
    }

    return NextResponse.json(
      { error: "Failed to download with available proxies", detail: String(lastErr) },
      { status: 502 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
