import React from "react";
import { Routes, Route } from "react-router-dom";

import AboutPage from "./pages/About";
import BookmarksPage from "./pages/Bookmarks";
import ExplorePage from "./pages/Explore";
import HomePage from "./pages/Home";
import ListsPage from "./pages/Lists";
import MessagesPage from "./pages/Messages";
import MorePage from "./pages/More";
import NotificationsPage from "./pages/Notifications";
import ProfilePage from "./pages/Profile";

const App: React.FunctionComponent = () => {
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
      </Routes>
    </div>
  );
};

export default App;
