import { Button } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Banner from "../containers/Banner";
import Layout from "../containers/Layout";
import { LinkWithLanguageQueryParam } from "../containers/LinkWithLanguageQueryParam";
import Likes from "../containers/ProfileLikes";
import Media from "../containers/ProfileMedia";
import ProfileTweets from "../containers/ProfileTweets";
import TabsContainer from "../containers/Tabs";
import { TweetsWithReplies } from "../containers/TweetsWithReplies";
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

const ProfilePage = ({ tabKey }: TabKeyProps) => {
  const { t } = useTranslation();

  const tabsData = [
    {
      label: t("profile.tabsLabel.tweets"),
      content: <ProfileTweets />,
      key: "tweets",
      route: "/profile",
    },

    {
      label: t("profile.tabsLabel.tweetsWithReplies"),
      content: <TweetsWithReplies />,
      key: "tweets-with-replies",
      route: "/profile/with_replies",
    },

    {
      label: t("profile.tabsLabel.media"),
      content: <Media />,
      key: "media",
      route: "/profile/media",
    },
    {
      label: t("profile.tabsLabel.likes"),
      content: <Likes />,
      key: "likes",
      route: "/profile/likes",
    },
  ];

  return (
    <Layout title={t("pageTitles:profilePage")}>
      <div className="border-start border-end">
        <div className="d-flex justify-content-between p-2 align-items-center justify-content-center">
          <h1 className="fs-5 fw-bold ps-3">{t("profile.title")}</h1>
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
        <Banner isEditBanner={false} />
        <div className="d-flex pb-4">
          <LinkWithLanguageQueryParam
            to="/following"
            className="d-flex ps-4 text-reset"
          >
            <p className="fw-bold">546</p>
            <p className="ps-2">{t("profile.following")}</p>
          </LinkWithLanguageQueryParam>

          <LinkWithLanguageQueryParam
            to="/followers"
            className="d-flex ps-4 text-reset"
          >
            <p className="fw-bold">122</p>
            <p className="ps-2">{t("profile.followers")}</p>
          </LinkWithLanguageQueryParam>
        </div>

        <TabsContainer tabsData={tabsData} defaultActiveKey={tabKey} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
