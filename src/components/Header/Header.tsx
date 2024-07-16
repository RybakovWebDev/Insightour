"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyMotion, m } from "framer-motion";

import styles from "./Header.module.css";

import HeaderNav from "../HeaderNav";
import LanguageSelector from "../LanguageSelector";

import { useRefsContext } from "@/contexts/RefsContext";
import { logoImage } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function Header() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { headerRef } = useRefsContext();

  const handleLoaded = () => {
    setLogoLoaded(true);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <m.header
        ref={headerRef}
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: logoLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href={"/"} className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              className={styles.logo}
              src={logoImage}
              alt='Insightour logo'
              priority
              fill
              sizes={"400px"}
              onLoad={handleLoaded}
            />
          </div>
        </Link>
        <div className={styles.menuWrapper}>
          <LanguageSelector />
          <HeaderNav />
        </div>
      </m.header>
    </LazyMotion>
  );
}

export default Header;
