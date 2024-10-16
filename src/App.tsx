import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FFlinks from "./components/FFlinks/FFlinks";
import ShowPage from "./components/ShowPage/ShowPage";
import Lasha from "./components/1996/lasha";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FFlinks />} />
          <Route path="show" element={<ShowPage />} />
          <Route path="lashaUrod" element={<Lasha />} />
          <Route path="*" element={<FFlinks />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;