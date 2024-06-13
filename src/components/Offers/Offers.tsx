"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LazyMotion, m } from "framer-motion";

import styles from "./Offers.module.css";

import SectionName from "../SectionName";
import Package from "../Package";

import { useRefsContext } from "@/contexts/RefsContext";

import { AnimateChangeInHeight } from "@/helpers";

import { OFFER_PACKAGES } from "@/constants";
import CallToActionButton from "../CallToActionButton";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

function Offers() {
  const [currentPackage, setCurrentPackage] = useState("economy");

  const { offersRef } = useRefsContext();

  const id = useId();

  const selectedPackage = OFFER_PACKAGES.find((p) => p.slug === currentPackage);

  const handleClick = (slug: string) => {
    setCurrentPackage(slug);
  };

  const list = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={offersRef} className={styles.wrapper}>
        <SectionName>our tours</SectionName>
        <div className={styles.packagesWrapper}>
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
              <m.article key={currentPackage} initial='hidden' animate='show' exit='exit' variants={list}>
                <Package slug={currentPackage} />
              </m.article>
            </AnimatePresence>
          </AnimateChangeInHeight>
          <Link
            href={`/${selectedPackage?.title.toLowerCase()}`}
            aria-label={`Open detailed project information for current ${selectedPackage?.title} package`}
            className={styles.detailsBtn}
          >
            <m.span
              initial={{ borderBottom: "2px solid rgba(var(--color-underline), 0.3)" }}
              whileHover={{ borderBottom: "6px solid rgba(var(--color-underline), 0.8)" }}
              transition={{ duration: 0.1 }}
            >
              View tour details
            </m.span>
          </Link>
        </div>
        <CallToActionButton />
      </section>
    </LazyMotion>
  );
}

export default Offers;
