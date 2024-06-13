import styles from "./Hero.module.css";

import CallToActionButton from "../CallToActionButton";

//1080x1830

function Hero() {
  return (
    <section className={styles.wrapper}>
      <p className={styles.intro}>A new way to get to know the city</p>
      <h1>
        <span>Immersive tours</span>
        <br /> and audio guided experiences of Tbilisi
      </h1>
      <div className={styles.videoWrapper}>
        <video
          src='https://storage.googleapis.com/insightour_media/insightour_hero_mute.mp4'
          playsInline
          autoPlay
          loop
          muted
          preload='auto'
        />
      </div>
      <CallToActionButton />
    </section>
  );
}

export default Hero;
