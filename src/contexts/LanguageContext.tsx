"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import Cookies from "js-cookie";

import { LanguageCode } from "@/constants";

interface LanguageContextType {
  selectedLanguage: LanguageCode;
  setSelectedLanguage: (language: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage: LanguageCode;
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(initialLanguage);

  const changeLanguage = (language: LanguageCode) => {
    setSelectedLanguage(language);
    Cookies.set("language-selected", language, { expires: 1000 });
    document.documentElement.setAttribute("data-language-selected", language);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguageContext must be used within a LanguageProvider");
  }
  return context;
}
