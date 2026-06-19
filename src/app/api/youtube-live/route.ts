import { NextResponse } from "next/server";
import { getStreamSource, type StreamResponse } from "@/lib/getStreamSource";

export { type StreamResponse };

export const revalidate = 1800;

const CACHE = "public, s-maxage=1800, stale-while-revalidate=3600";

export async function GET() {
  const stream = await getStreamSource();
  return NextResponse.json(stream satisfies StreamResponse, {
    headers: { "Cache-Control": CACHE },
  });
}
