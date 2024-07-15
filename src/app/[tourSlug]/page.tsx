// "use client";
// import { useEffect, useId } from "react";
// import { useRouter } from "next/navigation";
// import { AnimatePresence, LazyMotion, m } from "framer-motion";

// import styles from "./page.module.css";

// import Header from "@/components/Header";

// import { DAYS_BREAKDOWN, OFFER_PACKAGES } from "@/constants";
// import { useDayContext } from "@/contexts/DayContext";
// import CallToActionButton from "@/components/CallToActionButton";
// import Footer from "@/components/Footer";

// const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

// interface Params {
//   tourSlug: string;
// }

// interface DaysSelectorProps {
//   options: number[];
// }

// const container = {
//   show: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemHeading = {
//   hidden: { opacity: 0, x: -10 },
//   show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
//   exit: { opacity: 0 },
// };

// const itemText = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { duration: 0.3 } },
//   exit: { opacity: 0 },
// };

// function DaysSelector({ options }: DaysSelectorProps) {
//   const { selectedDays, setSelectedDays } = useDayContext();

//   const id = useId();

//   const handleClick = (slug: number) => {
//     setSelectedDays(slug);
//   };

//   return (
//     <LazyMotion features={loadFeatures}>
//       <section className={styles.daySelector}>
//         {options.map((d) => {
//           return (
//             <button key={d} onClick={() => handleClick(d)}>
//               <h2>
//                 {d} Day{d !== 1 && "s"}
//               </h2>
//               <AnimatePresence>
//                 {selectedDays === d ? (
//                   <m.div
//                     className={styles.hovered}
//                     layoutId={id}
//                     initial={{ opacity: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
//                     animate={{
//                       opacity: 1,
//                       borderTopLeftRadius: selectedDays === 1 ? 15 : 0,
//                       borderTopRightRadius: selectedDays === 7 ? 15 : 0,
//                     }}
//                     exit={{ opacity: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
//                     transition={{ type: "spring", damping: 70, stiffness: 1000 }}
//                   />
//                 ) : null}
//               </AnimatePresence>
//             </button>
//           );
//         })}
//       </section>
//     </LazyMotion>
//   );
// }

// export default function TourPage({ params }: { params: Params }) {
//   const { selectedDays } = useDayContext();
//   const router = useRouter();

//   const selectedPackage = OFFER_PACKAGES.find((p) => p.slug === params.tourSlug);

//   useEffect(() => {
//     if (!selectedPackage) {
//       router.push("/");
//     }
//   }, [selectedPackage, router]);

//   if (!selectedPackage) {
//     return null;
//   }

//   return (
//     <LazyMotion features={loadFeatures}>
//       <article className={styles.wrapper}>
//         <Header />

//         <h1>{selectedPackage.title} tour</h1>

//         <DaysSelector options={selectedPackage.lengthDays} />

//         <m.ul variants={container} animate={"show"}>
//           <AnimatePresence>
//             {DAYS_BREAKDOWN.slice(0, selectedDays).map((d, i) => (
//               <m.li key={i}>
//                 <m.h3 variants={itemHeading} initial={"hidden"} animate={"show"} exit={"exit"}>
//                   {d.title}
//                 </m.h3>
//                 <m.p variants={itemText} initial={"hidden"} animate={"show"} exit={"exit"}>
//                   {d.description}
//                 </m.p>
//               </m.li>
//             ))}
//           </AnimatePresence>
//         </m.ul>

//         <CallToActionButton />

//         <Footer />
//       </article>
//     </LazyMotion>
//   );
// }
