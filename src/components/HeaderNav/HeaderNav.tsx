"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "react-feather";
import { AnimatePresence, LazyMotion, m } from "framer-motion";

import styles from "./HeaderNav.module.css";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { useRefsContext } from "@/contexts/RefsContext";
import { NAVLINKS } from "@/constants";
import { scrollToRef } from "@/helpers";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

function HeaderNav() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useLanguageContext();
  const { aboutRef, ratesRef, offersRef, contactRef } = useRefsContext();
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth <= 450);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      <div ref={navRef} className={styles.navContainer}>
        <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          <Menu color='#6d309d' size={32} />
        </button>
        <AnimatePresence>
          {(isOpen || !isMobileView) && (
            <m.nav
              className={styles.nav}
              initial={isMobileView ? { height: 0, opacity: 0 } : false}
              animate={isMobileView ? { height: "auto", opacity: 1 } : {}}
              exit={isMobileView ? { height: 0, opacity: 0 } : {}}
              transition={{ duration: 0.2 }}
            >
              <ul className={styles.list}>
                {NAVLINKS.map((l) => (
                  <Link key={l.slug} href={l.href} onClick={(e) => handleLinkClick(e, l.slug)}>
                    <li>{l.titles[selectedLanguage]}</li>
                  </Link>
                ))}
              </ul>
            </m.nav>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}

export default HeaderNav;
