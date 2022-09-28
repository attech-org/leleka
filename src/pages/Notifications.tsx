import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import FeedSingleTweet from "../components/FeedSingleTweet";
import SingleNotification from "../components/SingleNotification";
import InfiniteList from "../containers/InfiniteList";
import Layout from "../containers/Layout";
import TabsContainer from "../containers/Tabs";
import { notificationPageMocks } from "../MOCKS/notificationsPage";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2 } from "../types";
import { TabKeyProps } from "../types/tabs-types";

const StyledButton = styled(Button)`
  height: 2.5rem;
  width: 2.5rem;
  :focus:not(:focus-visible) {
    box-shadow: none;
  }
  :hover {
    background-color: rgba(15, 20, 25, 0.1) !important;
  }
`;

const Notifications = ({ tabKey }: TabKeyProps) => {
  return (
    <>
      {notificationPageMocks.map(
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
      )}
      tabKey={tabKey}
    </>
  );
};
const MentionsList = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector<RootState, RootState["user"]["authUser"]>(
    (store) => store.user.authUser
  );

  const mentions = useSelector<RootState, RootState["tweets"]["myMentions"]>(
    (store) => store.tweets.myMentions
  );

  const dipatchMentions = () => {
    dispatch(
      tweetsActions.fetchMentions({
        limit: mentions.limit,
        nextPage: mentions.nextPage,
        searchString: `@${user.username}`,
      })
    );
  };

  useEffect(() => {
    dipatchMentions();
  }, []);

  const handleShowMore = () => {
    return !mentions.isLoading && mentions.hasNextPage && dipatchMentions();
  };

  return (
    <>
      {user._id ? (
        mentions.docs.length ? (
          <InfiniteList<Tweet2>
            showMore={handleShowMore}
            data={mentions}
            itemComponent={(itemData) => (
              <FeedSingleTweet key={itemData._id} {...itemData} />
            )}
          />
        ) : (
          t("mentionsList.noMentions")
        )
      ) : (
        t("notAuthorized")
      )}
    </>
  );
};
const NotificationsList = ({ tabKey }: TabKeyProps) => {
  const { t } = useTranslation();

  const tabsData = [
    {
      label: t("notifications.tabsLabel.all"),
      content: <Notifications tabKey="all" />, // tabKey="all" prop is not required for logic, but requiered for TypeScript
      key: "all",
      route: "/notifications",
    },
    {
      label: t("notifications.tabsLabel.mentions"),
      content: <MentionsList />,
      key: "mentions",
      route: "/notifications/mentions",
    },
  ];

  return (
    <div className="border-start border-end">
      <div className="d-flex justify-content-between p-2 align-items-center justify-content-center">
        <h1 className="fs-5 fw-bold ps-3">{t("notifications.title")}</h1>
        <div>
          <StyledButton
            variant="link"
            className="text-dark m-0 p-0 rounded-circle"
          >
            <Gear
              size="26"
              className="m-0 p-0 align-items-center justify-content-center"
            />
          </StyledButton>
        </div>
      </div>
      <TabsContainer tabsData={tabsData} defaultActiveKey={tabKey} />
    </div>
  );
};

const NotificationsPage = ({ tabKey }: TabKeyProps) => {
  const { t } = useTranslation();
  return (
    <Layout title={t("pageTitles:notificationsPage")}>
      <NotificationsList tabKey={tabKey} />
    </Layout>
  );
};

export default NotificationsPage;
