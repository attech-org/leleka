import { useDispatch, useSelector } from "react-redux";

import SingleNotification from "../components/SingleNotification";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2 } from "../types";
import InfiniteList from "./InfiniteList";

const NotificationsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector<
    RootState,
    RootState["tweets"]["userNotifications"]
  >((store) => store.tweets.userNotifications);
  const handleShowMore = () => {
    return (
      !notifications.isLoading &&
      notifications.hasNextPage &&
      !notifications.error &&
      dispatch(tweetsActions.fetchNotifications({ ...notifications }))
    );
  };
  return (
    <>
      <InfiniteList<Tweet2>
        showMore={handleShowMore}
        data={notifications}
        itemComponent={(itemData) => (
          <SingleNotification key={itemData._id} {...itemData} />
        )}
      />
    </>
  );
};

export default NotificationsPage;
