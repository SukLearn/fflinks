import { useEffect, useState } from "react";
import Upload_Footer from "../Upload_Footer/Upload_Footer";
import styles from "./ShowDownloads.module.css";
const ShowDownloads = () => {
  const [files, setFiles] = useState<string[]>([]);
  // const [message, setMessage] = useState<string | null>(null);

  const trimming = (file: string) => {
    const text = file.split("/").pop();
    if (text && text.length > 80) {
      return text.substring(0, 80) + "...";
    }
    return text || "";
  };
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("https://fflinks.suklearn.com/upload.php");
        const fileList = await response.json();
        setFiles(fileList);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);

  const deleteFile = async (file: string) => {
    try {
      const response = await fetch("https://fflinks.suklearn.com/upload.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file }),
      });

      const result = await response.json();
      if (result.message) {
        // setMessage(result.message);
        setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
      } else {
        // setMessage(result.error || "Error deleting file.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      // setMessage("Error deleting file.");
    }
  };

  // Delete all files
  const deleteAllFiles = async () => {
    try {
      const response = await fetch("https://fflinks.suklearn.com/upload.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
      });

      const result = await response.json();
      if (result.message) {
        // setMessage(result.message);
        setFiles([]);
      } else {
        // setMessage(result.error || "Error deleting all files.");
      }
    } catch (error) {
      console.error("Error deleting all files:", error);
      // setMessage("Error deleting all files.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Available Files</h1>
      <div className={styles.table_wrapper}>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Download</td>
              <td>
                <button className={styles.delete} onClick={deleteAllFiles}>
                  Delete All{" "}
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{trimming(file)}</td>
                <td>
                  <a href={file} className={styles.download} download>
                    Download
                  </a>
                </td>
                <td>
                  <button
                    className={styles.delete}
                    onClick={() => deleteFile(file)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Upload_Footer />
    </div>
  );
};

export default ShowDownloads;
