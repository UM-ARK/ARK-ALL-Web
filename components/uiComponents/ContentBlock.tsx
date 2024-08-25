import React, { ReactNode } from "react";
import { FirstTitle } from "./LayeredTitles";
import Container from "../container";

/**
 * ARK 標準渲染頁面。
 * @abstract
 * 請停止使用空標簽，即`<></>`，而使用此組件。
 * @prop {string} title - 頁面標題，即瀏覽器標籤頁標題。
 * @prop {string|undefined} className - 頁面額外樣式。
 * @prop {ReactNode | ReactNode[]} children - 頁面内容。
 * @example
 * export const Page = () => {
 *     return (
 *         <ARKMain title="Page Title">     // 定義頁面標題
 *             <YOUR_CONTENT>               // 所有頁面内容都在這裏
 *         </ARKMain>
 *     );
 * }
 * @returns 
 */
export const ARKMain = (props: {
    className?: string,
    withOutMargin?: boolean
    children: ReactNode | ReactNode[]
}) => {
    return (
        <main>
            <title>
                {"ARK Web"}
            </title>
            {!props.withOutMargin ? (
                <Container className={props.className || ""}>
                    {props.children}
                </Container>
            ) : (
                props.children
            )}
        </main>
    );
}

/**
 * ARK 帶標題的標準内容卡片。
 * @prop {boolean} condition - 卡片渲染的條件，為false時卡片不渲染。默認爲true。
 * @prop {string|undefined} title - 内容卡片的標題。
 * @prop {string|undefined} className - 卡片的額外樣式。
 * @prop {string|undefined} styles.withTitle - 卡片是否顯示標題。
 * @prop {string|undefined} styles.withBackground - 卡片是否具有背景色。
 * @returns 
 */
export const ContentBlock = (props: {
    condition?: boolean,
    children: ReactNode | ReactNode[],
    title?: string,
    className?: string,
    feature?: {
        icon?: any,
        desc?: string,
        func?: Function,
    }
    styles?: {
        withTitle?: boolean,
        withBackground?: boolean,
    }
}) => {
    let { condition, title, className, styles = { withTitle: true, withBackground: true }, feature = { icon: void 0, func: void 0 } } = props;
    let { withTitle, withBackground } = styles;
    let condition_ = condition != void 0 ? condition : true;
    let style = `bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center ${className || ""}`
    return (
        condition_ && (
            <div className={style}>
                {/* 標題 */}
                {withTitle && (
                    <div className={`flex flex-row justify-between items-center`}>
                        <FirstTitle>{title ? title : '標題'}</FirstTitle>
                        {feature.icon != void 0 && feature.func != void 0 && (
                            <div className={`flex flex-row gap-3 items-center text-themeColor `}>
                                <div className={`max-[520px]:hidden`}><p>{feature.desc || ""}</p></div>
                                <feature.icon onClick={feature.func} className={`block w-8 h-8 p-1 rounded-lg bg-gray-100 hover:bg-themeColorUltraLight hover:scale-[1.08] transition-all`} />
                            </div>
                        )}
                    </div>
                )}
                {props.children}
            </div>
        )
    );
}

/**
 * ARK 内容卡片分欄。
 * @prop {number|undefined} gridNum - 欄位數，默認爲左右均分。
 * @returns 
 */
export const ContentBlockGrid = (props: { gridNum?: number, children: ReactNode | ReactNode[] }) => {
    let gridNum = props.gridNum ? props.gridNum : 2;
    return (
        <div className={`lg:grid lg:grid-cols-${gridNum} md:block gap-4 items-top justify-center mt-5`}>
            {props.children}
        </div>
    );
}

/**
 * @abstract
 * ARK IF條件渲染塊。只有滿足某個條件時才顯示，否則不顯示。
 * 請勿濫用此組件！此組件僅用於包裹一些較大型的代碼，以保證代碼可讀性，而非所有條件下的最佳解決方案。
 * 
 * @example 一些較小的代碼塊請使用react自帶的條件渲染。
 * {watch("type")=="WEBSITE" && (
 *      <ContentBlock>
 *          {`some content`}
 *      </ContentBlock>
 * )}
 * 
 * @example 一些較大型的代碼塊則可選擇使用IF組件。
 * <IF condition={isLoaded}>
 *      <ContentBlockGrid>
 *          <ContentBlock>
 *              {`some content`}
 *          </ContentBlock>
 *          <ContentBlock>
 *              {`some content`}
 *          </ContentBlock>
 *      </ContentBlockGrid>
 * </IF>
 * 
 * @prop {bool} condition   渲染條件。為true時渲染子元素，為false時不渲染子元素。
 * @returns 
 */
export const IF = (props: { condition: boolean, children: ReactNode | ReactNode[] }) => {
    return (
        props.condition && (
            props.children
        )
    );
}

/**
 * @abstract
 * ARK IFELSE條件渲染塊。條件滿足，顯示第一個子元素，否則顯示第二個子元素。
 * 請勿濫用此組件！此組件僅用於包裹一些較大型的代碼，以保證代碼可讀性，而非所有條件下的最佳解決方案。
 * 
 * @example 一些較小的代碼塊請使用react自帶的條件渲染。
 * {isEditMode ? (<div>{watch("title")}</div>) : (<input {...register("title")}/>)}
 * 
 * @example
 * <IFELSE condition={val}>
 *      <div>...</div>   // val為true時渲染
 *      <div>...</div>   // val為false時渲染
 *      <div>...</div>   // 假若這裏還有元素則會被忽略。
 * </IFELSE>
 * 
 * @param {*} props
 * @prop {bool} val   渲染條件。為true時渲染第一個子元素，為false時渲染第二個子元素。 
 * @returns 
 */
export const IFELSE = (props: { condition: boolean; children: ReactNode[] }) => {
    return (
        props.condition ? (
            props.children[0]
        ) : (
            props.children[1]
        )
    );
}