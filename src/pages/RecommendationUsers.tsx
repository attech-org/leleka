import { useState, useEffect } from "react";
import { Button, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { SinglePageHeader } from "../components/PageHeader";
import Layout from "../containers/Layout";
import { UserStore } from "../redux/reducers/user";
import { RootState } from "../redux/store";
import instance from "../services/api";
import { User } from "../types";

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
    cursor: pointer;
  }
`;

const LiWrapper = styled(ListGroupItem)`
  width: 100%;
  text-align: start;
  &:hover {
    background-color: rgb(247, 247, 247);
    cursor: pointer;
  }
  border: 0;
`;

const StyledImage = styled(Image)`
  width: 3rem;
  height: 3rem;
`;

const RecommendedUser = ({ user }: { user: User }) => {
  const { t } = useTranslation();

  return (
    <StyledLink
      href="#"
      className="text-decoration-none text-reset d-flex py-2 px-3 align-items-center justify-content-between"
    >
      <div className="d-flex align-items-center flex-shrink-0">
        <div>
          <StyledImage roundedCircle fluid src={user.profile?.avatar} />
        </div>
        <div className="px-3">
          <p className="pb-1 fw-bold">{user.name}</p>
          <p className="pb-1 text-secondary">@{user.username}</p>
        </div>
      </div>
      <div>
        <Button className="rounded-pill fw-bold px-2" variant="dark" size="sm">
          {/* {user.followStatus === FollowStatus.FOLLOWED ? t("common.follow") : t("common.following")} */}
          {t("common.following")}
        </Button>
      </div>
    </StyledLink>
  );
};

const RecommendationsPage = () => {
  const { t } = useTranslation();

  const [localUsers, setLocalUsers] = useState<User[]>([]);

  const user = useSelector<RootState>(
    (store: { user: UserStore }) => store.user
  ) as UserStore;

  const userAccessToken = user.authUser?.auth?.local?.accessToken;

  useEffect(() => {
    if (userAccessToken) {
      instance
        .get("https://leleka-backend.herokuapp.com/api/users", {
          params: {
            limit: 10,
            page: 1,
            // sort: "-createdAt",
          },
          headers: {
            Authorization: userAccessToken,
          },
        })
        .then((data) => setLocalUsers(data.data.docs));
    }
  }, []);

  if (!localUsers) {
    return null;
  }

  return (
    <Layout>
      <SinglePageHeader pageName={t("recommendations.windowTitle")} />
      <ListGroup>
        <LiWrapper>
          {localUsers.map((item) => (
            <RecommendedUser user={item} key={item._id} />
          ))}
        </LiWrapper>
      </ListGroup>
    </Layout>
  );
};

export default RecommendationsPage;
