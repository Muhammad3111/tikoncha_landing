"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    key: "saidburxon",
    image: "/images/SaidburxonShuxratov.png",
    fullName: "Saidburxon Shuxratov",
  },
  {
    key: "ibroximjon",
    image: "/images/IbroximjonOdilov.png",
    fullName: "Ibroximjon Odilov",
  },
  {
    key: "komiljon",
    image: "/images/KomiljonXamidjonov.png",
    fullName: "Komiljon Xamidjonov",
  },
  {
    key: "abdurahim",
    image: "/images/AbdurahimSharipov.png",
    fullName: "Abdurahim Sharipov",
  },
  {
    key: "jamshidbek",
    image: "/images/JamshidbekMurtazoyev.png",
    fullName: "Jamshidbek Murtazoyev",
  },
  {
    key: "abrorbek",
    image: "/images/AbrorbekIbroximov.png",
    fullName: "Abrorbek Ibroximov",
  },
  {
    key: "saidburxonU",
    image: "/images/SaidburxonUmarxonov.png",
    fullName: "Saidburxon Umarxonov",
  },
  {
    key: "muhammadjon",
    image: "/images/MuhammadKarimov.png",
    fullName: "Muhammad Karimov",
  },
] as const;

export function TeamSection() {
  const t = useTranslations("team");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        ".team-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate team cards with stagger
      gsap.fromTo(
        ".team-card",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: {
            each: 0.08,
            from: "start",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate images with scale
      gsap.fromTo(
        ".team-image",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: {
            each: 0.08,
            from: "start",
          },
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".team-grid",
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
      id="team"
      ref={sectionRef}
      className="py-24 bg-background-light dark:bg-background-dark"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content="Tikoncha" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="team-header text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-foreground-muted dark:text-foreground-dark-muted">
            {t("description")}
          </p>
        </div>

        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map(({ key, image, fullName }) => (
            <article
              key={key}
              className="team-card group bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-transparent hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 dark:hover:border-primary/50 dark:hover:shadow-primary/30 hover:-translate-y-2 transition-all duration-300 text-center cursor-pointer"
              itemScope
              itemType="https://schema.org/Person"
              itemProp="employee"
            >
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/30 transition-colors" />
                <div className="team-image relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-[#333] shadow-lg">
                  <Image
                    src={image}
                    alt={`${fullName} - Tikoncha jamoasi a'zosi, ${t(`members.${key}.role`)}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 96px, 96px"
                    itemProp="image"
                  />
                </div>
              </div>
              <h3
                className="font-bold text-lg text-foreground-main dark:text-white"
                itemProp="name"
              >
                {t(`members.${key}.name`)}
              </h3>
              <p
                className="text-sm text-primary font-medium mt-1"
                itemProp="jobTitle"
              >
                {t(`members.${key}.role`)}
              </p>
              <meta itemProp="worksFor" content="Tikoncha" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
