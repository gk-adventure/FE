"use client";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/NavBar";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

export default function ReportPage() {
  // 현재 날짜 기준 전월 계산
  const now = new Date();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  const [year, setYear] = useState(prevMonth.getFullYear());
  const [month, setMonth] = useState(prevMonth.getMonth() + 1);

  // 원형 차트 데이터
  const pieChartData = [
    { name: "식비", value: 25 },
    { name: "카페", value: 11 },
    { name: "쇼핑", value: 24 },
    { name: "기타", value: 40 },
  ];

  // ✅ '기타' 제외하고 예산 데이터 계산
  const total = 100;
  const used = pieChartData
    .filter((item) => item.name !== "기타")
    .reduce((sum, item) => sum + item.value, 0);
  const remaining = total - used;
  const usageRate = Math.round((used / total) * 100);

  const budgetData = {
    total,
    used,
    remaining,
    usageRate,
  };

  const weeklySpendingData = [
    { name: "1주차", value: 320 },
    { name: "2주차", value: 280 },
    { name: "3주차", value: 340 },
    { name: "4주차", value: 260 },
  ];

  const pieColors = ["#8fd694", "#f6b94d", "#79a8f5", "#ccc"];

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear((prev) => prev - 1);
      setMonth(12);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear((prev) => prev + 1);
      setMonth(1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  return (
    <>
      <TopBar />
      <main style={styles.main}>
        <div style={styles.monthNav}>
          <button onClick={handlePrevMonth} style={styles.monthArrow}>
            &lt;
          </button>
          <h1 style={styles.monthText}>
            {year}년 {month}월
          </h1>
          <button onClick={handleNextMonth} style={styles.monthArrow}>
            &gt;
          </button>
        </div>

        <section style={styles.chartSection}>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="45%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={true}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section style={styles.budgetSection}>
          <h2 style={styles.budgetTitle}>예산 대비 지출</h2>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${budgetData.usageRate}%`,
              }}
            >
              {budgetData.usageRate}%
            </div>
          </div>
          <p>
            총 예산: -{budgetData.total.toLocaleString()}
            <span style={styles.unit}>(만원)</span>
          </p>
          <p>
            사용 금액: -{budgetData.used.toLocaleString()}
            <span style={styles.unit}>(만원)</span>
          </p>
          <p>
            남은 금액: -{budgetData.remaining.toLocaleString()}
            <span style={styles.unit}>(만원)</span>
          </p>
        </section>

        <section style={{ ...styles.reportSection, ...styles.budgetSection }}>
          <h2 style={styles.budgetTitle}>분석 리포트 요약</h2>
          <div style={styles.reportChart}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={weeklySpendingData}
                margin={{ top: 10, right: 10, bottom: 10, left: 30 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#eee"
                />
                <XAxis dataKey="name" padding={{ left: 10, right: 10 }} />
                <YAxis hide />
                <ReferenceLine y={300} stroke="#30b769" strokeWidth={1} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8B4513"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p style={styles.reportSummary}>
            지난 달 보다 <span style={styles.highlight}>30만원</span> 더
            사용했어요
          </p>
          <p style={styles.reportSubText}>
            전체 사용 금액 중 식비의 비중이 가장 높아요!
          </p>
        </section>
      </main>
      <Navbar />
    </>
  );
}

const styles = {
  main: {
    fontFamily: "sans-serif",
    padding: "2rem",
    background: "#fff",
    color: "#444",
    maxWidth: "480px",
    margin: "0 auto",
  },
  logoWrap: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  logoText: {
    fontWeight: "bold",
  },
  logoHighlight: {
    color: "#79CF71",
  },
  monthNav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },
  monthText: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#A3D275",
  },
  monthArrow: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#009688",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  budgetSection: {
    padding: "0 0 1.5rem 0",
    marginBottom: "2rem",
  },
  budgetTitle: {
    fontSize: "1.25rem",
    color: "#30b769",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  progressBar: {
    backgroundColor: "#ddd",
    borderRadius: "20px",
    height: "24px",
    marginBottom: "1rem",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#67ba7c",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  unit: {
    fontSize: "0.8rem",
    color: "#999",
  },
  chartSection: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
    position: "relative",
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "320px",
    marginBottom: "2rem",
  },
  reportSection: {
    textAlign: "left",
    marginTop: "2rem",
  },
  reportChart: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto 1rem",
    height: "200px",
  },
  reportSummary: {
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  reportSubText: {
    fontSize: "0.9rem",
    color: "#333",
  },
  highlight: {
    color: "#30b769",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "2rem",
    textAlign: "center",
    color: "#67ba7c",
    fontWeight: "bold",
  },
};
