import { NextResponse } from "next/server";
import { getNewsFeed } from "@/lib/getNewsFeed";

export const revalidate = 600;

export async function GET() {
  const headlines = await getNewsFeed();
  return NextResponse.json(headlines);
}
