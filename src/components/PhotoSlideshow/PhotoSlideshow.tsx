"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LazyMotion, AnimatePresence, m } from "framer-motion";

import styles from "./PhotoSlideshow.module.css";
import { PHOTOS_ALL } from "@/constants";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

interface PhotoSlideshowProps {
  portrait?: boolean;
}

const slideVariants = {
  enter: {
    x: "100%",
  },
  center: {
    x: 0,
  },
  exit: {
    x: "-100%",
  },
};

function PhotoSlideshow({ portrait = false }: PhotoSlideshowProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const filteredPhotos = PHOTOS_ALL.filter((photo) => photo.isPortrait === portrait);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevIndex) => {
        const nextIndex = (prevIndex + 1) % filteredPhotos.length;
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [filteredPhotos.length]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <m.section
        className={portrait ? styles.wrapperPortrait : styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
      >
        <AnimatePresence initial={false}>
          <m.div
            className={styles.imageWrapper}
            key={currentImage}
            custom={currentImage}
            initial='enter'
            animate='center'
            exit='exit'
            variants={slideVariants}
            transition={{
              x: { type: "spring", stiffness: 200, damping: 30, restDelta: 0.01 },
            }}
          >
            <Image
              src={filteredPhotos[currentImage].src}
              alt={filteredPhotos[currentImage].alt}
              width={350}
              sizes={"350px"}
              priority
              onLoad={handleImageLoad}
            />
          </m.div>
        </AnimatePresence>
      </m.section>
    </LazyMotion>
  );
}

export default PhotoSlideshow;
