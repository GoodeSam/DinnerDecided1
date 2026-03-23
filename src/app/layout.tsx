import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DinnerDecided - What Should I Cook? | 今晚吃什么",
  description: "AI-powered meal decision engine. 智能做饭决策引擎。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
