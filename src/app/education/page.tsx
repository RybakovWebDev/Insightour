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

import { useLanguageContext } from "@/contexts/LanguageContext";
import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";
import { Education_Text, Medical_Text } from "@/constantsText";
import ArrowIcon from "@/components/DetailsArrow/DetailsArrow";
import { ICONS } from "@/constants";
import ContactButton from "@/components/ContactButton";

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

export default function Medical() {
  const [openUniPrograms, setOpenUniPrograms] = useState<string[]>([]);
  const [openBenefits, setOpenBenefits] = useState<string[]>([]);
  const { selectedLanguage } = useLanguageContext();
  const isMobileView = useScreenWidthDetect(1000);
  const isArabic = selectedLanguage === "ar";

  const treatmentsRef = useRef(null);

  const toggleBenefit = (benefit: string) => {
    setOpenBenefits((prev) => (prev.includes(benefit) ? prev.filter((i) => i !== benefit) : [...prev, benefit]));
  };

  const toggleUniProgram = (program: string) => {
    setOpenUniPrograms((prev) => (prev.includes(program) ? prev.filter((i) => i !== program) : [...prev, program]));
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section className={styles.wrapper}>
        <Header />

        <h1>{Education_Text.headline[selectedLanguage]}</h1>

        <Image className={styles.introIcon} src={ICONS.School.src} alt={ICONS.School.alt} width={100} height={100} />

        <h2 className={styles.subheading}>
          {Education_Text.embarkText[selectedLanguage]} —{" "}
          <span>{Education_Text.embarkTextAccent[selectedLanguage]}</span>
        </h2>

        <CallToActionButton call />

        <SectionName>{Education_Text.georgiaSectionName[selectedLanguage]}</SectionName>
        <p className={styles.georgiaDescription}>{Education_Text.georgiaText[selectedLanguage]}</p>

        <m.div className={styles.benefitsWrapper} initial='hidden' animate='show' variants={benefitsVariants}>
          <AnimatePresence>
            {Education_Text.benefits.map((benefit) => (
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

        <SectionName>{Education_Text.faqSectionName[selectedLanguage]}</SectionName>
        <div className={styles.faqWrapper}>
          <ol>
            {Education_Text.faqSteps.map((step) => {
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

        <h2 className={styles.subheading}>{Education_Text.welcomeText[selectedLanguage]}</h2>

        <CallToActionButton call />

        <div className={styles.applicationWrapper}>
          <h3>{Education_Text.applyText[selectedLanguage]}</h3>
          <ol>
            {Education_Text.applicationRequirements.map((r) => {
              return (
                <li key={r.number} className={styles.applicationRequirement}>
                  <h4>
                    {r.number}. {r.title[selectedLanguage]}
                  </h4>
                  <ul>
                    {r.requirements.map((el, i) => {
                      return (
                        <li key={i}>
                          {!isArabic && "— "}
                          {el[selectedLanguage]}
                          {isArabic && " —"}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>

        <SectionName>{Education_Text.universitiesSectionName[selectedLanguage]}</SectionName>

        <div className={styles.universitiesWrapper}>
          <ul>
            {Education_Text.universitiesOffered.map((u, i) => {
              return (
                <li key={u.title.en} className={styles.uniItem}>
                  <h4 className={styles.uniTitle}>{u.title[selectedLanguage]}</h4>
                  <p className={styles.uniDescription}>{u.description[selectedLanguage]}</p>
                  {u.programs.map((programOffer) => {
                    return (
                      <m.div
                        key={programOffer.type.en + i}
                        className={styles.programTypeItem}
                        variants={benefitsItemVariants}
                      >
                        <button
                          onClick={() => toggleUniProgram(programOffer.type.en + i)}
                          className={styles.summary}
                          aria-expanded={openUniPrograms.includes(programOffer.type.en + i)}
                          aria-controls={programOffer.type[selectedLanguage]}
                        >
                          <h3 className={styles.programTypeTitle}>{programOffer.type[selectedLanguage]}</h3>

                          <ArrowIcon isOpen={openUniPrograms.includes(programOffer.type.en + i)} />
                        </button>
                        <AnimatePresence initial={false}>
                          {openUniPrograms.includes(programOffer.type.en + i) && (
                            <m.div
                              className={styles.programSelectionWrapper}
                              initial='hidden'
                              animate='show'
                              exit='hidden'
                              variants={benefitsUlVariants}
                            >
                              <m.div variants={servicesContentVariants}>
                                <ul>
                                  {programOffer.options.map((program) => {
                                    return (
                                      <li key={program.title.en} className={styles.programItem}>
                                        <p className={styles.programItemName}>{program.title[selectedLanguage]}</p>
                                        <p>${program.price}</p>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </m.div>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </m.div>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        </div>

        <CallToActionButton call />
        <BackToTop />
        <ContactButton />
        <Footer />
      </section>
    </LazyMotion>
  );
}
