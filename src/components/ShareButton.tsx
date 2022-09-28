import { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Upload, BookmarkPlusFill, BookmarkXFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { bookmarksActions } from "../redux/reducers/bookmarks";
import { AppDispatch, RootState } from "../redux/store";

const StatisticOfTweet = styled.div`
  transition-duration: 0.2s;
  :hover {
    color: rgb(0, 153, 255);
  }
`;

const StyledPopover = styled(Popover)`
  --bs-popover-max-width: 300px;
  inset: 45px -45px auto auto !important;
  .popover-arrow {
    display: none;
  }
  .popover-body {
    padding: 0;
  }
`;

const HoverBackgroundBlue = styled.div`
  :hover {
    background: rgb(230, 241, 248);
    transition-duration: 0.2s;
  }
`;

interface ShareButtonProps {
  isAddedBookmark?: boolean;
  tweetId: string;
}

const ShareButton = ({ isAddedBookmark, tweetId }: ShareButtonProps) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const bookmarks = useSelector<RootState, RootState["bookmarks"]["list"]>(
    (store) => store.bookmarks.list
  );

  const onAddBookmark = () => {
    if (isAddedBookmark) {
      bookmarks.docs.forEach((item) => {
        if (item.tweet._id === tweetId) {
          dispatch(bookmarksActions.deleteBookmark(item.tweet._id));
        }
      });
    } else {
      dispatch(bookmarksActions.addBookmark(tweetId));
    }
  };
  const { t } = useTranslation();
  return (
    <StatisticOfTweet
      onClick={() => setShow(!show)}
      className="d-flex align-items-center"
    >
      <div className="align-items-start align-top">
        <OverlayTrigger
          transition
          rootClose
          trigger="click"
          key="left"
          placement="left"
          show={show}
          overlay={
            <StyledPopover id="popover-positioned-left">
              <Popover.Body>
                <Button
                  onClick={onAddBookmark}
                  variant="light"
                  className="text-decoration-none text-reset d-flex flex-row p-1 pe-2 fs-6"
                >
                  <span className="px-2">
                    {isAddedBookmark ? <BookmarkXFill /> : <BookmarkPlusFill />}
                  </span>
                  {isAddedBookmark
                    ? "RemoveBookmark"
                    : t("sharebutton.bookmarks")}
                </Button>
              </Popover.Body>
            </StyledPopover>
          }
        >
          <HoverBackgroundBlue className="p-2 rounded-circle d-flex justify-content-center align-items-center">
            <Upload size="16" />
          </HoverBackgroundBlue>
        </OverlayTrigger>
      </div>
    </StatisticOfTweet>
  );
};

export default ShareButton;
