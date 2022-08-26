// import axios from "axios";
import { useEffect, useState } from "react";

import { FeedPostData } from "../MOCKS/homeFeedPage";
import SingleTweet from "./SingleTweet";

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

  const Post = posts.map(
    ({
      userlogo,
      username,
      userNickname,
      tweetText,
      tweetDate,
      retweetCount,
      tweetQuoteCount,
      likeCount,
      id,
    }) => (
      <SingleTweet
        key={id}
        userlogo={userlogo}
        username={username}
        userNickname={userNickname}
        tweetText={tweetText}
        tweetDate={tweetDate}
        retweetCount={retweetCount}
        tweetQuoteCount={tweetQuoteCount}
        likeCount={likeCount}
      />
    )
  );

  return <>{Post}</>;
};

export default FeedPost;
