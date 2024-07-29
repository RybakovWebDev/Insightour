"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, LazyMotion, m, Variants } from "framer-motion";

import styles from "./page.module.css";

import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import DetailsArrow from "@/components/DetailsArrow";

import { useLanguageContext } from "@/contexts/LanguageContext";
import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";
import { Medical_Text } from "@/constantsText";
import ArrowIcon from "@/components/DetailsArrow/DetailsArrow";

const loadFeatures = () => import("../../features").then((res) => res.default);

interface ServiceCardProps {
  shortTitle: string;
  fullTitle: string;
  description: string;
  icon: StaticImageData;
  isOpen: boolean;
  onToggle: () => void;
  servicesDetailsVariants: Variants;
}

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

const ServiceCard: React.FC<ServiceCardProps> = ({
  shortTitle,
  fullTitle,
  description,
  icon,
  isOpen,
  onToggle,
  servicesDetailsVariants,
}) => {
  return (
    <div className={styles.serviceWrapper} onClick={onToggle}>
      <Image className={styles.serviceIcon} src={icon} alt={shortTitle} width={100} height={100} />
      <h2>{shortTitle}</h2>
      <DetailsArrow isOpen={isOpen} size={50} />
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            className={styles.serviceInfoWrapper}
            initial='hidden'
            animate='show'
            exit='hidden'
            variants={servicesDetailsVariants}
          >
            <m.div variants={servicesContentVariants}>
              <h3>{fullTitle}</h3>
              <p>{description}</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Legal() {
  const [openServices, setOpenServices] = useState<string[]>([]);
  const [openBenefits, setOpenBenefits] = useState<string[]>([]);
  const { selectedLanguage } = useLanguageContext();
  const isMobileView = useScreenWidthDetect(1000);
  const isArabic = selectedLanguage === "ar";

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
        <p className={styles.introDescription}>{Medical_Text.introDescription[selectedLanguage]}</p>
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
        <m.div className={styles.treatmentsWrapper} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className={styles.servicesTitle}>Treatments</h2>
          <div className={styles.servicesOuterWrapper}>
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
          </div>
        </m.div>
        <h2 className={styles.faqTitle}>How does it work?</h2>
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
        <BackToTop />
        <Footer />
      </section>
    </LazyMotion>
  );
}
