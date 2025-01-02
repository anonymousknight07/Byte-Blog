import "./style/globals.css";

export const metadata = {
  title: "Akshat Blog",
  description: "Tech, Non-Tech, all at one place",
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
        {children}
      </body>
    </html>
  );
}
