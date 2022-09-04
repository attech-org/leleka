import { useDispatch, useSelector } from "react-redux";

import FeedSingleTweet from "../components/FeedSingleTweet";
import { RootState } from "../redux/reducers";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch } from "../redux/store";
import { Tweet2 } from "../types";
import InfiniteList from "./InfiniteList";

const FeedPostsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector<RootState, RootState["tweets"]["feedTweets"]>(
    (store) => store.tweets.feedTweets
  );
  const handleShowMore = () => {
    return !posts.isLoading && dispatch(tweetsActions.fetchFeedTweets(posts));
  };

  return (
    <InfiniteList<Tweet2>
      showMore={handleShowMore}
      data={posts}
      itemComponent={(itemData) => <FeedSingleTweet {...itemData} />}
    />
  );
};

export default FeedPostsContainer;
