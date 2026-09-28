import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import PopupWidget from "./popupWidget";

/**
 * 公開頁共用佈局。
 * 導航欄與頁腳放在 _app 層渲染，頁面之間切換時保持同一個實例，不會卸載重建而閃爍。
 * @prop {object} layout - 頁面組件上的 `layout` 配置：`navbar` 為傳給導航欄的 props，`popup` 控制是否顯示右下角聯絡按鈕。
 */
const PublicLayout = ({ layout, children }) => {
  return (
    <>
      <Navbar {...layout.navbar} />
      {children}
      <Footer />
      {layout.popup && <PopupWidget />}
    </>
  );
};

export default PublicLayout;
