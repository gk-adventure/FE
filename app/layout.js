// import NavBar from '@/components/NavBar';
import "./global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <main className="pb-[72px]">{children}</main>{" "}
        {/* 아래에 NavBar 자리 확보 */}
        {/* <NavBar /> */}
      </body>
    </html>
  );
}
