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
  const [loading, setLoading] = useState(false);
  const userId = 1;

  function highlightKeywords(text, keywords) {
    if (!text) return "";
    const escapedKeywords = keywords.map((kw) =>
      kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const pattern = new RegExp(`(${escapedKeywords.join("|")})`, "gi");
    return text.replace(pattern, (match) => {
      return `<span style="color:#f19209; font-weight:bold;">${match}</span>`;
    });
  }

  const fetchReport = async () => {
    try {
      setLoading(true);
      const currentMonth = month.toString().padStart(2, "0");
      const queryMonth = `${year}-${currentMonth}`;
      const url = `/api/reports/${userId}/${queryMonth}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `리포트 생성 또는 조회 실패: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const result = await response.json();
      setReport({ summary: result });
    } catch (error) {
      console.error("리포트 조회 실패:", error);
      alert(
        "리포트 데이터를 불러오는 데 문제가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setLoading(false);
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

  // ✅ 안전한 데이터 매핑 및 필터링
  const weeklySpendingData = report?.summary?.weeklySpendingRate
    ? report.summary.weeklySpendingRate
        .map((rate, i) => ({
          name: `${i + 1}주차`,
          value: typeof rate === "number" ? rate : 0,
        }))
        .filter((item) => !isNaN(item.value))
    : [];

  const categoryKeywords = report
    ? Object.keys(report.summary.categoryBreakdown)
    : [];

  return (
    <>
      <TopBar />
      {loading ? (
        <main
          style={{
            ...styles.main,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh", // 전체 화면 높이
          }}
        >
          <span className="loader"></span>
          <p style={{ marginTop: "1rem", color: "#f19209" }}>
            로딩 중입니다...
          </p>
          <style jsx>{`
            .loader {
              width: 48px;
              height: 48px;
              border: 5px solid #fff;
              border-bottom-color: #ff3d00;
              border-radius: 50%;
              display: inline-block;
              box-sizing: border-box;
              animation: rotation 1s linear infinite;
            }

            @keyframes rotation {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </main>
      ) : (
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
              총 예산: {budgetData.total.toLocaleString()}
              <span style={styles.unit}>(원)</span>
            </p>
            <p>
              사용 금액: {budgetData.used.toLocaleString()}
              <span style={styles.unit}>(원)</span>
            </p>
            <p>
              남은 금액: {budgetData.remaining.toLocaleString()}
              <span style={styles.unit}>(원)</span>
            </p>
          </section>

          <div style={styles.divider}></div>

          {report && (
            <section style={styles.reportSection}>
              <h2 style={styles.budgetTitle}>분석 리포트 요약</h2>
              <div style={styles.reportChart}>
                {weeklySpendingData.length > 0 && (
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
                      <Bar dataKey="value" fill="#F19209" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              <p
                style={styles.reportSummary}
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(
                    report.summary.patternAnalysis,
                    categoryKeywords
                  ),
                }}
              ></p>
              <p
                style={styles.reportSubText}
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(
                    report.summary.feedback,
                    categoryKeywords
                  ),
                }}
              ></p>
            </section>
          )}
        </main>
      )}
      <Navbar />
    </>
  );
}

const styles = {
  main: {
    fontFamily: "sans-serif",
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
  },
  monthText: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#F19209",
  },
  monthArrow: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#F19209",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  budgetSection: {
    padding: "1.5rem 2rem",
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
    backgroundColor: "#F19209",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "320px",
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
    lineHeight: "1.6",
    color: "#333",
  },
  reportSubText: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.6",
    backgroundColor: "#f9f9f9",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    marginTop: "0.5rem",
    whiteSpace: "pre-wrap",
  },
  divider: {
    width: "100vw",
    height: "1px",
    backgroundColor: "#ccc",
  },
};
