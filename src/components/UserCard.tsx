import { Card, Image } from "react-bootstrap";
import styled from "styled-components";

import { User } from "../types";
import { FollowStatus } from "../types/constants";
import FollowButton from "./FollowUserDialogueButton";

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FollowerUserCard = ({ user }: { user: User }) => {
  return (
    <Card>
      <Card.Body>
        <HeaderSection>
          <Image
            width={50}
            height={50}
            roundedCircle
            src={user?.profile.avatar || "TODO:default twitter img"}
          />
          <FollowButton
            followStatus={FollowStatus.FOLLOWED} // TODO: get follow status from backend
            followerName={user.username}
          />
        </HeaderSection>

        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          @{user.username}
        </Card.Subtitle>

        <Card.Text>{user.description}</Card.Text>

        <div style={{ marginTop: "10px" }}>
          <Card.Link className="link-dark" href="#">
            {user.stats.followersCount} following
          </Card.Link>
          <Card.Link className="link-dark" href="#">
            {user.stats.followingCount} followers
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
};
export default FollowerUserCard;
