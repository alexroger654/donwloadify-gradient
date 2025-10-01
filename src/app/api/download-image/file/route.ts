import { NextRequest } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name) return new Response("Missing filename", { status: 400 });

  const filePath = path.join(process.cwd(), "downloads", name);
  if (!fs.existsSync(filePath)) return new Response("File not found", { status: 404 });

  const fileStream = fs.createReadStream(filePath);

  // Delete after streaming
  fileStream.on("close", () => {
    fs.unlink(filePath, () => {});
  });

  return new Response(fileStream as any, {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": `attachment; filename="${name}"`,
    },
  });
}
