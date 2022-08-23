import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

import ListItemWoFooter from "../components/FollowUserItem";
//import HomeContainer from "../containers/Home";
import InfiniteList from "../containers/InfiniteList";
import Layout from "../containers/Layout";
import { FollowStatus } from "../types/constants";
import { MockUser, PaginationParamsResult } from "../types/mock-api-types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const RecomendedFollowsPage: React.FunctionComponent = () => {
  const [mockUsers, setMockUsers] = useState<PaginationParamsResult>();

  const fetchAndProcessData = async (page = 1) => {
    const mockData: Array<MockUser> = [];
    const tempPage = page === 1 ? 0 : page;

    for (let i = tempPage * 10; i < tempPage * 10 + 10; i++) {
      const id = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      const suffix: string = i.toString();
      mockData.push({
        followStatus:
          i % 2 == 0 ? FollowStatus.FOLLOWED : FollowStatus.UNFOLLOWED,
        id: id,
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
      console.log(id);
    }
    console.log(mockData);
    await sleep(2000);
    setMockUsers({
      docs: [...(mockUsers?.docs || []), ...mockData],
      hasNextPage: true,
      limit: 10,
      page: page + 1,
    });
  };
  useEffect(() => {
    fetchAndProcessData();
  }, []);
  return (
    <Layout>
      {mockUsers && (
        <ListGroup>
          <InfiniteList
            showMore={fetchAndProcessData}
            data={mockUsers}
            itemComponent={(itemData) => (
              <ListItemWoFooter key={itemData.id} user={itemData} />
            )}
          />
        </ListGroup>
      )}
    </Layout>
  );
};

export default RecomendedFollowsPage;
