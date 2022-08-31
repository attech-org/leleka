import { Button } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { TabKeyProps } from "../types/tabs-types";
import FeedPost from "./FeedPosts";
import NotificationsPage from "./NotificationsPage";
import TabsContainer from "./Tabs";

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

const NotificationsList = ({ tabKey }: TabKeyProps) => {
  const { t } = useTranslation();

  const tabsData = [
    {
      label: t("notifications.tabsLabel.all"),
      content: <NotificationsPage tabKey="all" />, // tabKey="all" prop is not required for logic, but requiered for TypeScript
      key: "all",
      route: "/notifications",
    },
    {
      label: t("notifications.tabsLabel.mentions"),
      content: <FeedPost />,
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

export default NotificationsList;
