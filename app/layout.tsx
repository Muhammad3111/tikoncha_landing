import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
    display: "swap",
    preload: true,
});

// Viewport configuration (Next.js 14+ best practice)
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#4BB462" },
        { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    title: {
        default: "Tikoncha - Raqamli himoya tizimi",
        template: "%s | Tikoncha",
    },
    description:
        "Tikoncha — insonlarni raqamli chalg'ituvchilardan himoya qiluvchi maxsus tizim.",
    applicationName: "Tikoncha",
    manifest: "/manifest.json",
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            {
                url: "/images/favicon_io/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/images/favicon_io/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
        ],
        apple: "/apple-touch-icon.png",
    },
    // Security: prevent caching of sensitive pages
    other: {
        "Cache-Control": "no-store, max-age=0",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Blocking script to prevent flash of wrong theme - minified for performance
    const themeScript = `(function(){try{var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches;(t==='dark'||(!t&&d))?document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark')}catch(e){}})()`;

    return (
        <html lang="uz" className="scroll-smooth" suppressHydrationWarning>
            <head>
                {/* Critical: Theme script must run before paint */}
                <script
                    dangerouslySetInnerHTML={{ __html: themeScript }}
                    suppressHydrationWarning
                />
                {/* Performance: Preconnect to external origins */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link rel="preconnect" href="https://play.google.com" />
                {/* DNS prefetch for analytics (if used) */}
                <link
                    rel="dns-prefetch"
                    href="https://www.google-analytics.com"
                />
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
