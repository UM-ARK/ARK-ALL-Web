import imageCompression from 'browser-image-compression';
/**
 * 將時間字符串轉換爲目標格式。
 * @param {*} date  日期
 * @param {*} time  時間
 * @param {*} divider   分隔符號 
 * @returns 格式化的日期字符串
 */
export const squashDateTime = (date: string, time: string, divider?: string) => {
    return date + (divider || " ") + time;
}

/**
 * 將服務器返回的datetime進行分割。此步驟不可省略，因爲API必須接收一個時間戳，即使它完全沒有變。(-_-|||)
 * @param {*} timestamp 時間戳，格式爲：2024-06-04 13:06:00+00:00
 * @returns 目標格式：{"date": 2024-06-04, "time": 13:06:00}
 */
export const parseDateTime = (timestamp: string) => {
    let date = timestamp.split(' ')[0];
    let time = timestamp.split(' ')[1];
    return { "date": date, "time": time };
}

/**
 * 分割時間序列
 * @param {string} timestamp 時間戳
 * @returns 對象，包含：年、月、日、時、分
 */
export const parseTimeString = (timestamp) => {
    const dateObj = new Date(timestamp);
    const year = dateObj.getUTCFullYear().toString();
    const month = (dateObj.getUTCMonth() + 1).toString();
    const day = dateObj.getUTCDate().toString();

    let hour = dateObj.getUTCHours();
    const hourStr = hour > 9 ? hour.toString() : '0' + hour.toString();

    let minute = dateObj.getUTCMinutes();
    const minuteStr = minute > 9 ? minute.toString() : '0' + minute.toString();

    return {
        "Year": year,
        "Month": month,
        "Day": day,
        "Hour": hourStr,
        "Minute": minuteStr,
    }
}

/**
 * 將JSON對象轉換為表單數據。
 * @param {*} data - JSON數據
 * @returns - 創建的表單對象
 */
export const JsonToFormData = (data) => {
    let fd = new FormData();
    for (var key in data) {
        fd.append(key, data[key]);
    }
    return fd;
}

// 複製一份文件
export const duplicateFile = (file) => {
    let newFileName = `${Date.now()}_${file.name}`;
    let newFile = new File([file], newFileName, { type: file.type });
    return newFile;
};


/**
 * 壓縮圖片
 * @param file 
 * @param maxSizeMB 
 * @returns 
 */
export const compressImage = async (file: any, maxSizeMB: number) => {
    if (!file) {
        return;
    }

    const options = {
        maxSizeMB: maxSizeMB,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (err) {
        console.log(err);
    }
}

// function imageCompression(file: any, options: { maxSizeMB: number; maxWidthOrHeight: number; useWebWorker: boolean; }) {
//     throw new Error("Function not implemented.");
// }
