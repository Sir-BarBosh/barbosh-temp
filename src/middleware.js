
import { NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

const rateLimitCache = new LRUCache({
  max: 100, // Max 100 users in cache
  ttl: 10000, // 10 seconds
});

export function middleware(request) {
  const ip = request.ip ?? '127.0.0.1';

  const userRequests = rateLimitCache.get(ip) || [];
  const now = Date.now();

  const recentRequests = userRequests.filter(timestamp => now - timestamp < 10000);

  if (recentRequests.length >= 5) {
    return NextResponse.redirect(new URL('/api/blocked', request.url));
  }

  recentRequests.push(now);
  rateLimitCache.set(ip, recentRequests);

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/api/switchbot', '/api/birmingham-weather'],
};
