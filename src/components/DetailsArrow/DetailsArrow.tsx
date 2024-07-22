"use client";
import { LazyMotion, m } from "framer-motion";

const loadFeatures = () => import("../../features").then((res) => res.default);

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <LazyMotion features={loadFeatures}>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <m.path
          d='M 6 12 L 12 18 L 18 12'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          animate={{
            y: isOpen ? [0, 5, 0] : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          style={{
            transformOrigin: "center",
          }}
        />
      </svg>
    </LazyMotion>
  );
};

export default ArrowIcon;
