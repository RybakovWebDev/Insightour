import styles from "./page.module.css";

import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Offers from "@/components/Offers";
import BackToTop from "@/components/BackToTop";
import DaysBreakdown from "@/components/DaysBreakdown";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import CallToActionButton from "@/components/CallToActionButton";
import ContactButton from "@/components/ContactButton";
import ExtraServices from "@/components/ExtraServices";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <About />
      <Offers />
      <PhotoSlideshow portrait />
      <DaysBreakdown />
      <CallToActionButton />
      <ExtraServices />
      <Footer />
      <BackToTop />
      <ContactButton />
    </main>
  );
}
