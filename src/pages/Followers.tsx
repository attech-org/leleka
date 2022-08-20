import React, { useEffect, useState } from "react";

import HomeContainer from "../containers/Home";
import InfiniteList from "../containers/InfiniteList";
import Layout from "../containers/Layout";
import { FollowStatus } from "../types/constants";
import { MockUser } from "../types/mock-api-types";

const FollowersPage: React.FunctionComponent = () => {
  const [mockUsers, setMockUsers] = useState<Array<MockUser>>([]);

  useEffect(() => {
    const mockData: Array<MockUser> = [];
    for (let i = 0; i < 50; i++) {
      const suffix: string = i.toString();
      mockData.push({
        followStatus:
          i % 2 == 0 ? FollowStatus.FOLLOWED : FollowStatus.UNFOLLOWED,
        id: suffix,
        userFirstName: "firstName" + suffix,
        userLastName: "last name" + suffix,
        userName: "user name" + suffix,
        userUrl: "qweqwe",
        userPhotoUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyF9H3AGaJdh8zjSZlc4yX3ZSdDGw-kijLQQ&usqp=CAU",
        userCaption:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  ",
        followers: Math.floor(Math.random() * 1000),
        following: Math.floor(Math.random() * 1000),
      });
    }
    setMockUsers(mockData);
  }, []);
  return (
    <Layout>
      <HomeContainer />
      <InfiniteList arr={mockUsers} />
    </Layout>
  );
};

export default FollowersPage;
