import { NextRequest, NextResponse } from "next/server";

const PYTHON_SERVER = process.env.INSTA_PYTHON_SERVER || "http://127.0.0.1:8000";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "No URL provided" }, { status: 400 });

    const res = await fetch(`${PYTHON_SERVER}/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ error: `Python server error: ${txt}` }, { status: 502 });
    }

    const arrayBuffer = await res.arrayBuffer();
    const contentDisposition = res.headers.get("content-disposition") || 'attachment; filename="post.zip"';
    const contentType = res.headers.get("content-type") || "application/zip";

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
