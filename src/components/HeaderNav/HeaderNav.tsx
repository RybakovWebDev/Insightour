"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import styles from "./HeaderNav.module.css";

import { NAVLINKS } from "@/constants";

function HeaderNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();

    if (pathname !== "/") router.push(`/#${slug}`);

    if (pathname === "/") {
      if (slug === "projects") {
        // scrollToRef(projectSelectorRef);
      } else if (slug === "about") {
        // scrollToRef(aboutRef);
      } else if (slug === "contact") {
        // scrollToRef(footerRef);
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
