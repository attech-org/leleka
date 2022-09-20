import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Banner from "../containers/Banner";
import Layout from "../containers/Layout";
import { LinkWithLanguageQueryParam } from "../containers/LinkWithLanguageQueryParam";
import Likes from "../containers/ProfileLikes";
import Media from "../containers/ProfileMedia";
import ProfileTweets from "../containers/ProfileTweets";
import TabsContainer from "../containers/Tabs";
import { TweetsWithReplies } from "../containers/TweetsWithReplies";
import { userActions, UserStore } from "../redux/reducers/user";
import { AppDispatch, RootState } from "../redux/store";
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
  const usernameId = "leleka1";
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userActions.fetchUser(usernameId));
  }, [usernameId]);

  const user = useSelector<RootState>((store) => store.user) as UserStore;
  const user1 = useSelector<RootState, RootState["user"]["usersByUsername"]>(
    (store) => store.user.usersByUsername
  );
  console.log("22222");
  console.log(user1);
  const { t } = useTranslation();

  const tabsData = [
    {
      label: t("profile.tabsLabel.tweets"),
      content: <ProfileTweets />,
      key: "tweets",
      route: `/${user.username}`,
    },

    {
      label: t("profile.tabsLabel.tweetsWithReplies"),
      content: <TweetsWithReplies />,
      key: "tweets-with-replies",
      route: `/${user.username}/with_replies`,
    },

    {
      label: t("profile.tabsLabel.media"),
      content: <Media />,
      key: "media",
      route: `/${user.username}/media`,
    },
    {
      label: t("profile.tabsLabel.likes"),
      content: <Likes />,
      key: "likes",
      route: `/${user.username}/likes`,
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
            <p className="fw-bold">{user.friendsCount || 0}</p>
            <p className="ps-2">{t("profile.following")}</p>
          </LinkWithLanguageQueryParam>

          <LinkWithLanguageQueryParam
            to="/followers"
            className="d-flex ps-4 text-reset"
          >
            <p className="fw-bold">{user.followersCount || 0}</p>
            <p className="ps-2">{t("profile.followers")}</p>
          </LinkWithLanguageQueryParam>
        </div>

        <TabsContainer tabsData={tabsData} defaultActiveKey={tabKey} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
