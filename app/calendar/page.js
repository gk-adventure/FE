// app/calendar/page.js
"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isToday,
  getDay,
} from "date-fns";

export default function CalendarPage() {
  const budgetInfo = {
    monthTotal: 603000,
    dailyBudget: 23000,
  };

  const dummySpending = {
    "2024-06-01": 10000,
    "2024-06-02": 24000,
    "2024-06-03": 40000,
    "2024-06-04": 30000,
    "2024-06-05": 9000,
    "2024-06-06": 10000,
    "2024-06-07": 9000,
    "2024-06-08": 5000,
    "2024-06-10": 15000,
  };

  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 10)); // 6월은 5 (0-indexed)
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  // 앞에 빈칸 넣기 위한 배열
  const blanks = Array(getDay(start)).fill(null);

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* 상단 로고 */}
      <h1 className="text-xl font-bold text-orange-500 mb-4">
        🌞 티끌 모아 태산
      </h1>

      {/* 예산 요약 카드 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-orange-50 border border-orange-300 rounded-xl shadow-sm p-4 text-center">
          <p className="text-sm text-gray-700">한 달 잔액</p>
          <p className="text-xl font-bold text-orange-600">
            {budgetInfo.monthTotal.toLocaleString()}{" "}
            <span className="text-sm font-medium text-gray-400">원</span>
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-300 rounded-xl shadow-sm p-4 text-center">
          <p className="text-sm text-gray-700">하루 예산</p>
          <p className="text-xl font-bold text-orange-600">
            {budgetInfo.dailyBudget.toLocaleString()}{" "}
            <span className="text-sm font-medium text-gray-400">원</span>
          </p>
        </div>
      </div>

      {/* 월도 및 네비게이션 */}
      <div className="flex items-center justify-between mb-2">
        <button
          className="text-orange-400"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
        >
          ◀
        </button>
        <h2 className="font-semibold text-lg text-orange-500">
          {format(currentDate, "yyyy년 M월")}
        </h2>
        <button
          className="text-orange-400"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
        >
          ▶
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 text-center text-sm">
        {blanks.map((_, idx) => (
          <div key={`blank-${idx}`} className="p-2 h-[64px]"></div>
        ))}

        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const spending = dummySpending[key] || 0;
          const today = isToday(day);
          return (
            <div
              key={key}
              className="p-2 h-[64px] flex flex-col items-center justify-start"
            >
              <div
                className={`w-8 h-8 mb-1 rounded-full flex items-center justify-center text-xs ${
                  today ? "bg-orange-500 text-white font-bold" : "text-gray-800"
                }`}
              >
                {format(day, "d")}
              </div>
              <p
                className={`text-[10px] ${
                  spending > 0 ? "text-red-500" : "invisible"
                }`}
              >
                -{spending.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
