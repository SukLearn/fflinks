import styles from "./Hide.module.css";

interface HideProps {
  display: string;
  showHide: () => void;
}

export default function Hide({ display, showHide }: HideProps) {
  return (
    <button id={styles.hideShow} onClick={showHide}>
      {display === "block" ? "Hide" : "Show"}
    </button>
  );
}
