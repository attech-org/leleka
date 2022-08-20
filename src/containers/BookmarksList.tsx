import React from "react";
import { Navbar, Row, Col, Nav } from "react-bootstrap";

import Bookmark from "../components/SingleTweetComment";
import { bookmarksData } from "../MOCKS/bookmarks";

const BookmarksList: React.FC = () => {
  return (
    <div>
      <Navbar sticky="top" expand="false" variant="light" bg="white">
        <Row xs="auto" className=" justify-content-between">
          <Col className="mx-2">
            <Nav.Link>Bookmarks</Nav.Link>
            <Nav.Link>@artlee4</Nav.Link>
          </Col>
          <Col className="mx-2">
            <Nav.Link>dots</Nav.Link>
          </Col>
        </Row>
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
