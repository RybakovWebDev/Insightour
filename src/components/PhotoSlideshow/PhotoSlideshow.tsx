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

function PhotoSlideshow({ portrait = false }: PhotoSlideshowProps) {
  const isMobileView = useScreenWidthDetect(1080);
  const [currentImage, setCurrentImage] = useState(0);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [photos, setPhotos] = useState(portrait ? PHOTOS_VERT : PHOTOS_HOR);

  const slideVariants = {
    enter: {
      opacity: loadedImages.includes(currentImage) ? 0 : 1,
      x: "100%",
    },
    center: {
      opacity: loadedImages.includes(currentImage) ? 1 : 0,
      x: 0,
    },
    exit: {
      opacity: 1,
      x: "-100%",
    },
  };

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

  const handleImageLoad = (index: number) => {
    !firstImageLoaded && setFirstImageLoaded(true);
    setLoadedImages((prev) => [...prev, index]);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <m.section
        className={portrait ? styles.wrapperPortrait : styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: firstImageLoaded ? 1 : 0 }}
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
              x: { type: "spring", stiffness: 200, damping: 30, restDelta: 0.0001 },
            }}
          >
            <Image
              src={photos[currentImage].src}
              alt={photos[currentImage].alt}
              width={isMobileView ? 350 : 550}
              sizes={isMobileView ? "350px" : "550px"}
              onLoad={() => handleImageLoad(currentImage)}
            />
          </m.div>
        </AnimatePresence>
      </m.section>
    </LazyMotion>
  );
}

export default PhotoSlideshow;
