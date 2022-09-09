import { useDispatch, useSelector } from "react-redux";

import SingleTweet from "../components/SingleTweet";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2 } from "../types";
import InfiniteList from "./InfiniteList";

export const TweetsWithReplies: React.FunctionComponent = () => {
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
      itemComponent={(itemData) => <SingleTweet {...itemData} />}
    />
  );
};
