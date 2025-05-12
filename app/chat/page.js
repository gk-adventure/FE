"use client";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/NavBar";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const quickReplies = [
    "오늘 예산 알려줘.",
    "금일 리포트 요약해줘.",
    "이번 주 리포트 요약해줘.",
    "이번 주 중에서 사용한 금액 알려줘.",
  ];

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { text: trimmed, type: "user" }]);
    setInputText("");
  };

  const handleQuickReply = (text) => {
    setMessages((prev) => [...prev, { text, type: "user" }]);
  };

  return (
    <>
      <TopBar />
      <div
        style={{
          height: "100dvh",
          backgroundColor: "#ffffff",
          fontFamily: "'Noto Sans KR', sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 채팅 메시지 영역 */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "#F9F9F9",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.type === "user" ? "#E5E5EA" : "#ffffff",
                color: "#111",
                padding: "10px 14px",
                borderRadius: "16px",
                maxWidth: "75%",
                fontSize: "14px",
                lineHeight: "1.4",
                border: msg.type === "bot" ? "1px solid #eee" : "none",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* 빠른 응답 버튼 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
            padding: "12px 16px",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          {quickReplies.map((text, i) => (
            <button
              key={i}
              onClick={() => handleQuickReply(text)}
              style={{
                border: "1px solid #FF9900",
                color: "#FF9900",
                fontSize: "13px",
                borderRadius: "20px",
                padding: "8px 14px",
                background: "white",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {text}
            </button>
          ))}
        </div>

        {/* 입력창 */}
        <div
          style={{
            display: "flex",
            padding: "10px 16px",
            borderTop: "1px solid #eee",
            backgroundColor: "#ffffff",
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="메시지를 입력하세요"
            style={{
              flex: 1,
              padding: "12px 14px",
              fontSize: "14px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              outline: "none",
              backgroundColor: "#f8f8f8",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              marginLeft: "8px",
              backgroundColor: "#FF9900",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ➤
          </button>
        </div>
      </div>
      <Navbar />
    </>
  );
}
