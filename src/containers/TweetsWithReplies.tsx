import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedSingleTweet from "../components/FeedSingleTweet";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { LE, Tweet2, User } from "../types";
import { Pagination } from "../types/mock-api-types";
import InfiniteList from "./InfiniteList";

export const TweetsWithReplies = ({ userProps }: { userProps: LE<User> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = userProps._id;

  const posts = useSelector<
    RootState,
    RootState["tweets"]["userTweetsAndReplies"]
  >((store) => store.tweets.userTweetsAndReplies);

  const handleShowMore = () => {
    return (
      !posts.isLoading &&
      posts.hasNextPage &&
      !posts.error &&
      dispatch(tweetsActions.fetchUserTweetsReplies({ ...posts, userId }))
    );
  };
  useEffect(() => {
    dispatch(
      tweetsActions.fetchUserTweetsReplies({
        ...({} as LE<Pagination<Tweet2>>),
        userId,
        nextPage: 1,
        hasNextPage: true,
        init: true,
      })
    );
  }, [userProps]);

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
