import Image from "next/image";

import styles from "./Header.module.css";

import HeaderNav from "../HeaderNav";

import { logoImage } from "@/constants";
import Link from "next/link";

function Header() {
  return (
    <header className={styles.wrapper}>
      <Link href={"/"}>
        <Image className={styles.image} src={logoImage} alt='Insightour logo' sizes={"100px"} />
      </Link>
      <HeaderNav />
    </header>
  );
}

export default Header;
