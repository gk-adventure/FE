"use client";

import { useState } from "react";

export default function WritePage() {
  const [type, setType] = useState("지출");
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("입력 완료!");
    // 여기에 실제 저장 로직을 추가할 수 있습니다.
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* 상단 로고 */}
      <h1 className="text-xl font-bold text-orange-500 mb-6">
        🌞 티끌 모아 태산
      </h1>

      {/* 카드 */}
      <div className="bg-[#FFF8F0] border border-orange-200 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          {/* 수입/지출 탭 */}
          <div className="flex bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <button
              className={`px-4 py-1.5 text-sm font-semibold transition ${
                type === "수입" ? "bg-orange-300 text-white" : "text-gray-600"
              }`}
              onClick={() => setType("수입")}
            >
              수입
            </button>
            <button
              className={`px-4 py-1.5 text-sm font-semibold transition ${
                type === "지출" ? "bg-red-500 text-white" : "text-gray-600"
              }`}
              onClick={() => setType("지출")}
            >
              지출
            </button>
          </div>

          <h2 className="text-lg font-bold text-gray-800">금액 입력</h2>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              날짜
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full bg-white border border-orange-200 rounded-md px-4 py-2 outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              금액
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="금액 입력"
              className="w-full bg-white border border-orange-200 rounded-md px-4 py-2 outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              분류
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-white border border-orange-200 rounded-md px-4 py-2 outline-none shadow-sm"
            >
              <option value="">선택</option>
              <option value="식비">식비</option>
              <option value="쇼핑">쇼핑</option>
              <option value="교통">교통</option>
              <option value="문화">문화</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              내용
            </label>
            <input
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="내용 입력"
              className="w-full bg-white border border-orange-200 rounded-md px-4 py-2 outline-none shadow-sm"
            />
          </div>
        </div>

        {/* 입력 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-white text-orange-500 font-bold px-6 py-2 border border-orange-300 rounded-xl shadow hover:bg-orange-50 transition"
          >
            입력 ↵
          </button>
        </div>
      </div>
    </div>
  );
}
