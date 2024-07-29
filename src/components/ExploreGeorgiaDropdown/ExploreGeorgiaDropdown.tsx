"use client";
import { useState } from "react";
import { AnimatePresence, LazyMotion, m } from "framer-motion";

import styles from "./ExploreGeorgiaDropdown.module.css";

import ArrowIcon from "../DetailsArrow/DetailsArrow";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { Explore_Text } from "@/constantsText";

const loadFeatures = () => import("../../features").then((res) => res.default);

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

function ExploreGeorgiaDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useLanguageContext();

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <div className={styles.wrapper}>
        <button
          onClick={toggleDetails}
          className={styles.dropdownBtn}
          aria-expanded={isOpen}
          aria-controls={`Expand detailed Georgia information`}
        >
          {Explore_Text.exploreRevealButton.en}
          <ArrowIcon isOpen={isOpen} />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <m.div
              className={styles.listWrapper}
              initial='hidden'
              animate='show'
              exit='hidden'
              variants={detailsVariants}
            >
              <m.div variants={contentVariants}>
                <ul>
                  {Explore_Text.exploreSections.map((s) => (
                    <li key={s.name[selectedLanguage]}>
                      <h4>{s.name[selectedLanguage]}</h4>
                      {s.text[selectedLanguage]}
                    </li>
                  ))}
                </ul>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}

export default ExploreGeorgiaDropdown;
