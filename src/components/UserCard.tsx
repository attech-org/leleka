import { Card, Image } from "react-bootstrap";
import styled from "styled-components";

import { MockUser } from "../types/mock-api-types";
import FollowButton from "./FollowUserDialogueButton";

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FollowerUserCard = ({ user }: { user: MockUser }) => {
  return (
    <Card>
      <Card.Body>
        <HeaderSection>
          <Image
            width={50}
            height={50}
            roundedCircle
            src={user?.userPhotoUrl || "TODO:default twitter img"}
          />
          <FollowButton
            followStatus={user.followStatus}
            followerName={user.userName}
          />
        </HeaderSection>

        <Card.Title>{user.userLastName + user.userFirstName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          @{user.userName}
        </Card.Subtitle>

        <Card.Text>{user.userCaption}</Card.Text>

        <div style={{ marginTop: "10px" }}>
          <Card.Link className="link-dark" href="#">
            {user.following} following
          </Card.Link>
          <Card.Link className="link-dark" href="#">
            {user.followers} followers
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
};
export default FollowerUserCard;
