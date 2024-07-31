"use client";
import { useId, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m, useInView } from "framer-motion";

import styles from "./Offers.module.css";

import SectionName from "../SectionName";
import Package from "../Package";
import CallToActionButton from "../CallToActionButton";
import OfferedServices from "../OfferedServices";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { useRefsContext } from "@/contexts/RefsContext";
import { AnimateChangeInHeight } from "@/helpers";
import { OFFER_PACKAGES, Offers_Text } from "@/constantsText";
import { ICONS_ACCESSIBLE } from "@/constants";
import Image from "next/image";

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

function Offers() {
  const [currentPackage, setCurrentPackage] = useState("economy");
  const [openDetails, setOpenDetails] = useState({ services: false, notIncluded: false });
  const { selectedLanguage } = useLanguageContext();
  const { ratesRef } = useRefsContext();

  const id = useId();
  const packagesRef = useRef(null);

  const packagesInView = useInView(packagesRef, { once: true, amount: 0.5 });

  const selectedPackage = OFFER_PACKAGES.find((p) => p.slug === currentPackage);

  const handleClick = (slug: string) => {
    setCurrentPackage(slug);
  };

  const toggleDetails = (key: keyof typeof openDetails) => {
    setOpenDetails((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={ratesRef} className={styles.wrapper}>
        <SectionName>{Offers_Text.sectionName[selectedLanguage]}</SectionName>
        <div ref={packagesRef} className={styles.packagesWrapper}>
          <div className={styles.packageSelector}>
            {OFFER_PACKAGES.map((p) => {
              return (
                <button key={p.slug} onClick={() => handleClick(p.slug)}>
                  <h3>{p.title[selectedLanguage]}</h3>
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
            <OfferedServices
              title={Offers_Text.servicesIncluded[selectedLanguage]}
              services={Offers_Text.includedArray}
              isOpen={openDetails.services}
              toggleDetails={() => toggleDetails("services")}
              isIncluded={true}
              packagesInView={packagesInView}
            />
            <OfferedServices
              title={Offers_Text.servicesNotIncluded[selectedLanguage]}
              services={Offers_Text.notIncludedArray}
              isOpen={openDetails.notIncluded}
              toggleDetails={() => toggleDetails("notIncluded")}
              isIncluded={false}
              packagesInView={packagesInView}
            />
          </m.div>

          <div className={styles.accessibilityWrapper}>
            <p>Our experiences are accessible to anyone!</p>
            <div className={styles.accessibilityIconsWrapper}>
              {ICONS_ACCESSIBLE.map((i) => {
                return <Image key={i.alt} src={i.src} alt={i.alt} height={35} width={35} />;
              })}
            </div>
          </div>

          <div className={styles.price}>
            <m.h3 initial={{ opacity: 0 }} animate={{ opacity: packagesInView ? 1 : 0 }}>
              {Offers_Text.startingAt[selectedLanguage]}&nbsp;
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
        <CallToActionButton />
      </section>
    </LazyMotion>
  );
}

export default Offers;
