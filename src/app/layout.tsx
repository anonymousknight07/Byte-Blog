import "./style/globals.css";
import Script from 'next/script';

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
        <Script
          id="visitor-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              fetch('https://api.ipapi.com/api/check?access_key=${process.env.NEXT_PUBLIC_IPAPI_KEY}')
                .then(res => res.json())
                .then(data => {
                  fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      country: data.country_name,
                      city: data.city,
                      path: window.location.pathname
                    })
                  });
                })
                .catch(console.error);
            `
          }}
        />
      </body>
    </html>
  );
}