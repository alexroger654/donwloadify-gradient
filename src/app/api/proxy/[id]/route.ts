import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    // ✅ Remove _id if it exists in body
    if ("_id" in body) {
      delete body._id;
    }

    const client = await clientPromise;
    const db = client.db("proxydb");

    await db.collection("proxies").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/proxy/[id] error:", err);
    return NextResponse.json({ error: "Failed to update proxy" }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const client = await clientPromise;
    const db = client.db("proxydb");

    await db.collection("proxies").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/proxy/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete proxy" }, { status: 500 });
  }
}
