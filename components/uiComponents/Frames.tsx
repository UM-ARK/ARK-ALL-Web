import { ReactNode } from "react";

/**
 * 可自定義顯示模式的響應式框架
 * @param props 
 * @returns 
 */
export const ARKDemoFrame = (props: {
    flexRowStr?: string,
    flexColStr?: string,
    rowHeight?: string,
    className?: string,
    children: ReactNode[],
    border?: any,
}) => {
    const { flexRowStr, flexColStr, rowHeight, className } = props;
    return (
        <div className={`flex min-[${flexRowStr || "901px"}]:flex-row max-[${flexColStr || "900px"}]:flex-col ${className || ""}`}>
            {props.children.map((block, idx) => (
                <div className={`block w-full justify-center items-center ${props.border && `border border-bold border-white`} h-[10rem]`}>
                    {block}
                </div>
            ))}
        </div>
    );
};