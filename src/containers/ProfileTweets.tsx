import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedSingleTweet from "../components/FeedSingleTweet";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2, User, LE } from "../types";
import { Pagination } from "../types/mock-api-types";
import InfiniteList from "./InfiniteList";

const ProfileTweets = ({ userProps }: { userProps: LE<User> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = userProps._id;

  const userPosts = useSelector<RootState, RootState["tweets"]["userTweets"]>(
    (store) => store.tweets.userTweets
  );

  const authUser = useSelector<RootState, RootState["user"]["authUser"]>(
    (store) => store.user.authUser
  );

  const userPostsInit = useSelector<
    RootState,
    RootState["tweets"]["userTweets"]["init"]
  >((store) => store.tweets.userTweets.init);

  const userByUsername = useSelector<
    RootState,
    RootState["user"]["userByUsername"]
  >((store) => store.user.userByUsername);

  const handleShowMore = () => {
    return (
      !userPosts.isLoading &&
      userPosts.hasNextPage &&
      !userPosts.error &&
      dispatch(tweetsActions.fetchUserTweets({ ...userPosts, userId }))
    );
  };

  useEffect(() => {
    dispatch(
      tweetsActions.initUserTweets({
        ...({} as LE<Pagination<Tweet2>>),
        userId,
        nextPage: 1,
        hasNextPage: true,
        init: true,
      })
    );
    console.log("useEffect INIT");
    console.log(userPostsInit);
    console.log(userPosts.docs.length);
  }, [userProps, authUser, userByUsername]);

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
    console.log("useEffect");
    console.log(userPostsInit);
    console.log(userPosts.docs.length);
  }, [userProps, authUser, userByUsername, userPostsInit]);
  return (
    <>
      <InfiniteList<Tweet2>
        showMore={handleShowMore}
        data={userPosts}
        itemComponent={(itemData) => (
          <FeedSingleTweet key={`proftweet${itemData._id}`} {...itemData} />
        )}
      />
    </>
  );
};

export default ProfileTweets;
