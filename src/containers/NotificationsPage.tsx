import SingleNotification from "../components/SingleNotification";
import { notificationPageMocks } from "../MOCKS/notificationsPage";

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

const NotificationsPage = () => {
  return <>{Notifications}</>;
};

export default NotificationsPage;
