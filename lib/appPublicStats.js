import { GITHUB_RELEASE_LATEST } from "../utils/pathMap";

const APP_STORE_ID = "1636670554";
const GITHUB_REPOSITORY = "UM-ARK/UM-All-Frontend";

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch public app data (${response.status})`);
  }

  return response.json();
};

const normalizeAppStoreRating = (lookup, region) => {
  const app = lookup?.results?.[0];
  const rating = Number(app?.averageUserRating);
  const ratingCount = Number(app?.userRatingCount);

  if (!app?.trackViewUrl || !Number.isFinite(rating) || ratingCount <= 0) {
    return null;
  }

  return {
    region,
    rating: Math.round(rating * 10) / 10,
    ratingCount,
    url: app.trackViewUrl,
  };
};

export const fetchAppPublicStats = async () => {
  const [chinaResult, macaoResult, githubResult] = await Promise.allSettled([
    fetchJson(`https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=cn`),
    fetchJson(`https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=mo`),
    fetchJson(`https://api.github.com/repos/${GITHUB_REPOSITORY}/releases/latest`),
  ]);

  const chinaRating = chinaResult.status === "fulfilled"
    ? normalizeAppStoreRating(chinaResult.value, "cn")
    : null;
  const macaoRating = macaoResult.status === "fulfilled"
    ? normalizeAppStoreRating(macaoResult.value, "mo")
    : null;
  const githubRelease = githubResult.status === "fulfilled" && githubResult.value?.tag_name
    ? {
        version: githubResult.value.tag_name,
        url: GITHUB_RELEASE_LATEST,
      }
    : null;

  return {
    appStore: chinaRating || macaoRating,
    githubRelease,
  };
};
