// app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import util from "util";
import { exec as _exec } from "child_process";
import { getWorkingProxies, pickRandomProxy, formatProxyUrl } from "@/lib/proxy";

const exec = util.promisify(_exec);

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "No URL provided" }, { status: 400 });

    const proxies = await getWorkingProxies();
    const proxy = pickRandomProxy(proxies);
    const proxyArg = proxy ? `--proxy "${formatProxyUrl(proxy)}"` : "";

    const cmd = `yt-dlp -J ${proxyArg} "${url.replace(/"/g, '\\"')}"`;
    const timeoutSec = Number(process.env.YTDLP_TIMEOUT_SEC || 120);
    const { stdout } = await exec(cmd, { timeout: timeoutSec * 1000 });

    const data = JSON.parse(stdout);

    const formats = (data.formats || [])
      .filter((f: any) => f.ext === "mp4" && f.height)
      .map((f: any) => ({
        format_id: f.format_id,
        quality: f.format_note || `${f.height}p`,
        filesize: f.filesize ?? null,
      }));

    return NextResponse.json({
      title: data.title,
      thumbnail: data.thumbnail,
      formats,
      used_proxy: proxy ? formatProxyUrl(proxy) : null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
