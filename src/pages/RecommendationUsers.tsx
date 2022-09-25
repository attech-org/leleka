import { useEffect, useState } from "react";
import { Container, Button, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import users from "../MOCKS/users";
import { FollowStatus } from "../types/constants";

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
    cursor: pointer;
  }
`;

const StyledImage = styled(Image)`
  width: 3rem;
  height: 3rem;
`;

const User = ({ user }: { user: typeof users[0] }) => {
  const { t } = useTranslation();

  return (
    <StyledLink
      href="#"
      className="text-decoration-none text-reset d-flex py-2 px-3 align-items-center justify-content-between"
    >
      <div className="d-flex align-items-center flex-shrink-0">
        <div>
          <StyledImage roundedCircle fluid src={user.userPhotoUrl} />
        </div>
        <div className="px-3">
          <p className="pb-1 fw-bold">{user.userName}</p>
          <p className="pb-1 text-secondary">@{user.userCaption}</p>
        </div>
      </div>
      <div>
        <Button className="rounded-pill fw-bold px-2" variant="dark" size="sm">
          {user.followStatus === FollowStatus.FOLLOWED
            ? t("common.follow")
            : t("common.following")}
        </Button>
      </div>
    </StyledLink>
  );
};

const RecommendationsPage = () => {
  const { t } = useTranslation();

  const [localUsers, setLocalUsers] = useState<typeof users>([]);

  useEffect(() => {
    fetch("/api/users...")
      .then((data) => data.json())
      .then((data) => setLocalUsers(data));
  }, []);

  const handleShowMore = () => {
    setLocalUsers(users);
  };

  return (
    <div className="bg-light mx-1 my-2 rounded-3">
      <div className="py-3 px-3 fs-5 fw-bold">
        {t("recommendations.windowTitle")}
      </div>

      {localUsers.map((user) => (
        <User user={user} key={user._id} />
      ))}

      <StyledLink
        href="#"
        className="text-decoration-none text-reset d-flex flex-row py-2"
      >
        <Container className="py-2 px-4">
          <p className="py-1 text-info" onClick={handleShowMore}>
            {t("common.showMore")}
          </p>
        </Container>
      </StyledLink>
    </div>
  );
};

export default RecommendationsPage;
