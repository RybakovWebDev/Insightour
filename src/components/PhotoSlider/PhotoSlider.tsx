import { useRef } from "react";
import Image from "next/image";
import { LazyMotion, m, useAnimation, AnimatePresence, useInView } from "framer-motion";

import styles from "./PhotoSlider.module.css";

import { PHOTOS_HOR } from "@/constants";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

function PhotoSlider() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filteredPhotos = PHOTOS_HOR;

  const animateSequence = async () => {
    await controls.start({
      x: "-200px",
      transition: { duration: 1.5, ease: "easeInOut", delay: 1 },
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    await controls.start({
      x: 0,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    });
  };

  if (isInView) {
    animateSequence();
  }

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
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image className={styles.image} src={photo.src} alt={photo.alt} priority={index < 2} sizes='650px' />
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
