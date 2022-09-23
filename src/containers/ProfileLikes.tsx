import { useDispatch, useSelector } from "react-redux";

import FeedLikesTweet from "../components/FeedLikesTweet";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Like } from "../types";
import InfiniteList from "./InfiniteList";

const Likes = () => {
  const dispatch = useDispatch<AppDispatch>();

  const likedTweets = useSelector<RootState, RootState["tweets"]["likes"]>(
    (store) => store.tweets.likes
  );

  const handleShowMore = () => {
    return (
      !likedTweets.isLoading && dispatch(tweetsActions.fetchLikes(likedTweets))
    );
  };

  return (
    <InfiniteList<Like>
      showMore={handleShowMore}
      data={likedTweets}
      itemComponent={(itemData) => (
        <FeedLikesTweet key={itemData._id} {...itemData} />
      )}
    />
  );
};

export default Likes;
