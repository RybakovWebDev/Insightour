"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LazyMotion, AnimatePresence, m } from "framer-motion";

import styles from "./PhotoSlideshow.module.css";

import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";
import { PHOTOS_HOR, PHOTOS_VERT } from "@/constants";
import { shuffleArray } from "@/helpers";

const loadFeatures = () => import("../../features").then((res) => res.default);

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
  const isMobileView = useScreenWidthDetect(1080);
  const [currentImage, setCurrentImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [photos, setPhotos] = useState(portrait ? PHOTOS_VERT : PHOTOS_HOR);

  useEffect(() => {
    // Shuffle the array only on the client-side after the initial render
    setPhotos(shuffleArray([...photos]));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % photos.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [photos.length]);

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
              src={photos[currentImage].src}
              alt={photos[currentImage].alt}
              width={isMobileView ? 350 : 550}
              // height={1000}
              sizes={isMobileView ? "350px" : "550px"}
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
