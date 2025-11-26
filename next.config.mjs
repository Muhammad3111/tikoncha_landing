import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export uchun
  output: 'export',
  
  // Trailing slash qo'shish (static hosting uchun)
  trailingSlash: true,
  
  // Images static export uchun
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
