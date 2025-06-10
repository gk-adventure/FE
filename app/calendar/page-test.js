"use client";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/NavBar";
import { useState, useEffect, useRef } from "react";
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
  const [selectedDay, setSelectedDay] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeBg, setFadeBg] = useState(false);
  const [budgetInfo, setBudgetInfo] = useState({
    monthlyBudget: 0,
    dailyBudget: 0,
    totalSpent: 0,
  });
  const [calendarData, setCalendarData] = useState({});
  const router = useRouter();

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  const blanks = Array(getDay(start)).fill(null);
  const months = Array.from(
    { length: 12 },
    (_, i) => new Date(currentDate.getFullYear(), i, 1)
  );
  const dropdownRef = useRef(null);

  const userId = 1;

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch(
          `/api/home/overview?userId=${userId}&month=${format(
            currentDate,
            "yyyy-MM"
          )}`
        );
        if (!res.ok) throw new Error("예산 데이터를 불러오지 못했습니다.");
        const data = await res.json();
        setBudgetInfo({
          monthlyBudget: data.monthlyBudget,
          dailyBudget: data.dailyBudget,
          totalSpent: data.totalSpent,
        });
        const mapped = {};
        data.calendar.forEach((entry) => {
          mapped[entry.date] = entry.netChange;
        });
        setCalendarData(mapped);
      } catch (err) {
        console.error(err);
        alert("데이터 로딩 오류: " + err.message);
      }
    };
    fetchOverview();
  }, [currentDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMonthOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputPage = () => {
    setIsDetailOpen(false);
    router.push("/input");
  };

  const handleMonthSelect = (monthDate) => {
    setCurrentDate(monthDate);
    setIsMonthOpen(false);
  };

  const handleDayClick = async (key) => {
    try {
      const res = await fetch(`/api/home/detail?userId=${userId}&date=${key}`);
      if (!res.ok) throw new Error("거래 내역을 불러오지 못했습니다.");
      const data = await res.json();
      setSelectedDay(key);
      setTransactions(data.transactions);
      setIsAnimating(false);
      setIsDetailOpen(true);
      setTimeout(() => setFadeBg(true), 10);
    } catch (err) {
      console.error(err);
      alert("해당 날짜의 데이터를 불러올 수 없습니다: " + err.message);
    }
  };

  return (
    <>
      <TopBar />
      <div className="max-w-md mx-auto">
        <div className="overflow-x-auto mb-6 pl-4 pr-4 scrollbar-hide">
          <div className="flex gap-4 w-max">
            {[
              { label: "한 달 예산", value: budgetInfo.monthlyBudget },
              { label: "하루 예산", value: budgetInfo.dailyBudget },
              { label: "총 지출", value: budgetInfo.totalSpent },
            ].map((item) => (
              <div
                key={item.label}
                className="min-w-[140px] bg-orange-50 border border-orange-300 rounded-xl shadow-sm p-4 text-center flex-shrink-0"
              >
                <p className="text-sm text-gray-700">{item.label}</p>
                <p className="text-xl font-bold text-orange-600">
                  {item.value.toLocaleString()}{" "}
                  <span className="text-sm text-gray-400">원</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between relative mb-2 p-4 pt-0">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsMonthOpen((prev) => !prev)}
              className="text-orange-500 font-bold text-xl flex items-center"
            >
              {format(currentDate, "yyyy년 M월")} ▼
            </button>
            {isMonthOpen && (
              <div className="absolute top-full left-0 mt-2 z-10 bg-white border border-gray-100 rounded-lg shadow-md p-3">
                <div className="grid grid-cols-3 gap-2 min-w-[180px] text-center">
                  {months.map((monthDate) => {
                    const isSelectedMonth =
                      monthDate.getMonth() === currentDate.getMonth();
                    return (
                      <button
                        key={monthDate.toISOString()}
                        onClick={() => handleMonthSelect(monthDate)}
                        className={`w-full h-8 text-sm rounded-md leading-8 ${
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

        <div className="grid grid-cols-7 text-center text-s text-gray-400 font-light">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center text-sm">
          {blanks.map((_, idx) => (
            <div
              key={`blank-${idx}`}
              className="p-1 h-[56px] border border-gray-100"
            ></div>
          ))}

          {days.map((day) => {
            const key = format(day, "yyyy-MM-dd");
            const spending = calendarData[key] || 0;
            const isTodayCell =
              format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
            return (
              <div
                key={key}
                onClick={() => handleDayClick(key)}
                className={`p-1 h-[56px] border border-gray-100 flex flex-col justify-between items-start ${
                  isTodayCell ? "border-orange-400" : ""
                }`}
              >
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
                  {spending !== 0 && (
                    <span className="text-[8px] text-orange-300 font-bold mt-1">
                      ●
                    </span>
                  )}
                </div>
                <div className="w-full text-center mt-auto mb-1">
                  <p
                    className={`text-[11px] ${
                      spending ? "text-orange-900 font-semibold" : "invisible"
                    }`}
                  >
                    {spending > 0 ? "+" : ""}
                    {spending.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {(isDetailOpen || isAnimating) && (
        <div>
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

          <div
            className={`fixed bottom-0 left-0 right-0 top-[200px] bg-white rounded-t-xl z-50 shadow-lg transition-transform duration-300 ${
              isAnimating ? "animate-slide-down" : "animate-slide-up"
            } touch-pan-y`}
          >
            <div className="p-4 border-b bg-orange-500 text-white flex justify-between items-center">
              <span className="text-lg font-bold">
                {selectedDay?.split("-")[2]}일
              </span>
              <span className="text-sm font-medium">
                {transactions
                  .reduce(
                    (acc, cur) =>
                      acc + cur.amount * (cur.type === "EXPENSE" ? -1 : 1),
                    0
                  )
                  .toLocaleString()}
                원
              </span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {transactions.map((item, idx) => (
                  <tr key={item.id || idx} className="border-b">
                    <td className="p-2 w-1/4 text-center font-semibold">
                      {item.category}
                    </td>
                    <td className="p-2 text-gray-800">{item.description}</td>
                    <td
                      className={`p-2 text-right font-semibold ${
                        item.type === "EXPENSE"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {(item.type === "EXPENSE"
                        ? -item.amount
                        : item.amount
                      ).toLocaleString()}
                      원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      <Navbar />
    </>
  );
}
