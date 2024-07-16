import { useState, useRef } from "react";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { ChevronDown, ChevronUp } from "react-feather";

import styles from "./LanguageSelector.module.css";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { LANGUAGES, LanguageCode } from "@/constants";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

const languages: { code: LanguageCode; name: string }[] = Object.entries(LANGUAGES).map(([code, name]) => ({
  code: code as LanguageCode,
  name,
}));

function LanguageSelector() {
  const { selectedLanguage, setSelectedLanguage } = useLanguageContext();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function handleLanguageChange(code: LanguageCode) {
    setSelectedLanguage(code);
    setIsOpen(false);
  }

  return (
    <LazyMotion features={loadFeatures}>
      <div ref={containerRef} className={styles.container}>
        <button className={styles.selector} onClick={() => setIsOpen(!isOpen)}>
          {languages.find((lang) => lang.code === selectedLanguage)?.name}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <m.div
              className={styles.options}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {languages.map((lang) => (
                <button key={lang.code} className={styles.option} onClick={() => handleLanguageChange(lang.code)}>
                  {lang.name}
                </button>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}

export default LanguageSelector;
