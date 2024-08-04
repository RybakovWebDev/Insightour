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
import { Education_Text } from "@/constantsText";
import ArrowIcon from "@/components/DetailsArrow/DetailsArrow";
import { ICONS } from "@/constants";
import ContactButton from "@/components/ContactButton";
import ExpandableCardEducation from "@/components/ExpandableCardEducation";

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
  },
  show: {
    opacity: 1,
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
  const isMobileView = useScreenWidthDetect(720);
  const isArabic = selectedLanguage === "ar";

  const faqRef = useRef(null);
  const applyRef = useRef(null);
  const unisRef = useRef(null);

  const faqInView = useInView(faqRef, { once: true, amount: isMobileView ? 0.15 : 0.3 });
  const applyInView = useInView(applyRef, { once: true, amount: 0.3 });
  const unisInView = useInView(unisRef, { once: true, amount: isMobileView ? 0.15 : 0.3 });

  const toggleBenefit = (benefit: string) => {
    setOpenBenefits((prev) => (prev.includes(benefit) ? prev.filter((i) => i !== benefit) : [...prev, benefit]));
  };

  const toggleUniProgram = (program: string) => {
    setOpenUniPrograms((prev) => (prev.includes(program) ? prev.filter((i) => i !== program) : [...prev, program]));
  };

  const renderUniversityCards = (universities: typeof Education_Text.universitiesOffered) => {
    return universities.map((u, i) => (
      <li key={u.title.en} className={styles.uniItem}>
        <ExpandableCardEducation
          title={u.title[selectedLanguage]}
          icon={u.icon}
          isOpen={openUniPrograms.includes(u.title.en)}
          onToggle={() => toggleUniProgram(u.title.en)}
          expandedHeight='auto'
        >
          <div className={styles.programContentHeaderWrapper}>
            <a className={styles.website} href={u.website} target='_blank' rel='noopener noreferrer'>
              Website
            </a>
            <p className={styles.programDescription}>{u.description[selectedLanguage]}</p>
          </div>
          {u.programs.map((programOffer) => (
            <div key={programOffer.type.en + i} className={styles.programTypeItem}>
              <h3 className={styles.programTypeTitle}>{programOffer.type[selectedLanguage]}</h3>
              <ul className={styles.programList}>
                {programOffer.options.map((program) => (
                  <li key={program.title.en} className={styles.programItem}>
                    <p className={styles.programItemName}>{program.title[selectedLanguage]}</p>
                    <p className={styles.programItemPrice}>${program.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ExpandableCardEducation>
      </li>
    ));
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
        <m.div
          ref={faqRef}
          className={styles.faqWrapper}
          initial='hidden'
          animate={faqInView ? "show" : "hidden"}
          variants={benefitsVariants}
        >
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
        </m.div>

        <h2 className={styles.subheading}>{Education_Text.welcomeText[selectedLanguage]}</h2>

        <CallToActionButton call />

        <m.div
          ref={applyRef}
          className={styles.applicationWrapper}
          initial='hidden'
          animate={applyInView ? "show" : "hidden"}
          variants={benefitsVariants}
        >
          <h3>{Education_Text.applyText[selectedLanguage]}</h3>
          <ol>
            {Education_Text.applicationRequirements.map((r) => {
              return (
                <m.li key={r.number} className={styles.applicationRequirement} variants={benefitsItemVariants}>
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
                </m.li>
              );
            })}
          </ol>
        </m.div>

        <SectionName>{Education_Text.universitiesSectionName[selectedLanguage]}</SectionName>

        <m.div
          ref={unisRef}
          className={styles.universitiesWrapper}
          initial='hidden'
          animate={unisInView ? "show" : "hidden"}
          variants={benefitsVariants}
        >
          {isMobileView ? (
            <ul>{renderUniversityCards(Education_Text.universitiesOffered)}</ul>
          ) : (
            <div className={styles.universityColumns}>
              <ul>{renderUniversityCards(Education_Text.universitiesOffered.slice(0, 3))}</ul>
              <ul>{renderUniversityCards(Education_Text.universitiesOffered.slice(3))}</ul>
            </div>
          )}
        </m.div>

        <CallToActionButton call />
        <BackToTop />
        <ContactButton />
        <Footer />
      </section>
    </LazyMotion>
  );
}
