import { cookies } from "next/headers";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedLanguage = cookies().get("language-selected");
  const language = (savedLanguage?.value || "en") as LanguageCode;

  return (
    <html lang='en' data-language-selected={language}>
      <body className={inter.className}>
        <RefsProvider>
          <LanguageProvider initialLanguage={language}>{children}</LanguageProvider>
        </RefsProvider>
      </body>
    </html>
  );
}
