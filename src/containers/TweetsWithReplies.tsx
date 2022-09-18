import { useDispatch, useSelector } from "react-redux";

import FeedSingleTweet from "../components/FeedSingleTweet";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2 } from "../types";
import InfiniteList from "./InfiniteList";

export const TweetsWithReplies: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector<
    RootState,
    RootState["tweets"]["myTweetsAndReplies"]
  >((store) => store.tweets.myTweetsAndReplies);

  const handleShowMore = () => {
    return (
      !posts.isLoading && dispatch(tweetsActions.fetchMyTweetsAndReplies(posts))
    );
  };

  return (
    <InfiniteList<Tweet2>
      showMore={handleShowMore}
      data={posts}
      itemComponent={(itemData) => (
        <FeedSingleTweet key={itemData._id} {...itemData} />
      )}
    />
  );
};
