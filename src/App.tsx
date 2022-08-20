import React from "react";
import { Routes, Route } from "react-router-dom";

import AboutPage from "./pages/About";
import Followers from "./pages/Followers";
import HomePage from "./pages/Home";

const App: React.FunctionComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/followers" element={<Followers />} />
      </Routes>
    </div>
  );
};

export default App;
