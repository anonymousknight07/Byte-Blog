import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/lib/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Akshat Blog",
  description: "Tech, Non-Tech, all at one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico"/>
      </head>
      <body className={`${inter.className} dark:bg-gray-900 dark:text-white transition-colors`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
