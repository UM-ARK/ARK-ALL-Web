import React, { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Container from '../components/container';
import PopupWidget from "../components/popupWidget";
import Image from "next/image";

import { ARKMain } from '../components/uiComponents/ContentBlock';
import {
  XMarkIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
} from "@heroicons/react/24/solid"

import img_0 from '../public/img/web_tur/0.png';
import img_1 from '../public/img/web_tur/1.png';
import img_2 from '../public/img/web_tur/2.png';
import img_3 from '../public/img/web_tur/3.png';
import img_4 from '../public/img/web_tur/4.png';
import img_5 from '../public/img/web_tur/5.png';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion"

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZOOM_STEP = 0.4;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const ImagePreview = ({ displayPreview, alt, onClose }) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const stageRef = useRef(null);
  const scaleRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const pinchRef = useRef(null);

  const applyScale = useCallback((nextScale) => {
    const clamped = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    scaleRef.current = clamped;
    setScale(clamped);
    if (clamped === 1) {
      offsetRef.current = { x: 0, y: 0 };
      setOffset({ x: 0, y: 0 });
    }
    return clamped;
  }, []);

  const applyOffset = useCallback((nextOffset) => {
    offsetRef.current = nextOffset;
    setOffset(nextOffset);
  }, []);

  const resetView = useCallback(() => {
    applyScale(1);
  }, [applyScale]);

  const zoomAt = useCallback((nextScale, clientX, clientY) => {
    const prevScale = scaleRef.current;
    const clamped = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    if (clamped === 1) {
      applyScale(1);
      return;
    }

    const rect = stageRef.current?.getBoundingClientRect();
    if (rect && Number.isFinite(clientX) && Number.isFinite(clientY) && prevScale > 0) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const ratio = clamped / prevScale;
      const prev = offsetRef.current;
      applyOffset({
        x: (prev.x - (clientX - centerX)) * ratio + (clientX - centerX),
        y: (prev.y - (clientY - centerY)) * ratio + (clientY - centerY),
      });
    }
    applyScale(clamped);
  }, [applyOffset, applyScale]);

  useEffect(() => {
    if (!displayPreview) return undefined;

    resetView();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [displayPreview, onClose, resetView]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !displayPreview) return undefined;

    const onWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      zoomAt(scaleRef.current + delta, event.clientX, event.clientY);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [displayPreview, zoomAt]);

  const onDoubleClick = (event) => {
    event.preventDefault();
    if (scaleRef.current > 1) {
      resetView();
    } else {
      zoomAt(2.5, event.clientX, event.clientY);
    }
  };

  const onPointerDown = (event) => {
    if (event.pointerType === "touch") return;
    if (scaleRef.current <= 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsInteracting(true);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offsetRef.current.x,
      originY: offsetRef.current.y,
    };
  };

  const onPointerMove = (event) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    const { startX, startY, originX, originY } = dragRef.current;
    applyOffset({
      x: originX + (event.clientX - startX),
      y: originY + (event.clientY - startY),
    });
  };

  const onPointerUp = (event) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      setIsInteracting(false);
    }
  };

  const onTouchStart = (event) => {
    if (event.touches.length === 2) {
      const [a, b] = event.touches;
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      pinchRef.current = {
        distance,
        scale: scaleRef.current,
        centerX: (a.clientX + b.clientX) / 2,
        centerY: (a.clientY + b.clientY) / 2,
      };
      dragRef.current = null;
      setIsInteracting(true);
    } else if (event.touches.length === 1 && scaleRef.current > 1) {
      const touch = event.touches[0];
      dragRef.current = {
        pointerId: "touch",
        startX: touch.clientX,
        startY: touch.clientY,
        originX: offsetRef.current.x,
        originY: offsetRef.current.y,
      };
      setIsInteracting(true);
    }
  };

  const onTouchMove = (event) => {
    if (event.touches.length === 2 && pinchRef.current) {
      event.preventDefault();
      const [a, b] = event.touches;
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const nextScale = pinchRef.current.scale * (distance / pinchRef.current.distance);
      zoomAt(nextScale, pinchRef.current.centerX, pinchRef.current.centerY);
      return;
    }

    if (event.touches.length === 1 && dragRef.current?.pointerId === "touch") {
      event.preventDefault();
      const touch = event.touches[0];
      const { startX, startY, originX, originY } = dragRef.current;
      applyOffset({
        x: originX + (touch.clientX - startX),
        y: originY + (touch.clientY - startY),
      });
    }
  };

  const onTouchEnd = (event) => {
    if (event.touches.length < 2) {
      pinchRef.current = null;
    }
    if (event.touches.length === 0) {
      dragRef.current = null;
      setIsInteracting(false);
    } else if (event.touches.length === 1 && scaleRef.current > 1) {
      const touch = event.touches[0];
      dragRef.current = {
        pointerId: "touch",
        startX: touch.clientX,
        startY: touch.clientY,
        originX: offsetRef.current.x,
        originY: offsetRef.current.y,
      };
    }
  };

  if (!displayPreview) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label={alt || "image preview"}
    >
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-b from-black/70 to-transparent">
        <p className="text-white/90 text-sm truncate pr-2">{alt}</p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="rounded-full bg-white/15 p-2 text-white hover:bg-white/25 transition disabled:opacity-40"
            onClick={() => zoomAt(scaleRef.current - ZOOM_STEP)}
            disabled={scale <= MIN_SCALE}
            aria-label="zoom out"
          >
            <MagnifyingGlassMinusIcon className="w-5 h-5" />
          </button>
          <span className="min-w-[3.5rem] text-center text-white/90 text-sm tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            className="rounded-full bg-white/15 p-2 text-white hover:bg-white/25 transition disabled:opacity-40"
            onClick={() => zoomAt(scaleRef.current + ZOOM_STEP)}
            disabled={scale >= MAX_SCALE}
            aria-label="zoom in"
          >
            <MagnifyingGlassPlusIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="rounded-full bg-white/15 p-2 text-white hover:bg-white/25 transition"
            onClick={onClose}
            aria-label="close"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className={`relative flex-1 overflow-hidden touch-none ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        onDoubleClick={onDoubleClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="absolute inset-0 flex items-center justify-center p-4 pt-16 pb-8 pointer-events-none"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            transition: isInteracting ? "none" : "transform 120ms ease-out",
          }}
        >
          <Image
            src={displayPreview}
            alt={alt || "tutorial"}
            width={displayPreview.width}
            height={displayPreview.height}
            className="max-h-[calc(100vh-7rem)] max-w-[min(100%,96vw)] w-auto h-auto object-contain select-none"
            placeholder="blur"
            blurDataURL={displayPreview.src}
            draggable={false}
            priority
          />
        </div>
      </div>

      <p className="absolute bottom-3 inset-x-0 text-center text-white/60 text-xs px-4 pointer-events-none">
        滾輪／雙指縮放 · 拖曳移動 · 雙擊切換縮放 · Esc 關閉
      </p>
    </div>
  );
};

const tutorial = () => {

  const { t } = useTranslation();
  const [m_displayPreview, setDisplayPreview] = useState(null);
  const [previewAlt, setPreviewAlt] = useState("");

  const closePreview = useCallback(() => {
    setDisplayPreview(null);
    setPreviewAlt("");
  }, []);

  const tur_arr = [
    { img: img_0, title: `登錄社團賬號`, txt: `若要登錄社團賬號，請點擊導航欄中的“社團登錄”，並輸入自己社團的賬號密碼。然後點擊登錄按鈕即可登錄。` },
    { img: img_1, title: `社團賬號主頁`, txt: `社團賬號主頁包含了所有賬號相關的訊息，包括社團名稱、封面、頭像、簡介、tag、等訊息。在這裏，您可以選擇編輯社團主頁或新增一個活動。您也可以點擊底部的活動卡片來查看活動詳情。` },
    { img: img_2, title: `編輯社團主頁`, txt: `編輯社團簡介，新增或減少您的聯係方式。可刪除或添加社團圖片。請注意，社團圖片不可超過5張。 點擊上傳即可保存您的改動，若要放棄改動請點擊取消。` },
    { img: img_3, title: `新增活動`, txt: `若要新增一個活動，請填寫活動名稱、簡介、類型和時間，並上傳活動封面。“普通活動”類型的活動可以上傳相關圖片，且可以填寫地點。“網頁”類型的活動需填寫鏈接。編輯完成後，點擊上傳即可。` },
    { img: img_4, title: `查看活動`, txt: `在活動詳情頁面，您可以看到活動的標題、封面、時間、地點、簡介、相關圖片等訊息。您還可以點擊編輯活動按鈕來修改活動内容。` },
    { img: img_5, title: `編輯活動`, txt: `兩種類型的活動修改的部分大同小異，具體可看上圖。請注意，活動開始時間不可在結束時間之後。此外，相關圖片總數不可超過5張。若要刪除活動，請點擊“刪除活動”按鈕。` },
  ]
  return (
    <ARKMain
      title={t("Tutorial")}
      seoTitle={t("Tutorial_seo_title")}
      description={t("Tutorial_seo_desc")}
      canonicalPath="/tutorial"
      withOutMargin={true}
    >
      <ImagePreview
        displayPreview={m_displayPreview}
        alt={previewAlt}
        onClose={closePreview}
      />
      <Navbar selected={"Tutorial"} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            {t("Tutorial_h1")}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300 mb-8 text-center">
            {t("Tutorial_intro")}
          </p>

          <div className="flex flex-wrap gap-5 items-top justify-center">
            {tur_arr.map((itm, index) => {
              const stepTitle = `${index + 1}. ${itm.title}`;
              return (
                <div
                  key={itm.title}
                  className="block h-full items-top w-[512px] justify-center mx-auto"
                >
                  <button
                    type="button"
                    className="block w-full text-left cursor-zoom-in hover:scale-[1.01] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-themeColor rounded-tl-lg rounded-tr-lg"
                    onClick={() => {
                      setDisplayPreview(itm.img);
                      setPreviewAlt(stepTitle);
                    }}
                    aria-label={`查看大圖：${stepTitle}`}
                  >
                    <Image
                      src={itm.img}
                      height="auto"
                      alt={stepTitle}
                      className="block object-cover rounded-tl-lg rounded-tr-lg border-[3px] border-themeColorUltraLight dark:border-gray-800"
                      placeholder="blur"
                      blurDataURL={itm.img.src} />
                  </button>
                  <div className="rounded-bl-lg rounded-br-lg text-themeColor bg-themeColorUltraLight dark:bg-gray-800 px-5 py-3">
                    <p className="text-center text-sm font-bold">
                      {stepTitle}
                    </p>
                    <p>
                      {itm.txt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </motion.div>

      <Footer />
      <PopupWidget />
    </ARKMain>
  );
};

export default tutorial;
