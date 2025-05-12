// ✅ 회원가입 페이지 (app/signup/page.jsx)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errors, setErrors] = useState({ name: "", id: "", pw: "" });
  const router = useRouter();

  const handleSubmit = () => {
    const newErrors = {
      name: name ? "" : "이름을 입력하세요.",
      id: id ? "" : "아이디를 입력하세요.",
      pw: pw ? "" : "비밀번호를 입력하세요.",
    };
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (!hasError) {
      router.push("/login"); // 또는 router.push('/login')로 설정 가능
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.logoSection}>
        <div style={styles.icon}>🌱</div>
        <div style={styles.tagline}>
          <div>신나는 저축,</div>
          <div style={styles.taglineStrong}>돈굴이와 함께</div>
        </div>
      </div>

      <h1 style={styles.title}>회원가입</h1>

      <div style={styles.form}>
        <label style={styles.label}>이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          placeholder="이름 입력"
        />
        {errors.name && <p style={styles.error}>{errors.name}</p>}

        <label style={styles.label}>아이디</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={styles.input}
          placeholder="아이디 입력"
        />
        {errors.id && <p style={styles.error}>{errors.id}</p>}

        <label style={styles.label}>비밀번호</label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          style={styles.input}
          placeholder="비밀번호 입력"
        />
        {errors.pw && <p style={styles.error}>{errors.pw}</p>}

        <button style={styles.submitButton} onClick={handleSubmit}>
          회원가입 완료
        </button>
      </div>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    fontFamily: "sans-serif",
    color: "#333",
  },
  logoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  icon: { fontSize: "2.5rem", marginBottom: "0.5rem" },
  tagline: { textAlign: "center", fontSize: "1rem", lineHeight: "1.4" },
  taglineStrong: { color: "#30b769", fontWeight: "bold" },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  label: { fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.3rem" },
  input: {
    padding: "0.8rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
  },
  error: {
    color: "red",
    fontSize: "0.85rem",
    marginTop: "-0.5rem",
    marginBottom: "0.5rem",
  },
  submitButton: {
    backgroundColor: "#30b769",
    color: "#fff",
    border: "none",
    padding: "0.9rem",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};
