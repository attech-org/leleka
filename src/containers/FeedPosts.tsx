import { useEffect, useState } from "react";
import { Button, Navbar, OverlayTrigger, Popover } from "react-bootstrap";
import { Stars } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import FeedSingleTweet from "../components/FeedSingleTweet";
import Bookmark from "../components/SingleTweetComment";
import TweetCreationForm from "../components/TweetCreationForm";
import { bookmarksData } from "../MOCKS/bookmarks";
import instance from "../services/api";
import { Tweet2 } from "../types";
import InfiniteList from "./InfiniteList";

// create reducer for tweet instance

// define action getFeedTweets, that will fetch all tweets from "GET:/api/tweets" and save it to redux store
// in useEffect call dispatch(getFeedTweets());

// in FeedPosts replace all logic with redux store manipultaions, like:
// const posts = useSelector((store) => store.tweets.feedPosts);

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
  const [posts, setPosts] = useState<Tweet2[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const response = await instance.get("api/tweets");
      setPosts(response.data);
    };

    getData();
  }, []);

  const mockPagination = {
    docs: posts,
    page: 1,
    limit: 10,
    hasNextPage: false,
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
                  <Button variant="light">{t("bookmarks.clearAll")}</Button>
                </StyledPopover>
              }
            >
              <StyledStars className="m-2 p-2 rounded-circle" />
            </OverlayTrigger>
          </div>
        </StyledDiv>
      </StyledNavbar>

      <TweetCreationForm />

      {bookmarksData.slice(0, 5).map((item) => (
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

      <InfiniteList<Tweet2>
        showMore={() => {}}
        data={mockPagination}
        // eslint-disable-next-line
        // @ts-ignore
        itemComponent={(itemData) => <FeedSingleTweet {...itemData} />}
      />
    </div>
  );
};

export default FeedPostsContainer;
