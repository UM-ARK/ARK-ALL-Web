## Server Actions 服務器操作

### 綜述
&emsp; Server Actions涉及到一切有關服務器的操作，包裹`GET`、`POST`等，且需要使用相關[`api`](https://github.com/UM-ARK/doc/tree/main/docs/API)。
- 本項目中所有的服務器操函數均保存於[lib](/lib/)文件夾中。且爲了降低耦合、提升復用，後續請不要在頁面中添加服務器邏輯，而應當將相關邏輯放入[lib](/lib/)文件夾中，再從頁面引用。

- 大部分服務器操作都涉及到[Interface](/types/index.d.tsx)接口。本文中所涉及到的類型變量但凡以`I`開頭的均為接口，如`IClubSigninResponse`等，請到`Interface`中詳查。

### [/lib/authentication](/lib/authentication.tsx)
#### `block`
- 將用戶屏蔽與頁面外。
- 參數
    - `msg?:string` 重新登錄的提示詞。

#### `authGuard`
- 頁面守衛，如果沒有本機社團 session marker 或 URL 參數，則導向登入頁面。前端會讀取 `ARK_TOKEN` 的 JWT `exp` 判斷是否已到期；後端仍會在實際寫入操作時驗證簽名。
- 參數：
    - `authParams` 登錄參數，包含以下`prop`：
        - `credentialName?:string` 自訂 marker 名稱；一般不需傳入，預設使用不含敏感內容的 `club_session`。
        - `urlParamName:string` URL參數名稱，通常是社團登錄號碼，即`club_num`。該名稱為自定義，單一廣汎使用。
- 返回：
    - `urlParamName`所規定的URL參數值。即，若所求URL參數名稱為`club_num`，且URL中存在`club_num`的話，則返回該`club_num`的值。
    - 否則，返回`null`。
- 示例：
```ts
    const clubNum = authGuard({urlParamName:"club_num"});
    // url: http://localhost:3000/?club_num=0, 返回0
    // url: http://localhost:3000/, 返回null，重定向至登錄頁。
```

#### `clubSignin`
- 社團賬戶登錄。
- 參數：
    - `_data:IClubSignin`，包括以下`prop`：
        - `accout`: 社團賬號，
        - `password`: 密碼。
- 返回：
    - 登陸成功。
        - 重定向至[社團詳情頁](/pages/club/clubInfo.tsx)，并返回服務器傳回數據的`Promise`。
        - 服務器傳回數據類型為`IClubSigninResponse`。
        - 後端將 JWT 放在 `ARK_TOKEN` cookie；前端只在 `localStorage` 保存不含憑證的 `club_session` marker。
    - 登陸失敗，返回`null`，提示錯誤信息。

### [/lib/clubSession](/lib/clubSession.ts)
- `getValidClubSession` 從本機 marker 恢復社團編號，並讀取 `ARK_TOKEN` 的角色與 `exp` 判斷是否仍可返回工作台。
- `clearClubSession` 刪除目前瀏覽器的 `ARK_TOKEN` cookie、本機 marker 與舊版 `club_token`；UI 同時清除 Zustand 登入狀態。

### [/lib/serverActions](/lib/serverActions.tsx)

#### `appendListToFormData`
- 工具函數，將一個list結構按照ARK後端的要求寫入表單數據。
- 參數：
    - `fd:FormData` 所需要傳入的表單。
    - `listName:string` 表單中該項的命名。
    - `list:any[]|undefined|null` 縮寫入的目標對象。 由於有可能表單中對象為空，故而保留可能的`undefined`, `null`類型，使用者無需判斷。
    - `mode:"object"|"array"` 寫入模式，分爲對象模式(Object)和數組模式(Array)。根據list的不同類型決定。
- 返回：
    - 更新後的表單。
- 示例：
    ```ts
    appendListToFormData(fd, "add_relate_image", watch("add_relate_image"), "object");
    ```

#### `upload`
- 通用方法，將某些内容上傳到服務器。
- 參數：
    - `uploadFormData:FormData` 即將上傳的表單數據。
    - `apiURL:string` 對應服務的API路徑
    - `clarLocalStorage?:string` 清楚本地緩存名稱，可不填。
    - `returnLoc?:string` 重定向路徑，可不填。
    - `guard?:string` 判定先決條件，可不填。
    - `askUserConfirm?:boolean` 是否需要用戶確認，可不填。
- 返回：無。
    - 若成功，則重定向至目標頁面。
    - 若失敗（包括返回數據code不為200或catch error），則提示錯誤信息。
