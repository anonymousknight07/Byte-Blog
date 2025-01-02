import "../style/globals.css";

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
        <link rel="icon" href="/favicon.ico"  />
      </head>
      <body>{children}</body>
    </html>
  );
}
