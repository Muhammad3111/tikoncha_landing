"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Send, MapPin, Phone, Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-white dark:bg-[#0A0A0A] border-t border-gray-100 dark:border-border-dark pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-content grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-block mb-6" aria-label="Tikoncha - Bosh sahifa">
              <Image
                src="/images/Tikoncha-logo_header.png"
                alt="Tikoncha - Raqamli himoya tizimi"
                width={200}
                height={72}
                quality={100}
                className="h-9 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-foreground-muted dark:text-foreground-dark-muted max-w-sm mb-6">
              {t("tagline")}
            </p>
            
            {/* Social Links with proper hover */}
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/newedu_uz/"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-foreground-muted dark:text-white/70 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                aria-label="Instagram"
                target="_blank"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/newedu_uz"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-foreground-muted dark:text-white/70 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                aria-label="Telegram"
                target="_blank"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>

            {/* Official Google Play Badge */}
            <a
              href="https://play.google.com/store/apps/details?id=uz.tikoncha.student"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105"
              aria-label="Get it on Google Play"
            >
              <Image
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                width={160}
                height={47}
                className="h-12 w-auto"
              />
            </a>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground-main dark:text-white">
              {t("company")}
            </h4>
            <ul className="space-y-3 text-foreground-muted dark:text-foreground-dark-muted">
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleSmoothScroll(e, "#features")}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  {navT("features")}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleSmoothScroll(e, "#pricing")}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  {navT("pricing")}
                </a>
              </li>
              <li>
                <a
                  href="#mission"
                  onClick={(e) => handleSmoothScroll(e, "#mission")}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  {t("about")}
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  onClick={(e) => handleSmoothScroll(e, "#team")}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  {navT("team")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground-main dark:text-white">
              {t("contact")}
            </h4>
            <ul className="space-y-4 text-foreground-muted dark:text-foreground-dark-muted">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>{t("location")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+998972707007"
                  className="hover:text-primary font-medium transition-colors"
                >
                  +998 97 270 70 07
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:info@tikoncha.uz"
                  className="hover:text-primary transition-colors"
                >
                  info@tikoncha.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground-muted dark:text-foreground-dark-muted">
          <p>{t("copyright")}</p>
          <div className="flex gap-6">
            <a href="https://tikoncha.uz/policy" className="hover:text-primary transition-colors" target="_blank">
              {t("privacy")}
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
