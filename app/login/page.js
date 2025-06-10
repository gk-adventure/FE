// ✅ 로그인 페이지 (app/login/page.jsx)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    let valid = true;

    if (!id.trim()) {
      setIdError("아이디를 입력하세요.");
      valid = false;
    } else {
      setIdError("");
    }

    if (!pw.trim()) {
      setPwError("비밀번호를 입력하세요.");
      valid = false;
    } else {
      setPwError("");
    }

    if (valid) {
      router.push("/onboarding/budget");
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.logoSection}>
        <div style={styles.icon}>
          <img src="/images/icon.png" alt="로고" style={styles.iconImg} />
        </div>
        <div style={styles.tagline}>
          <div>신나는 저축,</div>
          <div style={styles.taglineStrong}>돈굴이와 함께</div>
        </div>
      </div>

      <h1 style={styles.title}>로그인</h1>

      <div style={styles.form}>
        <label style={styles.label}>아이디</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={styles.input}
          placeholder="아이디 입력"
        />
        {idError && <p style={styles.error}>{idError}</p>}

        <label style={styles.label}>비밀번호</label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          style={styles.input}
          placeholder="비밀번호 입력"
        />
        {pwError && <p style={styles.error}>{pwError}</p>}

        <div style={styles.forgot}>
          <a href="#" style={styles.forgotLink}>
            비밀번호를 잊으셨나요?
          </a>
        </div>

        <button style={styles.loginButton} onClick={handleLogin}>
          로그인
        </button>

        <div style={styles.signupWrap}>
          처음 오셨나요?{" "}
          <Link href="/onboarding/signup" style={styles.signupLink}>
            회원가입
          </Link>
        </div>
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
  taglineStrong: { color: "", fontWeight: "bold" },
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
  forgot: { textAlign: "right", fontSize: "0.85rem" },
  forgotLink: { color: "#f79a1f", textDecoration: "none" },
  loginButton: {
    backgroundColor: "#f19209",
    color: "#fff",
    border: "none",
    padding: "0.9rem",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  signupWrap: { textAlign: "center", fontSize: "0.9rem", marginTop: "1rem" },
  signupLink: {
    color: "#f19209",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "0.4rem",
  },
};
