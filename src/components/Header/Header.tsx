import Image from "next/image";

import styles from "./Header.module.css";

import HeaderNav from "../HeaderNav";

import { logoImage } from "@/constants";

function Header() {
  return (
    <header className={styles.wrapper}>
      <Image className={styles.image} src={logoImage} alt='Insightour logo' sizes={"100px"} />
      <HeaderNav />
    </header>
  );
}

export default Header;
