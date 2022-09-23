import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedLikesTweet from "../components/FeedLikesTweet";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { LE, Like, User } from "../types";
import { Pagination } from "../types/mock-api-types";
import InfiniteList from "./InfiniteList";

const Likes = ({ userProps }: { userProps: LE<User> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = userProps._id;

  const likedTweets = useSelector<RootState, RootState["tweets"]["userLikes"]>(
    (store) => store.tweets.userLikes
  );

  const handleShowMore = () => {
    return (
      !likedTweets.isLoading &&
      likedTweets.hasNextPage &&
      !likedTweets.error &&
      dispatch(tweetsActions.fetchUserLikes({ ...likedTweets, userId }))
    );
  };

  useEffect(() => {
    dispatch(
      tweetsActions.fetchUserLikes({
        ...({} as LE<Pagination<Like>>),
        userId,
        nextPage: 1,
        hasNextPage: true,
        init: true,
      })
    );
  }, [userProps]);

  return (
    <InfiniteList<Like>
      showMore={handleShowMore}
      data={likedTweets}
      itemComponent={(itemData) => (
        <FeedLikesTweet {...itemData} key={itemData._id} />
      )}
    />
  );
};

export default Likes;
