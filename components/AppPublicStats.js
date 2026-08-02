import Link from "next/link";
import { useTranslation } from "react-i18next";

const GitHubIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const StatCard = ({ href, icon, label, value, detail, ariaLabel }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener"
    aria-label={ariaLabel}
    className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white/90 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-themeColorLight hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90"
  >
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="truncate text-xs font-medium text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="mt-0.5 text-lg font-bold leading-tight text-gray-800 group-hover:text-themeColor dark:text-white">
        {value}
      </p>
      <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
        {detail}
      </p>
    </div>
    <span aria-hidden="true" className="ml-auto text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-themeColor dark:text-gray-600">
      ↗
    </span>
  </Link>
);

const AppPublicStats = ({ stats, className = "" }) => {
  const { t } = useTranslation();
  const appStore = stats?.appStore;
  const githubRelease = stats?.githubRelease;

  if (!appStore && !githubRelease) {
    return null;
  }

  const storeRegion = appStore?.region === "cn"
    ? t("App_stats_storefront_cn")
    : t("App_stats_storefront_mo");
  const releaseVersion = githubRelease?.version?.startsWith("v")
    ? githubRelease.version
    : `v${githubRelease?.version}`;

  return (
    <div className={`flex flex-col gap-2 sm:flex-row ${className}`}>
      {appStore && (
        <StatCard
          href={appStore.url}
          icon={<span aria-hidden="true" className="text-xl leading-none">★</span>}
          label={storeRegion}
          value={`${appStore.rating.toFixed(1)} / 5`}
          detail={`${t("App_stats_rating_count", { count: appStore.ratingCount })} · ${t("App_stats_apple_source")}`}
          ariaLabel={`${storeRegion} ${appStore.rating.toFixed(1)} / 5`}
        />
      )}
      {githubRelease && (
        <StatCard
          href={githubRelease.url}
          icon={<GitHubIcon />}
          label="GitHub Release"
          value={releaseVersion}
          detail={t("App_stats_latest_release")}
          ariaLabel={`GitHub Release ${releaseVersion}`}
        />
      )}
    </div>
  );
};

export default AppPublicStats;
