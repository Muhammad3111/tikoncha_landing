"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Moon, Sun, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const localeNames: Record<string, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDarkMode = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }

    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${currentPath}`);
    setIsLangDropdownOpen(false);
  };

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "#features", label: t("features") },
    { href: "#pricing", label: t("pricing") },
    { href: "#mission", label: t("mission") },
    { href: "#team", label: t("team") },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "glass-panel shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center cursor-pointer group"
            aria-label="Tikoncha - Bosh sahifa"
          >
            <div className="relative transition-transform group-hover:scale-105">
              <Image
                src="/images/Tikoncha-logo_header.png"
                alt="Tikoncha - Raqamli himoya tizimi"
                width={200}
                height={72}
                quality={100}
                className="object-contain h-9 w-auto"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}

            <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-2" />

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{locale.toUpperCase()}</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    isLangDropdownOpen && "rotate-180"
                  )}
                />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 py-2 w-36 bg-white dark:bg-surface-dark rounded-xl shadow-lg border border-gray-100 dark:border-border-dark animate-slide-down">
                  {Object.entries(localeNames).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => switchLocale(code)}
                      className={cn(
                        "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors",
                        code === locale && "text-primary font-semibold"
                      )}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-foreground-muted dark:text-foreground-dark-muted"
              aria-label={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Official Google Play Badge */}
            <a
              href="https://play.google.com/store/apps/details?id=uz.tikoncha.student"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 transition-transform hover:scale-105 active:scale-95"
              aria-label="Get it on Google Play"
            >
              <Image
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                width={135}
                height={40}
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Language Dropdown Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{locale.toUpperCase()}</span>
              </button>
              {isLangDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 py-2 w-36 bg-white dark:bg-surface-dark rounded-xl shadow-lg border border-gray-100 dark:border-border-dark animate-slide-down z-50">
                  {Object.entries(localeNames).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => switchLocale(code)}
                      className={cn(
                        "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors",
                        code === locale && "text-primary font-semibold"
                      )}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              aria-label={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground-main dark:text-foreground-dark"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white dark:bg-background-dark border-t border-gray-100 dark:border-border-dark shadow-xl animate-slide-down">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="block px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 font-medium cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            {/* Official Google Play Badge - Mobile */}
            <a
              href="https://play.google.com/store/apps/details?id=uz.tikoncha.student"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center mt-4"
              aria-label="Get it on Google Play"
            >
              <Image
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                width={180}
                height={53}
                className="h-14 w-auto"
              />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
