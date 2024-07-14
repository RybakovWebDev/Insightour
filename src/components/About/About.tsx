"use client";
import Image from "next/image";
import { LazyMotion, m, useInView } from "framer-motion";

import styles from "./About.module.css";

import SectionName from "../SectionName";

import { useRefsContext } from "@/contexts/RefsContext";

import { PHOTOS_ABOUT } from "@/constants";
import CallToActionButton from "../CallToActionButton";
import { useRef } from "react";

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
  const { aboutRef } = useRefsContext();

  const h3WrapperRef = useRef(null);
  const textBlocksRef = useRef(null);

  const textBlocksInView = useInView(textBlocksRef, { once: true, amount: 0.3 });
  const h3WrapperInView = useInView(h3WrapperRef, { once: true, amount: 0.5 });

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={aboutRef} className={styles.wrapper}>
        <SectionName>about us</SectionName>
        <h2>
          WE OFFER A BRAND NEW FORMAT OF EXPLORING GEORGIA -
          <span> THROUGH STORIES, URBAN&nbsp;LEGENDS AND&nbsp;THEIR&nbsp;HEROES.</span>
        </h2>
        <div ref={textBlocksRef} className={styles.textBlocksWrapper}>
          <svg className={styles.snakePath} viewBox='0 0 100 400' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <mask id='lineMask'>
                <m.path
                  d='M 6 -17 C -42 44 138 97 82 150 C -123 234 39 229 108 315 C 103 349 78 369 46 391'
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
              d='M 6 -17 C -42 44 138 97 82 150 C -123 234 39 229 108 315 C 103 349 78 369 46 391'
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
          <TextBlock rotation={3}>Safety and comfort</TextBlock>
          <TextBlock rotation={-3}>Nature and architecture</TextBlock>
          <TextBlock rotation={3}>
            Bright gastronomic <br /> experience
          </TextBlock>
          <TextBlock rotation={-3}>Local color and traditions</TextBlock>
        </div>
        <m.div
          ref={h3WrapperRef}
          variants={container}
          initial='hidden'
          animate={h3WrapperInView ? "show" : "hidden"}
          className={styles.h3Wrapper}
        >
          <m.h3 variants={item}>DISCOVER</m.h3>
          <br />
          <m.h3 variants={item}>GEORGIA</m.h3>
          <br />
          <m.h3 variants={item}>THROUGH</m.h3>
          <br />
          <m.h3 variants={item} className={styles.accent}>
            EMOTIONS
          </m.h3>
        </m.div>
        <div className={styles.photosWrapper}>
          {PHOTOS_ABOUT.map((p, i) => {
            return (
              <div key={i} className={styles.imageWrapper}>
                <Image src={p.src} alt={p.alt} width={350} priority sizes={"300px"} />
              </div>
            );
          })}
        </div>
        <CallToActionButton />
      </section>
    </LazyMotion>
  );
}

export default About;
