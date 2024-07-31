import React, { ReactNode } from "react";
import ThemeChanger from "./DarkSwitch";
import LanguageSwitcher from "./LanguageSwitcher";

const NavbarToolsWrapper = (props: { mode: "PC" | "Mobile", children: ReactNode | ReactNode[] }) => {
    if (props.mode == "Mobile") {
        return (
            <div className="flex flex-row justify-center mx-auto space-x-1 mr-3 py-4 nav__item">
                <div className="flex flex-col items-center gap-1">
                    {props.children}
                </div>
            </div>
        );
    }
    else if (props.mode == "PC") {
        return (
            <div className="flex max-[1024px]:hidden gap-4 mr-3 nav__item">
                {props.children}
            </div>
        );
    }
};

const NavbarTools = (props: { mode: "PC" | "Mobile" }) => {
    return (
        <NavbarToolsWrapper mode={props.mode}>
            <ThemeChanger />
            <LanguageSwitcher />
        </NavbarToolsWrapper>
    );
}

export default React.memo(NavbarTools);