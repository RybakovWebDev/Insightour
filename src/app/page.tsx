import styles from "./page.module.css";

import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Offers from "@/components/Offers";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <About />
      <Offers />
      <Footer />
    </main>
  );
}
