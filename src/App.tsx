import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, useSearchParams } from "react-router-dom";

import AboutPage from "./pages/About";
import AuthorizationPage from "./pages/Authorization";
import BookmarksPage from "./pages/Bookmarks";
import ExplorePage from "./pages/Explore";
import RecomendedFollowsPage from "./pages/Followers";
import HomePage from "./pages/Home";
import ListsPage from "./pages/Lists";
import MessagesPage from "./pages/Messages";
import MorePage from "./pages/More";
import NotificationsPage from "./pages/Notifications";
import ProfilePage from "./pages/Profile";

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
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/lists" element={<ListsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/more" element={<MorePage />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/followers" element={<RecomendedFollowsPage />} />
      </Routes>
    </div>
  );
};

export default App;
