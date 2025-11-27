"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Users, ShieldCheck, Quote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MissionSection() {
  const t = useTranslations("mission");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main card
      gsap.fromTo(
        ".mission-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-card",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate text content from left
      gsap.fromTo(
        ".mission-text",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-text",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate quote card from right with rotation
      gsap.fromTo(
        ".quote-card",
        { opacity: 0, x: 40, rotation: 10 },
        {
          opacity: 1,
          x: 0,
          rotation: 3,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".quote-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate badges
      gsap.fromTo(
        ".mission-badge",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".mission-badges",
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
      id="mission"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mission-card bg-primary-dark rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-white">
          {/* Abstract Pattern */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="mission-text">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold mb-6 border border-white/30">
                {t("badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {t("title")}
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {t("description")}
              </p>

              <div className="mission-badges grid grid-cols-2 gap-6">
                <div className="mission-badge flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{t("professional")}</span>
                </div>
                <div className="mission-badge flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{t("security")}</span>
                </div>
              </div>
            </div>

            <div className="lg:h-full flex items-center justify-center">
              <div className="quote-card bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl w-full max-w-sm transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-start gap-4 mb-4">
                  <Quote className="w-8 h-8 text-white/40" />
                </div>
                <p className="text-xl font-medium italic">{t("quote")}</p>
                <div className="mt-6 flex items-center gap-3">
                  {/* <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-dark font-bold">
                    S
                  </div> */}
                  <div>
                    <div className="font-bold">{t("founder")}</div>
                    <div className="text-sm text-white/60">
                      {t("founderTitle")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



