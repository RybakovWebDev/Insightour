"use client";
import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";

import ExternalLinkIcon from "../ExternalLinkIcon";

import { useRefsContext } from "@/contexts/RefsContext";
import { CONTACTS, SOCIALS } from "@/constants";

function Footer() {
  const { contactRef } = useRefsContext();
  return (
    <footer ref={contactRef} className={styles.footer}>
      <div className={styles.contactsWrapper}>
        {CONTACTS.map((c) => {
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
      <Link href={`/legal`} aria-label={`Legal information`} className={styles.legal}>
        Legal
      </Link>
    </footer>
  );
}

export default Footer;
