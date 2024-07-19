import { cookies, headers } from "next/headers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RefsProvider } from "@/contexts/RefsContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageCode } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insightour - immersive tours and audioguides experiences in Tbilisi",
  description:
    "Insightour is a new way to get to know the city, a project for those that believe that &quot;excursions are not their thing&quot;.We help discover the city not through a set of dry facts, but through emotions, all because we have long been in love with Georgia, its history, legends and architecture.",
};

function getPreferredLanguage(): LanguageCode {
  const savedLanguage = cookies().get("language-selected");

  if (savedLanguage?.value) {
    if (savedLanguage.value === "en" || savedLanguage.value === "ar") {
      return savedLanguage.value as LanguageCode;
    }
  }

  const headersList = headers();
  const country = headersList.get("x-vercel-ip-country");

  if (country === "SA" || country === "AE" || country === "EG") {
    return "ar";
  }

  const acceptLanguage = headers().get("accept-language");

  if (acceptLanguage) {
    const preferredLanguages = acceptLanguage.split(",").map((lang) => lang.split(";")[0]);
    for (const lang of preferredLanguages) {
      if (lang.startsWith("ar")) return "ar";
      if (lang.startsWith("en")) return "en";
    }
  }

  return "en";
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = getPreferredLanguage();

  return (
    <html lang={language} data-language-selected={language}>
      <body className={inter.className}>
        <RefsProvider>
          <LanguageProvider initialLanguage={language}>{children}</LanguageProvider>
        </RefsProvider>
      </body>
    </html>
  );
}
