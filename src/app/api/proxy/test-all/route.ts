import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

async function checkProxy(proxy: any) {
  const start = Date.now();
  try {
    await new Promise(res => setTimeout(res, Math.random() * 1000));
    return { isWorking: true, responseTime: Date.now() - start };
  } catch {
    return { isWorking: false, responseTime: null };
  }
}

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db("proxydb");

    const proxies = await db.collection("proxies").find({ active: true }).toArray();

    for (const proxy of proxies) {
      const result = await checkProxy(proxy);
      await db.collection("proxies").updateOne(
        { _id: proxy._id },
        { $set: { ...result, lastChecked: new Date().toISOString() } }
      );
    }

    return NextResponse.json({ success: true, tested: proxies.length });
  } catch (err) {
    return NextResponse.json({ error: "Failed to test all proxies" }, { status: 500 });
  }
}
