import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arthit Portfolio",
  description: "Portfolio of Arthit Wongbutdee ,nicknamed Top.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} antialiased bg-gradient-to-b from-slate-900 via-black to-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}
