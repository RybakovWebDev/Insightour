import { useEffect, useState } from "react";
import { m } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    pathLength: 0,
    d: "M 9 6 L 15 12 L 9 18",
  },
  closed: {
    opacity: 1,
    pathLength: 1,
    d: "M 9 6 L 15 12 L 9 18",
  },
  open: {
    opacity: 1,
    pathLength: 1,
    d: "M 6 9 L 12 15 L 18 9",
  },
};

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <m.path
        variants={variants}
        initial='initial'
        animate={isFirstRender ? "closed" : isOpen ? "open" : "closed"}
        transition={{
          default: { duration: 0.3, ease: "easeInOut" },
          pathLength: { duration: 0.4, ease: "easeInOut" },
        }}
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ArrowIcon;
