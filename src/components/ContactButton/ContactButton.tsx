"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, LazyMotion, m, useInView } from "framer-motion";

import styles from "./ContactButton.module.css";

import { useRefsContext } from "@/contexts/RefsContext";
import { ICONS, smoothSpring, SOCIALS } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

const whatsappIcon = SOCIALS[0];

function ContactButton() {
  const [logoReady, setlogoReady] = useState(false);
  const { headerRef, contactRef } = useRefsContext();

  const headerVisible = !useInView(headerRef);
  const contactsVisible = !useInView(contactRef);

  const showButton = headerVisible && contactsVisible;

  const handleLoad = () => {
    setlogoReady(true);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence>
        {showButton && (
          <m.a
            aria-label='Contact us on Whatsapp'
            className={styles.contactBtn}
            href={whatsappIcon.link}
            whileTap={{ scale: 0.9 }}
            animate={{
              opacity: logoReady ? 0.8 : 0,
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={smoothSpring}
          >
            <Image src={ICONS.WhatsappColor.src} alt={ICONS.WhatsappColor.alt} fill onLoad={handleLoad} />
          </m.a>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

export default ContactButton;
