# Tikoncha Landing Page

A modern, responsive landing page for Tikoncha - Digital Protection System built with Next.js 14, GSAP animations, Tailwind CSS, and shadcn/ui components.

## Features

- 🌐 **Multi-language Support**: Uzbek (default), Russian, and English
- 🎨 **Modern UI**: Beautiful design with Tailwind CSS and shadcn/ui
- ✨ **GSAP Animations**: Smooth scroll-triggered animations
- 🌙 **Dark Mode**: Full dark mode support with system preference detection
- 📱 **Responsive**: Mobile-first responsive design
- 🔍 **SEO Optimized**: Complete meta tags, Open Graph, sitemap, and robots.txt
- ⚡ **Performance**: Optimized with Next.js Image, font loading, and code splitting

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: GSAP with ScrollTrigger
- **Internationalization**: next-intl
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Add your images to the `public/images/` folder:
   - `logo.png` - Tikoncha logo
   - `mascot.jpg` - Hero section mascot image
   - `og-image.jpg` - Open Graph image for social sharing

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
tikoncha-next/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx      # Locale-specific layout with SEO
│   │   └── page.tsx        # Main page component
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── robots.ts           # Robots.txt configuration
├── components/
│   ├── sections/
│   │   ├── hero.tsx        # Hero section with animations
│   │   ├── features.tsx    # Features grid
│   │   ├── pricing.tsx     # Pricing plans & coins
│   │   ├── mission.tsx     # Mission statement
│   │   ├── team.tsx        # Team members
│   │   └── footer.tsx      # Footer with contact info
│   ├── ui/
│   │   ├── button.tsx      # Button component
│   │   └── card.tsx        # Card component
│   └── navbar.tsx          # Navigation with language switcher
├── lib/
│   └── utils.ts            # Utility functions (cn)
├── messages/
│   ├── uz.json             # Uzbek translations
│   ├── ru.json             # Russian translations
│   └── en.json             # English translations
├── public/
│   └── images/             # Static images
├── i18n.ts                 # i18n configuration
├── middleware.ts           # Locale routing middleware
├── tailwind.config.ts      # Tailwind configuration
└── next.config.mjs         # Next.js configuration
```

## Internationalization

The site supports three languages:
- **Uzbek (uz)** - Default language
- **Russian (ru)**
- **English (en)**

Languages can be switched via the language dropdown in the navigation bar. The URL structure follows the pattern:
- `/` or `/uz` - Uzbek
- `/ru` - Russian
- `/en` - English

## SEO Features

- Dynamic meta tags for each language
- Open Graph and Twitter Card support
- Automatic sitemap.xml generation
- Robots.txt configuration
- Semantic HTML structure
- Proper heading hierarchy

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```ts
colors: {
  primary: {
    DEFAULT: "#4BB462",
    dark: "#3A964C",
    light: "#8AD194",
  },
  // ... other colors
}
```

### Translations

Edit the JSON files in the `messages/` folder to update content in any language.

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## Deployment

The site can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Docker

## License

© 2025 NEW EDU MChJ. All rights reserved.



