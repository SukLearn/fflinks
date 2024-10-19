import { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import styles from "./HelpModal.module.css";

export default function HelpModal() {
  const [help, setHelp] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  const closeModal = () => {
    setHelp(false);
  };

  // Callback for keydown event handler
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const target = event.target as HTMLElement;

    if (
      target.tagName.toLowerCase() === "input" ||
      target.tagName.toLowerCase() === "textarea"
    ) {
      return;
    }

    // Update key sequence
    setKeySequence((prevSequence) => {
      const newSequence = [...prevSequence, event.key.toLowerCase()].slice(-8);
      const sequenceString = newSequence.join("");
      console.log(keySequence);
      // Mapping of key sequences to actions
      const actions: { [key: string]: () => void } = {
        fflinks: () => {
          window.location.replace("https://fflinks.net");
          setKeySequence([]);
        },
        suklearn: () => {
          window.location.replace("https://suklearn.com");
          setKeySequence([]);
        },
        "1996": () => {
          window.location.replace("http://localhost:5173/lashaUrod");
          setKeySequence([]);
        },
      };

      // Check if the sequence matches any defined action
      for (const [sequence, action] of Object.entries(actions)) {
        if (sequenceString.includes(sequence)) {
          action();
          return [];
        }
      }

      return newSequence;
    });

    if (event.key.toLowerCase() === "h") {
      setHelp(true);
    }
  }, []);

  // Effect to add and clean up the event listener for keydown events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown); // Switch to keydown
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]); // Add dependency array to ensure event listener is only added once

  return (
    <>
      <Modal
        isOpen={help}
        onRequestClose={closeModal}
        contentLabel="Content"
        ariaHideApp={false}
      >
        <div className={styles.container}>
          <div className={styles.truth}>
            <span className={styles.show}>
              <span>Welcome To Upgraded Fflinks</span>
            </span>
          </div>
          <br /> <br />
          <br />
          <p className={styles.content}>
            <span>The Creator is </span>
            <span id={styles.author}>Luka Tarkhnishvili</span>
          </p>
          <br />
          <p className={styles.text}>
            Here are some helpful key sequences to get you started: <br />
            Currently, we have "h" for help, and key sequences for "fflinks",
            "suklearn", and "1996".
          </p>
          <p className={styles.text}>YES I WANTED U GET BLIND</p>
        </div>
      </Modal>
    </>
  );
}
