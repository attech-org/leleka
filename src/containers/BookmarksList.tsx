import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import Bookmark from "../components/SingleTweetComment";
import { bookmarksData } from "../MOCKS/bookmarks";

const BookmarksList: React.FC = () => {
  return (
    <div>
      <Navbar sticky="top" expand="false" variant="light" bg="white">
        <Nav>
          <Nav>
            <Nav>Bookmarks</Nav>
            <Nav>@artlee4</Nav>
          </Nav>
          <Nav>
            <Nav>dots</Nav>
          </Nav>
        </Nav>
      </Navbar>
      {bookmarksData.map((item) => (
        <Bookmark
          key={item.id}
          userlogo={item.userlogo}
          username={item.username}
          userNickname={item.userNickname}
          responserUserNickname={item.responserUserNickname}
          messegeText={item.messegeText}
          messegeDate={item.messegeDate}
          answerCount={item.answerCount}
          retweetCount={item.retweetCount}
          likeCount={item.likeCount}
        />
      ))}
    </div>
  );
};

export default BookmarksList;
