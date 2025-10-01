import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import { getWorkingProxies, formatProxyUrl } from "@/lib/proxy";
import { getRandomUserAgent } from "@/lib/userAgents";

function safeFilename(name: string) {
  return path.basename(name).replace(/[^a-zA-Z0-9_\-\.]/g, "_");
}

function runYtdlp(args: string[], proxy: string | null, userAgent: string, timeoutSec: number) {
  return new Promise<{ code: number | null; stdout: string; stderr: string }>((resolve, reject) => {
    const finalArgs = [...args];
    if (proxy) finalArgs.unshift("--proxy", proxy);
    if (userAgent) finalArgs.unshift("--user-agent", userAgent);

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
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

    const downloadsDir = path.join(process.cwd(), "downloads");
    if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e6)}.jpg`;
    const filePath = path.join(downloadsDir, safeFilename(fileName));

    const proxies = await getWorkingProxies();
    const timeoutSec = Number(process.env.YTDLP_TIMEOUT_SEC || 300);
    const pool = proxies.length ? [...proxies] : [null];

    let lastErr: any = null;

    for (const p of pool) {
      const proxyStr = p ? formatProxyUrl(p) : null;
      const userAgent = getRandomUserAgent();

      try {
        // ✅ Correct options for image posts
        const { code, stderr } = await runYtdlp(
          [
            url,
            "-o", filePath,
            "--skip-download",    // don't try video download
            "--write-thumbnail"   // download image
          ],
          proxyStr,
          userAgent,
          timeoutSec
        );

        if (code === 0 && fs.existsSync(filePath)) {
          return NextResponse.json({
            downloadUrl: `/api/download-image/file?name=${encodeURIComponent(path.basename(filePath))}`,
            used_proxy: proxyStr,
            user_agent: userAgent,
          });
        } else {
          lastErr = stderr || `yt-dlp exited with code ${code}`;
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
      } catch (e) {
        lastErr = e;
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
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
