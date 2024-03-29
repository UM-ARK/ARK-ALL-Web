// 包引用
import React, { useState, useEffect } from 'react';
import { Router, Route, Link } from 'react-router';
import axios from 'axios';
import qs from 'qs';
import ReactDOM from "react-dom/client"
import {
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/solid";

// 本地引用
import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';
import Container from '../../components/container';
import Navbar from '../../components/navbar';
import ThemeChanger from '../../components/DarkSwitch';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Footer from "../../components/footer";
import { act } from 'react-three-fiber';


const ActivityDetail = () => {
    const [activityData, setActivityData] = useState(null);

    // 活動類型映射
    const activityTypeMap = {
        "ACTIVITY": "普通活動",
        "OFFICIAL": "澳大官方",
        "WEBSITE": "網頁"
    };

    // 從本地緩存中獲取活動資料
    const fetchActivityData = () => {
        var data = localStorage.getItem("CurActivity");
        data = JSON.parse(data);
        setActivityData(data);
        console.log(data);
    }

    // 返回社團詳情頁
    const returnToClubInfo = () => {
        window.location.href = "./clubInfo";
    }

    // 刪除活動
    const deleteActivity = async () => {
        await axios({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            method: 'post',
            url: BASE_URI + POST.EVENT_DEL + activityData._id,
        }).then(resp => {
            window.location.href = "./clubInfo";
        }
        ).catch(err => {
            window.alert("刪除活動失敗，請重試！");
        });
    }

    useEffect(() => {
        fetchActivityData();
    },
        []
    );


    return (


        <>
            <title>
                {activityData && activityData.title} - 詳情
            </title>
            <Container>
                {/* 頂欄*/}
                <div className="flex justify-between items-center mb-10">
                    <button
                        className="mb-5 text-themeColor text-lg font-bold hover:opacity-50"
                        onClick={returnToClubInfo}>
                        {'< '}返回{activityData && activityData.club_name}
                    </button>
                    <div className="hidden mr-3 space-x-4 lg:flex nav__item">
                        <ThemeChanger />
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* 社團名字+活動標題*/}
                <div className="flex flex-col items-center text-themeColor font-bold mb-5">
                    <h3 className="text-xl mb-3">
                        {activityData && activityData.club_name}
                    </h3>
                    <h1 className="text-3xl">
                        {activityData && activityData.title}
                    </h1>
                </div>

                {/* 封面圖片 */}
                <div className="flex flex-col items-center mb-5">
                    <img
                        className="w-96 shadow-lg rounded-xl"
                        src={activityData && BASE_HOST + activityData.cover_image_url} />
                </div>

                {/*操作陣列*/}
                <div className="flex items-center justify-center my-10">
                    {/* 編輯按鈕*/}
                    <div className="flex items-center justify-center mx-5" >
                        <div className="grid grid-cols-2 bg-themeColor py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer">
                            <div className="flex flex-col justify-center">
                                <PencilSquareIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span>編輯</span>
                            </div>
                        </div>
                    </div>
                    {/* 刪除按鈕*/}
                    <div className="flex items-center justify-center mx-5" onClick={deleteActivity}>
                        <div className="grid grid-cols-2  bg-alert py-3 px-5 rounded-full text-white hover:opacity-50 hover:cursor-pointer">
                            <div className="flex flex-col justify-center">
                                <TrashIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span>刪除</span>
                            </div>
                        </div>
                    </div>
                </div>


                {/* 時間和介紹 */}
                <div className="lg:grid lg:grid-cols-2 md:block gap-4 items-top justify-center mt-5">
                    {/*開始和結束時間*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">基本訊息</h3>
                        </div>
                        {/* 開始時間和結束時間*/}
                        <p>
                            <span className="text-themeColor font-bold">
                                Start:{'  '}
                            </span>
                            {activityData && activityData.timestamp}
                        </p>
                        <p>
                            <span className="text-themeColor font-bold">
                                End:{'  '}
                            </span>
                            {activityData && activityData.enddatetime}
                        </p>
                        {/* 地點 */}
                        <p>
                            <span className="text-themeColor font-bold">
                                地點:{'  '}
                            </span>
                            {activityData && activityData.location}
                        </p>
                        {/* 活動類型*/}
                        <p>
                            <span className="text-themeColor font-bold">
                                類型:{'  '}
                            </span>
                            {activityData && activityTypeMap[activityData.type]}
                        </p>
                    </div>

                    {/*活動介紹*/}
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                        {/*標題*/}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-themeColor">簡介</h3>
                        </div>
                        <p className="text-ellipsis overflow-hidden">
                            {activityData && activityData.introduction}
                        </p>
                    </div>

                </div>

                {/* 相關圖片 (如果沒有相關圖片就不展示該模塊) */}
                {activityData && activityData.relate_image_url.length > 0 &&
                    (
                        <div className="bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center mb-5">
                            <div className="mb-3">
                                <h3 className="text-xl font-bold text-themeColor">相關圖片</h3>
                            </div>
                            <div className="lg:grid lg:grid-cols-4 md:block lg:gap-4 items-top justify-center mt-5">
                                {activityData && activityData.relate_image_url.map((item, index) => (
                                    <div className="flex flex-col mb-4">
                                        <img src={BASE_HOST + item} className="rounded-lg " />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}



            </Container>
            <Footer />
        </>
    );
}

export default ActivityDetail;