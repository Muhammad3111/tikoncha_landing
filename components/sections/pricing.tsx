"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  Info,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Gift,
  GraduationCap,
  Users,
  Coins,
  BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const coinPackages = [
  { coins: "1 000", discount: 20, price: "80 000 so'm" },
  { coins: "5 000", discount: 30, price: "350 000 so'm", featured: true },
  { coins: "10 000", discount: 40, price: "600 000 so'm", featured: true },
  { coins: "30 000", discount: 50, price: "1.5 mln so'm", premium: true },
];

export function PricingSection() {
  const t = useTranslations("pricing");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        ".pricing-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate pricing cards
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-cards",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate coins section
      gsap.fromTo(
        ".coins-section",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".coins-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate coin packages
      gsap.fromTo(
        ".coin-package",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".coin-packages",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-background-dark relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pricing-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent dark:bg-primary/10 text-primary-dark dark:text-primary-light text-xs font-bold uppercase tracking-wider mb-4">
            {t("badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-foreground-muted dark:text-foreground-dark-muted max-w-2xl mx-auto text-lg">
            {t("description")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Free Tier */}
          <Card className="pricing-card bg-surface-light dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-border-dark relative transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 dark:hover:border-primary/50 dark:hover:shadow-primary/30 cursor-pointer overflow-hidden">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-2">{t("free.name")}</h3>
              <div className="text-3xl font-extrabold text-foreground-main dark:text-white mb-6">
                {t("free.price")}{" "}
                <span className="text-base font-normal text-foreground-muted">
                  {t("perMonth")}
                </span>
              </div>

              <ul className="space-y-4 mb-8 text-sm text-foreground-muted dark:text-foreground-dark-muted">
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span>{t("free.features.stats")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span>{t("free.features.tasks")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span>{t("free.features.messages")}</span>
                </li>
                <li className="flex items-start gap-3 text-red-500">
                  <X className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{t("free.features.noWeekly")}</span>
                </li>
                <li className="flex items-start gap-3 text-orange-500 font-medium">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{t("free.features.limits")}</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full py-3">
                {t("free.cta")}
              </Button>
            </CardContent>
          </Card>

          {/* Plus Tier */}
          <Card className="pricing-card bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border-2 border-primary relative shadow-xl transform md:-translate-y-4 transition-all duration-300 hover:-translate-y-6 hover:shadow-2xl hover:shadow-primary/30 dark:hover:shadow-primary/40 cursor-pointer">
            <div className="badge-popular">{t("plus.recommended")}</div>
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-2 text-primary">
                {t("plus.name")}
              </h3>
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-4xl font-extrabold text-foreground-main dark:text-white">
                  {t("plus.price")}
                </div>
                <span className="text-foreground-muted">{t("perChild")}</span>
              </div>
              <div className="text-sm text-green-600 font-bold mb-6">
                {t("plus.yearlyPrice")}
              </div>

              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground-main dark:text-white">
                    {t("plus.features.unlimited")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{t("plus.features.tasks")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{t("plus.features.allowlist")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{t("plus.features.bonus")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{t("plus.features.qsqa")}</span>
                </li>
              </ul>
              <Button className="w-full py-3 shadow-glow">{t("plus.cta")}</Button>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="pricing-card bg-surface-light dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-border-dark relative transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 dark:hover:border-primary/50 dark:hover:shadow-primary/30 cursor-pointer">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-2">{t("pro.name")}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-3xl font-extrabold text-foreground-main dark:text-white">
                  {t("pro.price")}
                </div>
                <span className="text-foreground-muted">{t("perFamily")}</span>
              </div>
              <div className="text-sm text-primary font-bold mb-6">
                {t("pro.yearlyPrice")}
              </div>

              <ul className="space-y-4 mb-8 text-sm text-foreground-muted dark:text-foreground-dark-muted">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{t("pro.features.allPlus")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{t("pro.features.family")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{t("pro.features.coins")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <BrainCircuit className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground-main dark:text-white">
                    {t("pro.features.ai")}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded ml-1">
                    {t("pro.new")}
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs italic">
                  <span>{t("pro.features.aiNote")}</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full py-3">
                {t("pro.cta")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Coins Section */}
        <div className="coins-section mt-16 bg-surface-light dark:bg-surface-dark rounded-[2rem] p-8 md:p-12 border border-gray-100 dark:border-border-dark overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                <Coins className="w-8 h-8 text-yellow-500" />
                {t("coins.title")}
              </h3>
              <p className="text-foreground-muted dark:text-foreground-dark-muted">
                {t("coins.description")}
              </p>
              <p className="text-xs text-foreground-muted mt-2">
                {t("coins.note")}
              </p>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-primary">
                {t("coins.rate")}
              </div>
            </div>
          </div>

          <div className="coin-packages grid grid-cols-2 md:grid-cols-4 gap-4">
            {coinPackages.map((pkg, index) => (
              <div
                key={index}
                className={`coin-package p-6 rounded-2xl text-center transition-all overflow-hidden ${
                  pkg.premium
                    ? "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary hover:shadow-glow"
                    : pkg.featured
                    ? "bg-white dark:bg-background-dark border border-primary/30 hover:scale-105"
                    : "bg-white dark:bg-background-dark border border-gray-100 dark:border-border-dark hover:border-primary"
                }`}
              >
                {pkg.discount > 10 && (
                  <div
                    className={`absolute top-0 right-0 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold ${
                      pkg.discount >= 50 ? "bg-red-600" : "bg-red-500"
                    }`}
                    style={{ position: "absolute" }}
                  >
                    -{pkg.discount}%
                  </div>
                )}
                <div
                  className={`text-lg font-bold mb-1 ${
                    pkg.premium
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-yellow-500"
                  }`}
                >
                  {pkg.coins} {t("coins.coins")}
                </div>
                {pkg.discount === 10 && (
                  <div className="text-xs text-red-500 font-bold mb-2">
                    -{pkg.discount}% {t("coins.discount")}
                  </div>
                )}
                <div
                  className={`text-xl font-bold ${
                    pkg.premium
                      ? "text-primary-dark dark:text-primary-light"
                      : ""
                  }`}
                >
                  {pkg.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

