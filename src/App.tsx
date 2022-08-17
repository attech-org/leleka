import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, useSearchParams } from "react-router-dom";

import AboutPage from "./pages/About";
import AuthorizationPage from "./pages/Authorization";
import HomePage from "./pages/Home";

const App: React.FunctionComponent = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set("lang", i18n.resolvedLanguage);
    setSearchParams(searchParams);
  }, [i18n.resolvedLanguage]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
      </Routes>
    </div>
  );
};

export default App;
