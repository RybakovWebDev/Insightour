import { AnimatePresence, m } from "framer-motion";
import { Check, X } from "react-feather";

import styles from "./OfferedServices.module.css";

import ArrowIcon from "../DetailsArrow/DetailsArrow";

import { useLanguageContext } from "@/contexts/LanguageContext";

interface OfferedServicesProps {
  title: string;
  services: Array<{
    en: string;
    ar: string;
    [key: string]: string;
  }>;
  isOpen: boolean;
  toggleDetails: () => void;
  isIncluded: boolean;
  packagesInView: boolean;
}

const detailsVariants = {
  hidden: {
    height: 0,
    transition: { when: "afterChildren" },
  },
  show: {
    height: "auto",
    transition: { when: "beforeChildren" },
  },
};

const contentVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function OfferedServices({ title, services, isOpen, toggleDetails, isIncluded, packagesInView }: OfferedServicesProps) {
  const { selectedLanguage } = useLanguageContext();
  const Icon = isIncluded ? Check : X;

  return (
    <div>
      <button
        onClick={toggleDetails}
        className={styles.summaryBtn}
        aria-expanded={isOpen}
        aria-controls={`${isIncluded ? "included" : "not-included"}-services-content`}
      >
        {title}
        {packagesInView && <ArrowIcon isOpen={isOpen} />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div initial='hidden' animate='show' exit='hidden' variants={detailsVariants}>
            <m.div variants={contentVariants}>
              <ul>
                {services.map((s) => (
                  <li key={s.en}>
                    {selectedLanguage !== "ar" && (
                      <span>
                        <Icon size={12} />
                      </span>
                    )}
                    {s[selectedLanguage]}
                    {selectedLanguage === "ar" && (
                      <span>
                        <Icon size={12} />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OfferedServices;
