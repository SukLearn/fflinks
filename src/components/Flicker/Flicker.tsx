import styles from "./Flicker.module.css";

export default function Flicker() {
  return (
    <>
      <div className={styles.sign}>
        <span className={styles.fastFlicker}>F</span>F
        <span className={styles.flicker}>LI</span>N
        <span className={styles.flicker}>K</span>S
      </div>
    </>
  );
}
