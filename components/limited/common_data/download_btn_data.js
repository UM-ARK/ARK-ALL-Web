import apple_logo from "../../../public/img/home_page/company_logos/AppleLogo.png";
import google_play_logo from "../../../public/img/home_page/company_logos/GooglePlayLogo.png";
import huawei_logo from "../../../public/img/home_page/company_logos/HuaweiLogo.png";
import android_logo from "../../../public/img/home_page/company_logos/AndroidLogo.png";
import { BASE_HOST, APPSTORE_URL, PLAYSTORE_URL, } from "../../../utils/pathMap";

export const downloadBtnData = [
    {
        source: "App Store",
        link: APPSTORE_URL,
        icon: apple_logo
    },
    {
        source: "Play Store",
        link: PLAYSTORE_URL,
        icon: google_play_logo
    },
    {
        source: "Android",
        link: BASE_HOST + "/static/release/app-release.apk",
        icon: android_logo
    },
    {
        source: "HUAWEI",
        link: BASE_HOST + "/static/release/app-release.apk",
        icon: huawei_logo
    },
];
