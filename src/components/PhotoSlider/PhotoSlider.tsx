import { useRef, useState } from "react";
import Image from "next/image";
import { LazyMotion, m, useAnimation, AnimatePresence, useInView } from "framer-motion";

import styles from "./PhotoSlider.module.css";

import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";
import { PHOTOS_HOR } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function PhotoSlider() {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const controls = useAnimation();
  const isMobileView = useScreenWidthDetect(450);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filteredPhotos = PHOTOS_HOR;

  const animateSequence = async () => {
    await controls.start({
      x: "-200px",
      transition: { duration: 1.5, ease: "easeInOut", delay: 1 },
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    await controls.start({
      x: 0,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    });
  };

  if (isInView) {
    animateSequence();
  }

  const handleLoad = (index: number) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <m.section className={styles.outerWrapper} ref={ref}>
        <div className={styles.innerWrapper}>
          <m.div className={styles.imageWrapper} animate={controls}>
            <AnimatePresence>
              {filteredPhotos.map((photo, index) => (
                <m.div
                  key={index}
                  className={styles.imageContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: loadedImages.includes(index) ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image
                    onLoad={() => handleLoad(index)}
                    className={styles.image}
                    src={photo.src}
                    alt={photo.alt}
                    sizes={isMobileView ? "300px" : "900px"}
                  />
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
}

export default PhotoSlider;
