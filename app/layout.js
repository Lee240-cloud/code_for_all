'use client';
import "./globals.css";
import Script from 'next/script';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <title>학교 파트너십 지도</title>
        <meta name="description" content="학교 파트너십 가게 정보를 확인하세요" />
      </head>
      <body className="antialiased">
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
