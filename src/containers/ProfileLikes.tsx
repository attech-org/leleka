import { useDispatch, useSelector } from "react-redux";

import FeedSingleTweet from "../components/FeedSingleTweet";
// import SingleTweet from "../components/SingleTweet";
// import dataProfileLikes from "../MOCKS/dataProfileLikes.json";
import { likedTweetsActions } from "../redux/reducers/likedTweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2 } from "../types";
import InfiniteList from "./InfiniteList";

const Likes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const likedTweets = useSelector<RootState, RootState["tweets"]["feedTweets"]>(
    (store) => store.likedTweets.feedLikedTweets
  );
  const handleShowMore = () => {
    return (
      !likedTweets.isLoading &&
      dispatch(likedTweetsActions.fetchFeedLikedTweets(likedTweets))
    );
  };

  return (
    <InfiniteList<Tweet2>
      showMore={handleShowMore}
      data={likedTweets}
      itemComponent={(itemData) => <FeedSingleTweet {...itemData} />}
    />
  );
};

export default Likes;
