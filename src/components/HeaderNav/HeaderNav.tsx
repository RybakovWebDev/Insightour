"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const { aboutRef, ratesRef, offersRef, servicesRef, contactRef } = useRefsContext();
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const handleHashScroll = useCallback(
    (hash: string) => {
      if (!hash) return;

      if (hash === "#about" && aboutRef.current) {
        scrollToRef(aboutRef);
      } else if (hash === "#rates" && ratesRef.current) {
        scrollToRef(ratesRef);
      } else if (hash === "#offers" && offersRef.current) {
        scrollToRef(offersRef);
      } else if (hash === "#services" && contactRef.current) {
        scrollToRef(servicesRef);
      } else if (hash === "#contact" && contactRef.current) {
        scrollToRef(contactRef);
      }
    },
    [aboutRef, ratesRef, offersRef, servicesRef, contactRef]
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);

    const scrollAttempts = [100, 300, 800];
    scrollAttempts.forEach((delay) => {
      setTimeout(() => {
        if (window.location.hash) {
          handleHashScroll(window.location.hash);
        }
      }, delay);
    });
  }, [handleHashScroll]);

  useEffect(() => {
    const handleHashChange = () => {
      handleHashScroll(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [aboutRef, ratesRef, offersRef, contactRef, handleHashScroll]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();

    if (pathname !== "/") {
      router.push(`/#${slug}`);
      return;
    }

    window.history.replaceState(null, "", `/#${slug}`);

    handleHashScroll(`#${slug}`);

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
