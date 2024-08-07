import { ReactNode } from "react";

import styles from "./SectionName.module.css";

interface SectionNameProps {
  children: ReactNode;
  [key: string]: any;
}

function SectionName({ children }: SectionNameProps) {
  return (
    <p className={styles.sectionName}>
      <span>(</span>
      {children}
      <span>)</span>
    </p>
  );
}

export default SectionName;
