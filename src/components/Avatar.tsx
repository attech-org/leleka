import Avatar from "react-avatar";

import { User } from "../types";

interface UserAvatarProps {
  user: Partial<User>;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <Avatar
      size="48"
      round="50%"
      twitterHandle="sitebase"
      name={user.username}
      src={user.profile?.avatar}
    />
  );
};

export default UserAvatar;
