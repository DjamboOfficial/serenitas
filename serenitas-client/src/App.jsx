// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Additional routes can be added here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
