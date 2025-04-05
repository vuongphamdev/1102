import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kiến Trúc & Thiết Kế Trọn Gói Tại Đà Nẵng | Architecture & Design",
  description: "Dịch vụ thiết kế kiến trúc, nội thất và thi công trọn gói tại Đà Nẵng. Chuyên nghiệp, uy tín, chất lượng với đội ngũ kiến trúc sư giàu kinh nghiệm.",
  keywords: "kiến trúc đà nẵng, thiết kế nhà đà nẵng, thi công trọn gói, kiến trúc sư đà nẵng, thiết kế nội thất, xây dựng nhà ở, công trình dân dụng",
  openGraph: {
    title: "Kiến Trúc & Thiết Kế Trọn Gói Tại Đà Nẵng",
    description: "Dịch vụ thiết kế kiến trúc, nội thất và thi công trọn gói tại Đà Nẵng. Chuyên nghiệp, uy tín, chất lượng với đội ngũ kiến trúc sư giàu kinh nghiệm.",
    url: "https://your-domain.com",
    siteName: "Kiến Trúc & Thiết Kế Đà Nẵng",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
