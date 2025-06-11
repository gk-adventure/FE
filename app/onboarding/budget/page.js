"use client";

import { useState } from "react";

export default function BudgetPage() {
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState([{ item: "", amount: "" }]);
  const [goalAmount, setGoalAmount] = useState("");
  const [goalPeriod, setGoalPeriod] = useState("");

  const userId = 1;

  const handleAddExpense = () => {
    setExpenses([...expenses, { item: "", amount: "" }]);
  };

  const handleRemoveExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const updateExpense = (index, key, value) => {
    const updated = [...expenses];
    updated[index][key] = value;
    setExpenses(updated);
  };

  const handleSubmitBudget = async () => {
    const startDate = new Date();
    const startDateStr = startDate.toISOString().split("T")[0];

    const fixedCosts = expenses
      .filter((e) => e.item && e.amount)
      .map((e) => ({ name: e.item, amount: Number(e.amount) }));

    const payload = {
      userId,
      startDate: startDateStr,
      income: Number(income),
      goalAmount: Number(goalAmount),
      goalPeriod,
      fixedCosts,
    };

    try {
      const res = await fetch(`/api/budget/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("❌ 오류:", error);
        throw new Error(error?.message || "예산 등록 실패");
      }

      // ✅ 등록 성공 시 페이지 이동
      router.push("/onboarding/analyze");
    } catch (error) {
      alert("❌ 예산 등록 중 오류 발생");
      console.error(error);
    }
  };

  return (
    <main style={styles.container}>
      {step === 1 && (
        <>
          <div style={styles.dot1}></div>
          <div style={styles.dot2}></div>
          <div style={styles.character}>🌱</div>
          <p style={styles.welcomeText}>
            매일 즐거운 저축,
            <br />
            <span style={styles.highlight}>돈굴이</span>에 오신 것을 환영합니다!
          </p>
          <p style={styles.subText}>티끌 모으기 계획부터 세워볼까요?</p>
          <button style={styles.button} onClick={() => setStep(2)}>
            계획 시작 &gt;
          </button>
        </>
      )}

      {step === 2 && (
        <div style={styles.planWrap}>
          <div style={styles.progress}>● ● ● ● ●</div>
          <h2 style={styles.planTitle}>한 달 예산 파악</h2>

          <div style={styles.qaBlock}>
            <div style={styles.q}>Q. 한 달 수입은 얼마인가요?</div>
            <div style={styles.a}>
              A:
              <input
                type="number"
                placeholder="예: 3000000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                style={styles.incomeInput}
              />
              원
            </div>
          </div>

          <div style={styles.qaBlock}>
            <div style={styles.q}>Q. 고정 지출을 입력해주세요.</div>
            <div className="a">A.</div>
            {expenses.map((exp, i) => (
              <div key={i} style={styles.expenseRow}>
                <input
                  type="text"
                  placeholder="예: 월세"
                  value={exp.item}
                  onChange={(e) => updateExpense(i, "item", e.target.value)}
                  style={styles.expenseInput}
                />
                <input
                  type="number"
                  placeholder="금액"
                  value={exp.amount}
                  onChange={(e) => updateExpense(i, "amount", e.target.value)}
                  style={styles.expenseInput}
                />
                <button
                  onClick={() => handleRemoveExpense(i)}
                  style={styles.removeBtn}
                >
                  ❌
                </button>
              </div>
            ))}
            <div style={styles.addItem} onClick={handleAddExpense}>
              + 항목 추가
            </div>
          </div>

          <div style={styles.bottomNav}>
            <button style={styles.prevBtn} onClick={() => setStep(1)}>
              ← 이전
            </button>
            <button
              style={{ ...styles.nextBtn, backgroundColor: primary }}
              onClick={() => setStep(3)}
            >
              다음 &gt;
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={styles.planWrap}>
          <div style={styles.progress}>● ● ● ● ●</div>
          <h2 style={styles.planTitle}>저축 목표 설정</h2>

          <div style={styles.qaBlock}>
            <div style={styles.q}>Q. 목표 금액은 얼마인가요?</div>
            <div style={styles.a}>
              A:
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                style={styles.goalInput}
              />
              원
            </div>
          </div>

          <div style={styles.qaBlock}>
            <div style={styles.q}>Q. 언제까지 모으고 싶으신가요?</div>
            <div style={styles.a}>
              A:
              <input
                type="date"
                value={goalPeriod}
                onChange={(e) => setGoalPeriod(e.target.value)}
                style={styles.goalInput}
              />
              까지!
            </div>
          </div>

          <div style={styles.bottomNav}>
            <button style={styles.prevBtn} onClick={() => setStep(2)}>
              ← 이전
            </button>
            <button
              style={{ ...styles.nextBtn, backgroundColor: primary }}
              onClick={handleSubmitBudget}
            >
              분석하기 &gt;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// 스타일 정의 (생략 가능)
const primary = "#F19209";
const secondary = "#ff6900";

const styles = {
  container: {
    padding: "2rem 1rem",
    fontFamily: "sans-serif",
    color: "#333",
    backgroundColor: "#fff",
    minHeight: "100vh",
    maxWidth: "480px",
    margin: "0 auto",
  },
  character: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  welcomeText: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    marginBottom: "1.2rem",
  },
  highlight: { color: secondary, fontWeight: "bold" },
  subText: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  button: {
    backgroundColor: primary,
    color: "#fff",
    border: "none",
    padding: "0.9rem 1.4rem",
    fontSize: "1rem",
    borderRadius: "1.5rem",
    cursor: "pointer",
  },
  dot1: {
    position: "absolute",
    top: "30%",
    left: "10%",
    width: "10px",
    height: "10px",
    backgroundColor: "#fef3e0",
    borderRadius: "50%",
  },
  dot2: {
    position: "absolute",
    top: "60%",
    left: "15%",
    width: "24px",
    height: "24px",
    backgroundColor: "#fef3e0",
    borderRadius: "50%",
  },
  planWrap: { marginTop: "2rem" },
  progress: {
    textAlign: "center",
    marginBottom: "1rem",
    color: secondary,
  },
  planTitle: {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  qaBlock: { marginBottom: "2rem" },
  q: { color: secondary, fontWeight: "bold", marginBottom: "0.5rem" },
  a: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
    fontWeight: "bold",
    marginBottom: "0.8rem",
  },
  incomeInput: {
    border: "none",
    borderBottom: `2px solid ${primary}`,
    padding: "0.4rem",
    width: "60%",
    fontSize: "1rem",
    outline: "none",
  },
  goalInput: {
    border: "none",
    borderBottom: `2px solid ${primary}`,
    padding: "0.6rem",
    fontSize: "1.1rem",
    outline: "none",
    flex: 1,
  },
  expenseRow: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  expenseInput: {
    flex: "1",
    border: "1px solid #ccc",
    padding: "0.6rem 0.8rem",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "#e74c3c",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  addItem: {
    color: primary,
    fontSize: "0.9rem",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  bottomNav: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
    gap: "1rem",
  },
  prevBtn: {
    background: "none",
    border: "none",
    color: secondary,
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
  nextBtn: {
    backgroundColor: "#ccc",
    color: "#fff",
    border: "none",
    padding: "0.8rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "1.5rem",
    cursor: "pointer",
  },
};
