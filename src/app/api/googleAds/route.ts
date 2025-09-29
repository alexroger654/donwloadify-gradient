import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface Ad {
  _id?: string;
  type: "hero" | "body";
  adUnitId: string;
  adSlotId: string;
  title?: string;
  description?: string;
  createdAt?: Date;
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const ads = await db.collection("googleAds").find().sort({ createdAt: -1 }).toArray();
  return NextResponse.json(ads);
}

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db();
  const data: Ad = await req.json();
  data.createdAt = new Date();

//   @ts-ignore
  const result = await db.collection("googleAds").insertOne(data);
  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db();
  const data: Ad & { _id: string } = await req.json();
  const { _id, ...updateData } = data;
  const { ObjectId } = await import("mongodb");
  const result = await db.collection("googleAds").findOneAndUpdate(
    { _id: new ObjectId(_id) },
    { $set: updateData },
    { returnDocument: "after" }
  );
//   @ts-ignore
  return NextResponse.json(result.value);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db();
  const { ObjectId } = await import("mongodb");
  await db.collection("googleAds").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
