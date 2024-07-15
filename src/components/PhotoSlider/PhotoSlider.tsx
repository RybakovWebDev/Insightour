import { useState } from "react";
import Image from "next/image";
import { LazyMotion, m } from "framer-motion";

import styles from "./PhotoSlider.module.css";

import { PHOTOS_ALL } from "@/constants";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

function PhotoSlider() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const filteredPhotos = PHOTOS_ALL.filter((photo) => photo.isPortrait === true);

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
                  width={350}
                  height={450}
                  priority={index === 0}
                  sizes='350px'
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
