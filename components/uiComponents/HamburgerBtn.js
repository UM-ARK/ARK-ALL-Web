import { useState } from "react";

export const HamburgerBtn = (props) => {
    const { setMobileMenuOpen } = props;
    const [m_isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!m_isOpen);
        setMobileMenuOpen(!m_isOpen);
    };
    return (
        <div className={`mr-5 flex flex-col gap-[3.5px] lg:hidden hover:cursor-pointer bg-[#ffffff50] p-4 rounded-xl`} onClick={handleClick}>
            <div className={`w-8 bg-black h-[2.5px] rounded-full bg-trueGray-700 dark:bg-white ${m_isOpen && `rotate-45 translate-y-0.5`} transition-all`} />
            <div className={`w-8 bg-black h-[2.5px] rounded-full bg-trueGray-700 dark:bg-white ${m_isOpen && 'hidden'} transition-all`} />
            <div className={`w-8 bg-black h-[2.5px] rounded-full bg-trueGray-700 dark:bg-white ${m_isOpen && `-rotate-45 -translate-y-0.5`} transition-all`} />
        </div>
    );
}