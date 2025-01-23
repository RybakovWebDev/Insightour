"use client";
import { ReactNode, useState } from "react";
import { AnimatePresence, LazyMotion, m } from "framer-motion";

import styles from "./ExploreGeorgiaDropdown.module.css";

import ArrowIcon from "../DetailsArrow/DetailsArrow";

const loadFeatures = () => import("../../features").then((res) => res.default);

interface ExploreGeorgiaDropdownProps {
  buttonText: string;
  children: ReactNode;
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

function ExploreGeorgiaDropdown({ buttonText, children }: ExploreGeorgiaDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

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
          {buttonText}
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
              <m.div variants={contentVariants}>{children}</m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}

export default ExploreGeorgiaDropdown;
