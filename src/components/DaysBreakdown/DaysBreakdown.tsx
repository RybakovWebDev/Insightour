"use client";
import { useState } from "react";
import { AnimatePresence, LazyMotion, m } from "framer-motion";

import styles from "./DaysBreakdown.module.css";

import ArrowIcon from "../DetailsArrow/DetailsArrow";
import SectionName from "../SectionName";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { useRefsContext } from "@/contexts/RefsContext";
import {
  DaysBreakdown_Text,
  sevenDayTourBreakdown,
  tenDayTourBreakdown,
  threeDayTourBreakdown,
  TOUR_DURATIONS,
} from "@/constantsText";

const loadFeatures = () => import("../../features").then((res) => res.default);

const daysVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const daysItemVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  show: {
    height: "auto",
    opacity: 1,
  },
};

const ulVariants = {
  hidden: {
    height: 0,
    transition: {
      when: "afterChildren",
    },
  },
  show: {
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    height: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const liVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const DaysBreakdown = () => {
  const [currentDuration, setCurrentDuration] = useState("7days");
  const [openDays, setOpenDays] = useState<{ [key: string]: boolean }>({});
  const { selectedLanguage } = useLanguageContext();
  const { offersRef } = useRefsContext();

  const isArabic = selectedLanguage === "ar";

  const handleDurationClick = (slug: string) => {
    setCurrentDuration(slug);
    setOpenDays({});
  };

  const toggleDay = (day: string) => {
    setOpenDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const getCurrentTourBreakdown = () => {
    switch (currentDuration) {
      case "3days":
        return threeDayTourBreakdown;
      case "7days":
        return sevenDayTourBreakdown;
      case "10days":
        return tenDayTourBreakdown;
      default:
        return sevenDayTourBreakdown;
    }
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={offersRef} className={styles.wrapper}>
        <SectionName>{DaysBreakdown_Text.sectionName[selectedLanguage]}</SectionName>
        <div className={styles.durationSelector}>
          {TOUR_DURATIONS.map((duration) => (
            <button
              key={duration.slug}
              onClick={() => handleDurationClick(duration.slug)}
              className={`${styles.durationButton} ${currentDuration === duration.slug ? styles.active : ""}`}
            >
              {duration.title[selectedLanguage]}
            </button>
          ))}
        </div>

        <m.div className={styles.daysWrapper} initial='hidden' animate='show' variants={daysVariants}>
          <AnimatePresence>
            {getCurrentTourBreakdown().map((day, i) => (
              <m.div
                key={day.title.en}
                className={styles.dayItem}
                initial='hidden'
                animate='show'
                exit='hidden'
                variants={daysItemVariants}
              >
                <button
                  onClick={() => toggleDay(day.title.en)}
                  className={styles.summary}
                  aria-expanded={openDays[day.title.en]}
                  aria-controls={`activities-on-${day.title.en}`}
                >
                  <div className={styles.titleWrapper}>
                    <p className={styles.dayTitle}>
                      {isArabic && ":"}
                      {day.title[selectedLanguage]}
                      {!isArabic && ":"}
                    </p>
                    <AnimatePresence mode='wait'>
                      <m.p
                        className={styles.dayDescription}
                        key={day.description + currentDuration}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {day.description[selectedLanguage]}
                      </m.p>
                    </AnimatePresence>
                  </div>
                  <ArrowIcon isOpen={openDays[day.title.en]} />
                </button>
                <AnimatePresence mode='wait'>
                  {openDays[day.title.en] && (
                    <m.ul key={day.title.en + i} initial='hidden' animate='show' exit='exit' variants={ulVariants}>
                      {day.activities.map((activity, index) => (
                        <m.li key={index} variants={liVariants}>
                          {activity[selectedLanguage]}
                        </m.li>
                      ))}
                    </m.ul>
                  )}
                </AnimatePresence>
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      </section>
    </LazyMotion>
  );
};

export default DaysBreakdown;
