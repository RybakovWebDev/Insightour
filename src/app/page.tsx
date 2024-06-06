import Image from "next/image";

import styles from "./page.module.css";

import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Offers from "@/components/Offers";
import background from "../../public/images/background/Group_53.png";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.backgroundImageWrapper}>
        <Image src={background} alt='Background image' height={1350} sizes={"400px"} />
      </div>
      <Header />
      <Hero />
      <About />
      <Offers />
      <Footer />
    </main>
  );
}
