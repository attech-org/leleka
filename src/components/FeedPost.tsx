// import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowRepeat, Chat, FileCheck, Upload } from "react-bootstrap-icons";
import styled from "styled-components";

import { FeedPostData } from "../MOCKS/homeFeedPage";
import LikeButton from "./LikeButton";

const Logo = styled.img`
  height: 48px;
  width: 48px;
  object-fit: cover;
`;

const UnderlineHover = styled.span`
  transition-duration: 0.2s;

  :hover {
    text-decoration: underline;
  }
`;

const StatisticOfTweet = styled.div`
  transition-duration: 0.2s;
  :hover {
    color: rgb(0, 153, 255);
  }
`;

const StatisticOfRetweets = styled.div`
  :hover {
    color: rgb(41, 228, 166);
  }
`;

const HoverBackgroundBlue = styled.div`
  :hover {
    background: rgb(230, 241, 248);
    transition-duration: 0.2s;
  }
`;

const HoverBackgroundGreen = styled.div`
  :hover {
    background: rgb(222, 241, 235);
    transition-duration: 0.2s;
  }
`;

const StyledFaRetweet = styled(ArrowRepeat)`
  width: 20px;
  height: 20px;
`;

const StyledFiShare = styled(Upload)`
  width: 20px;
  height: 20px;
`;

const StyledBiMessageRounded = styled(Chat)`
  width: 20px;
  height: 20px;
`;

const StyledMdVerified = styled(FileCheck)`
  color: rgb(29, 155, 240);
  width: 20px;
  height: 24px;
`;

const PostWrapper = styled.section`
  transition-duration: 0.2s;
  :hover {
    background: rgba(0, 0, 0, 0.03);
  }
`;

interface TweetPost {
  id: number;
  username: string;
  userNickname: string;
  userlogo: string;
  tweetText: string;
  tweetDate: string;
  retweetCount: number;
  tweetQuoteCount: number;
  likeCount: number;
  isVerified?: boolean;
  commentCount?: number;
}

const FeedPost = () => {
  const [posts, setPosts] = useState<TweetPost[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [firstArg, setFirstArg] = useState(0);
  const [secondArg, setSecondArg] = useState(10);
  const [isFetching, setIsFetching] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollHandler = (e: any) => {
    const containerHeight = e.target.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    if (containerHeight - (windowHeight + scrollTop) < 100) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (isFetching) {
      // axios
      //   .get(
      //     `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
      //   )
      //   .then((response) => {
      //     setPhotos([...photos, ...response.data]);
      //     setCurrentPage((prevState) => prevState + 1);
      //   })
      //   .finally(() => setIsFetching(false));

      // Comments will be useful to work with GET-requests!

      setFirstArg((prevState) => prevState + 5);
      setSecondArg((prevState) => prevState + 5);
      setPosts([...posts, ...FeedPostData.slice(firstArg, secondArg)]);
      setIsFetching(false);
    }
  }, [isFetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      {posts.map((obj) => (
        <PostWrapper
          className="border border-bottom-0 border-grey px-3 py-3 text-start d-flex justify-content-start fs-6"
          role="button"
          key={obj.id}
        >
          <Logo className="rounded-circle" src={obj.userlogo} alt="" />

          <div className="flex-grow-1 lh-sm ">
            <div className="d-flex align-items-center px-3">
              <UnderlineHover className="fw-600 me-2 ">
                {obj.username}
              </UnderlineHover>

              {obj.isVerified && <StyledMdVerified />}

              <UnderlineHover className="text-secondary">
                @{obj.userNickname}
              </UnderlineHover>
              <div className="mx-1 pb-2 text-secondary d-flex justify-content-center align-items-center">
                .
              </div>

              <UnderlineHover className="text-secondary">
                {obj.tweetDate}
              </UnderlineHover>
            </div>
            <div className="px-3 py 4">
              <span>{obj.tweetText}</span>

              <img className="rounded-4 w-100 mt-3" alt="" src={obj.userlogo} />
            </div>

            <div className="w-75 ms-5 d-flex justify-content-between align-items-center">
              <StatisticOfTweet className="d-flex align-items-center">
                <HoverBackgroundBlue className="p-2 rounded-circle d-flex justify-content-center align-items-center">
                  <StyledBiMessageRounded />
                </HoverBackgroundBlue>
                <div className="mx-1">{obj.commentCount}</div>
              </StatisticOfTweet>

              <StatisticOfRetweets className="d-flex align-items-center">
                <HoverBackgroundGreen className="p-2 rounded-circle d-flex justify-content-center align-items-center">
                  <StyledFaRetweet />
                </HoverBackgroundGreen>
                <div className="mx-1">{obj.retweetCount}</div>
              </StatisticOfRetweets>
              <LikeButton likesCount={obj.likeCount} />
              <StatisticOfTweet className="d-flex align-items-center">
                <HoverBackgroundBlue className="p-2 rounded-circle d-flex justify-content-center align-items-center">
                  <StyledFiShare />
                </HoverBackgroundBlue>
              </StatisticOfTweet>
            </div>
          </div>
        </PostWrapper>
      ))}
    </>
  );
};

export default FeedPost;
