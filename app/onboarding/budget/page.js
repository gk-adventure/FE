"use client";
import { useRouter } from "next/navigation"; // ⬅️ 추가
import { useState } from "react";

export default function WelcomePage() {
  const router = useRouter(); // ⬅️ 추가
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState([{ item: "", amount: "" }]);
  const [goalAmount, setGoalAmount] = useState("");
  const [goalPeriod, setGoalPeriod] = useState("");
  // 분석하기 클릭 시 이동
  const handleAnalyze = () => {
    router.push("/onboarding/budget/loading");
  };

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
            <div style={styles.q}>Q. 한 달(30일) 수입이 얼마신가요?</div>
            <div style={styles.a}>
              A.{" "}
              <input
                type="number"
                min="1"
                placeholder="1원부터 입력 가능"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                style={styles.incomeInput}
              />{" "}
              원 이에요.
            </div>
          </div>

          <div style={styles.qaBlock}>
            <div style={styles.q}>Q. 고정 지출을 입력해주세요.</div>
            <div style={styles.a}>A.</div>
            <div style={styles.expenseList}>
              {expenses.map((exp, i) => (
                <div key={i} style={styles.expenseRow}>
                  <input
                    type="text"
                    placeholder="항목명 (예: 넷플릭스)"
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
                    style={styles.removeBtn}
                    onClick={() => handleRemoveExpense(i)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
            <div style={styles.addItem} onClick={handleAddExpense}>
              + 항목 추가
            </div>

            <div style={styles.bottomNav}>
              <button style={styles.prevBtn} onClick={() => setStep(1)}>
                ← 이전
              </button>
              <button style={styles.nextBtn} onClick={() => setStep(3)}>
                다음 &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={styles.planWrap}>
          <div style={styles.progress}>● ● ● ● ●</div>
          <h2 style={styles.planTitle}>저축 목표 금액</h2>

          <div style={styles.qaBlock}>
            <div style={styles.q}>
              Q. <strong>저축 목표 금액이 얼마인가요?</strong>
            </div>
            <div style={styles.a}>
              A.
              <input
                type="number"
                placeholder="1원부터 입력 가능"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                style={styles.goalInput}
              />
              원 이에요!
            </div>
          </div>

          <div style={styles.qaBlock}>
            <div style={styles.q}>
              Q. <strong>저축 목표 기간이 얼마인가요?</strong>
            </div>
            <div style={styles.a}>
              A.
              <input
                type="number"
                placeholder="1개월 부터 입력 가능"
                value={goalPeriod}
                onChange={(e) => setGoalPeriod(e.target.value)}
                style={styles.goalInput}
              />
              개월 이에요!
            </div>
          </div>

          <div style={styles.bottomNav}>
            <button style={styles.prevBtn} onClick={() => setStep(2)}>
              ← 이전
            </button>
            <button style={styles.nextBtn} onClick={handleAnalyze}>
              다음 &gt;
              <br />
              <small>분석하기</small>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const green = "#30b769";
const styles = {
  container: {
    boxSizing: "border-box",
    padding: "2rem 1rem",
    fontFamily: "sans-serif",
    color: "#333",
    backgroundColor: "#fff",
    minHeight: "100vh",
    maxWidth: "480px",
    width: "100%",
    margin: "0 auto",
  },
  character: {
    fontSize: "3rem",
    alignSelf: "flex-end",
    marginBottom: "1rem",
  },
  welcomeText: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    marginBottom: "1.2rem",
  },
  highlight: {
    color: green,
    fontWeight: "bold",
  },
  subText: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  button: {
    backgroundColor: green,
    color: "#fff",
    border: "none",
    padding: "0.9rem 1.4rem",
    fontSize: "1rem",
    borderRadius: "1.5rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    cursor: "pointer",
    minWidth: "160px",
    textAlign: "center",
  },
  dot1: {
    position: "absolute",
    top: "30%",
    left: "10%",
    width: "10px",
    height: "10px",
    backgroundColor: "#e1f3e5",
    borderRadius: "50%",
  },
  dot2: {
    position: "absolute",
    top: "60%",
    left: "15%",
    width: "24px",
    height: "24px",
    backgroundColor: "#e1f3e5",
    borderRadius: "50%",
  },
  planWrap: { marginTop: "2rem" },
  progress: {
    textAlign: "center",
    marginBottom: "1rem",
    color: green,
    fontSize: "0.8rem",
    width: "100%",
  },
  planTitle: {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  qaBlock: { marginBottom: "2rem" },
  q: { color: "#f79a1f", fontWeight: "bold", marginBottom: "0.5rem" },
  a: {
    marginBottom: "0.8rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  incomeInput: {
    border: "none",
    borderBottom: `2px solid ${green}`,
    padding: "0.4rem",
    width: "60%",
    fontSize: "1rem",
    margin: "0 0.5rem",
    outline: "none",
    maxWidth: "100%",
  },
  goalInput: {
    border: "none",
    borderBottom: `2px solid ${green}`,
    padding: "0.6rem",
    fontSize: "1.1rem",
    outline: "none",
    color: "#333",
    flex: 1,
  },
  expenseList: {
    overflowX: "auto",
    width: "100%",
  },
  expenseRow: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    marginBottom: "0.5rem",
    flexWrap: "wrap",
  },
  expenseInput: {
    flex: "1 1 100px",
    minWidth: "120px",
    boxSizing: "border-box",
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
    lineHeight: 1,
    fontFamily: "sans-serif",
    minWidth: "32px",
    textAlign: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  addItem: {
    color: green,
    fontSize: "0.9rem",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  bottomNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  prevBtn: {
    background: "none",
    border: "none",
    color: "#f79a1f",
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
