import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const { url, format_id } = await req.json();

    if (!url || !format_id) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const outputPath = path.join(process.cwd(), "downloads");
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }

    const filePath = path.join(outputPath, `${Date.now()}.mp4`);

    return new Promise((resolve) => {
      const ytdlp = spawn("yt-dlp", [
        "-f",
        format_id,
        "-o",
        filePath,
        url,
      ]);

      ytdlp.on("close", () => {
        resolve(
          NextResponse.json({
            downloadUrl: `/api/download/file?name=${path.basename(filePath)}`,
          })
        );
      });
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}





// // app/api/download/file/route.ts
// import { NextRequest } from "next/server";
// import path from "path";
// import fs from "fs";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const name = searchParams.get("name");
//   if (!name) return new Response("Missing filename", { status: 400 });

//   const filePath = path.join(process.cwd(), "downloads", name);

//   if (!fs.existsSync(filePath)) {
//     return new Response("File not found", { status: 404 });
//   }

//   const fileStream = fs.createReadStream(filePath);

//   // Delete after stream ends
//   fileStream.on("close", () => {
//     fs.unlink(filePath, () => {});
//   });

//   return new Response(fileStream as any, {
//     headers: {
//       "Content-Type": "video/mp4",
//       "Content-Disposition": `attachment; filename="${name}"`,
//     },
//   });
// }




// // app/api/download/route.ts
// import { NextRequest } from "next/server";
// import { spawn } from "child_process";

// export async function POST(req: NextRequest) {
//   const { url, format_id } = await req.json();
//   if (!url || !format_id) {
//     return new Response("Missing params", { status: 400 });
//   }

//   const ytdlp = spawn("yt-dlp", [
//     "-f", format_id,
//     "-o", "-",   // "-" means output to stdout
//     url,
//   ]);

//   return new Response(ytdlp.stdout as any, {
//     headers: {
//       "Content-Type": "video/mp4",
//       "Content-Disposition": `attachment; filename="video.mp4"`,
//     },
//   });
// }

