import Link from "next/link";
import { useTranslation } from "react-i18next";

const SupportArkCard = ({ className = "" }) => {
  const { t } = useTranslation();

  return (
    <aside
      aria-labelledby="support-ark-title"
      className={`rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-sm dark:border-amber-900/70 dark:from-amber-950/40 dark:to-gray-800/90 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-xl shadow-sm dark:bg-amber-500">
          <span aria-hidden="true">☕</span>
        </div>
        <div className="min-w-0">
          <h2 id="support-ark-title" className="font-bold text-gray-800 dark:text-white">
            {t("Support_ark_title")}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t("Support_ark_desc")}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link
          href="https://afdian.com/a/umacark"
          target="_blank"
          rel="noopener"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-amber-400 dark:hover:bg-amber-300"
        >
          ☕ {t("Support_ark_afdian")}
        </Link>
        <Link
          href="https://github.com/UM-ARK/Donate"
          target="_blank"
          rel="noopener"
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-amber-300 bg-white/80 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:border-amber-500 hover:text-amber-700 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:border-amber-800 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:border-amber-500 dark:hover:text-amber-300"
        >
          {t("Support_ark_details")} ↗
        </Link>
      </div>
    </aside>
  );
};

export default SupportArkCard;
