import { NextResponse, NextRequest } from 'next/server';
import { LRUCache } from 'lru-cache';

// Initialize LRU cache
const rateLimitCache = new LRUCache<string, { count: number, timestamp: number }>({
    max: 500, // Maximum number of items in cache
    ttl: 60000 // Cache time-to-live in milliseconds (60 seconds)
});

const RATE_LIMIT = 5; // Number of requests
const TIME_WINDOW = 60 * 1000; // Time window in milliseconds (60 seconds)

export async function middleware(request: NextRequest) {
    const ip = request.headers.get('x-real-ip') || request.ip || 'default-ip';

    if (!ip) {
        return new NextResponse('IP address not found', { status: 400 });
    }

    const currentTime = Date.now();
    const record = rateLimitCache.get(ip);

    if (!record) {
        // No record for IP, create a new one
        rateLimitCache.set(ip, { count: 1, timestamp: currentTime });
    } else {
        if (currentTime - record.timestamp < TIME_WINDOW) {
            // Within the time window
            if (record.count >= RATE_LIMIT) {
                // Rate limit exceeded
                return new NextResponse('Too Many Requests', { status: 429 });
            } else {
                // Increment request count
                record.count += 1;
                rateLimitCache.set(ip, record);
            }
        } else {
            // Time window expired, reset count and timestamp
            rateLimitCache.set(ip, { count: 1, timestamp: currentTime });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*', // Apply middleware to all /api routes
};