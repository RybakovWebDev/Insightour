"use client";
import { useState } from "react";
import { animate, AnimatePresence, LazyMotion, m } from "framer-motion";

import styles from "./DaysBreakdown.module.css";

import ArrowIcon from "../DetailsArrow/DetailsArrow";

import { sevenDayTourBreakdown, tenDayTourBreakdown, threeDayTourBreakdown } from "@/constants";
import { AnimateChangeInHeight } from "@/helpers";
import CallToActionButton from "../CallToActionButton";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

const TOUR_DURATIONS = [
  { slug: "3days", title: "3 Days" },
  { slug: "7days", title: "7 Days" },
  { slug: "10days", title: "10 Days" },
];

const daysVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  show: {
    height: "auto",
    opacity: 1,
  },
};

const detailsVariants = {
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

const contentVariants = {
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
      <section className={styles.wrapper}>
        <h2 className={styles.title}>Daily breakdown</h2>
        <div className={styles.durationSelector}>
          {TOUR_DURATIONS.map((duration) => (
            <button
              key={duration.slug}
              onClick={() => handleDurationClick(duration.slug)}
              className={`${styles.durationButton} ${currentDuration === duration.slug ? styles.active : ""}`}
            >
              {duration.title}
            </button>
          ))}
        </div>

        <m.div className={styles.daysWrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AnimatePresence>
            {getCurrentTourBreakdown().map((day, i) => (
              <m.div
                key={day.title}
                className={styles.dayItem}
                initial='hidden'
                animate='show'
                exit='hidden'
                variants={daysVariants}
              >
                <button
                  onClick={() => toggleDay(day.title)}
                  className={styles.summary}
                  aria-expanded={openDays[day.title]}
                  aria-controls={`activities-on-${day.title}`}
                >
                  <ArrowIcon isOpen={openDays[day.title]} />
                  {day.title}
                </button>
                <AnimatePresence mode='wait'>
                  {openDays[day.title] && (
                    <m.ul key={day.title + i} initial='hidden' animate='show' exit='exit' variants={detailsVariants}>
                      {day.activities.map((activity, index) => (
                        <m.li key={index} variants={contentVariants}>
                          {activity}
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
