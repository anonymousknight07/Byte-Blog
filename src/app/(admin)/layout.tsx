import "../style/globals.css";
import { ThemeProvider } from "@/lib/context/ThemeContext";

export const metadata = {
  title: "Admin - Akshat Blog",
  description: "Admin panel for Akshat Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}