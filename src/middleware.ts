import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  // 10 requests from the same IP in 60 seconds
  limiter: Ratelimit.slidingWindow(10, "60 s"),
});

// Define which routes you want to rate limit
export const config = {
  matcher: "/api/submit-form",
};

export default async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  console.log("Checking rate limit for ", ip);

  if (!success) {
    console.log(`Rate limit exceeded for IP: ${ip}`);
    return new NextResponse(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.next();
}
