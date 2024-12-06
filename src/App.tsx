import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FFlinks from "./components/FFlinks/FFlinks";
import ShowPage from "./components/ShowPage/ShowPage";
import Upload from "./components/Upload/Upload";
import ShowDownloads from "./components/ShowDownloads/ShowDownloads";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FFlinks />} />
          <Route path="show" element={<ShowPage />} />
          <Route path="upload" element={<Upload />} />
          <Route path="showDownloads" element={<ShowDownloads />} />
          <Route path="*" element={<FFlinks />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
