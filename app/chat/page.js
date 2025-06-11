"use client";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/NavBar";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { text: trimmed, type: "user" }]);
    setInputText("");

    try {
      const chatbotResponse = await fetch("/api/transaction/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          message: trimmed,
        }),
      });

      if (!chatbotResponse.ok) throw new Error("챗봇 처리 실패");

      const structuredData = await chatbotResponse.json();

      setMessages((prev) => [
        ...prev,
        {
          text: structuredData.message || "거래 내역이 저장되었습니다.",
          type: "bot",
        },
      ]);
    } catch (error) {
      console.error("에러 발생:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ 처리 중 오류가 발생했습니다.", type: "bot" },
      ]);
    }
  };

  return (
    <>
      <TopBar />
      <div className="h-[100dvh] bg-white flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-[#F9F9F9]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${
                msg.type === "user"
                  ? "self-end bg-[#E5E5EA]"
                  : "self-start bg-white border"
              } text-[#111] px-4 py-2 rounded-2xl max-w-[75%] text-sm leading-relaxed`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="fixed bottom-14 left-0 w-full px-4 py-2 bg-white border-t flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // 기본 submit 방지
                handleSend(inputText);
              }
            }}
            placeholder="메시지를 입력하세요"
            className="flex-1 px-4 py-2 text-sm rounded-full border border-gray-300 bg-gray-100 outline-none"
          />
          <button
            onClick={() => handleSend(inputText)}
            className="ml-2 bg-[#FF9900] text-white w-10 h-10 rounded-full text-lg"
          >
            ➤
          </button>
        </div>
      </div>
      <Navbar />
    </>
  );
}
