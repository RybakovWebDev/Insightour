import { useRef, useState, useEffect } from "react";
import { m, Variants } from "framer-motion";

interface AnimateChangeInHeightProps {
  children: React.ReactNode;
  className?: string;
  classNameInner?: string;
  enterDuration?: number;
  enterDelay?: number;
  exitDuration?: number;
  exitDelay?: number;
}

export const AnimateChangeInHeight: React.FC<AnimateChangeInHeightProps> = ({
  children,
  className,
  classNameInner,
  enterDuration = 0.3,
  enterDelay = 0,
  exitDuration = 0.3,
  exitDelay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  const [prevHeight, setPrevHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const observedHeight = entries[0].contentRect.height;
        setPrevHeight(height);
        setHeight(observedHeight);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [height]);

  const isGrowing = (prevHeight: number | "auto", height: number | "auto") => {
    if (typeof prevHeight === "number" && typeof height === "number") {
      return height > prevHeight;
    }
    return prevHeight === "auto" || height !== 0;
  };

  const variants: Variants = {
    show: {
      height,
      transition: {
        duration: isGrowing(prevHeight, height) ? enterDuration : exitDuration,
        delay: isGrowing(prevHeight, height) ? enterDelay : exitDelay,
      },
    },
  };

  return (
    <m.div className={className} style={{ height }} variants={variants} initial='hidden' animate='show'>
      <div className={classNameInner} ref={containerRef}>
        {children}
      </div>
    </m.div>
  );
};

export const scrollToRef = (ref: React.RefObject<HTMLElement>): void => {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
};

export const shuffleArray = <T,>(array: T[], resultCount: number = array.length): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array.slice(0, resultCount);
};
