"use client";
import Image from "next/image";
import { AnimatePresence, LazyMotion, m, useInView } from "framer-motion";

import { ChevronUp, Phone } from "react-feather";

import styles from "./ContactButton.module.css";

import ExternalLinkIcon from "../ExternalLinkIcon";

import { useRefsContext } from "@/contexts/RefsContext";
import { ICONS, shevronAnimation, smoothSpring, SOCIALS } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function ContactButton() {
  const { headerRef, contactRef } = useRefsContext();

  const headerVisible = !useInView(headerRef);
  const contactsVisible = !useInView(contactRef);

  console.log(contactsVisible);

  const showButton = headerVisible && contactsVisible;

  const whatsappIcon = SOCIALS[0];

  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence>
        {showButton && (
          <m.a
            aria-label='Contact us on Whatsapp'
            className={styles.contactBtn}
            // onClick={handleClick}
            // onTap={handleClick}
            href={whatsappIcon.link}
            whileTap={{ scale: 0.9 }}
            whileHover={{
              opacity: 1,
            }}
            animate={{
              opacity: 1,
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={smoothSpring}
          >
            <Image src={ICONS.WhatsappColor.src} alt={ICONS.WhatsappColor.alt} fill objectFit='contain' />
          </m.a>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

export default ContactButton;
