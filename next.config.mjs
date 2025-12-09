import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Content Security Policy - xavfsizlik uchun
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https: http:;
  font-src 'self' https://fonts.gstatic.com data:;
  connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`
    .replace(/\s{2,}/g, " ")
    .trim();

// Xavfsizlik headerlari
const securityHeaders = [
    // XSS hujumlaridan himoya
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    // Clickjacking himoyasi
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    // MIME type sniffing oldini olish
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    // Referrer ma'lumotlarini cheklash
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    // DNS prefetch nazorati
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    // HTTPS majburiy (production uchun)
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
    },
    // Content Security Policy
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy,
    },
    // Permissions Policy - browser API'larini cheklash
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    },
    // Cross-Origin policies
    {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
    },
    {
        key: "Cross-Origin-Resource-Policy",
        value: "same-origin",
    },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Static export uchun
    output: "export",

    // Trailing slash qo'shish (static hosting uchun)
    trailingSlash: true,

    // Images optimization
    images: {
        unoptimized: true,
        formats: ["image/avif", "image/webp"],
    },

    // Xavfsizlik headerlari
    async headers() {
        return [
            {
                // Barcha sahifalarga qo'llash
                source: "/:path*",
                headers: securityHeaders,
            },
        ];
    },

    // Performance optimizatsiyalari
    compiler: {
        // Production'da console.log'larni olib tashlash
        removeConsole:
            process.env.NODE_ENV === "production"
                ? {
                      exclude: ["error", "warn"],
                  }
                : false,
    },

    // Experimental xususiyatlar (xavfsiz)
    experimental: {
        // Optimized package imports
        optimizePackageImports: [
            "lucide-react",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-navigation-menu",
        ],
    },

    // PoweredBy headerini olib tashlash (fingerprinting oldini olish)
    poweredByHeader: false,

    // Strict mode
    reactStrictMode: true,

    // ESLint build vaqtida
    eslint: {
        // Production build'da ESLint xatolarini bloklash
        ignoreDuringBuilds: false,
    },

    // TypeScript build vaqtida
    typescript: {
        // Production build'da TypeScript xatolarini bloklash
        ignoreBuildErrors: false,
    },
};

export default withNextIntl(nextConfig);
