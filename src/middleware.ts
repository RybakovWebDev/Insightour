import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  // 10 requests from the same IP in 300 seconds
  limiter: Ratelimit.slidingWindow(10, "300 s"),
});

// Define which routes you want to rate limit
export const config = {
  matcher: "/api/submit-form",
};

export default async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.next();
}
