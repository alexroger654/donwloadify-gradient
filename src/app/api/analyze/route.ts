//api/analyze
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Run yt-dlp to get formats
    const { stdout } = await execPromise(
      `yt-dlp -J "${url}"`
    );

    const data = JSON.parse(stdout);
    const formats = data.formats
      .filter((f: any) => f.ext === "mp4" && f.height) // only mp4 with resolution
      .map((f: any) => ({
        format_id: f.format_id,
        quality: f.format_note || `${f.height}p`,
        filesize: f.filesize,
      }));

    return NextResponse.json({
      title: data.title,
      thumbnail: data.thumbnail,
      formats,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
