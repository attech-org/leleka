import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";

const App: React.FunctionComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
};

export default App;
