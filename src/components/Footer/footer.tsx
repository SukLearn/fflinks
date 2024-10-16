import styles from "./footer.module.css";

export default function Footer() {
  return (
    <>
      <div id={styles.footer}>
        <a
          id={styles._download}
          href="upload"
          className={styles.button1}
          title="upload"
        >
          Load File
        </a>
      </div>
    </>
  );
}
