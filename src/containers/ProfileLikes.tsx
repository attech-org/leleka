import { useDispatch, useSelector } from "react-redux";

import FeedLikesTweet from "../components/FeedLikesTweet";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet3 } from "../types";
import InfiniteList from "./InfiniteList";

const Likes = () => {
  const dispatch = useDispatch<AppDispatch>();

  const likedTweets = useSelector<
    RootState,
    RootState["tweets"]["feedLikedTweets"]
  >((store) => store.tweets.feedLikedTweets);

  const handleShowMore = () => {
    return (
      !likedTweets.isLoading &&
      dispatch(tweetsActions.fetchFeedLikedTweets(likedTweets))
    );
  };

  return (
    <InfiniteList<Tweet3>
      showMore={handleShowMore}
      data={likedTweets}
      itemComponent={(itemData) => <FeedLikesTweet {...itemData} />}
    />
  );
};

export default Likes;
