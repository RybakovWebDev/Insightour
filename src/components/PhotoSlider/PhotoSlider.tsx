import { useState } from "react";
import Image from "next/image";
import { LazyMotion, m } from "framer-motion";

import styles from "./PhotoSlider.module.css";

import { PHOTOS_ALL, PHOTOS_HOR } from "@/constants";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

function PhotoSlider() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const filteredPhotos = PHOTOS_HOR;

  const handleLoad = () => {
    setImageLoaded(true);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <m.section className={styles.outerWrapper} initial={{ opacity: 0 }} animate={{ opacity: imageLoaded ? 1 : 0 }}>
        <div className={styles.innerWrapper}>
          <m.div className={styles.imageWrapper}>
            {filteredPhotos.map((photo, index) => (
              <div key={index} className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={photo.src}
                  alt={photo.alt}
                  priority={index === 0}
                  sizes='650px'
                  onLoad={handleLoad}
                />
              </div>
            ))}
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
}

export default PhotoSlider;
