import { Link } from "react-router-dom";
import styles from "./Upload_Footer.module.css";

const Upload_Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.link_container}>
        <Link to="/upload" className={styles.link}>
          Upload Page
        </Link>
        <Link to="/" className={styles.link}>
          Main
        </Link>
      </div>
    </div>
  );
};
export default Upload_Footer;
