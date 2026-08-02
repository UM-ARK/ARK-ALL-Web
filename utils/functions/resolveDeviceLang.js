/** @typedef {"zh" | "en" | "ja"} LangType */

/** @type {LangType[]} */
export const SUPPORTED_LANGS = ["zh", "en", "ja"];

/**
 * 將瀏覽器語系（如 en-US、zh-TW、ja-JP）對應到站內支援語言。
 * @param {string | undefined | null} deviceLang
 * @returns {LangType | null}
 */
export function resolveDeviceLang(deviceLang) {
    if (!deviceLang || typeof deviceLang !== "string") {
        return null;
    }

    const primary = deviceLang.toLowerCase().split("-")[0];
    return SUPPORTED_LANGS.includes(primary) ? primary : null;
}
