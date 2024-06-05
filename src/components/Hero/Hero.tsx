import styles from "./Hero.module.css";

import CallToActionButton from "../CallToActionButton";

//1080x1830

function Hero() {
  return (
    <section className={styles.wrapper}>
      <p>A new way to get to know the city</p>
      <h1>
        <span>Immersive tours</span> and audio guided experiences of Tbilisi
      </h1>
      <CallToActionButton />
      <video
        src='https://storage.cloud.google.com/insightour_media/insightour_hero_mute.mp4'
        autoPlay
        loop
        muted
        playsInline
      />
    </section>
  );
}

export default Hero;
