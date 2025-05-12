// app/calendar/page.js
"use client";

import { useState, useEffect, useRef } from "react";
// ✨ 추가할 상태 및 더미 데이터 (CalendarPage 함수 내부 상단)
import { useRouter } from "next/navigation";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  isToday,
} from "date-fns";

export default function CalendarPage() {
  // ✨ 추가할 상태 및 더미 데이터 (CalendarPage 함수 내부 상단)
  const [selectedDay, setSelectedDay] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeBg, setFadeBg] = useState(false);

  const router = useRouter();

  const budgetInfo = {
    monthTotal: 603000,
    dailyBudget: 23000,
  };
  const detailData = {
    "2025-05-09": [
      { category: "식비", name: "아침밥(편의점)", price: 7500 },
      { category: "쇼핑", name: "우산(편의점)", price: 7500 },
    ],
  };
  const dummySpending = {
    "2025-05-01": 10000,
    "2025-05-02": 24000,
    "2025-05-03": 40000,
    "2025-05-04": 30000,
    "2025-05-05": 9000,
    "2025-05-06": 10000,
    "2025-05-07": 9000,
    "2025-05-08": 5000,
    "2025-05-09": 15000,
  };
  const today = new Date(); // 오늘 날짜
  const [currentDate, setCurrentDate] = useState(today);

  const [isMonthOpen, setIsMonthOpen] = useState(false);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  // 앞에 빈칸 넣기 위한 배열
  const blanks = Array(getDay(start)).fill(null);
  const months = Array.from(
    { length: 12 },
    (_, i) => new Date(currentDate.getFullYear(), i, 1)
  );
  const handleInputPage = () => {
    setIsDetailOpen(false); // 모달 닫고
    router.push("/input"); // 페이지 이동
  };
  const handleMonthSelect = (monthDate) => {
    setCurrentDate(monthDate);
    setIsMonthOpen(false);
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMonthOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto">
        <div className="">
          {/* 상단 로고 */}
          <h1 className="text-xl font-bold text-orange-500 mb-4 p-4 pb-0">
            🌞 티끌 모아 태산
          </h1>

          {/* 예산 요약 카드 - 가로 스크롤 */}
          <div
            className="overflow-x-auto mb-6 pl-4 pr-4 scrollbar-hide"
            style={{
              msOverflowStyle: "none", // IE and Edge
            }}
          >
            <div className="flex gap-4 w-max">
              {/* 카드 공통 스타일 */}
              {[
                { label: "한 달 잔액", value: budgetInfo.monthTotal },
                { label: "하루 예산", value: budgetInfo.dailyBudget },
                { label: "한 달 예산", value: budgetInfo.dailyBudget * 30 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="min-w-[140px] bg-orange-50 border border-orange-300 rounded-xl shadow-sm p-4 text-center flex-shrink-0"
                >
                  <p className="text-sm text-gray-700">{item.label}</p>
                  <p className="text-xl font-bold text-orange-600">
                    {item.value.toLocaleString()}{" "}
                    <span className="text-sm font-medium text-gray-400">
                      원
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 월도 및 네비게이션 */}
          <div className="flex items-center justify-between relative mb-2  p-4 pt-0">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMonthOpen((prev) => !prev)}
                className="text-orange-500 font-bold text-xl flex items-center"
              >
                {format(currentDate, "yyyy년 M월")} ▼
              </button>

              {/* 월 선택 드롭다운 */}
              {isMonthOpen && (
                <div className="absolute -translate-x+1 top-full mt-2 z-10 bg-white border-1 border-gray-100 rounded-lg shadow-md p-3">
                  <div className="grid grid-cols-3 gap-2 min-w-[180px] text-center">
                    {months.map((monthDate) => {
                      const isSelectedMonth =
                        monthDate.getMonth() === currentDate.getMonth();

                      return (
                        <button
                          key={monthDate.toISOString()}
                          onClick={() => handleMonthSelect(monthDate)}
                          className={`w-full h-8 text-sm rounded-md leading-8
                          ${
                            isSelectedMonth
                              ? "border border-orange-400 text-orange-500 font-semibold"
                              : "text-gray-700 hover:text-orange-500"
                          }`}
                        >
                          {format(monthDate, "M월")}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 이전/다음 월 이동 */}
            <div className="space-x-8 text-orange-500 text-xl font-bold">
              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() - 1,
                      1
                    )
                  )
                }
              >
                &#x276E;
              </button>
              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1,
                      1
                    )
                  )
                }
              >
                &#x276F;
              </button>
            </div>
          </div>
        </div>
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 text-center text-s text-gray-400 font-light">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center text-sm">
          {blanks.map((_, idx) => (
            <div
              key={`blank-${idx}`}
              className="p-1 h-[56px] border-1 border-gray-100"
            ></div>
          ))}

          {days.map((day) => {
            const key = format(day, "yyyy-MM-dd");
            const spending = dummySpending[key] || 0;
            const isSelected =
              format(day, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd");
            const isTodayCell =
              format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");

            return (
              <div // ✨ 날짜 클릭 핸들러 (days.map 내부)
                onClick={() => {
                  setSelectedDay(key);
                  setIsAnimating(false);
                  setIsDetailOpen(true);
                  setTimeout(() => setFadeBg(true), 10); // 페이드인 유도
                }}
                key={key}
                className={`p-1 h-[56px] border-1 border-gray-100 flex flex-col justify-between items-start ${
                  isTodayCell ? "border-1 border-orange-400" : ""
                }`}
              >
                {/* 날짜 (좌상단) + 점 */}
                <div className="flex w-full justify-between items-start">
                  <span
                    className={`text-xs ${
                      isTodayCell
                        ? "bg-orange-500 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center"
                        : "text-gray-800"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                  {spending > 0 && (
                    <span className="text-[8px] text-orange-300 font-bold mt-1">
                      ●
                    </span>
                  )}
                </div>

                {/* 지출 금액 (중앙 하단) */}
                <div className="w-full text-center mt-auto mb-1">
                  <p
                    className={`text-[11px] ${
                      spending > 0
                        ? "text-orange-900 font-semibold"
                        : "invisible"
                    }`}
                  >
                    -{spending.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* // ✨ 상세 뷰 컴포넌트 (return 하단) */}
      {(isDetailOpen || isAnimating) && (
        <div>
          {/* 배경 살짝 어둡게 + 부드럽게 페이드인/아웃 */}
          <div
            className={`fixed inset-0 z-40 transition-all duration-300 ${
              fadeBg ? "opacity-100 bg-black/30" : "opacity-0 bg-black/0"
            }`}
            onClick={() => {
              setIsAnimating(true);
              setFadeBg(false);
              setTimeout(() => {
                setIsDetailOpen(false);
                setIsAnimating(false);
              }, 300);
            }}
          ></div>

          {/* 슬라이드업/다운 카드 */}
          <div
            className={`fixed bottom-0 left-0 right-0 top-[200px] bg-white rounded-t-xl z-50 shadow-lg transition-transform duration-300 ${
              isAnimating ? "animate-slide-down" : "animate-slide-up"
            } touch-pan-y`}
            onTouchStart={(e) =>
              (e.currentTarget.startY = e.touches[0].clientY)
            }
            onTouchMove={(e) => {
              const deltaY = e.touches[0].clientY - e.currentTarget.startY;
              if (deltaY > 50 && !isAnimating) {
                setIsAnimating(true);
                setFadeBg(false);
                setTimeout(() => {
                  setIsDetailOpen(false);
                  setIsAnimating(false);
                }, 300);
              }
            }}
          >
            <div className="p-4 border-b bg-orange-500 text-white flex justify-between items-center">
              <span className="text-lg font-bold">
                {parseInt(selectedDay.split("-")[2])}일
              </span>
              <span className="text-sm font-medium">
                -
                {detailData[selectedDay]
                  ?.reduce((acc, cur) => acc + cur.price, 0)
                  .toLocaleString()}
                원
              </span>
            </div>

            <table className="w-full text-sm">
              <tbody>
                {detailData[selectedDay]?.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2 w-1/4 text-center font-semibold">
                      {item.category}
                    </td>
                    <td className="p-2 text-gray-800">{item.name}</td>
                    <td className="p-2 text-right text-red-500 font-semibold">
                      {item.price.toLocaleString()}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* ➕ 입력 버튼 */}
            <div className="flex justify-end p-4">
              <button
                onClick={handleInputPage}
                className="bg-orange-500 text-white font-semibold px-4 py-2 rounded shadow"
              >
                + 입력
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
