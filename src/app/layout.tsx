import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DinnerDecided - What Should I Cook?",
  description: "AI-powered meal decision engine that helps you decide what to cook based on your ingredients, time, and dietary needs.",
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
