// 包引用
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import ReactDOM from "react-dom/client"
import {
    PencilSquareIcon,
    PlusIcon,
    PlusCircleIcon,
    ChevronLeftIcon
} from "@heroicons/react/24/solid";

// 本地引用
import { BASE_URI, BASE_HOST, GET } from '../../utils/pathMap';
import Container from '../../components/container';
import NavBarSecondary from '../../components/navBarSecondary';
import Navbar from '../../components/navbar';
import ThemeChanger from '../../components/DarkSwitch';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Footer from "../../components/footer";
import { customSettings } from '../../utils/settings';


const toNewActivity = () => {
    window.location.href = "./newActivity";
}

const toClubInfoEdit = () => {
    window.location.href = './clubInfoEdit';
}

const ClubInfo = () => {
    const [clubProfileData, setProfileData] = useState(null);   //登錄信息
    const [clubContentData, setContentData] = useState(null);   //社團內容，如聯繫方式等
    const [clubActivities, setClubActivities] = useState(null); //社團活動列表
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchedProfileData = localStorage.getItem("ClubData");
        if (fetchedProfileData) {
            var profile = JSON.parse(fetchedProfileData);
            setProfileData(profile);
            getClubContent(profile.content.club_num);
            getClubActivity(profile.content.club_num);
            setIsLoading(false);
        } else {
            alert('請前往登錄賬號!');
            window.location.href = '../clublogin';
        }
    }, []);

    // 獲取社團Profile訊息
    const getClubContent = async (curClubNum) => {
        await axios({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            method: 'get',
            url: BASE_URI + GET.CLUB_INFO_NUM + curClubNum,
        }).then(resp => {
            let json = resp.data;
            if (json.message == 'success') {
                console.log("獲取社團信息成功");
                //localStorage.setItem("ClubContentData",JSON.stringify(json));
                setContentData(json.content);
            }
            else {
                window.alert("獲取社團內容失敗，請刷新頁面！");
                console.log("獲取社團內容失敗，請刷新頁面！", resp);
            }
        }).catch(err => {
            window.alert("網絡錯誤！");
            console.log("獲取Content錯誤: ", err);
        });
    }

    // 根據社團號碼獲取活動訊息
    const getClubActivity = async (curClubNum) => {
        await axios({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            method: 'get',
            url: BASE_URI + GET.EVENT_INFO_CLUB_NUM + curClubNum,
        }).then(resp => {
            let json = resp.data;
            setClubActivities(json.content);
        }).catch(err => {
            console.log("獲取Activity錯誤！" + err)
        }
        );
    }

    // 分割時間序列
    const parseTimeString = (timestamp) => {
        const dateObj = new Date(timestamp);
        const year = dateObj.getUTCFullYear();
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        const hour = dateObj.getUTCHours();
        const minute = dateObj.getUTCMinutes();

        let minuteStr = minute.toString();
        if (minute == 0) {
            minuteStr = '0' + minuteStr;
        }

        return {
            "Year": year,
            "Month": month,
            "Day": day,
            "Hour": hour,
            "Minute": minuteStr,
        }

    }

    // 用戶點擊活動卡片跳轉到卡片詳情頁
    const onClickActivityCard = (event, activityData) => {
        localStorage.setItem("CurActivity", JSON.stringify(activityData));
        window.location.href = "activityDetail";
    }

    return (<>
        <title>
            {"社團-"}{clubProfileData && clubProfileData.content.name}
        </title>
        <Container>

            {/* 二級頂欄 */}
            <NavBarSecondary returnLocation={'../'}>
            </NavBarSecondary>

            {!isloading ? (<>
                {/* 歡迎詞 */}
                <div>
                    <h3 className="text-themeColor text-2xl font-bold text-center">
                        歡迎你，
                        {clubProfileData && clubProfileData.content.name ? (clubProfileData.content.name) : ("社團")}
                        負責人！
                    </h3>
                </div>

                {/* 封面圖 */}
                <div className="flex justify-center mt-10">

                    {clubContentData && clubContentData.club_photos_list[0] ? (
                        <div key="0" className="flex flex-col mx-auto">
                            <img src={`${BASE_HOST + clubContentData.club_photos_list[0]}`} alt="club_photos" className="max-w-96 rounded-lg h-auto shadow-lg" style={{ backgroundColor: '#fff' }} />
                        </div>
                    ) : (
                        <p>你可以使用編輯功能補充此處的信息</p>
                    )}
                </div>

                {/*操作陣列*/}
                <div className="flex items-center justify-center my-10">
                    {/* 編輯按鈕*/}
                    <div className="flex items-center justify-center mx-5" onClick={toClubInfoEdit} >
                        <div className="grid grid-cols-2 bg-themeColor py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer">
                            <div className="flex flex-col justify-center">
                                <PencilSquareIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span>編輯</span>
                            </div>
                        </div>
                    </div>

                    {/* 添加按鈕*/}
                    <div className="flex items-center justify-center mx-5" onClick={toNewActivity} >
                        <div className="flex bg-themeColor py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer">
                            <div className="flex flex-col justify-center">
                                <PlusCircleIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center ml-3">
                                <span>新活動</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 正文內容 */}
                <div className="flex bg-white dark:bg-gray-800 border-l-4 border-themeColorLight p-5 rounded-lg drop-shadow-md lg:items-center md:items-top  mt-5">
                    {/*社團Logo*/}
                    <img
                        className="w-24 h-24 rounded-full "
                        style={{ backgroundColor: '#fff' }}
                        src={BASE_HOST + (clubProfileData && clubProfileData.content.logo_url)}
                    />

                    {/*社團L訊息*/}
                    <div className="ml-10">
                        <p className="text-xl text-themeColor font-bold">
                            {clubProfileData && clubProfileData.content.name}
                        </p>
                        <span className="text-themeColor bg-themeColorUltraLight rounded-full text-center px-3">
                            {clubProfileData && clubProfileData.content.tag}
                        </span>
                        <p>
                            {clubProfileData && clubProfileData.content.intro}
                        </p>
                    </div>
                </div>

                {/* 社團內容展示（聯繫方式和圖片的分欄） */}
                {/* 這個內容做了響應式，其中不應再添加更多內容了。*/}
                <div className="lg:grid lg:grid-cols-2 md:block gap-4 items-top justify-center mt-5">

                    {/*聯繫方式(只展示不為空的聯繫方式) */}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">聯繫方式</h3>
                        </div>
                        <ul>
                            {clubContentData ? (
                                clubContentData.contact.filter(item => item.type && item.num).map((item, index) => (
                                    <li key={index} >
                                        <div className="flex">
                                            <p className="text-themeColor font-bold">{item.type}{':\u00A0\u00A0'}</p>
                                            <p>{item.num}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>
                                    Loading....
                                </p>
                            )}
                        </ul>
                    </div>

                    {/* 社團圖片 */}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">社團圖片</h3>
                        </div>

                        <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-5 sm:grid-cols-1 gap-4 ">
                            {clubContentData ? (
                                clubContentData.club_photos_list.map((item, index) => (
                                    <div key={index} className="flex flex-col mx-auto">
                                        <a href={BASE_HOST + item} target="_blank">
                                            <img src={BASE_HOST + item} alt="club_photos" className="md:max-w-24 sm:max-w-96 rounded-lg h-auto hover:cursor-pointer hover:opacity-50 hover:shadow-lg" style={{ backgroundColor: '#fff' }} />
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>
                                    Loading..
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 社團活動 */}
                <div className="px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                    {/*標題*/}
                    <div className="mb-3">
                        <h3 className="text-xl font-bold text-themeColor">社團活動</h3>
                    </div>
                    {/* 渲染活動格子*/}
                    <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 ">
                        {/* 渲染活動卡片 */}
                        {clubActivities && clubActivities.length > 0 ? (
                            clubActivities.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-themeColorUltraLight dark:bg-gray-800 flex flex-col p-3 rounded-lg mx-auto hover:cursor-pointer hover:shadow-lg"
                                    onClick={event => onClickActivityCard(event, item)}>

                                    <div className="flex flex-col lg:w-48 xl:w-64 md:w-48 sm:w-64 items-center">
                                        {/*活動封面*/}
                                        <img src={BASE_HOST + item.cover_image_url} alt="club_photos" className="hover:border-4 hover:cursor-pointer hover:border-themeColor hover:shadow-lg md:w-48 h-64 object-cover sm:max-w-64 rounded-lg mb-5 shadow-lg" style={{ backgroundColor: '#fff' }} />
                                        {/*活動描述*/}
                                        <div className="flex flex-col h-16 mb-3 mx-auto">
                                            <h3 className="text-themeColor text-xl text-center font-bold text-ellipsis overflow-hidden">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="flex flex-col  border-t-2 border-themeColorLight items-left font-bold text-themeColor opacity-80">
                                            <p className="text-left">
                                                🕐:
                                                {' '}
                                                {parseTimeString(item.enddatetime).Year}{'-'}
                                                {parseTimeString(item.enddatetime).Month}{'-'}
                                                {parseTimeString(item.enddatetime).Day}{' '}
                                                {parseTimeString(item.enddatetime).Hour}{':'}
                                                {parseTimeString(item.enddatetime).Minute}
                                            </p>
                                            <p className="text-left">
                                                🚩：{item.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>你可以使用編輯功能補充此處的信息</p>
                        )}
                    </div>
                </div>
                <Footer />
            </>) : null}

        </Container>
    </>);
}

export default ClubInfo;