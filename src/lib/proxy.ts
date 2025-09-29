// lib/proxy.ts
import clientPromise from "@/lib/mongodb";
import { Proxy } from "@/types/proxy";

export async function getWorkingProxies(): Promise<Proxy[]> {
  const client = await clientPromise;
  const db = client.db("proxydb");
  // Only active and working proxies
  return db.collection<Proxy>("proxies").find({ active: true, isWorking: true }).toArray();
}

export function pickRandomProxy(proxies: Proxy[]): Proxy | null {
  if (!proxies || proxies.length === 0) return null;
  return proxies[Math.floor(Math.random() * proxies.length)];
}

export function formatProxyUrl(proxy: Proxy): string {
  const auth = proxy.username && proxy.password ? `${proxy.username}:${proxy.password}@` : "";
  return `${proxy.type}://${auth}${proxy.host}:${proxy.port}`;
}
