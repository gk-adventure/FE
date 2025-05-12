"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TiggleCalculatorPage() {
  const router = useRouter();
  const userMonth = 4;
  const userDays = userMonth * 30;
  const userDailyAmount = 8500;

  const otherPlans = [
    { label: "6개월 180일", amount: 5600 },
    { label: "12개월 360일", amount: 3000 },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "white",
        fontFamily: "'Noto Sans KR', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* 상단 점 + 제목 + 닫기 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 6,
              backgroundColor: "#FFF5E7",
              padding: "4px 10px",
              borderRadius: "999px",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: i === 3 ? "#FF9900" : "#FFEFD2",
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: "15px",
              color: "#444",
              marginTop: "4px",
            }}
          >
            하루 티끌 금액 계산
          </div>
        </div>
      </div>

      {/* 하루 예산 안내 */}
      <div style={{ fontSize: "13px", color: "#444", marginBottom: "4px" }}>
        하루 예산{" "}
        <span style={{ color: "#FF9900", fontWeight: "bold" }}>23,000원</span>
      </div>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        매일 모을 티끌 금액을 계산해주세요!
      </p>

      {/* 첫 번째 추천 제목 */}
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#000",
          alignSelf: "flex-start",
          marginBottom: "8px",
        }}
      >
        입력한 값에 대한 추천 값
      </div>

      {/* 첫 번째 plan */}
      <button
        onClick={() => setSelectedIndex(0)}
        style={{
          width: "100%",
          border: selectedIndex === 0 ? "2px solid #FF9900" : "1px solid #eee",
          backgroundColor: selectedIndex === 0 ? "#FFF3E0" : "#FAFAFA",
          borderRadius: "12px",
          padding: "14px 18px",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#444",
          fontSize: "14px",
          fontWeight: selectedIndex === 0 ? "bold" : "normal",
          marginBottom: "40px",
          cursor: "pointer",
        }}
      >
        <span>
          {userMonth}개월 {userDays}일
        </span>
        <span>매일 {userDailyAmount.toLocaleString()}원</span>
      </button>

      {/* 두 번째 추천 제목 */}
      <div
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: "#FF9900",
          alignSelf: "flex-start",
          marginBottom: "8px",
        }}
      >
        좀 더 여유롭게 돈을 모아볼래!
      </div>

      {/* 두 번째 plan */}
      <button
        onClick={() => setSelectedIndex(1)}
        style={{
          width: "100%",
          border: selectedIndex === 1 ? "2px solid #FF9900" : "1px solid #eee",
          backgroundColor: selectedIndex === 1 ? "#FFF3E0" : "#FAFAFA",
          borderRadius: "12px",
          padding: "12px 16px",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#444",
          fontSize: "14px",
          fontWeight: selectedIndex === 1 ? "bold" : "normal",
          marginBottom: "24px",
          cursor: "pointer",
        }}
      >
        <span>{otherPlans[0].label}</span>
        <span>매일 {otherPlans[0].amount.toLocaleString()}원</span>
      </button>

      {/* 세 번째 추천 제목 */}
      <div
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: "#FF9900",
          alignSelf: "flex-start",
          marginBottom: "8px",
        }}
      >
        좀 더 열심히 돈을 모아볼래!
      </div>

      {/* 세 번째 plan */}
      <button
        onClick={() => setSelectedIndex(2)}
        style={{
          width: "100%",
          border: selectedIndex === 2 ? "2px solid #FF9900" : "1px solid #eee",
          backgroundColor: selectedIndex === 2 ? "#FFF3E0" : "#FAFAFA",
          borderRadius: "12px",
          padding: "12px 16px",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#444",
          fontSize: "14px",
          fontWeight: selectedIndex === 2 ? "bold" : "normal",
          marginBottom: "32px",
          cursor: "pointer",
        }}
      >
        <span>{otherPlans[1].label}</span>
        <span>매일 {otherPlans[1].amount.toLocaleString()}원</span>
      </button>

      {/* 하단 링크 */}
      <div
        style={{
          fontSize: "12px",
          color: "#999",
          marginBottom: "8px",
        }}
      >
        다른 목표금액을 설정하고 싶으시동글~?
      </div>
      <button
        onClick={() => router.push("/onboarding/budget")}
        style={{
          background: "none",
          border: "none",
          fontSize: "13px",
          color: "#FF9900",
          fontWeight: "bold",
          marginBottom: "28px",
          cursor: "pointer",
        }}
      >
        티끌 금액 다시 계산하기
      </button>

      {/* 하단 버튼 - 단독 '다음' */}
      <button
        onClick={() => router.push("/calendar")}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "999px",
          border: "none",
          backgroundColor: "#FF9900",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        다음
      </button>
    </div>
  );
}
