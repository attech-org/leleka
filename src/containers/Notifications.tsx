import { Button } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import FeedPost from "../components/FeedPost";
import SingleNotification from "../components/SingleNotification";
import { notificationPageMocks } from "../MOCKS/notificationsPage";
import TabsContainer from "./Tabs";

const StyledButton = styled(Button)`
  height: 40px;
  width: 40px;
  :focus:not(:focus-visible) {
    box-shadow: none;
  }
  :hover {
    background-color: rgba(15, 20, 25, 0.1) !important;
  }
`;

const notifications: JSX.Element[] = notificationPageMocks.map(
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

const NotificationsList = () => {
  const { t } = useTranslation();

  const tabsData = [
    {
      label: t("notifications:tabsLabel.all"),
      content: notifications,
      key: "All",
    },
    {
      label: t("notifications:tabsLabel.mentions"),
      content: <FeedPost />,
      key: "Mentions",
    },
  ];

  return (
    <div className="border-start border-end">
      <div className="d-flex justify-content-between p-2 align-items-center justify-content-center">
        <h1 className="fs-4 fw-bold ps-3">{t("notifications:title")}</h1>
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
      <TabsContainer tabsData={tabsData} defaultActiveKey="All" />
    </div>
  );
};

export default NotificationsList;
