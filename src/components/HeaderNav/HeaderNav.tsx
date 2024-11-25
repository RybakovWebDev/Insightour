"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "react-feather";
import { AnimatePresence, LazyMotion, m } from "framer-motion";

import styles from "./HeaderNav.module.css";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { useRefsContext } from "@/contexts/RefsContext";
import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";
import { NAVLINKS } from "@/constantsText";
import { scrollToRef } from "@/helpers";

const loadFeatures = () => import("../../features").then((res) => res.default);

function HeaderNav() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobileView = useScreenWidthDetect(450);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useLanguageContext();
  const { aboutRef, ratesRef, offersRef, contactRef } = useRefsContext();
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash === "#about") {
        scrollToRef(aboutRef);
      } else if (hash === "#rates") {
        scrollToRef(ratesRef);
      } else if (hash === "#offers") {
        scrollToRef(offersRef);
      } else if (hash === "#services") {
        scrollToRef(contactRef);
      } else if (hash === "#contact") {
        scrollToRef(contactRef);
      }
    }, 50);
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();

    if (pathname !== "/") router.push(`/#${slug}`);

    if (pathname === "/") {
      if (slug === "about") {
        scrollToRef(aboutRef);
      } else if (slug === "rates") {
        scrollToRef(ratesRef);
      } else if (slug === "offers") {
        scrollToRef(offersRef);
      } else if (slug === "services") {
        scrollToRef(contactRef);
      } else if (slug === "contact") {
        scrollToRef(contactRef);
      }
    }

    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <nav ref={navRef} className={styles.navContainer}>
        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls='main-menu'
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <m.div initial={{ rotate: 0 }} animate={{ rotate: isOpen ? 90 : 0 }}>
            <Menu color='#6d309d' size={32} />
          </m.div>
        </button>
        <AnimatePresence>
          {isMounted && (isOpen || !isMobileView) && (
            <m.nav
              id='main-menu'
              className={styles.nav}
              initial={isMobileView ? { opacity: 0 } : false}
              animate={isMobileView ? { height: "auto", opacity: 1 } : {}}
              exit={isMobileView ? { opacity: 0 } : {}}
              transition={{ duration: 0.2 }}
              aria-label='Main navigation'
            >
              <m.ul
                className={styles.list}
                key={"heroh1" + selectedLanguage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
              >
                {NAVLINKS.map((l) => (
                  <m.li
                    key={l.slug}
                    initial={{ borderBottom: "1px solid rgba(109, 48, 157, 0)" }}
                    whileHover={{ borderBottom: "1px solid rgba(109, 48, 157, 1)" }}
                  >
                    <Link href={l.href} onClick={(e) => handleLinkClick(e, l.slug)}>
                      {l.titles[selectedLanguage]}
                    </Link>
                  </m.li>
                ))}
              </m.ul>
            </m.nav>
          )}
        </AnimatePresence>
      </nav>
    </LazyMotion>
  );
}

export default HeaderNav;
