"use client";
import { LazyMotion, m } from "framer-motion";
import { ChevronDown } from "react-feather";

import styles from "./DetailsArrow.module.css";

const loadFeatures = () => import("../../features").then((res) => res.default);

interface ArrowIconProps {
  isOpen: boolean;
  size?: number;
  rotate?: boolean;
}

const ArrowIcon = ({ isOpen, size = 24, rotate = false }: ArrowIconProps) => {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        className={styles.wrapper}
        animate={{
          y: isOpen && !rotate ? [0, 5, 0] : 0,
          rotate: isOpen && rotate ? 180 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <ChevronDown size={size} />
      </m.div>
    </LazyMotion>
  );
};

export default ArrowIcon;
