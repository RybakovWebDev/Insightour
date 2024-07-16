"use client";
import { LazyMotion, m, useInView } from "framer-motion";

import styles from "./About.module.css";

import SectionName from "../SectionName";

import { useRefsContext } from "@/contexts/RefsContext";

import CallToActionButton from "../CallToActionButton";
import { useRef } from "react";
import PhotoSlider from "../PhotoSlider";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { About_Text } from "@/constants";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

interface TextBlockProps {
  rotation: number;
  children: React.ReactNode;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

const mainLineDrawDuration = 2;

const container = {
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0, transition: { type: "spring", damping: 40, stiffness: 250, restDelta: 0.01 } },
};

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
  const { selectedLanguage } = useLanguageContext();
  const { aboutRef } = useRefsContext();

  const h3WrapperRef = useRef(null);
  const textBlocksRef = useRef(null);

  const textBlocksInView = useInView(textBlocksRef, { once: true, amount: 0.3 });
  const h3WrapperInView = useInView(h3WrapperRef, { once: true, amount: 0.5 });

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={aboutRef} className={styles.wrapper}>
        <SectionName>{About_Text.sectionName[selectedLanguage]}</SectionName>
        <h2>
          {About_Text.intro1[selectedLanguage]} -
          <span>
            {About_Text.intro2[selectedLanguage]}&nbsp;{About_Text.intro3[selectedLanguage]}&nbsp;
            {About_Text.intro4[selectedLanguage]}&nbsp;{About_Text.intro5[selectedLanguage]}.
          </span>
        </h2>
        <div ref={textBlocksRef} className={styles.textBlocksWrapper}>
          <svg className={styles.snakePath} viewBox='0 0 100 400' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <mask id='lineMask'>
                <m.path
                  d='M 6 -17 C -42 44 138 97 82 150 C -121 245 39 229 108 315 C 103 349 78 369 46 391'
                  stroke='white'
                  strokeWidth='2'
                  fill='none'
                  initial={{ pathLength: 0 }}
                  animate={textBlocksInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: mainLineDrawDuration, ease: "easeInOut" }}
                />
              </mask>
            </defs>
            <path
              d='M 6 -17 C -42 44 138 97 82 150 C -121 245 39 229 108 315 C 103 349 78 369 46 391'
              stroke='#6d309d'
              strokeWidth='2'
              strokeDasharray='10 10'
              fill='none'
              mask='url(#lineMask)'
            />

            <m.path
              d='M 34 389 L 44 399'
              stroke='#6d309d'
              strokeWidth='2'
              strokeLinecap='round'
              initial={{ pathLength: 0, opacity: 0 }}
              animate={textBlocksInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: 0.25, ease: "easeInOut", delay: mainLineDrawDuration },
                opacity: { duration: 0.01, delay: mainLineDrawDuration },
              }}
            />
            <m.path
              d='M 34 399 L 44 389'
              stroke='#6d309d'
              strokeWidth='2'
              strokeLinecap='round'
              initial={{ pathLength: 0, opacity: 0 }}
              animate={textBlocksInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: 0.25, ease: "easeInOut", delay: mainLineDrawDuration + 0.25 },
                opacity: { duration: 0.01, delay: mainLineDrawDuration + 0.25 },
              }}
            />
          </svg>
          <TextBlock rotation={3}>{About_Text.textBlock1[selectedLanguage]}</TextBlock>
          <TextBlock rotation={-3}>{About_Text.textBlock2[selectedLanguage]}</TextBlock>
          <TextBlock rotation={3}>
            {About_Text.textBlock3[selectedLanguage]} <br /> {About_Text.textBlock3_5[selectedLanguage]}
          </TextBlock>
          <TextBlock rotation={-3}>{About_Text.textBlock4[selectedLanguage]}</TextBlock>
        </div>
        <m.div
          ref={h3WrapperRef}
          variants={container}
          initial='hidden'
          animate={h3WrapperInView ? "show" : "hidden"}
          className={styles.h3Wrapper}
        >
          <m.h3 variants={item}>{About_Text.discover1[selectedLanguage]}</m.h3>
          <br />
          <m.h3 variants={item}>{About_Text.discover2[selectedLanguage]}</m.h3>
          <br />
          <m.h3 variants={item}>{About_Text.discover3[selectedLanguage]}</m.h3>
          <br />
          <m.h3 variants={item} className={styles.accent}>
            {About_Text.discover4[selectedLanguage]}
          </m.h3>
        </m.div>
        {/* <div className={styles.photosWrapper}>
          {PHOTOS_ABOUT.map((p, i) => {
            return (
              <div key={i} className={styles.imageWrapper}>
                <Image src={p.src} alt={p.alt} width={350} priority sizes={"350px"} />
              </div>
            );
          })}
        </div> */}
        <PhotoSlider />
        <CallToActionButton />
      </section>
    </LazyMotion>
  );
}

export default About;
