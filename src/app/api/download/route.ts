// import { NextRequest, NextResponse } from "next/server";
// import { spawn } from "child_process";
// import path from "path";
// import fs from "fs";

// export async function POST(req: NextRequest) {
//   try {
//     const { url, format_id } = await req.json();

//     if (!url || !format_id) {
//       return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
//     }

//     const outputPath = path.join(process.cwd(), "downloads");
//     if (!fs.existsSync(outputPath)) {
//       fs.mkdirSync(outputPath);
//     }

//     const filePath = path.join(outputPath, `${Date.now()}.mp4`);

//     return new Promise((resolve) => {
//       const ytdlp = spawn("yt-dlp", [
//         "-f",
//         format_id,
//         "-o",
//         filePath,
//         url,
//       ]);

//       ytdlp.on("close", () => {
//         resolve(
//           NextResponse.json({
//             downloadUrl: `/api/download/file?name=${path.basename(filePath)}`,
//           })
//         );
//       });
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }








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

    // Wrap yt-dlp in a typed Promise<NextResponse>
    const downloadResponse: NextResponse = await new Promise((resolve, reject) => {
      const ytdlp = spawn("yt-dlp", ["-f", format_id, "-o", filePath, url]);

      ytdlp.on("close", (code) => {
        if (code === 0) {
          resolve(
            NextResponse.json({
              downloadUrl: `/api/download/file?name=${path.basename(filePath)}`,
            })
          );
        } else {
          reject(new Error("yt-dlp process failed"));
        }
      });

      ytdlp.on("error", (err) => {
        reject(err);
      });
    });

    return downloadResponse;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
