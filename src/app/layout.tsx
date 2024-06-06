import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { RefsProvider } from "@/contexts/RefsContext";

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
  return (
    <html lang='en'>
      <body className={inter.className}>
        <RefsProvider>{children}</RefsProvider>
      </body>
    </html>
  );
}
