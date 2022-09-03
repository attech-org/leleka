import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedSingleTweet from "../components/FeedSingleTweet";
import { RootState } from "../redux/reducers";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch } from "../redux/store";
import { Tweet2 } from "../types";
import InfiniteList from "./InfiniteList";

const FeedPostsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector<RootState, Tweet2[]>(
    (store) => store.tweets.feedTweets
  );

  useEffect(() => {
    dispatch(tweetsActions.fetchFeedTweets());
  }, []);

  const mockPagination = {
    docs: posts,
    page: 1,
    limit: 10,
    hasNextPage: false,
  };

  return (
    <>
      <InfiniteList<Tweet2>
        showMore={() => {}}
        data={mockPagination}
        itemComponent={(itemData) => <FeedSingleTweet {...itemData} />}
      />
    </>
  );
};

export default FeedPostsContainer;
