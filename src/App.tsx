import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, useSearchParams } from "react-router-dom";

import AboutPage from "./pages/About";
import AuthorizationPage from "./pages/Authorization";
import BookmarksPage from "./pages/Bookmarks";
import ExplorePage from "./pages/Explore";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import HomePage from "./pages/Home";
import ListsPage from "./pages/Lists";
import MessagesPage from "./pages/Messages";
import MorePage from "./pages/More";
import NotificationsPage from "./pages/Notifications";
import ProfilePage from "./pages/Profile";
import Trends from "./pages/Trends";
import Tweet from "./pages/Tweet";

const App: React.FunctionComponent = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("lang") !== i18n.resolvedLanguage) {
      searchParams.set("lang", i18n.resolvedLanguage);
      setSearchParams(searchParams);
    }
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    const lang = searchParams.get("lang") || "";
    if (lang && lang !== i18n.resolvedLanguage) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route
          path="/notifications"
          element={<NotificationsPage tabKey="all" />}
        />
        <Route
          path="/notifications/mentions"
          element={<NotificationsPage tabKey="mentions" />}
        />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/lists" element={<ListsPage />} />
        <Route path="/more" element={<MorePage />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/following" element={<Following />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/tweet/:id" element={<Tweet />} />
        <Route
          path="/:id/with_replies"
          element={<ProfilePage tabKey="tweets-with-replies" />}
        />
        <Route path="/:id/media" element={<ProfilePage tabKey="media" />} />
        <Route path="/:id/likes" element={<ProfilePage tabKey="likes" />} />
        <Route path="/:id" element={<ProfilePage tabKey="tweets" />} />
      </Routes>
    </div>
  );
};

export default App;
