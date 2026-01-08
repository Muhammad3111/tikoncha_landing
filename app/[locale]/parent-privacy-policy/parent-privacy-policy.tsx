"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Shield, Database, Lock, Globe, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "@/components/sections/footer";

const sectionIcons = {
    dataCollection: Database,
    dataUsage: Shield,
    payments: Lock,
    thirdPartySharing: Globe,
    security: Shield,
};

const sectionKeys = [
    "dataCollection",
    "dataUsage",
    "payments",
    "thirdPartySharing",
    "security",
] as const;

export default function ParentPrivacyPolicyContent() {
    const t = useTranslations("parentPrivacyPolicy");
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = sectionKeys.map((key) =>
                document.getElementById(key)
            );
            const scrollPosition = window.scrollY + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sectionKeys[i]);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Sidebar - Table of Contents */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 bg-white dark:bg-[#111111] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                                {t("tableOfContents")}
                            </h3>
                            <nav className="space-y-1">
                                {sectionKeys.map((key) => {
                                    const Icon = sectionIcons[key];
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => scrollToSection(key)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 text-left ${
                                                activeSection === key
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                            }`}
                                        >
                                            <Icon className="w-4 h-4 shrink-0" />
                                            <span className="truncate">
                                                {t(
                                                    `sections.${key}.title`
                                                ).replace(/^\d+\.\s*/, "")}
                                            </span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        {/* Hero Section */}
                        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent rounded-3xl p-8 lg:p-12 mb-8 border border-primary/20">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                                    <Shield className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                                        {t("title")}
                                    </h1>
                                </div>
                            </div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                {t("intro")}
                            </p>
                        </div>

                        {/* Mobile Table of Contents */}
                        <div className="lg:hidden mb-8">
                            <details className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                                <summary className="px-6 py-4 cursor-pointer text-sm font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                                    {t("tableOfContents")}
                                    <svg
                                        className="w-5 h-5 text-gray-500 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </summary>
                                <nav className="px-6 pb-4 space-y-1">
                                    {sectionKeys.map((key) => {
                                        const Icon = sectionIcons[key];
                                        return (
                                            <button
                                                key={key}
                                                onClick={() =>
                                                    scrollToSection(key)
                                                }
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                                            >
                                                <Icon className="w-4 h-4 shrink-0" />
                                                <span>
                                                    {t(`sections.${key}.title`)}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </details>
                        </div>

                        {/* Policy Sections */}
                        <div className="space-y-6">
                            {sectionKeys.map((key) => {
                                const Icon = sectionIcons[key];
                                const hasItems = [
                                    "dataCollection",
                                    "dataUsage",
                                    "payments",
                                    "thirdPartySharing",
                                    "security",
                                ].includes(key);

                                return (
                                    <section
                                        key={key}
                                        id={key}
                                        className="bg-white dark:bg-[#111111] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200 dark:border-gray-800 scroll-mt-24"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                                                    {t(`sections.${key}.title`)}
                                                </h2>
                                            </div>
                                        </div>

                                        <div className="pl-0 lg:pl-16">
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                                {t(
                                                    `sections.${key}.description`
                                                )}
                                            </p>

                                            {hasItems && (
                                                <ul className="space-y-3 mb-4">
                                                    {(
                                                        t.raw(
                                                            `sections.${key}.items`
                                                        ) as string[]
                                                    ).map(
                                                        (
                                                            item: string,
                                                            index: number
                                                        ) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                                                            >
                                                                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                                                <span>
                                                                    {item}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>

                        {/* Contact Card */}
                        <div className="mt-8 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Mail className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            info@tikoncha.uz
                                        </h3>
                                        <p className="text-white/80 text-sm">
                                            +998 97 270 70 07
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/"
                                    className="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors"
                                >
                                    {t("backToHome")}
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
