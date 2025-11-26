"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, Zap, BarChart2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featureIcons = [ShieldCheck, Zap, BarChart2];
const featureKeys = ["smartBlock", "focusMode", "statistics"] as const;

export function FeaturesSection() {
  const t = useTranslations("features");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate cards with stagger
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate icons
      gsap.fromTo(
        ".feature-icon",
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 bg-surface-light dark:bg-[#0F0F0F] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-foreground-muted dark:text-foreground-dark-muted max-w-xl mx-auto text-lg">
            {t("description")}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[index];
            return (
              <Card
                key={key}
                className="feature-card bg-white dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-border-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 dark:hover:border-primary/50 dark:hover:shadow-primary/30 cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="feature-icon w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary-dark dark:text-primary-light mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-foreground-muted dark:text-foreground-dark-muted leading-relaxed">
                    {t(`${key}.description`)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

