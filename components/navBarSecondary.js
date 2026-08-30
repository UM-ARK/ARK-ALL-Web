import {
    ChevronLeftIcon
} from "@heroicons/react/24/solid";
import WarningBanner from "components/micros/WarningBanner";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import NavbarTools from "./uiComponents/NavbarTools/NavbarTools";

const NavBarSecondary = (props) => {
    const { t } = useTranslation();
    const router = useRouter();
    const returnStr = props.returnStr ? props.returnStr : t("PG_HOME");

    const returnToPrevious = () => {
        if (props.onReturn) {
            props.onReturn();
            return;
        }
        router.push(props.returnLocation);
    }

    return (
        <div className="w-full mb-5">
            <div className="flex justify-between items-center mb-10">
                <button type="button" className="flex items-center text-themeColor text-xl font-bold hover:opacity-50" onClick={returnToPrevious}>
                    <span className="flex flex-col justify-center">
                        <ChevronLeftIcon className="w-5 h-5" />
                    </span>
                    <span>
                        {returnStr}
                    </span>
                </button>
                <NavbarTools mode={"PC"} />
            </div>
            <WarningBanner />
        </div>
    );
}

export default NavBarSecondary;
