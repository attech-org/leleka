import React from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import FollowerUserItem from "../components/FollowUserItem";
import InfiniteList from "../containers/InfiniteList";
import Layout from "../containers/Layout";
import { LinkTabsContainer } from "../containers/Tabs";
import { followersActions } from "../redux/reducers/followers";
import { RootState, AppDispatch } from "../redux/store";
import { LE, User } from "../types";
import { Pagination } from "../types/mock-api-types";

const LiWrapper = styled(ListGroupItem)`
  width: 100%;
  text-align: start;
  &:hover {
    background-color: rgb(247, 247, 247);
    cursor: pointer;
  }
  border: 0;
`;

const StyledButton = styled(Button)`
  height: 2rem;
  width: 2rem;
  :focus:not(:focus-visible) {
    box-shadow: none;
  }
  :hover {
    background-color: rgba(15, 20, 25, 0.1) !important;
  }
`;
const FollowersPage: React.FunctionComponent = () => {
  //const user = useSelector<RootState>((store) => store.user) as UserStore;

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState, RootState["user"]["authUser"]>(
    (store) => store.user.authUser
  );
  const followers = useSelector<RootState>(
    (store) => store.followers.list
  ) as LE<Pagination<User>>;

  const handleShowMore = () => {
    return (
      !followers.isLoading &&
      dispatch(
        followersActions.fetchFollowers({
          limit: followers.limit,
          nextPage: followers.nextPage,
          userId: user._id,
          userAccessToken: user.auth?.local?.accessToken || "",
        })
      )
    );
  };
  const { t, i18n } = useTranslation();
  const tabsData = [
    {
      label: t("common.followers"),
      key: "/followers",
    },

    {
      label: t("common.following"),
      key: "/following",
    },
  ];
  const navigate = useNavigate();

  return (
    <Layout
      title={t("pageTitles:followersPage")}
      errors={[user.error as string, followers.error as string]}
    >
      <div className="border-start border-end">
        <div className="d-flex  p-2 align-items-center ">
          <div className="p-2">
            <StyledButton
              variant="link"
              className="text-dark m-0 p-0 rounded-circle"
              onClick={() => {
                navigate("/profile" + "?lang=" + i18n.resolvedLanguage);
              }}
            >
              <ArrowLeft
                size="20"
                className="m-0 p-0 align-items-center justify-content-center"
              />
            </StyledButton>
          </div>
          <div className="d-flex flex-column ms-2">
            <h1 className="fs-5 fw-bold ms-1">
              {user.name ? user.name : t("followersList.fullUsername")}
            </h1>
            <h3 className="fs-9 mt-1">
              @{user.username ? user.username : t("followersList.username")}
            </h3>
          </div>
        </div>
        <LinkTabsContainer
          tabsData={tabsData}
          defaultActiveKey={"/followers"}
        />
        <>
          {user._id ? (
            followers.docs.length ? (
              <ListGroup>
                <InfiniteList
                  showMore={handleShowMore}
                  data={followers}
                  itemComponent={(itemData) => (
                    <LiWrapper>
                      <FollowerUserItem key={itemData._id} user={itemData} />
                    </LiWrapper>
                  )}
                />
              </ListGroup>
            ) : (
              t("followersList.noFollowers")
            )
          ) : (
            t("notAuthorized")
          )}
        </>
      </div>
    </Layout>
  );
};

export default FollowersPage;
