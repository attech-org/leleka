import React from "react";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import FollowersList from "../containers/FollowersList";
import Layout from "../containers/Layout";
import { LinkTabsContainer } from "../containers/Tabs";
import { UserStore } from "../redux/reducers/user";
import { RootState } from "../redux/store";

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
  const user = useSelector<RootState>((store) => store.user) as UserStore;

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
    <Layout title={t("pageTitles:followersPage")}>
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
              {user.name ? user.name : "Full Name"}
            </h1>
            <h3 className="fs-9 mt-1">
              @{user.username ? user.username : "username"}
            </h3>
          </div>
        </div>
        <LinkTabsContainer
          tabsData={tabsData}
          defaultActiveKey={"/followers"}
        />
        <FollowersList />
      </div>
    </Layout>
  );
};

export default FollowersPage;
