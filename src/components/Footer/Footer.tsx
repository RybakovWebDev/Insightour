"use client";
import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";

import ExternalLinkIcon from "../ExternalLinkIcon";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { useRefsContext } from "@/contexts/RefsContext";
import { ICONS, PHONES, SOCIALS } from "@/constants";
import { Footer_Text } from "@/constantsText";

function Footer() {
  const { selectedLanguage } = useLanguageContext();
  const { contactRef } = useRefsContext();

  return (
    <footer ref={contactRef} className={styles.footer}>
      <div className={styles.btcWrapper}>
        <p>{Footer_Text.acceptCrypto[selectedLanguage]}</p>
        <Image src={ICONS.Bitcoin.src} alt={ICONS.Bitcoin.alt} height={32} width={32} />
      </div>
      <div className={styles.contactsWrapper}>
        {PHONES.map((c) => {
          return (
            <a key={c.number} href={c.link}>
              {c.number}
            </a>
          );
        })}
      </div>
      <div className={styles.socialIconWrapper}>
        {SOCIALS.map((s, i) => {
          return (
            <div className={styles.icon} key={s.title}>
              <ExternalLinkIcon aria-label={`Open my ${s.title}`} link={s.link}>
                <Image src={s.iconProps.src} alt={s.iconProps.alt} height={32} width={32} />
              </ExternalLinkIcon>
              {i !== SOCIALS.length - 1 && <span className={styles.divider}>|</span>}
            </div>
          );
        })}
      </div>
      <a
        className={styles.address}
        href='https://maps.app.goo.gl/VJGyRnFFAk46pkpYA'
        target='_blank'
        rel='noopener noreferrer'
      >
        {Footer_Text.address.en}
      </a>
      <Link href={`/legal`} aria-label={`Legal information`} className={styles.legal}>
        {Footer_Text.legal[selectedLanguage]}
      </Link>
    </footer>
  );
}

export default Footer;
