"use client";
import Image from "next/image";
import { AnimatePresence, Variants, m } from "framer-motion";
import styles from "./ExpandableCardEducation.module.css";
import DetailsArrow from "../DetailsArrow";

interface ExpandableCardProps {
  title: string;
  icon: { src: string; alt: string };
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  expandedHeight?: string;
}

function ExpandableCard({ title, icon, isOpen, onToggle, children, expandedHeight = "10rem" }: ExpandableCardProps) {
  const contentVariants: Variants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.2 } },
    show: { opacity: 1, height: expandedHeight, transition: { duration: 0.2 } },
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardHeaderWrapper} onClick={onToggle}>
        <div className={styles.imageWrapper}>
          <Image src={icon.src} alt={icon.alt} fill sizes='150px' />
        </div>
        <h2>{title}</h2>
        <DetailsArrow isOpen={isOpen} size={50} rotate />
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            className={styles.cardContentWrapper}
            initial='hidden'
            animate='show'
            exit='hidden'
            variants={contentVariants}
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ExpandableCard;
