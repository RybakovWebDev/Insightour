"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import styles from "./HeaderNav.module.css";

import { useRefsContext } from "@/contexts/RefsContext";
import { NAVLINKS } from "@/constants";
import { scrollToRef } from "@/helpers";

function HeaderNav() {
  const { aboutRef, offersRef, contactRef } = useRefsContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash === "#about") {
        scrollToRef(aboutRef);
      } else if (hash === "#offers") {
        scrollToRef(offersRef);
      } else if (hash === "#contact") {
        scrollToRef(contactRef);
      }
    }, 50);
  });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();

    if (pathname !== "/") router.push(`/#${slug}`);

    if (pathname === "/") {
      if (slug === "about") {
        scrollToRef(aboutRef);
      } else if (slug === "offers") {
        scrollToRef(offersRef);
      } else if (slug === "contact") {
        scrollToRef(contactRef);
      }
    }
  };

  return (
    <nav>
      <ul className={styles.list}>
        {NAVLINKS.map((l) => {
          return (
            <li key={l.slug} className={styles.link}>
              <Link href={l.href} onClick={(e) => handleLinkClick(e, l.slug)}>
                {l.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default HeaderNav;
