// app/api/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import util from "util";
import { exec as _exec } from "child_process";
import { getWorkingProxies, pickRandomProxy, formatProxyUrl } from "@/lib/proxy";

const exec = util.promisify(_exec);

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // use proxies if available
    const proxies = await getWorkingProxies();
    const proxy = pickRandomProxy(proxies) || null;
    const proxyArg = proxy ? `--proxy "${formatProxyUrl(proxy)}"` : "";

    // yt-dlp JSON output
    const cmd = `yt-dlp -J ${proxyArg} "${url.replace(/"/g, '\\"')}"`;
    const timeoutSec = Number(process.env.YTDLP_TIMEOUT_SEC || 120);
    const { stdout } = await exec(cmd, { timeout: timeoutSec * 1000 });
    const data = JSON.parse(stdout);

    let images: string[] = [];

    // case 1: carousel/multiple
    if (data.entries && Array.isArray(data.entries)) {
      images = data.entries.map(
        (entry: any) =>
          `/api/image-proxy?url=${encodeURIComponent(entry.url || entry.thumbnail)}`
      );
    }
    // case 2: single image
    else if (data.url && data.ext === "jpg") {
      images = [
        `/api/image-proxy?url=${encodeURIComponent(data.url || data.thumbnail)}`,
      ];
    }
    // fallback
    else if (data.thumbnail) {
      images = [`/api/image-proxy?url=${encodeURIComponent(data.thumbnail)}`];
    }

    return NextResponse.json({
      id: data.id,
      title: data.title,
      uploader: data.uploader,
      images,
      count: images.length,
      used_proxy: proxy ? formatProxyUrl(proxy) : null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
