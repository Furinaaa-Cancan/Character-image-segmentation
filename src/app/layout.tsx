import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PosterCraft Pro - 智能海报生成平台",
  description: "AI驱动的专业级活动海报自动化生成系统，从人像抠图到批量海报输出，一站式商业解决方案",
  keywords: ["海报生成", "AI抠图", "活动海报", "批量生成", "人像分割"],
  authors: [{ name: "PosterCraft Pro" }],
  openGraph: {
    title: "PosterCraft Pro - 智能海报生成平台",
    description: "AI驱动的专业级活动海报自动化生成系统",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: '#FDF8F3', color: '#3D2E24' }}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
