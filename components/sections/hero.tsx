"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { gsap } from "gsap";

export function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text content
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
      );

      // Animate image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );

      // Animate badge
      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.5 }
      );

      // Animate buttons stagger
      gsap.fromTo(
        ".hero-buttons > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power2.out", delay: 0.8 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={sectionRef}
    className="relative pt-32 pb-20 lg:pt-32 lg:pb-32 overflow-hidden"
    >
      {/* Background */}
      <div className="bg-mesh" />
      <div className="absolute inset-0 bg-hero-glow opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div
            ref={textRef}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            {/* <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent dark:bg-primary/10 text-primary-dark dark:text-primary-light text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t("badge")}
            </div> */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15]">
              {t("title1")} <br />
              <span className="text-gradient">{t("title2")}</span>
            </h1>

            <p className="text-lg sm:text-xl text-foreground-muted dark:text-foreground-dark-muted mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t("description")}
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
              {/* Official Google Play Badge */}
              <a
                href="https://play.google.com/store/apps/details?id=uz.tikoncha.student"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 active:scale-95"
                aria-label="Get it on Google Play"
              >
                <Image
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  width={200}
                  height={59}
                  className="h-[60px] w-auto"
                  priority
                />
              </a>

              {/* Watch Video - Text only with hover effect */}
              <button
                className="group flex items-center gap-2 text-foreground-main dark:text-foreground-dark font-semibold transition-all hover:text-primary"
              >
                <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-transparent group-hover:bg-primary/10 transition-all duration-300">
                  <PlayCircle className="w-6 h-6 text-primary" />
                </span>
                <span className="relative">
                  {t("watchVideo")}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </span>
              </button>
            </div>
          </div>

          {/* Mascot / Visual */}
          <div ref={imageRef} className="w-full lg:w-1/2 relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl -z-10 dark:opacity-30" />

            {/* Image Container */}
            <div className="relative w-full max-w-lg mx-auto animate-floating">
              <div className="absolute inset-0 bg-white/5 dark:bg-white/5 rounded-full blur-2xl transform scale-90 translate-y-8" />
              <Image
                src="/images/Tikoncha_hero.png"
                alt="Tikoncha - Kirpi maskoti, bolalarni raqamli xavflardan himoya qiluvchi ilova"
                width={500}
                height={500}
                priority
                className="relative z-10 w-full sm:w-[80%] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
