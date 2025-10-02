import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Simple checker: tries to fetch Google via proxy
async function checkProxy(proxy: any) {
  const start = Date.now();
  try {
    // NOTE: For real proxy testing, use libraries like "proxy-agent" or "got".
    // Here we just simulate a test
    await new Promise(res => setTimeout(res, Math.random() * 1000));
    return { isWorking: true, responseTime: Date.now() - start };
  } catch {
    return { isWorking: false, responseTime: null };
  }
}

export async function POST(_: Request, { params }: any) {
  try {
    const client = await clientPromise;
    const db = client.db("proxydb");
    const proxy = await db.collection("proxies").findOne({ _id: new ObjectId(params.id) });

    if (!proxy) return NextResponse.json({ error: "Proxy not found" }, { status: 404 });

    const result = await checkProxy(proxy);

    await db.collection("proxies").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { ...result, lastChecked: new Date().toISOString() } }
    );

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    return NextResponse.json({ error: "Failed to test proxy" }, { status: 500 });
  }
}
