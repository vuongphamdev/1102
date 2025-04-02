import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/embla.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1102 Architecture",
  description: "1102 Architecture - Professional Architecture Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
