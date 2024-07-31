import React from "react";
import ThemeChanger from "../DarkSwitch";
import LanguageSwitcher from "../LanguageSwitcher";

const NavbarTools = React.memo(() => {
    return (
        <div className="flex max-[1024px]:hidden mr-3 nav__item">
            <ThemeChanger />
            <div className={`mr-4`} />
            <LanguageSwitcher />
        </div>
    );
});

export default NavbarTools;