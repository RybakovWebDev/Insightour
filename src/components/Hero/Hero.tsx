"use client";
import { useState, useEffect, useRef } from "react";
import { LazyMotion, m } from "framer-motion";

import styles from "./Hero.module.css";

import CallToActionButton from "../CallToActionButton";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

function Hero() {
  const [isReady, setIsReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    setIsReady(false);

    const video = videoRef.current;
    if (!video) return;

    const checkVideoReady = () => {
      if (video.readyState >= 3) {
        setIsReady(true);
      }
    };

    checkVideoReady();

    video.addEventListener("canplay", checkVideoReady);
    video.addEventListener("loadeddata", checkVideoReady);

    return () => {
      video.removeEventListener("canplay", checkVideoReady);
      video.removeEventListener("loadeddata", checkVideoReady);
    };
  }, []);

  return (
    <LazyMotion features={loadFeatures}>
      <section className={styles.wrapper}>
        <h1>
          <span>Immersive tours</span>
          <br />
          &
          <br /> experiences of Georgia
        </h1>
        <div className={styles.videoWrapper}>
          <m.video
            ref={videoRef}
            src='https://storage.googleapis.com/insightour_media/insightour_hero_mute.mp4'
            playsInline
            autoPlay
            loop
            muted
            preload='auto'
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <CallToActionButton />
      </section>
    </LazyMotion>
  );
}

export default Hero;
