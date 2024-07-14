"use client";
import { useId, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m, useInView } from "framer-motion";

import styles from "./Offers.module.css";

import SectionName from "../SectionName";
import Package from "../Package";

import { useRefsContext } from "@/contexts/RefsContext";

import { AnimateChangeInHeight } from "@/helpers";

import { OFFER_PACKAGES } from "@/constants";
import CallToActionButton from "../CallToActionButton";
import ArrowIcon from "../DetailsArrow/DetailsArrow";
import { Check, X } from "react-feather";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const priceVariants = {
  hidden: { opacity: 0.5, y: "-3rem" },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0.5, y: "3rem" },
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
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
  show: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

function Offers() {
  const [currentPackage, setCurrentPackage] = useState("economy");
  const [openDetails, setOpenDetails] = useState({ services: false, notIncluded: false });

  const { offersRef } = useRefsContext();

  const id = useId();
  const packagesRef = useRef(null);

  const packagesInView = useInView(packagesRef, { once: true, amount: 0.6 });

  const selectedPackage = OFFER_PACKAGES.find((p) => p.slug === currentPackage);

  const handleClick = (slug: string) => {
    setCurrentPackage(slug);
  };

  const toggleDetails = (key: keyof typeof openDetails) => {
    setOpenDetails((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={offersRef} className={styles.wrapper}>
        <SectionName>our tours</SectionName>
        <div ref={packagesRef} className={styles.packagesWrapper}>
          <div className={styles.packageSelector}>
            {OFFER_PACKAGES.map((p) => {
              return (
                <button key={p.slug} onClick={() => handleClick(p.slug)}>
                  <h3>{p.title}</h3>
                  <AnimatePresence>
                    {currentPackage === p.slug ? (
                      <m.div
                        className={styles.hovered}
                        layoutId={id}
                        initial={{ opacity: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                        animate={{
                          opacity: 1,
                          borderTopLeftRadius: currentPackage === "economy" ? 15 : 0,
                          borderTopRightRadius: currentPackage === "vip" ? 15 : 0,
                        }}
                        exit={{ opacity: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                        transition={{ type: "spring", damping: 70, stiffness: 1000 }}
                      />
                    ) : null}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
          <AnimateChangeInHeight className={styles.listWrapper}>
            <AnimatePresence mode='wait'>
              <m.article
                key={currentPackage}
                initial='hidden'
                animate={packagesInView ? "show" : "hidden"}
                exit='exit'
                variants={listVariants}
              >
                <Package slug={currentPackage} />
              </m.article>
            </AnimatePresence>
          </AnimateChangeInHeight>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: packagesInView ? 1 : 0 }}
            className={styles.servicesWrapper}
          >
            <div>
              <button
                onClick={() => toggleDetails("services")}
                className={styles.summaryBtn}
                aria-expanded={openDetails.services}
                aria-controls='included-services-content'
              >
                Services included
                {packagesInView && <ArrowIcon isOpen={openDetails.services} />}
              </button>
              <AnimatePresence initial={false}>
                {openDetails.services && (
                  <m.div initial='hidden' animate='show' exit='hidden' variants={detailsVariants}>
                    <m.div variants={contentVariants}>
                      <ul>
                        <li>
                          <Check size={12} /> Pick-up and drop-off to and from the airport
                        </li>
                        <li>
                          <Check size={12} /> Hotel reservations for six nights in the cities of Tbilisi and Batumi
                        </li>
                        <li>
                          <Check size={12} /> Buffet breakfast
                        </li>
                        <li>
                          <Check size={12} /> All transfers by private car for a tour to enjoy privacy with family or
                          friends
                        </li>
                        <li>
                          <Check size={12} /> Tour guide fluent in Arabic and English
                        </li>
                      </ul>
                    </m.div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <button
                onClick={() => toggleDetails("notIncluded")}
                className={styles.summaryBtn}
                aria-expanded={openDetails.notIncluded}
                aria-controls='not-included-services-content'
              >
                Services not included
                {packagesInView && <ArrowIcon isOpen={openDetails.notIncluded} />}
              </button>
              <AnimatePresence initial={false}>
                {openDetails.notIncluded && (
                  <m.div initial='hidden' animate='show' exit='hidden' variants={detailsVariants}>
                    <m.div variants={contentVariants}>
                      <ul>
                        <li>
                          <X size={12} /> Airline tickets
                        </li>
                        <li>
                          <X size={12} /> Lunch and dinner
                        </li>
                        <li>
                          <X size={12} /> Entry tickets to tourist places
                        </li>
                      </ul>
                    </m.div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </m.div>

          <div className={styles.price}>
            <m.h3 initial={{ opacity: 0 }} animate={{ opacity: packagesInView ? 1 : 0 }}>
              From&nbsp;
            </m.h3>
            <AnimatePresence mode='wait'>
              <m.span
                key={selectedPackage?.price}
                initial='hidden'
                animate={packagesInView ? "show" : "hidden"}
                exit='exit'
                transition={{ type: "spring", damping: 60, stiffness: 900 }}
                variants={priceVariants}
              >{`$${selectedPackage?.price}`}</m.span>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

export default Offers;
