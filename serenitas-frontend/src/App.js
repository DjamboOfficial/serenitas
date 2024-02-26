import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./homepage.css";
import { Homepage } from "./pages/Homepage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}
