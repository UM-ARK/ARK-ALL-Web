import { fetchAppPublicStats } from "../../lib/appPublicStats";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const stats = await fetchAppPublicStats();

  response.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  response.status(200).json(stats);
}
