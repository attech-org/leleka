import SingleNotification from "../components/SingleNotification";
import { notificationPageMocks } from "../MOCKS/notificationsPage";
import { TabKeyProps } from "../types/tabs-types";

const Notifications = notificationPageMocks.map(
  ({ id, username, userlogo, content, mentionedTweets, retweet }) => (
    <SingleNotification
      username={username}
      userlogo={userlogo}
      content={content}
      mentionedTweets={mentionedTweets}
      key={id}
      id={String(id)}
      retweet={retweet}
    />
  )
);

const NotificationsPage = ({ tabKey }: TabKeyProps) => {
  return (
    <>
      {Notifications}
      tabKey={tabKey}
    </>
  );
};

export default NotificationsPage;
