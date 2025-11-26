export function JsonLd({ locale }: { locale: string }) {
  const baseUrl = "https://tikoncha.uz";

  // Team members data for SEO
  const teamMembers = [
    {
      name: "Saidburxon Shuxratov",
      jobTitle: {
        uz: "Asoschi va CEO",
        ru: "Основатель и CEO",
        en: "Founder & CEO",
      },
      image: `${baseUrl}/images/SaidburxonShuxratov.png`,
    },
    {
      name: "Ibroximjon Odilov",
      jobTitle: {
        uz: "Asosiy Mobil Dasturchi",
        ru: "Ведущий мобильный разработчик",
        en: "Lead Mobile Developer",
      },
      image: `${baseUrl}/images/IbroximjonOdilov.png`,
    },
    {
      name: "Komiljon Xamidjonov",
      jobTitle: {
        uz: "Senior Backend Dasturchi",
        ru: "Senior Backend разработчик",
        en: "Senior Backend Developer",
      },
      image: `${baseUrl}/images/KomiljonXamidjonov.png`,
    },
    {
      name: "Abdurahim Sharipov",
      jobTitle: {
        uz: "Mobil Dasturchi",
        ru: "Мобильный разработчик",
        en: "Mobile Developer",
      },
      image: `${baseUrl}/images/AbdurahimSharipov.png`,
    },
    {
      name: "Jamshidbek Murtazoyev",
      jobTitle: {
        uz: "QA Muhandis",
        ru: "QA Инженер",
        en: "QA Engineer",
      },
      image: `${baseUrl}/images/JamshidbekMurtazoyev.png`,
    },
    {
      name: "Abrorbek Ibroximov",
      jobTitle: {
        uz: "Senior UI/UX Dizayner",
        ru: "Senior UI/UX Дизайнер",
        en: "Senior UI/UX Designer",
      },
      image: `${baseUrl}/images/AbrorbekIbroximov.png`,
    },
    {
      name: "Saidburxon Umarxonov",
      jobTitle: {
        uz: "Loyiha Menejeri",
        ru: "Менеджер проекта",
        en: "Project Manager",
      },
      image: `${baseUrl}/images/SaidburxonUmarxonov.png`,
    },
    {
      name: "Muhammad Karimov",
      jobTitle: {
        uz: "Frontend Veb Dasturchi",
        ru: "Frontend веб-разработчик",
        en: "Frontend Web Developer",
      },
      image: `${baseUrl}/images/MuhammadKarimov.png`,
    },
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tikoncha",
    alternateName: "NEW EDU MChJ",
    url: baseUrl,
    logo: `${baseUrl}/images/Tikoncha-logo_header.png`,
    image: `${baseUrl}/images/Tikoncha_hero.png`,
    description:
      locale === "uz"
        ? "Tikoncha — insonlarni raqamli chalg'ituvchilardan himoya qiluvchi maxsus tizim"
        : locale === "ru"
        ? "Tikoncha — специальная система защиты людей от цифровых отвлекающих факторов"
        : "Tikoncha — a specialized system that protects people from digital distractions",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Saidburxon Shuxratov",
      image: `${baseUrl}/images/SaidburxonShuxratov.png`,
      jobTitle:
        locale === "uz"
          ? "Asoschi va CEO"
          : locale === "ru"
          ? "Основатель и CEO"
          : "Founder & CEO",
    },
    employee: teamMembers.map((member) => ({
      "@type": "Person",
      name: member.name,
      image: member.image,
      jobTitle: member.jobTitle[locale as keyof typeof member.jobTitle] || member.jobTitle.en,
      worksFor: {
        "@type": "Organization",
        name: "Tikoncha",
      },
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+998-97-270-70-07",
      contactType: "customer service",
      email: "info@tikoncha.uz",
      areaServed: "UZ",
      availableLanguage: ["uz", "ru", "en"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Andijon",
      addressCountry: "UZ",
    },
    sameAs: [
      "https://play.google.com/store/apps/details?id=uz.tikoncha.student",
    ],
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tikoncha",
    operatingSystem: "Android",
    applicationCategory: "LifestyleApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1000",
    },
    description:
      locale === "uz"
        ? "Tikoncha — insonlarni raqamli chalg'ituvchilardan himoya qiluvchi maxsus tizim"
        : locale === "ru"
        ? "Tikoncha — специальная система защиты людей от цифровых отвлекающих факторов"
        : "Tikoncha — a specialized system that protects people from digital distractions",
    screenshot: `${baseUrl}/images/Tikoncha_hero.png`,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tikoncha",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-US",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name:
          locale === "uz"
            ? "Tikoncha nima?"
            : locale === "ru"
            ? "Что такое Tikoncha?"
            : "What is Tikoncha?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "uz"
              ? "Tikoncha — farzandlaringiz va o'zingizni raqamli chalg'ituvchilardan himoya qiluvchi zamonaviy yechim."
              : locale === "ru"
              ? "Tikoncha — современное решение для защиты ваших детей и вас от цифровых отвлекающих факторов."
              : "Tikoncha is a modern solution to protect your children and yourself from digital distractions.",
        },
      },
      {
        "@type": "Question",
        name:
          locale === "uz"
            ? "Tikoncha qancha turadi?"
            : locale === "ru"
            ? "Сколько стоит Tikoncha?"
            : "How much does Tikoncha cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "uz"
              ? "Tikoncha bepul versiyasi mavjud. Plus obuna oyiga $1, Pro (Oila) obuna oyiga $3."
              : locale === "ru"
              ? "Есть бесплатная версия Tikoncha. Подписка Plus стоит $1/месяц, Pro (Семья) — $3/месяц."
              : "Tikoncha has a free version. Plus subscription is $1/month, Pro (Family) is $3/month.",
        },
      },
      {
        "@type": "Question",
        name:
          locale === "uz"
            ? "Tikoncha jamoasida kimlar bor?"
            : locale === "ru"
            ? "Кто в команде Tikoncha?"
            : "Who is on the Tikoncha team?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "uz"
              ? "Tikoncha jamoasida Saidburxon Shuxratov (CEO), Ibroximjon Odilov, Komiljon Xamidjonov, Abdurahim Sharipov, Jamshidbek Murtazoyev, Abrorbek Ibroximov, Saidburxon Umarxonov va Muhammad Karimov kabi mutaxassislar ishlaydi."
              : locale === "ru"
              ? "В команде Tikoncha работают Саидбурхон Шухратов (CEO), Ибрахимжон Одилов, Комилжон Хамиджонов, Абдурахим Шарипов, Жамшидбек Муртазоев, Аброрбек Ибрахимов, Саидбурхон Умархонов и Мухаммад Каримов."
              : "The Tikoncha team includes Saidburxon Shuxratov (CEO), Ibroximjon Odilov, Komiljon Xamidjonov, Abdurahim Sharipov, Jamshidbek Murtazoyev, Abrorbek Ibroximov, Saidburxon Umarxonov, and Muhammad Karimov.",
        },
      },
    ],
  };

  // Individual Person schemas for each team member (for better SEO)
  const personSchemas = teamMembers.map((member) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    image: member.image,
    jobTitle: member.jobTitle[locale as keyof typeof member.jobTitle] || member.jobTitle.en,
    worksFor: {
      "@type": "Organization",
      name: "Tikoncha",
      url: baseUrl,
    },
    url: `${baseUrl}/${locale}#team`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {personSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
