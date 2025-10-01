import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const url = req.nextUrl

  // Extract subdomain (e.g. "facebook" from facebook.localhost:3000)
  const subdomain = host.split('.')[0]

  const allowed = ['facebook', 'twitter', 'tiktok', 'linkedin']

  if (allowed.includes(subdomain)) {
    url.pathname = `/${subdomain}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}
