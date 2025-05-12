"use client";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/NavBar";

export default function MyPage() {
  const userInfo = {
    name: "우르양",
    age: 324,
    gender: "비밀~",
    monthlyLimit: 1000000,
    fixedCost: 200000,
  };

  return (
    <>
      <TopBar />
      <div
        style={{
          minHeight: "100dvh",
          backgroundColor: "#ffffff",
          fontFamily: "'Noto Sans KR', sans-serif",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* 프로필 카드 */}
          <div
            style={{
              backgroundColor: "#FFF8EE",
              border: "1px solid #FFE0B3",
              borderRadius: 12,
              padding: "24px 16px",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              position: "relative",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <img
                src="/images/profile-icon.png"
                alt="프로필"
                style={{
                  width: "clamp(60px, 25vw, 80px)",
                  height: "auto",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
              {userInfo.name}
            </div>
            <div style={{ fontSize: 13, marginBottom: 2, color: "#666" }}>
              나이 {userInfo.age}세
            </div>
            <div style={{ fontSize: 13, color: "#666" }}>
              성별 {userInfo.gender}
            </div>
            <img
              src="/images/settings-icon.png"
              alt="설정"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 18,
                height: 18,
              }}
            />
          </div>

          {/* 사용자 설정 정보 */}
          <div
            style={{
              borderTop: "1px solid #FF9900",
              borderBottom: "1px solid #FF9900",
              padding: "16px 0",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div
                style={{ fontWeight: "bold", fontSize: "14px", color: "#333" }}
              >
                사용자 설정 정보
              </div>
              <button
                style={{
                  fontSize: "12px",
                  backgroundColor: "#FFA500",
                  color: "#fff",
                  border: "none",
                  padding: "5px 14px",
                  borderRadius: "16px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
              >
                수정
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                color: "#444",
                marginBottom: "8px",
              }}
            >
              <span>한 달 예상 한도</span>
              <span>{userInfo.monthlyLimit.toLocaleString()}원</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                color: "#444",
              }}
            >
              <span>월 고정액</span>
              <span>{userInfo.fixedCost.toLocaleString()}원</span>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div
            style={{
              fontSize: "13px",
              color: "#555",
              textAlign: "center",
              marginBottom: "20px",
              lineHeight: 1.6,
            }}
          >
            <p>덜 쓴 돈은 추가로 저금해서 목표달성 속도 UP!</p>
            <p>더 쓴 만큼 더 아껴봐요! 아자아자 화이팅!</p>
          </div>

          {/* 로그아웃 버튼 + 오른쪽 이미지 */}
          <div
            style={{
              position: "relative",
              height: "80px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <button
                style={{
                  fontSize: "12px",
                  color: "#FF9900",
                  backgroundColor: "#fff",
                  border: "1px solid #FF9900",
                  padding: "6px 20px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  zIndex: 2,
                }}
              >
                로그아웃
              </button>
            </div>
            <img
              src="/images/logout-right-icon.png"
              alt="캐릭터"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                height: "100%",
                width: "auto",
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
