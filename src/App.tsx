import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
import RecommendationsPage from "./pages/RecommendationUsers";
import Trends from "./pages/Trends";
import Tweet from "./pages/Tweet";
import { RootState } from "./redux/store";

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

  const currentUserId = useSelector<RootState>(
    (store) => store.user.authUser._id
  );

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={currentUserId ? <HomePage /> : <AuthorizationPage />}
        />
        <Route
          path="/about"
          element={currentUserId ? <AboutPage /> : <AuthorizationPage />}
        />
        <Route
          path="/explore"
          element={currentUserId ? <ExplorePage /> : <AuthorizationPage />}
        />
        <Route
          path="/notifications"
          element={
            currentUserId ? (
              <NotificationsPage tabKey="all" />
            ) : (
              <AuthorizationPage />
            )
          }
        />
        <Route
          path="/notifications/mentions"
          element={
            currentUserId ? (
              <NotificationsPage tabKey="mentions" />
            ) : (
              <AuthorizationPage />
            )
          }
        />
        <Route
          path="/messages"
          element={currentUserId ? <MessagesPage /> : <AuthorizationPage />}
        />
        <Route
          path="/bookmarks"
          element={currentUserId ? <BookmarksPage /> : <AuthorizationPage />}
        />
        <Route
          path="/lists"
          element={currentUserId ? <ListsPage /> : <AuthorizationPage />}
        />
        <Route
          path="/more"
          element={currentUserId ? <MorePage /> : <AuthorizationPage />}
        />
        <Route
          path="/authorization"
          element={currentUserId ? <HomePage /> : <AuthorizationPage />}
        />
        <Route
          path="/followers"
          element={currentUserId ? <Followers /> : <AuthorizationPage />}
        />
        <Route
          path="/following"
          element={currentUserId ? <Following /> : <AuthorizationPage />}
        />
        <Route
          path="/trends"
          element={currentUserId ? <Trends /> : <AuthorizationPage />}
        />
        <Route
          path="/tweet/:id"
          element={currentUserId ? <Tweet /> : <AuthorizationPage />}
        />
        <Route
          path="/:id/with_replies"
          element={
            currentUserId ? (
              <ProfilePage tabKey="tweets-with-replies" />
            ) : (
              <AuthorizationPage />
            )
          }
        />
        <Route
          path="/:id/media"
          element={
            currentUserId ? (
              <ProfilePage tabKey="media" />
            ) : (
              <AuthorizationPage />
            )
          }
        />
        <Route
          path="/:id/likes"
          element={
            currentUserId ? (
              <ProfilePage tabKey="likes" />
            ) : (
              <AuthorizationPage />
            )
          }
        />
        <Route
          path="/:id"
          element={
            currentUserId ? (
              <ProfilePage tabKey="tweets" />
            ) : (
              <AuthorizationPage />
            )
          }
        />
        <Route
          path="/recommendationUsers"
          element={
            currentUserId ? <RecommendationsPage /> : <AuthorizationPage />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
