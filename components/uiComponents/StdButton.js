import { IF } from './ContentBlock'
/**
 * 標準按鈕樣式
 * @param {*} props 
 * @prop {string} color Tailwind CSS中規定的顔色樣式
 * @prop {function} onClickFunc 點擊按鈕後要執行的函數
 * @prop {string} textContent 按鈕顯示的文字
 * @prop {React.Component} Icon 按鈕顯示的圖標
 * @returns 
 */
export const StdButton = (props) => {
    const { color, onClickFunc, textContent, Icon, condition, type, disabled } = props;

    const btnStyle = "flex " + (color ? color : 'bg-themeColor') + " py-3 px-5 rounded-full text-white transition-all " + (disabled ? "cursor-not-allowed opacity-60" : "hover:scale-105 hover:cursor-pointer");

    return (
        (condition == void 0 || condition == true) && (
            <button disabled={disabled} className="flex items-center justify-center mx-5" onClick={onClickFunc || void 0} type={type || "submit"}>
                <div className={btnStyle}>
                    <IF condition={Icon != void 0}>
                        <div className="flex flex-col justify-center">
                            <Icon className="w-5 h-5" />
                        </div>
                    </IF>
                    <div className="flex flex-col justify-center ml-3">
                        <span>{textContent}</span>
                    </div>
                </div>
            </button>
        )
    );
}

/**
 * 按鈕操作陣列
 * @param {*} props 
 * @param {bool} condition 只有條件滿足的情況下才顯示。可空。
 * @returns 
 */
export const StdButtonGrid = (props) => {
    let condition = props.condition != void 0 ? props.condition : true;

    return (
        condition && (
            <div className="flex flex-wrap gap-3 items-center justify-center my-10">
                {props.children}
            </div>
        )
    );
}
