"use client";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/NavBar";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

export default function ReportPage() {
  const now = new Date();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  const [year, setYear] = useState(prevMonth.getFullYear());
  const [month, setMonth] = useState(prevMonth.getMonth() + 1);
  const [report, setReport] = useState(null);
  const userId = 1; // 실제 사용자 ID로 교체 필요
  // const API_BASE_URL = "https://4264-134-75-39-23.ngrok-free.app";

  const fetchReport = async () => {
    try {
      const currentYear = year; // 'year' 변수가 어디서 오는지 확인해주세요 (예: useState 또는 props)
      const currentMonth = month.toString().padStart(2, "0"); // 'month' 변수가 어디서 오는지 확인해주세요
      // 월이 한 자리 숫자일 경우 앞에 '0'을 붙여줍니다 (예: 6 -> 06)

      const queryMonth = `${currentYear}-${currentMonth}`; // '2025-06' 형식으로 만듭니다.

      // userId와 budget 값도 실제 변수에서 가져오도록 수정했습니다.
      // 예시를 위해 userId는 1, budget은 400000으로 고정했습니다.
      const userId = 1;
      const budgetAmount = 500000;

      // GET 요청 URL을 동적으로 생성합니다.
      const response = await fetch(
        `/api/reports/${userId}/${queryMonth}?budget=${budgetAmount}`,
        {
          method: "POST", // GET 요청임을 명시
          headers: {
            "Content-Type": "application/json", // 서버에 JSON을 보낼 때 사용 (GET에서는 필수는 아님)
            Accept: "application/json", // 서버로부터 JSON 응답을 받길 원함
          },
        }
      );

      if (!response.ok) {
        // HTTP 상태 코드가 200번대가 아닐 경우 에러 처리
        const errorText = await response.text(); // 에러 메시지를 텍스트로 가져와 로깅할 수 있습니다.
        throw new Error(
          `리포트 생성 또는 조회 실패: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const result = await response.json(); // 응답 본문을 JSON으로 파싱
      setReport({ summary: result }); // 리포트 상태 업데이트
      console.log("리포트 조회 성공:", result);
    } catch (error) {
      // 네트워크 오류 또는 파싱 오류 등 모든 예외를 여기서 처리
      console.error("리포트 조회 실패:", error);
      alert(
        "리포트 데이터를 불러오는 데 문제가 발생했습니다. 다시 시도해주세요."
      ); // 사용자에게 알림
    }
  };

  useEffect(() => {
    fetchReport();
  }, [year, month]);

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

  const pieColors = [
    "#8fd694",
    "#f6b94d",
    "#79a8f5",
    "#ccc",
    "#b4b4b4",
    "#f59f9f",
  ];

  const pieChartData = report
    ? Object.entries(report.summary.categoryBreakdown).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const budgetData = report
    ? {
        total: report.summary.monthBudget ?? 0,
        used: report.summary.totalSpending ?? 0,
        remaining:
          (report.summary.monthBudget ?? 0) -
          (report.summary.totalSpending ?? 0),
        usageRate: report.summary.budgetUsageRate ?? 0,
      }
    : { total: 0, used: 0, remaining: 0, usageRate: 0 };

  const weeklySpendingData = report?.summary?.weeklySpendingRate
    ? report.summary.weeklySpendingRate.map((rate, i) => ({
        name: `${i + 1}주차`,
        value: rate,
      }))
    : [];

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
                  outerRadius={90}
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

        <div style={styles.divider}></div>

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
            <span style={styles.unit}>(원)</span>
          </p>
          <p>
            사용 금액: -{budgetData.used.toLocaleString()}
            <span style={styles.unit}>(원)</span>
          </p>
          <p>
            남은 금액: -{budgetData.remaining.toLocaleString()}
            <span style={styles.unit}>(원)</span>
          </p>
        </section>

        <div style={styles.divider}></div>

        {report && (
          <section style={styles.reportSection}>
            <h2 style={styles.budgetTitle}>분석 리포트 요약</h2>
            <div style={styles.reportChart}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={weeklySpendingData}
                  margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
                  barSize={20}
                  barCategoryGap="20%"
                >
                  <CartesianGrid
                    stroke="#ccc"
                    strokeDasharray="3 3"
                    vertical
                    horizontal
                  />
                  <XAxis dataKey="name" interval={0} />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <ReferenceLine y={25} stroke="#f19209" strokeWidth={1} />
                  <Bar dataKey="value" fill="#F5B56B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={styles.reportSummary}>{report.summary.patternAnalysis}</p>
            <p style={styles.reportSubText}>{report.summary.feedback}</p>
          </section>
        )}
      </main>
      <Navbar />
    </>
  );
}

const styles = {
  main: {
    fontFamily: "sans-serif",
    // padding: "2rem",
    background: "#fff",
    color: "#444",
    maxWidth: "480px",
    margin: "0 auto",
  },
  monthNav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "2rem",
    color: "#F5B56B",
  },
  monthText: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#F5B56B",
  },
  monthArrow: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#F5B56B",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  budgetSection: {
    padding: "1.5rem 2rem",
    // marginBottom: "2rem",
  },
  budgetTitle: {
    fontSize: "1.25rem",
    color: "#f19209",
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
    backgroundColor: "#F5B56B",
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
    // paddingBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "320px",
    // marginBottom: "2rem",
  },
  reportSection: {
    textAlign: "left",
    marginTop: "2rem",
    padding: "0rem 2rem",
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
    marginBottom: "0.8rem",
  },
  reportSubText: {
    fontSize: "0.95rem",
    color: "#444",
  },
  divider: {
    width: "100vw",
    height: "1px",
    backgroundColor: "#ccc",
    // margin: "2rem calc(-50vw + 50%)",
  },
};
