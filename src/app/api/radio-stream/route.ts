import http from "node:http";

export async function GET() {
  return new Promise<Response>((resolve) => {
    const req = http.get({
      hostname: "media2.streambrothers.com",
      port: 8212,
      path: "/stream",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
        "Icy-MetaData": "0",
      },
    }, (res) => {
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();

      res.on("data", (chunk: Buffer) => {
        writer.write(new Uint8Array(chunk));
      });
      res.on("end", () => writer.close());
      res.on("error", () => writer.abort());

      const contentType = res.headers["content-type"] || "audio/aacp";
      resolve(
        new Response(readable, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache, no-store",
          },
        })
      );
    });

    req.on("error", () =>
      resolve(new Response("Stream unavailable", { status: 503 }))
    );
  });
}
