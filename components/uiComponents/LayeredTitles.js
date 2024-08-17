
// 所有標題公共樣式
let commonStyles = "text-xl font-bold text-themeColor";

/**
 * 一級標題
 * @param {*} props 
 * @returns 
 */
export const FirstTitle = (props) => {
    return (
        <div className="mb-3">
            <h3 className={commonStyles}>{props.children}</h3>
        </div>
    );
}

/**
 * 二級標題
 * @param {*} props 
 * @returns 
 */
export const SecondTitle = (props) => {
    return (
        <div className="mb-2 mt-3">
            <h3 className={commonStyles}>{props.children}</h3>
        </div>
    );
}

/**
 * 二級標題
 * @param {*} props 
 * @returns 
 */
export const ThirdTitle = (props) => {
    return (
        <div className="mb-2 mt-3 text-md opacity-80">
            <h3 className={commonStyles}>{props.children}</h3>
        </div>
    );
}