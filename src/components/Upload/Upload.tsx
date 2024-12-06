import { useState } from "react";
import styles from "./Upload.module.css";
import Modal from "react-modal";
import Upload_Footer from "../Upload_Footer/Upload_Footer";
import { Link } from "react-router-dom";

const Upload = () => {
  const [uploaded, setUploaded] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploaded(true);
      setFiles(e.target.files);
    }
  };
  const trim = (text: string) => {
    if (text.length > 80) {
      return text.substring(0, 80) + "...";
    }
    return text;
  };
  const customStyles = {
    content: {
      top: "10%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "#09192F",
      color: "#54CDB5",
      fontFamily: "sans-serif",
      transform: "translate(-50%, -10%)",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploaded(false);
    setIsOpen(true);

    if (!files || files.length === 0) {
      setMessages(["Please select files to upload."]);
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files[]", file);
    });

    try {
      const response = await fetch("https://fflinks.suklearn.com/upload.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const result = await response.json();
      setMessages(
        Array.isArray(result) ? result : [result.error || "Unknown error"]
      );
    } catch (error) {
      console.error("Error uploading files:", error);
      setMessages(["An error occurred while uploading the files."]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Anything From Anywhere</h1>
      <form onSubmit={handleSubmit} className={styles.main}>
        <label htmlFor="files" className={styles.upload}>
          Choose files {uploaded ? "✅" : ""}
        </label>
        <input
          type="file"
          id="files"
          onChange={handleFileChange}
          multiple
          accept="*/*"
        />
        <button type="submit" className={styles.submitButton}>
          Upload
        </button>
      </form>
      <Link to="/showDownloads" className={styles.showDownloads}>
        Show Downloads
      </Link>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Status Modal"
      >
        <h2 className={styles.modal_title}>Upload Status:</h2>
        <ul>
          {messages.map((message, index) => (
            <li className={styles.modal_list} key={index}>
              <span id={styles.modal_digit}>{!files ? "" : index + 1} </span>
              {trim(message)}
            </li>
          ))}
        </ul>
      </Modal>
      <Upload_Footer />
    </div>
  );
};

export default Upload;
