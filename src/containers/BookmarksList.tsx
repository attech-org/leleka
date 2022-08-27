import React from "react";
import { Button, Navbar, OverlayTrigger, Popover } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";
import styled from "styled-components";

import Bookmark from "../components/SingleTweetComment";
import { bookmarksData } from "../MOCKS/bookmarks";

const StyledNavbar = styled(Navbar)`
  background-color: rgba(255, 255, 255, 0.97) !important;
`;

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledPopover = styled(Popover)`
  .popover-arrow {
    display: none;
  }
`;

const StyledThreeDots = styled(ThreeDots)`
  height: 32px;
  width: 32px;
  &:hover {
    background-color: #c5c5c5;
    transition: 0.5s;
  }
`;

const BookmarksList: React.FC = () => {
  return (
    <div>
      <StyledNavbar sticky="top" expand="false" variant="light" bg="white">
        <StyledDiv>
          <div>
            <Navbar.Brand className="fw-bold px-3 py-1 m-0 row justify-comtent-start">
              Bookmarks
            </Navbar.Brand>
            <div className="px-3 py-0 m-0 row justify-comtent-start">
              @artlee4
            </div>
          </div>
          <div>
            <OverlayTrigger
              rootClose
              trigger="click"
              key="left"
              placement="left"
              overlay={
                <StyledPopover>
                  <Button variant="light"> Видалити всі закладки</Button>
                </StyledPopover>
              }
            >
              <StyledThreeDots className="m-2 p-2 rounded-circle" />
            </OverlayTrigger>
          </div>
        </StyledDiv>
      </StyledNavbar>

      {/* <InfiniteScroll
        pageStart={0}
        loadMore={() => )}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {items}
      </InfiniteScroll> */}

      {bookmarksData.map((item) => (
        <Bookmark
          key={item.id}
          userlogo={item.userlogo}
          username={item.username}
          userNickname={item.userNickname}
          responserUserNickname={item.responserUserNickname}
          messageText={item.messageText}
          messageDate={item.messageDate}
          answerCount={item.answerCount}
          retweetCount={item.retweetCount}
          likeCount={item.likeCount}
        />
      ))}
    </div>
  );
};

export default BookmarksList;
