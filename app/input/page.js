"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/NavBar";

export default function WritePage() {
  const searchParams = useSearchParams();
  const defaultDate = searchParams.get("date") || "";

  const [type, setType] = useState("지출");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    content: "",
  });

  useEffect(() => {
    if (defaultDate) {
      setForm((prev) => ({ ...prev, date: defaultDate }));
    }
  }, [defaultDate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      userId: 1,
      saveType: type === "지출" ? 0 : 1,
      category: form.category,
      amount: parseInt(form.amount),
      date: form.date,
      description: form.content,
    };

    console.log("🚀 전송할 payload:", payload);

    try {
      const res = await fetch("/api/transaction/manual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("📦 서버 응답:", res);

      if (!res.ok) {
        const errorData = await res.json();
        console.warn("서버 에러:", errorData);
        throw new Error(errorData?.error || "지출 내역 입력 실패");
      }

      const data = await res.json();

      setShowModal(true);
      setForm({ date: "", amount: "", category: "", content: "" });
    } catch (err) {
      console.error("🔥 입력 오류:", err);
      alert("데이터 입력 중 오류 발생: " + err.message);
    }
  };

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-white px-4 py-6">
        <div className="bg-[#FFF8F0] border border-orange-200 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
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

      {/* ✅ 입력 완료 모달 (밝고 흐린 배경) */}
      {showModal && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-lg p-6 w-80 text-center"
          >
            <h2 className="text-lg font-bold text-orange-600 mb-2">
              입력 완료 🎉
            </h2>
            <p className="text-gray-700 mb-4">
              거래 내역이 성공적으로 저장되었습니다.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded shadow hover:bg-orange-600 transition"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <Navbar />
    </>
  );
}
