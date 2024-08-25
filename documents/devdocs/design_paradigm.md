### Design Paradigm 設計習慣

#### 簡單數據處理: `_data` 、 `data` 的關係。

&emsp; 有些情況下，一個變量經過簡單的數據處理并沒有達到實質性的改變。
- 比如，一個數據對象在被製作成表單之前，其中的`sDate`和`sTime`會被拼接成統一的`startdatetime`，除此之外沒有其他改動。
- 這種情況下，直觀地來講，即使需要創建一個新的變量，這個變量的名字卻沒有必要作更大的更改。
- 習慣上：
    - 在變量名前添加`_`，表示該變量的待處理(To be processed)版本。
    - 在變量名后添加`_`，表示該變量的處理後(Processed)版本。
- 示例：
```ts
    // 提取預處理數據中：需要丟棄的部分(sDate等) 和 需要保留的部分(...rest)
    let _data = m_activityData.content;     // 處理前的數據
    let {sDate, sTime, eDate, eTime, ...rest} = _data;

    // 處理需要丟棄的部分
    let startdatetime = squashDateTime(sDate, sTime,"T");
    let enddatetime = squashDateTime(eDate, eTime,"T");

    // 將處理後的數據放入新的變量中
    data = {startdatetime: startdatetime, enddatetime: enddatetime, ...rest};   // 處理後的數據
```

#### React狀態命名：以`m_`開頭。
- 沿用與Unity開發中以`u_`開頭區分本地變量，在React項目中以`m_`開頭可用於快速區分普通變量和狀態變量。項目中常見到的有`m_clubNum`，`m_activityData`等。
- `m_`的含義為`Mine`，旨在説明該變量的作用範圍只在當前組件内。
- 相應地，狀態變量對應的設置函數也以小寫`set`開頭，後續以駝峰命名拼接狀態變量名。如`setClubNum`，`setActivityData`等，便於快速區分狀態設置函數和一般函數。
- 示例
```ts
    // 登錄社團賬號
    const [m_clubNum, setClubNum] = useState<string>("");

    // 獲取活動的數據
    const [m_activityData, setActivityData] = useState<IGetAvtivityById>(null);
```

#### 接口(Interface)以大寫`I`開頭
- 較爲通用的習慣，鑒於接口的作用與類型（Type）類似，故而使用大寫。在實際應用中具有較高辨識度。
- 接口的不同版本也適用於上述簡單數據處理的方法，如`_ICreateActivity`與`ICreateActivity`。
- 示例：
```ts
    // 初始化一個新建活動的表單，其中的數據結構符合_ICreateActivity的結構。
    // _ICreateActivity是ICreateActivity的預處理版本，其區別在於沒有拼接對應的date和time。
    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<_ICreateActivity>({
        defaultValues: {
            title: "",
            cover_image_file: void 0,
            sDate: moment(new Date()).format("YYYY-MM-DD"),
            sTime: moment(new Date()).format("HH:mm"),
            eDate: moment(new Date()).format("YYYY-MM-DD"),
            eTime: moment(new Date()).format("HH:mm"),
            location: "",
            link: "",
            type: "ACTIVITY",
            introduction: "",
            add_relate_image: []
        }
    });
```