import React, { useEffect } from "react";
import { Button, Navbar, OverlayTrigger, Popover } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import FeedSingleTweet from "../components/FeedSingleTweet";
import { bookmarksActions } from "../redux/reducers/bookmarks";
import { AppDispatch, RootState } from "../redux/store";
import { Bookmark } from "../types";
import InfiniteList from "./InfiniteList";

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
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState, RootState["user"]["authUser"]>(
    (store) => store.user.authUser
  );
  const bookmarks = useSelector<RootState, RootState["bookmarks"]["list"]>(
    (store) => store.bookmarks.list
  );

  useEffect(() => {
    dispatch(
      bookmarksActions.fetchBookmarks({
        limit: bookmarks.limit,
        nextPage: bookmarks.nextPage,
      })
    );
  }, []);

  const handleShowMore = () => {
    return (
      !bookmarks.isLoading &&
      dispatch(
        bookmarksActions.fetchBookmarks({
          limit: bookmarks.limit,
          nextPage: bookmarks.nextPage,
        })
      )
    );
  };

  const { t } = useTranslation();

  return (
    <div>
      <StyledNavbar sticky="top" expand="false" variant="light" bg="white">
        <StyledDiv>
          <div>
            <Navbar.Brand className="fw-bold px-3 py-1 m-0 row justify-comtent-start">
              {t("bookmarks.windowTitle")}
            </Navbar.Brand>
            <div className="px-3 py-0 m-0 row justify-comtent-start">
              {user._id ? `@${user.username}` : ""}
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
                  <Button variant="light">{t("bookmarks.clearAll")}</Button>
                </StyledPopover>
              }
            >
              <StyledThreeDots className="m-2 p-2 rounded-circle" />
            </OverlayTrigger>
          </div>
        </StyledDiv>
      </StyledNavbar>
      <>
        {bookmarks.docs.length ? (
          <InfiniteList<Bookmark>
            showMore={handleShowMore}
            data={bookmarks}
            itemComponent={(itemData) => (
              <FeedSingleTweet
                {...itemData.tweet}
                key={itemData._id}
                author={itemData.owner}
              />
            )}
          />
        ) : (
          t("bookmarks.noBookmarks")
        )}
      </>
    </div>
  );
};

export default BookmarksList;
