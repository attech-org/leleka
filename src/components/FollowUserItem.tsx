import { Image, Anchor, Popover, OverlayTrigger } from "react-bootstrap";
import styled from "styled-components";

import { MockUser } from "../types/mock-api-types";
import FollowButton from "./FollowUserDialogueButton";
import FollowCard from "./UserCard";

const UserItemHeader = styled.div`
  height: 25%;
  display: flex;
`;
const UserFollowerItemContent = styled.p`
  height: 75%;
  display: flex;
`;
const LeftSectionWrapper = styled.div`
  flex: 1;
  order: 1;
`;
const MiddleSectionWrapper = styled.div`
  flex: 6;
  order: 2;
`;
const RightSectionWrapper = styled.div`
  flex: 1;
  order: 3;
`;

const FollowerUserItem = ({ user }: { user: MockUser }) => {
  const popover = (
    <Popover>
      <FollowCard user={user} />
    </Popover>
  );
  return (
    <>
      <UserItemHeader>
        <LeftSectionWrapper>
          <OverlayTrigger
            trigger={["hover", "focus"]}
            delay={{ show: 1000, hide: 6000 }}
            placement="auto"
            overlay={popover}
          >
            <Image
              width={50}
              height={50}
              roundedCircle
              src={user.userPhotoUrl}
            />
          </OverlayTrigger>
        </LeftSectionWrapper>
        <MiddleSectionWrapper>
          <Anchor className="link-dark" href={user.userUrl}>
            {user.userFirstName + " " + user.userLastName}
          </Anchor>
          <p style={{ color: "#A6AEB5", textDecoration: "none" }}>
            @{user.userName}
          </p>
        </MiddleSectionWrapper>
        <RightSectionWrapper>
          <FollowButton
            followStatus={user.followStatus}
            followerName={user.userName}
          />
        </RightSectionWrapper>
      </UserItemHeader>

      <UserFollowerItemContent>
        <LeftSectionWrapper />
        <MiddleSectionWrapper>{user.userCaption}</MiddleSectionWrapper>
        <RightSectionWrapper />
      </UserFollowerItemContent>
    </>
  );
};
export default FollowerUserItem;
