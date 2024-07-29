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

const container = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
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

  const id = useId();
  const packagesRef = useRef(null);

  const packagesInView = useInView(packagesRef, { once: true, amount: 0.5 });

  const selectedService = ExtraServicesPackages_Text.find((p) => p.slug === currentService);

  const handleClick = (slug: string) => {
    setCurrentService(slug);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={servicesRef} className={styles.wrapper}>
        <SectionName>{ExtraServices_Text.sectionName[selectedLanguage]}</SectionName>
        <div ref={packagesRef} className={styles.packagesWrapper}>
          <div className={styles.packageSelector}>
            {ExtraServicesPackages_Text.map((p) => {
              return (
                <button key={p.slug} onClick={() => handleClick(p.slug)}>
                  <h3>{p.title[selectedLanguage]}</h3>
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
