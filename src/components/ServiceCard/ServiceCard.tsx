import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, Variants, m } from "framer-motion";

import styles from "./ServiceCard.module.css";
import DetailsArrow from "../DetailsArrow";

interface ServiceCardProps {
  shortTitle: string;
  fullTitle: string;
  description: string;
  icon: { src: string; alt: string };
  isOpen: boolean;
  onToggle: () => void;
  servicesDetailsVariants: Variants;
}

const servicesContentVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

function ServiceCard({
  shortTitle,
  fullTitle,
  description,
  icon,
  isOpen,
  onToggle,
  servicesDetailsVariants,
}: ServiceCardProps) {
  return (
    <div className={styles.serviceWrapper} onClick={onToggle}>
      <Image src={icon.src} alt={icon.alt} width={100} height={100} />
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
}

export default ServiceCard;
