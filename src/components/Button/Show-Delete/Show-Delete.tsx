import { useState } from "react";
import styles from "./Show-Delete.module.css";
import axios from "axios";

export default function ShowDelete() {
  const [loading, setLoading] = useState(false);

  const handleShow = () => {
    window.open("show");
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete("https://suk-learn-api.vercel.app/api/fflinks/DELETE");
    } catch (err) {
      console.error("Error occurred", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.buttons}>
      <button type="button" onClick={handleShow}>
        Show
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className={styles.loading}
      >
        {loading ? (
          <span className={styles.disabledButton}>"Deleting..."</span>
        ) : (
          "Clear"
        )}
      </button>
    </div>
  );
}
