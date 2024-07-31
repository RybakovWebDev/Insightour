"use client";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LazyMotion, m, useInView } from "framer-motion";

import styles from "./ExtraServices.module.css";

import SectionName from "../SectionName";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { useRefsContext } from "@/contexts/RefsContext";
import { AnimateChangeInHeight } from "@/helpers";
import { ExtraServices_Text, ExtraServicesPackages_Text } from "@/constantsText";
import Image from "next/image";
import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: "-100%" },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "100%", transition: { duration: 0.3 } },
};

const container = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const containerh3 = {
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemFromRight = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0, transition: { type: "spring", damping: 40, stiffness: 250, restDelta: 0.01 } },
};

const itemFromLeft = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0, transition: { type: "spring", damping: 40, stiffness: 250, restDelta: 0.01 } },
};

const item = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0 },
};

function ExtraServices() {
  const [currentService, setCurrentService] = useState("medical");
  const { selectedLanguage } = useLanguageContext();
  const { servicesRef } = useRefsContext();
  const isMobileView = useScreenWidthDetect(600);

  const id = useId();
  const packagesRef = useRef(null);
  const h3WrapperRef = useRef(null);

  const packagesInView = useInView(packagesRef, { once: true, amount: 0.5 });
  const h3WrapperInView = useInView(h3WrapperRef, { once: true, amount: 0.5 });

  const selectedService = ExtraServicesPackages_Text.find((p) => p.slug === currentService);
  const isArabic = selectedLanguage === "ar";

  const handleClick = (slug: string) => {
    setCurrentService(slug);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={servicesRef} className={styles.wrapper}>
        <m.div
          ref={h3WrapperRef}
          variants={containerh3}
          initial='hidden'
          animate={h3WrapperInView ? "show" : "hidden"}
          className={styles.h3Wrapper}
        >
          <m.h3 className={styles.accent} variants={isArabic ? itemFromRight : itemFromLeft}>
            {ExtraServices_Text.more1[selectedLanguage]}
          </m.h3>
          <br />
          <m.h3 variants={isArabic ? itemFromRight : itemFromLeft}>{ExtraServices_Text.more2[selectedLanguage]}</m.h3>
          <br />
          <m.h3 variants={isArabic ? itemFromRight : itemFromLeft}>{ExtraServices_Text.more3[selectedLanguage]}</m.h3>
          <br />
          <m.h3 className={styles.accent} variants={isArabic ? itemFromRight : itemFromLeft}>
            {ExtraServices_Text.more4[selectedLanguage]}
          </m.h3>
        </m.div>
        <SectionName>{ExtraServices_Text.sectionName[selectedLanguage]}</SectionName>
        <div ref={packagesRef} className={styles.packagesWrapper}>
          <div className={styles.packageSelector}>
            {ExtraServicesPackages_Text.map((p) => {
              return (
                <button key={p.slug} onClick={() => handleClick(p.slug)}>
                  <h3>{p.title[selectedLanguage]}</h3>
                  <Image
                    src={p.icon.src}
                    alt={p.icon.alt}
                    width={isMobileView ? 30 : 40}
                    height={isMobileView ? 30 : 40}
                  />
                  <AnimatePresence>
                    {currentService === p.slug ? (
                      <m.div
                        className={styles.hovered}
                        layoutId={id}
                        initial={{ opacity: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                        animate={{
                          opacity: 1,
                          borderTopLeftRadius: currentService === "realEstate" ? 15 : 0,
                          borderTopRightRadius: currentService === "education" ? 15 : 0,
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

          <div className={styles.extrasHeadingWrapper}>
            <AnimatePresence mode='wait'>
              <m.h3
                className={styles.extrasHeading}
                key={currentService}
                initial='hidden'
                animate={packagesInView ? "show" : "hidden"}
                exit='exit'
                variants={headingVariants}
              >
                {selectedService?.heading[selectedLanguage]}
              </m.h3>
            </AnimatePresence>
          </div>

          <AnimateChangeInHeight className={styles.detailsWrapper}>
            <AnimatePresence mode='wait'>
              <m.article
                className={styles.includedListWrapper}
                key={currentService}
                initial='hidden'
                animate={packagesInView ? "show" : "hidden"}
                exit='exit'
                variants={listVariants}
              >
                <m.ul variants={container}>
                  <AnimatePresence>
                    {selectedService?.included.map((l, i) => (
                      <m.li variants={item} key={i}>
                        {selectedLanguage !== "ar" && <span />}
                        {l[selectedLanguage]}
                        {selectedLanguage === "ar" && <span />}
                      </m.li>
                    ))}
                  </AnimatePresence>
                </m.ul>
              </m.article>
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              <m.div
                className={styles.extrasDescriptionWrapper}
                key={currentService}
                initial='hidden'
                animate={packagesInView ? "show" : "hidden"}
                exit='exit'
                variants={listVariants}
              >
                <m.p className={styles.extrasDescription}>{selectedService?.description[selectedLanguage]}</m.p>
              </m.div>
            </AnimatePresence>
          </AnimateChangeInHeight>

          <div className={styles.buttonWrapper}>
            <Link
              href={`/${selectedService?.slug}`}
              aria-label={`More about ${selectedService?.title}`}
              className={styles.legal}
            >
              <button>Details</button>
            </Link>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

export default ExtraServices;
