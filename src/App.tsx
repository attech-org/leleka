import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, useSearchParams } from "react-router-dom";

import AboutPage from "./pages/About";
import HomePage from "./pages/Home";

const App: React.FunctionComponent = () => {
  const { i18n } = useTranslation();
  const setSearchParams = useSearchParams()[1];

  useEffect(() => {
    setSearchParams({ lng: i18n.resolvedLanguage });
  }, [i18n.resolvedLanguage]);

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
