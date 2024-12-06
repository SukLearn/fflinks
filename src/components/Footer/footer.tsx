import { Link } from "react-router-dom";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <>
      <div id={styles.footer}>
        <Link
          id={styles._download}
          to="upload"
          className={styles.button1}
          title="upload"
        >
          Load File
        </Link>
      </div>
    </>
  );
}
