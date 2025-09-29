import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Proxy } from "@/types/proxy";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("proxydb");
    const proxies = await db.collection<Proxy>("proxies").find({}).toArray();
    return NextResponse.json(proxies.map(p => ({ ...p, id: p._id })));
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch proxies" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("proxydb");

    const result = await db.collection<Proxy>("proxies").insertOne({
      ...body,
      lastChecked: null,
      isWorking: undefined,
      responseTime: null,
    });

    return NextResponse.json({ id: result.insertedId, ...body });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to add proxy" }, { status: 500 });
  }
}
