import { useEffect, useRef } from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLHRElement>(null);

  useEffect(() => {
    let i = 0;
    const updateBar = () => {
      if (counterRef.current && barRef.current) {
        counterRef.current.innerHTML = i + "%";
        barRef.current.style.width = i + "%";
      }
      i += 5;
      if (i < 101) {
        setTimeout(updateBar, 20);
      }
    };

    updateBar();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.loading__container}>
          <h1>Loading</h1>
          <div className={styles.counter} ref={counterRef}>
            0%
          </div>
          <hr className={styles.loading__bar__back} />
          <hr className={styles.loading__bar__front} ref={barRef} />
        </div>
      </div>
    </>
  );
}
