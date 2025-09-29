// import { NextRequest } from "next/server";
// import path from "path";
// import fs from "fs";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const name = searchParams.get("name");
//   if (!name) return new Response("File not found", { status: 404 });

//   const filePath = path.join(process.cwd(), "downloads", name);

//   if (!fs.existsSync(filePath)) {
//     return new Response("File not found", { status: 404 });
//   }

//   const file = fs.readFileSync(filePath);
//   return new Response(file, {
//     headers: {
//       "Content-Type": "video/mp4",
//       "Content-Disposition": `attachment; filename="${name}"`,
//     },
//   });
// }


// app/api/download/route.ts
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



// app/api/download/file/route.ts
import { NextRequest } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name) return new Response("Missing filename", { status: 400 });

  const filePath = path.join(process.cwd(), "downloads", name);

  if (!fs.existsSync(filePath)) {
    return new Response("File not found", { status: 404 });
  }

  const fileStream = fs.createReadStream(filePath);

  // Delete after stream ends
  fileStream.on("close", () => {
    fs.unlink(filePath, () => {});
  });

  return new Response(fileStream as any, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="${name}"`,
    },
  });
}