// lib/proxy-rotator.ts
import fs from 'fs';
import path from 'path';

function normalizeProxyString(p: string) {
  // ensure protocol present
  if (!/^https?:\/\//i.test(p)) return 'http://' + p;
  return p;
}

export function loadProxies(): string[] {
  if (process.env.PROXY_POOL) {
    try {
      const parsed = JSON.parse(process.env.PROXY_POOL);
      return Array.isArray(parsed) ? parsed.map(String).map(normalizeProxyString) : [];
    } catch (e) {
      console.warn('PROXY_POOL parse failed, falling back to proxies.json', e);
    }
  }
  // fallback to proxies.json
  try {
    const p = path.join(process.cwd(), 'proxies.json');
    if (fs.existsSync(p)) {
      const arr = JSON.parse(fs.readFileSync(p, 'utf8'));
      return Array.isArray(arr) ? arr.map(String).map(normalizeProxyString) : [];
    }
  } catch (e) {
    console.warn('Failed to read proxies.json', e);
  }
  return [];
}

export function getProxyRotator(list?: any[]) {
  const proxies = (list && Array.isArray(list) && list.length) ? list.map(String).map(normalizeProxyString) : loadProxies();
  let idx = 0;
  return {
    next: () => proxies.length ? proxies[idx++ % proxies.length] : undefined,
    length: proxies.length
  };
}
