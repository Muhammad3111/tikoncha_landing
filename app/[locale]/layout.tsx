import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import { Navbar } from "@/components/navbar";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  const baseUrl = "https://tikoncha.uz";
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((l) => {
    alternateLanguages[l] = `${baseUrl}/${l}`;
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Tikoncha Team" }],
    creator: "NEW EDU MChJ",
    publisher: "NEW EDU MChJ",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      siteName: "Tikoncha",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/Tikoncha_hero.png",
          width: 1200,
          height: 630,
          alt: "Tikoncha - Digital Protection System",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/Tikoncha_hero.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      <JsonLd locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Navbar locale={locale} />
        {children}
      </NextIntlClientProvider>
    </>
  );
}
