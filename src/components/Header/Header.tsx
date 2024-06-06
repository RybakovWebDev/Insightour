"use client";
import Image from "next/image";
import Link from "next/link";

import styles from "./Header.module.css";

import HeaderNav from "../HeaderNav";

import { useRefsContext } from "@/contexts/RefsContext";
import { logoImage } from "@/constants";

function Header() {
  const { headerRef } = useRefsContext();

  return (
    <header ref={headerRef} className={styles.wrapper}>
      <Link href={"/"}>
        <Image className={styles.image} src={logoImage} alt='Insightour logo' sizes={"100px"} />
      </Link>
      <HeaderNav />
    </header>
  );
}

export default Header;
