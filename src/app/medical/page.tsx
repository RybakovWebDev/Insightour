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
import ServiceCard from "@/components/ServiceCard";

import { useLanguageContext } from "@/contexts/LanguageContext";
import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";
import { Medical_Text } from "@/constantsText";
import ArrowIcon from "@/components/DetailsArrow/DetailsArrow";
import { ICONS } from "@/constants";

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

export default function Legal() {
  const [openServices, setOpenServices] = useState<string[]>([]);
  const [openBenefits, setOpenBenefits] = useState<string[]>([]);
  const { selectedLanguage } = useLanguageContext();
  const isMobileView = useScreenWidthDetect(1000);
  const isArabic = selectedLanguage === "ar";

  const treatmentsRef = useRef(null);

  const treatmentsInView = useInView(treatmentsRef, { once: true, amount: 0.5 });

  const servicesDetailsVariants: Variants = {
    hidden: {
      height: 0,
      transition: { when: "afterChildren" },
    },
    show: {
      height: isMobileView ? "auto" : "10rem",
      transition: { when: "beforeChildren" },
    },
  };

  const handleService = (index: string) => {
    setOpenServices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const toggleBenefit = (benefit: string) => {
    setOpenBenefits((prev) => (prev.includes(benefit) ? prev.filter((i) => i !== benefit) : [...prev, benefit]));
  };

  const renderServiceCards = (services: typeof Medical_Text.selection) => {
    return services.map((service, i) => (
      <ServiceCard
        key={service.slug}
        shortTitle={service.shortTitle[selectedLanguage]}
        fullTitle={service.fullTitle[selectedLanguage]}
        description={service.description[selectedLanguage]}
        icon={service.icon}
        isOpen={openServices.includes(service.slug)}
        onToggle={() => handleService(service.slug)}
        servicesDetailsVariants={servicesDetailsVariants}
      />
    ));
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section className={styles.wrapper}>
        <Header />
        <h1>{Medical_Text.headline[selectedLanguage]}</h1>
        <Image
          className={styles.introIcon}
          src={ICONS.Medicine.src}
          alt={ICONS.Medicine.alt}
          width={100}
          height={100}
        />
        <SectionName>{Medical_Text.aboutSectionName[selectedLanguage]}</SectionName>

        <h2 className={styles.introDescription}>
          {Medical_Text.introDescription[selectedLanguage]} -{" "}
          <span>{Medical_Text.introDescriptionAccent[selectedLanguage]}</span>
        </h2>
        <m.div className={styles.benefitsWrapper} initial='hidden' animate='show' variants={benefitsVariants}>
          <AnimatePresence>
            {Medical_Text.benefits.map((benefit, i) => (
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

        <CallToActionButton appointment />

        <SectionName>{Medical_Text.georgiaSectionName[selectedLanguage]}</SectionName>
        <p className={styles.georgiaDescription}>{Medical_Text.georgiaHealthText[selectedLanguage]}</p>

        <div ref={treatmentsRef} className={styles.treatmentsWrapper}>
          <SectionName>{Medical_Text.treatmentsSectionName[selectedLanguage]}</SectionName>
          <m.div
            className={styles.servicesOuterWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: treatmentsInView ? 1 : 0 }}
          >
            {isMobileView ? (
              renderServiceCards(Medical_Text.selection)
            ) : (
              <>
                <div className={styles.serviceColumnWrapper}>
                  {renderServiceCards(Medical_Text.selection.slice(0, 2))}
                </div>
                <div className={styles.serviceColumnWrapper}>{renderServiceCards(Medical_Text.selection.slice(2))}</div>
              </>
            )}
          </m.div>
        </div>

        <SectionName>{Medical_Text.faqSectionName[selectedLanguage]}</SectionName>
        <div className={styles.faqWrapper}>
          <ol>
            {Medical_Text.faq.map((step) => {
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

        <CallToActionButton appointment />
        <BackToTop />
        <Footer />
      </section>
    </LazyMotion>
  );
}
