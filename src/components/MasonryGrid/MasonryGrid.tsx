"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, LazyMotion, m, Variants } from "framer-motion";
import Image from "next/image";

import styles from "./MasonryGrid.module.css";

import { PHOTOS_PROPERTY_HORIZONTAL, PHOTOS_PROPERTY_VERTICAL } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

const wrapperVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

type IndexState = [number, number];

function MasonryGrid() {
  const [verticalState, setVerticalIndex] = useState<IndexState>([0, 0]);
  const [horizontalState1, setHorizontalIndex1] = useState<IndexState>([0, 0]);
  const [horizontalState2, setHorizontalIndex2] = useState<IndexState>([1, 0]);
  const [lastChanged, setLastChanged] = useState<number | null>(null);

  const paginate = (newIndex: number, currentIndex: number, maxLength: number): IndexState => {
    const direction = newIndex - currentIndex > 0 ? 1 : -1;
    return [Math.abs(newIndex % maxLength), direction];
  };

  const updateRandomImage = useCallback(() => {
    let randomSelection: number;
    do {
      randomSelection = Math.floor(Math.random() * 3);
    } while (randomSelection === lastChanged);

    setLastChanged(randomSelection);

    switch (randomSelection) {
      case 0:
        setVerticalIndex((prev) => paginate(prev[0] + 1, prev[0], PHOTOS_PROPERTY_VERTICAL.length));
        break;
      case 1:
        setHorizontalIndex1((prev) => paginate(prev[0] + 1, prev[0], PHOTOS_PROPERTY_HORIZONTAL.length));
        break;
      case 2:
        setHorizontalIndex2((prev) => paginate(prev[0] + 1, prev[0], PHOTOS_PROPERTY_HORIZONTAL.length));
        break;
    }
  }, [lastChanged]);

  useEffect(() => {
    const timer = setInterval(updateRandomImage, 3000);
    return () => clearInterval(timer);
  }, [updateRandomImage]);

  const [currentVerticalIndex, directionV] = verticalState;
  const [currentHorizontalIndex1, directionH1] = horizontalState1;
  const [currentHorizontalIndex2, directionH2] = horizontalState2;

  return (
    <LazyMotion features={loadFeatures}>
      <m.section className={styles.wrapper} variants={wrapperVariants} initial='hidden' animate='show'>
        <div className={styles.horizontalOuterWrapper}>
          <div className={styles.horizontalWrapper}>
            <AnimatePresence initial={false} custom={directionH1}>
              <m.div
                key={`horizontal1-${currentHorizontalIndex1}`}
                className={styles.slideWrapper}
                custom={directionH1}
                variants={slideVariants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{
                  duration: 0.5,
                }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={PHOTOS_PROPERTY_HORIZONTAL[currentHorizontalIndex1].src}
                    alt={PHOTOS_PROPERTY_HORIZONTAL[currentHorizontalIndex1].alt}
                    fill
                    sizes='350px'
                  />
                </div>
                <h3 className={styles.propertyType}>{PHOTOS_PROPERTY_HORIZONTAL[currentHorizontalIndex1].text}</h3>
              </m.div>
            </AnimatePresence>
          </div>

          <div className={styles.horizontalWrapper}>
            <AnimatePresence initial={false} custom={directionH2}>
              <m.div
                key={`horizontal2-${currentHorizontalIndex2}`}
                className={styles.slideWrapper}
                custom={directionH2}
                variants={slideVariants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{
                  duration: 0.5,
                }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={PHOTOS_PROPERTY_HORIZONTAL[currentHorizontalIndex2].src}
                    alt={PHOTOS_PROPERTY_HORIZONTAL[currentHorizontalIndex2].alt}
                    fill
                    sizes='350px'
                  />
                </div>
                <h3 className={styles.propertyType}>{PHOTOS_PROPERTY_HORIZONTAL[currentHorizontalIndex2].text}</h3>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.verticalWrapper}>
          <AnimatePresence initial={false} custom={directionV}>
            <m.div
              key={`vertical-${currentVerticalIndex}`}
              className={styles.slideWrapper}
              custom={directionV}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                duration: 0.5,
              }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={PHOTOS_PROPERTY_VERTICAL[currentVerticalIndex].src}
                  alt={PHOTOS_PROPERTY_VERTICAL[currentVerticalIndex].alt}
                  fill
                  sizes='350px'
                />
              </div>
              <h3 className={styles.propertyType}>{PHOTOS_PROPERTY_VERTICAL[currentVerticalIndex].text}</h3>
            </m.div>
          </AnimatePresence>
        </div>
      </m.section>
    </LazyMotion>
  );
}

export default MasonryGrid;
