import styles from "./FFlinks.module.css";
import DOMPurify from "dompurify"; // DOMPurify for sanitizing input to prevent XSS attacks
import { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/footer";
import Flicker from "../Flicker/Flicker";
import ShowDelete from "../Button/Show-Delete/Show-Delete";
import Hide from "../Button/Hide/Hide";
import Gatsby from "../Button/Hide/GatsbyImg/Gatsby";
import HelpModal from "../HelpModal/HelpModal";

export default function FFlinks() {
  const [inputValue, setInputValue] = useState("");
  const [display, setDisplay] = useState("block");
  const [pasted, setPasted] = useState(false);
  const [sending, setSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const showHide = () => {
    const hide = display === "block" ? "none" : "block";
    setDisplay(hide);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (inputValue === "") {
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }
    setSending(true);

    const sanitizedInput = DOMPurify.sanitize(inputValue);

    try {
      const response = await axios.post(
        "https://suk-learn-api.vercel.app/api/fflinks/POST",
        { text: sanitizedInput },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Form submitted with response:", response.data);
      setSending(false);
      setInputValue("");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  const handlePasterFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
      setPasted(true);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  useEffect(() => {
    if (pasted && inputValue) {
      handleSubmit(
        new Event("submit", {
          bubbles: true, // Event bubbles up in the DOM (not necessary but added for completeness)
          cancelable: true, // Allows the event to be canceled if necessary
        }) as unknown as FormEvent // Type assertion to satisfy TypeScript
      );

      setPasted(false); // Reset the pasted state to prevent continuous submissions
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, pasted]); // Trigger this effect whenever inputValue or pasted changes

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <form onSubmit={handleSubmit}>
          <button
            id={styles.clipBoard}
            type="button"
            onClick={handlePasterFromClipboard}
          >
            ClipBoard
          </button>

          <input
            type="text"
            name="text-holder"
            autoFocus
            autoComplete="off"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setPasted(false);
            }}
            placeholder={isError ? "YOU MUST INPUT TEXT" : "Input Text Here"}
            className={`${styles.input_field} ${
              isError ? styles.input__error : ""
            }`}
          />

          <button id={styles.paste} type="submit">
            {sending ? (
              <span className={styles.sending}>Sending</span>
            ) : (
              "Paste"
            )}
          </button>

          <ShowDelete />
        </form>

        <Hide display={display} showHide={showHide} />
      </div>

      <Gatsby display={display} />
      <Flicker />
      <Footer />
      <HelpModal />
    </div>
  );
}
