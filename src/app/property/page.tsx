"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LazyMotion, m, useInView, Variants } from "framer-motion";

import styles from "./page.module.css";

import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import SectionName from "@/components/SectionName";
import CallToActionButton from "@/components/CallToActionButton";
import ArrowIcon from "@/components/DetailsArrow/DetailsArrow";
import ContactButton from "@/components/ContactButton";
import MasonryGrid from "@/components/MasonryGrid";

import { useLanguageContext } from "@/contexts/LanguageContext";
import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";
import { Medical_Text, RealEstate_Text } from "@/constantsText";
import { ICONS, PARTNER_LOGOS_PROPERTY } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

const benefitsVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const benefitsItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const benefitsUlVariants: Variants = {
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

const servicesContentVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

export default function Property() {
  const [openBenefits, setOpenBenefits] = useState<string[]>([]);
  const { selectedLanguage } = useLanguageContext();
  const isMobileView = useScreenWidthDetect(1000);
  const isArabic = selectedLanguage === "ar";

  const marketRef = useRef(null);
  const partnersRef = useRef(null);

  const marketInView = useInView(marketRef, { once: true, amount: 0.2 });
  const partnersInView = useInView(partnersRef, { once: true, amount: 0.5 });

  const toggleBenefit = (benefit: string) => {
    setOpenBenefits((prev) => (prev.includes(benefit) ? prev.filter((i) => i !== benefit) : [...prev, benefit]));
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section className={styles.wrapper}>
        <Header />
        <h1>{RealEstate_Text.headline[selectedLanguage]}</h1>
        <Image
          className={styles.introIcon}
          src={ICONS.RealEstateAgent.src}
          alt={ICONS.RealEstateAgent.alt}
          width={100}
          height={100}
        />

        <MasonryGrid />

        <h2 className={styles.introDescription}>
          {RealEstate_Text.aboutHeadline1[selectedLanguage]}
          <br />
          <span>{RealEstate_Text.aboutHeadline2[selectedLanguage]}</span>
        </h2>

        <CallToActionButton call />

        <SectionName>{RealEstate_Text.marketSectionName[selectedLanguage]}</SectionName>
        <m.div
          ref={marketRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: marketInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.georgiaDescription}>{RealEstate_Text.marketText1[selectedLanguage]}</p>
          <p className={styles.georgiaDescription}>{RealEstate_Text.marketText2[selectedLanguage]}</p>
        </m.div>

        <h2 className={styles.whyUs}>{RealEstate_Text.whyUs[selectedLanguage]}</h2>

        <m.div className={styles.benefitsWrapper} initial='hidden' animate='show' variants={benefitsVariants}>
          <AnimatePresence>
            {RealEstate_Text.benefits.map((benefit, i) => (
              <m.div key={benefit.title.en} className={styles.benefitItem} variants={benefitsItemVariants}>
                <button
                  onClick={() => toggleBenefit(benefit.title.en)}
                  className={styles.summary}
                  aria-expanded={openBenefits.includes(benefit.title.en)}
                  aria-controls={`activities-on-${benefit.title.en}`}
                >
                  <h3 className={styles.benefitTitle}>{benefit.title[selectedLanguage]}</h3>

                  <ArrowIcon isOpen={openBenefits.includes(benefit.title.en)} />
                </button>
                <AnimatePresence initial={false}>
                  {openBenefits.includes(benefit.title.en) && (
                    <m.div
                      className={styles.benefitInfroWrapper}
                      initial='hidden'
                      animate='show'
                      exit='hidden'
                      variants={benefitsUlVariants}
                    >
                      <m.div variants={servicesContentVariants}>
                        <p>{benefit.description[selectedLanguage]}</p>
                      </m.div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>

        <SectionName>{Medical_Text.faqSectionName[selectedLanguage]}</SectionName>
        <div className={styles.faqWrapper}>
          <ol>
            {RealEstate_Text.faq.map((step) => {
              return (
                <li key={step.title.en}>
                  <h3>{step.title[selectedLanguage]}</h3>
                  <h4>{step.headline[selectedLanguage]}</h4>
                  <p>{step.description[selectedLanguage]}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <m.div
          ref={partnersRef}
          className={styles.partnersWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: partnersInView ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {PARTNER_LOGOS_PROPERTY.map((l) => {
            return (
              <m.div key={l.alt} className={styles.logoWrapper}>
                <Image src={l.src} alt={l.alt} fill sizes='150px' />
              </m.div>
            );
          })}
        </m.div>

        <ContactButton />
        <BackToTop />
        <ContactButton />
        <Footer />
      </section>
    </LazyMotion>
  );
}
