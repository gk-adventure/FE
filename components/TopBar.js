"use client";

import Image from "next/image";

export default function TopBar() {
  return (
    <header className="flex items-center px-4 py-4 mb-2 bg-white">
      {/* 아이콘 */}
      <Image
        src="/images/icon.png" // public 디렉토리에 저장된 이미지 경로
        alt="돈굴이 아이콘"
        width={32}
        height={32}
        className="mr-2"
      />

      {/* 텍스트 */}
      <h1 className="text-lg font-semibold">
        <span className="text-gray-800">돈굴돈굴 </span>
        <span className="text-[#F19209] font-bold">돈굴이</span>
      </h1>
    </header>
  );
}
