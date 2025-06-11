/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Next.js 앱에서 이 경로로 요청이 오면
        destination: "http://54.180.125.184:8081/api/:path*", // 실제 백엔드 서버의 이 경로로 요청을 전달합니다.
      },
    ];
  },
};
export default nextConfig;
