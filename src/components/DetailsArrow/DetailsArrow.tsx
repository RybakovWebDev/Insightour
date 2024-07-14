"use client";
import { useEffect, useState } from "react";
import { LazyMotion, m } from "framer-motion";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

const variants = {
  initial: {
    opacity: 0,
    d: "M 6 9 L 12 15 L 18 9",
  },
  closed: {
    opacity: 1,
    d: "M 6 9 L 12 15 L 18 9",
  },
  open: {
    opacity: 1,
    d: "M 6 7 L 12 13 L 18 7 M 6 19 L 12 13 L 18 19",
  },
};

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

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
