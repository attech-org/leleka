import { Button, Navbar, OverlayTrigger, Popover } from "react-bootstrap";
import { Stars } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import FeedSingleTweet from "../components/FeedSingleTweet";
import TweetCreationForm from "../components/TweetCreationForm";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2 } from "../types";
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

const StyledStars = styled(Stars)`
  height: 32px;
  width: 32px;
  &:hover {
    background-color: #c5c5c5;
    transition: 0.5s;
  }
`;

const FeedPostsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector<RootState, RootState["tweets"]["feedTweets"]>(
    (store) => store.tweets.feedTweets
  );

  const { t } = useTranslation();

  const handleShowMore = () => {
    return !posts.isLoading && dispatch(tweetsActions.fetchFeedTweets(posts));
  };

  return (
    <div className="border">
      <StyledNavbar sticky="top" expand="false" variant="light" bg="white">
        <StyledDiv>
          <Navbar.Brand className="fw-bold px-3 py-1 m-0 row justify-comtent-start">
            {t("homepage.title")}
          </Navbar.Brand>
          <div>
            <OverlayTrigger
              rootClose
              trigger="click"
              key="left"
              placement="left"
              overlay={
                <StyledPopover>
                  <Button variant="light">{t("homepage.button.title")}</Button>
                </StyledPopover>
              }
            >
              <StyledStars className="m-2 p-2 rounded-circle" />
            </OverlayTrigger>
          </div>
        </StyledDiv>
      </StyledNavbar>

      <TweetCreationForm />

      <InfiniteList<Tweet2>
        showMore={handleShowMore}
        data={posts}
        itemComponent={(itemData) => <FeedSingleTweet {...itemData} />}
      />
    </div>
  );
};

export default FeedPostsContainer;
