import { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import styles from "./ShowPage.module.css";
import axios from "axios";
import Author from "../Author/author";
import Loading from "../LoadingPage/Loading";
import HelpModal from "../HelpModal/HelpModal";

interface DataItem {
  id: number;
  input_value: string;
}

export default function ShowPage() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const trimming = useCallback(
    (text: string) => {
      if (windowWidth < 411) {
        return text.substring(0, 5) + "...";
      }
      if (text.length >= 25) {
        return text.substring(0, 25) + "...";
      }
      return text;
    },
    [windowWidth]
  );

  const copyToClipBoard = useCallback((text: string, index: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text due to: ", err);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://suk-learn-api.vercel.app/api/fflinks/GET"
        );
        if (response.data && Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          throw new Error("Data format is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (index: number) => {
    setIsOpen(true);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedIndex(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title__truth}>
        <span className={styles.title__show}>
          <span>Show Data</span>
        </span>
      </div>
      <div className={styles.table__container}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Value</th>
              <th>Copy</th>
              <th>View Full</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{trimming(item.input_value)}</td>
                <td>
                  <button
                    className={styles.copyToClipboard}
                    onClick={() => copyToClipBoard(item.input_value, index)}
                  >
                    {copiedIndex === index ? <span>&#9989;</span> : "Copy"}
                  </button>
                </td>
                <td>
                  <button
                    className={styles.modalButton}
                    onClick={() => openModal(index)}
                  >
                    View All
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalIsOpen && selectedIndex !== null && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Content"
          ariaHideApp={false}
        >
          <div className={styles.modal__content}>
            {data[selectedIndex]?.input_value}
          </div>
        </Modal>
      )}

      <Author />
      <HelpModal />
    </div>
  );
}
