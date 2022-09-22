import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedSingleTweet from "../components/FeedSingleTweet";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2, User, LE } from "../types";
import { Pagination } from "../types/mock-api-types";
import InfiniteList from "./InfiniteList";

const ProfileTweets = ({ userProps }: { userProps: LE<User> }) => {
  console.log(userProps.username);

  const dispatch = useDispatch<AppDispatch>();

  const user = userProps;
  // const user = useSelector<RootState, RootState["user"]["userByUsername"]>(
  //   (store) => store.user.userByUsername
  // );
  const userId = user._id;
  // const posts = useSelector<RootState, RootState["tweets"]["myTweets"]>(
  //   (store) => store.tweets.myTweets
  // );

  const userPosts = useSelector<RootState, RootState["tweets"]["userTweets"]>(
    (store) => store.tweets.userTweets
  );
  console.log(userProps.username);
  const handleShowMore = () => {
    console.log("BIG TEST");
    console.log(userProps._id);
    console.log(userId);
    return (
      !userPosts.isLoading &&
      userPosts.hasNextPage &&
      !userPosts.error &&
      dispatch(tweetsActions.fetchUserTweets({ ...userPosts, userId }))
    );
    // !posts.isLoading && dispatch(tweetsActions.fetchMyTweets(posts));
  };
  // useEffect(() => {
  //   dispatch(
  //     tweetsActions.initUserTweets({
  //       ...({} as LE<Pagination<Tweet2>>),
  //       userId,
  //       nextPage: 1,
  //       hasNextPage: true,

  //     })
  //   );
  // }, [userProps]);
  useEffect(() => {
    dispatch(
      tweetsActions.fetchUserTweets({
        ...({} as LE<Pagination<Tweet2>>),
        userId,
        nextPage: 1,
        hasNextPage: true,
        init: true,
      })
    );
  }, [userProps]);
  return (
    <>
      <InfiniteList<Tweet2>
        showMore={handleShowMore}
        data={userPosts}
        itemComponent={(itemData) => (
          <FeedSingleTweet key={itemData._id} {...itemData} />
        )}
      />
    </>
  );
};

export default ProfileTweets;
