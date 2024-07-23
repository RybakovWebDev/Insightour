"use client";
import { AnimatePresence, LazyMotion, m } from "framer-motion";

import styles from "./Package.module.css";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { OFFER_PACKAGES } from "@/constantsText";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

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

interface PackageProps {
  slug: string;
}

function Package({ slug }: PackageProps) {
  const { selectedLanguage } = useLanguageContext();

  const selectedPackage = OFFER_PACKAGES.find((p) => p.slug === slug);

  return (
    <LazyMotion features={loadFeatures}>
      <div className={styles.wrapper}>
        <m.ul variants={container}>
          <AnimatePresence>
            {selectedPackage?.benefits.map((l, i) => (
              <m.li variants={item} key={i}>
                {selectedLanguage !== "ar" && <span />}
                {l[selectedLanguage]}
                {selectedLanguage === "ar" && <span />}
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      </div>
    </LazyMotion>
  );
}

export default Package;
