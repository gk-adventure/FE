"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalyzePage() {
  const [budget, setBudget] = useState(null);
  const [error, setError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const userId = 1; // TODO: 실제 로그인된 사용자 ID로 교체

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await fetch(`/api/budget?userId=${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err?.message || "예산 조회 실패");
        }

        const data = await res.json();
        setBudget(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBudget();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        ❌ {error}
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#F19209]">
        예산 정보를 불러오는 중...
      </div>
    );
  }

  const { income = 0, goalAmount = 0 } = budget;
  const totalSavingTarget = goalAmount;

  const planOptions = [
    { label: "기본 플랜 (4개월)", period: 120 },
    { label: "여유 플랜 (6개월)", period: 180 },
    { label: "장기 플랜 (12개월)", period: 360 },
  ];

  const calculatedPlans = planOptions.map((plan) => ({
    ...plan,
    amount: Math.ceil(totalSavingTarget / plan.period),
  }));

  return (
    <main className="max-w-md mx-auto p-6 bg-white min-h-screen text-[#333]">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#F19209]">
        예산 분석 결과
      </h1>

      <div className="space-y-4">
        <section className="bg-[#FFF8F0] p-4 rounded-xl shadow border border-orange-200">
          <h2 className="text-base font-semibold mb-1">월 수입</h2>
          <p className="text-sm  ext-[#444]">{income.toLocaleString()}원</p>
        </section>

        <section className="bg-[#FFF8F0] p-4 rounded-xl shadow border border-orange-200">
          <h2 className="text-base font-semibold mb-1">저축 목표</h2>
          <p className="text-sm text-[#555]">
            총 {goalAmount.toLocaleString()}원 / 마감일: {budget.goalPeriod}
          </p>
        </section>

        <section className="bg-[#FFF8F0] p-4 rounded-xl shadow border border-orange-200">
          <h2 className="text-base font-semibold mb-1">고정 지출</h2>
          {budget.fixedCosts && budget.fixedCosts.length > 0 ? (
            <ul className="text-sm list-disc ml-5 text-[#555]">
              {budget.fixedCosts.map((cost, i) => (
                <li key={i}>
                  {cost.name}: {cost.amount?.toLocaleString()}원
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#888]">고정 지출 항목이 없습니다.</p>
          )}
        </section>
      </div>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 mt-5">
          💡 추천 티끌 저축 플랜
        </h2>
        <div className="space-y-4">
          {calculatedPlans.map((plan, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`w-full px-4 py-3 rounded-xl text-left border ${
                selectedIndex === i
                  ? "border-[#F19209] bg-[#FFF3E0] font-bold"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex justify-between">
                <span>{plan.label}</span>
                <span>매일 {plan.amount.toLocaleString()}원</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={() => router.push("/calendar")}
        className="w-full py-3 rounded-full bg-[#F19209] text-white font-bold text-lg"
      >
        다음
      </button>

      <div className="mt-8 text-center text-sm text-gray-500">
        시작일: {budget.startDate}
      </div>
    </main>
  );
}
