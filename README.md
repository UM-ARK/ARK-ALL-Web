# 🎊ARK ALL Web Version🎊

🎊🎊🎊Thanks to [@tom-choi](https://github.com/tom-choi) for his wonderful work in opening up this repo!!!

# 運行與設定

## Setup

```
yarn
```

## Launch

```
yarn dev
```

## Start

```
yarn build
yarn start
```

## 壓縮首頁廣告圖

首頁廣告圖（`public/img/home_page/advertisements/`）體積較大時，可在專案根目錄執行：

```bash
cd public/img/home_page/advertisements

for f in *.png; do
  sips -Z 1200 "$f"
  pngquant --quality=65-80 --force --ext .png "$f"
done

ls -lh
```

需已安裝 [`pngquant`](https://pngquant.org/)（例如 `brew install pngquant`）。`sips` 為 macOS 內建。命令會覆寫原檔，建議先備份。

# 開發文檔 Dev Docs

- [前端開發文檔](./documents/devdocs/ui.md)
- [服務器操作](/documents/devdocs/server_actions.md)
- [設計習慣](/documents/devdocs/design_paradigm.md)
