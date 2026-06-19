const UPLOADS_PLAYLIST = "UUKf9xsi0uL1mwdrq7PmZsQA";

export type StreamResponse =
  | { type: "hls";     url: string }
  | { type: "embed";   url: string }
  | { type: "youtube"; videoId: string; isLive: boolean }
  | { type: "none" };

export async function getStreamSource(): Promise<StreamResponse> {
  const hlsUrl = process.env.STREAM_HLS_URL;
  if (hlsUrl) return { type: "hls", url: hlsUrl };

  const embedUrl = process.env.STREAM_EMBED_URL;
  if (embedUrl) return { type: "embed", url: embedUrl };

  const ytKey = process.env.YOUTUBE_API_KEY;
  if (!ytKey) return { type: "none" };

  try {
    const plRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${UPLOADS_PLAYLIST}&maxResults=1&key=${ytKey}`,
      { cache: "no-store" }
    );
    const plData = await plRes.json();
    if (!plData.items?.length) return { type: "none" };

    const videoId = plData.items[0].contentDetails.videoId as string;

    const vRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${ytKey}`,
      { cache: "no-store" }
    );
    const vData = await vRes.json();
    const details = vData.items?.[0]?.liveStreamingDetails;
    const isLive  = !!(details?.actualStartTime && !details?.actualEndTime);

    return { type: "youtube", videoId, isLive };
  } catch {
    return { type: "none" };
  }
}
