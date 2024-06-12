"use client";
import Image from "next/image";

import styles from "./About.module.css";

import SectionName from "../SectionName";

import { useRefsContext } from "@/contexts/RefsContext";

import { PHOTOS_ABOUT } from "@/constants";

interface TextBlockProps {
  rotation: number;
  children: React.ReactNode;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

function TextBlock({ rotation, children, left, right, top, bottom }: TextBlockProps) {
  return (
    <div
      className={styles.textBlock}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <p>{children}</p>
    </div>
  );
}

function About() {
  const { aboutRef } = useRefsContext();

  return (
    <section ref={aboutRef} className={styles.wrapper}>
      <SectionName>about us</SectionName>
      <h2>
        WE OFFER A BRAND NEW FORMAT OF EXPLORING THE CITY -
        <span> THROUGH STORIES, URBAN&nbsp;LEGENDS AND&nbsp;THEIR&nbsp;HEROES.</span>
      </h2>
      <div className={styles.textBlocksWrapper}>
        <TextBlock rotation={3}>
          Audio tours for <br /> solo travelers
        </TextBlock>
        <TextBlock rotation={-3}>
          Immersive tours - <br /> performances guided by actors
        </TextBlock>
      </div>
      <div className={styles.h1Wrapper}>
        <h1>We help discover</h1>
        <br />
        <h1>the city</h1>
        <h1 className={styles.accent}>Not through a set of</h1>
        <br />
        <h1 className={styles.accent}>dry facts,</h1>
        <br />
        <h1 className={styles.accent}>but through</h1>
        <br />
        <h1 className={styles.accent}>emotions</h1>
      </div>
      <div className={styles.infoWrapper}>
        <p>
          Insightour is a new way to get to know the city, a project for those that believe that &ldquo;excursions are
          not their thing&rdquo;.
        </p>
        <p>
          We help discover the city not through a set of dry facts, but through emotions, all because we have long been
          in love with Georgia, its history, legends and architecture.
        </p>
      </div>
      <div className={styles.photosWrapper}>
        {PHOTOS_ABOUT.map((p, i) => {
          return (
            <div key={i} className={styles.imageWrapper}>
              <Image src={p.src} alt={p.alt} width={350} sizes={"400px"} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default About;
