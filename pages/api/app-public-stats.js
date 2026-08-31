import { fetchAppPublicStats } from "../../lib/appPublicStats";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const stats = await fetchAppPublicStats();
  const hasCompleteStats = Boolean(stats.appStore && stats.githubRelease);

  response.setHeader(
    "Cache-Control",
    hasCompleteStats
      ? "public, max-age=0, s-maxage=3600, must-revalidate"
      : "no-store"
  );
  response.status(200).json(stats);
}
