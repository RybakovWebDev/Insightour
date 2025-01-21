"use client";
import { AnimatePresence, LazyMotion, m, useInView } from "framer-motion";

import { ChevronUp } from "react-feather";

import styles from "./BackToTop.module.css";

import { useRefsContext } from "@/contexts/RefsContext";
import { shevronAnimation, smoothSpring } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function BackToTop() {
  const { headerRef } = useRefsContext();

  const handleClick = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      }, 800);
    }
  };

  const showButton = !useInView(headerRef);

  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence>
        {showButton && (
          <m.button
            aria-label='Back to top of the page'
            className={styles.backBtn}
            onClick={handleClick}
            onTap={handleClick}
            whileTap={{ scale: 0.9 }}
            whileHover={{
              opacity: 1,
              background: "#b08ece",
            }}
            animate={{
              opacity: 0.3,
              background: "#b08ece",
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={smoothSpring}
          >
            <m.div
              whileHover={{
                y: [0, -10, 0],
                transition: shevronAnimation,
              }}
              initial={{ y: 0 }}
              transition={smoothSpring}
            >
              <ChevronUp size={52} strokeWidth={1} />
            </m.div>
          </m.button>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

export default BackToTop;
