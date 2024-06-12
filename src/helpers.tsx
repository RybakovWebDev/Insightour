import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";

export const scrollToRef = (ref: React.RefObject<HTMLElement>): void => {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
};

interface AnimateChangeInHeightProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimateChangeInHeight: React.FC<AnimateChangeInHeightProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0].contentRect.height;
        setHeight(observedHeight);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <m.div className={className} style={{ height }} animate={{ height }} transition={{ duration: 0.3 }}>
      <div ref={containerRef}>{children}</div>
    </m.div>
  );
};
