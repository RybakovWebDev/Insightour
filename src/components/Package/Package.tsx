import { OFFER_PACKAGES } from "@/constants";
import styles from "./Package.module.css";

interface PackageProps {
  title: string;
  length: string[];
}

function Package({ title, length }: PackageProps) {
  return (
    <article className={styles.wrapper}>
      <h3>{title}</h3>
      <ul>
        {length.map((l) => {
          return <li key={l}>{l}</li>;
        })}
      </ul>
    </article>
  );
}

export default Package;
