"use client";
import { useId, useState } from "react";
import { AnimatePresence, LazyMotion, m } from "framer-motion";

import styles from "./Package.module.css";
import { OFFER_PACKAGES } from "@/constants";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

interface PackageProps {
  title: string;
  length: string[];
}

function Package({ title, length }: PackageProps) {
  const [currentPackage, setCurrentPackage] = useState("package1");

  const id = useId();

  const handleClick = (slug: string) => {
    setCurrentPackage(slug);
    console.log(slug);
  };

  return (
    <article className={styles.wrapper}>
      <div className={styles.packageSelector}>
        {OFFER_PACKAGES.map((p) => {
          return (
            <button key={p.slug} onClick={() => handleClick(p.slug)}>
              <h3>{p.title}</h3>
              <LazyMotion features={loadFeatures}>
                <AnimatePresence>
                  {currentPackage === p.slug ? (
                    <m.div
                      className={styles.hovered}
                      layoutId={id}
                      initial={{ opacity: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                      animate={{
                        opacity: 1,
                        borderTopLeftRadius: currentPackage === "package1" ? 15 : 0,
                        borderTopRightRadius: currentPackage === "package3" ? 15 : 0,
                      }}
                      exit={{ opacity: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                      transition={{ type: "spring", damping: 70, stiffness: 700 }}
                    />
                  ) : null}
                </AnimatePresence>
              </LazyMotion>
            </button>
          );
        })}
      </div>
      {/* <h3>{title}</h3> */}
      <div className={styles.listWrapper}>
        <ul>
          {length.map((l) => {
            return <li key={l}>{l}</li>;
          })}
        </ul>
      </div>
    </article>
  );
}

export default Package;
