"use client";
import styles from "./Offers.module.css";

import SectionName from "../SectionName";
import Package from "../Package";

import { useRefsContext } from "@/contexts/RefsContext";
import { OFFER_PACKAGES } from "@/constants";

function Offers() {
  const { offersRef } = useRefsContext();
  return (
    <section ref={offersRef} className={styles.wrapper}>
      <SectionName>our tours</SectionName>
      <div className={styles.packagesWrapper}>
        {OFFER_PACKAGES.map((p) => {
          return <Package key={p.slug} title={p.title} length={p.length} />;
        })}
      </div>
    </section>
  );
}

export default Offers;
