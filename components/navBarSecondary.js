import {
    ChevronLeftIcon
} from "@heroicons/react/24/solid";
import ThemeChanger from './DarkSwitch';
import LanguageSwitcher from "./LanguageSwitcher";
import WarningBanner from "components/micros/WarningBanner";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import NavbarTools from "./uiComponents/NavbarTools";

const NavBarSecondary = (props) => {
    const { t } = useTranslation();
    const router = useRouter();
    const returnStr = props.returnStr ? props.returnStr : t("PG_HOME");

    const returnToPrevious = () => {
        router.push(props.returnLocation);
    }

    return (
        <div className="w-full mb-5">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center  text-themeColor text-xl font-bold">
                    <div className="flex flex-col justify-center">
                        <ChevronLeftIcon className="w-5 h-5" />
                    </div>
                    <div
                        className=" hover:cursor-pointer hover:opacity-50"
                        onClick={returnToPrevious}>
                        {returnStr}
                    </div>
                </div>
                <NavbarTools />
            </div>
            <WarningBanner />
        </div>
    );
}

export default NavBarSecondary;
