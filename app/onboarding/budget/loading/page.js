"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding/analyze");
    }, 2000); // 2초 후 분석 페이지로 이동

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen text-lg font-bold text-[#F19209] bg-white">
      돈굴이가 분석중...
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#fffaf3",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  spinner: {
    fontSize: "4rem",
    animation: "spin 1.4s linear infinite",
  },
  text: {
    fontSize: "1.2rem",
    marginTop: "1.5rem",
    color: "#555",
  },
  orange: {
    color: "#F19209",
  },
};

// CSS 애니메이션을 global CSS에 추가해주세요 (예: app/globals.css)
