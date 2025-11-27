import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Tikoncha - Raqamli himoya tizimi",
  description: "Tikoncha — insonlarni raqamli chalg'ituvchilardan himoya qiluvchi maxsus tizim.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Blocking script to prevent flash of wrong theme
  const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (theme === 'dark' || (!theme && prefersDark)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="uz" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/favicon_io/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/images/favicon_io/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4BB462" />
      </head>
      <body
        className={`${jakarta.variable} font-sans bg-background-light text-foreground-main dark:bg-background-dark dark:text-foreground-dark antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}



