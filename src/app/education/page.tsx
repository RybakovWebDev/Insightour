import styles from "./page.module.css";

import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";

export default function Education() {
  return (
    <section className={styles.wrapper}>
      <Header />
      <BackToTop />
      <ContactButton />
      <Footer />
    </section>
  );
}
