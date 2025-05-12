"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, MessageCircle, BarChart2, User } from "lucide-react";

const menu = [
  { href: "/calendar", icon: Home, label: "홈" },
  { href: "/chat", icon: MessageCircle, label: "챗봇" },
  { href: "/report", icon: BarChart2, label: "리포트" },
  { href: "/mypage", icon: User, label: "마이페이지" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.05)] border-t border-gray-200 flex z-50">
      {menu.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors duration-200 ${
              isActive ? "text-[#F19209]" : "text-gray-400"
            }`}
          >
            <Icon
              className={`w-6 h-6 mb-0.5 transition-all duration-200 ${
                isActive ? "stroke-[2.5]" : "stroke-[1.8]"
              }`}
            />
            <span
              className={`text-[12px] tracking-tight ${
                isActive ? "font-semibold" : "font-normal"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
