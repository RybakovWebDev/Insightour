import styles from "./page.module.css";

import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

export default function Legal() {
  return (
    <section className={styles.wrapper}>
      <Header />
      <BackToTop />
      <Footer />
    </section>
  );
}
