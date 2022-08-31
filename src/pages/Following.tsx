import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import styled from "styled-components";

import FollowerUserItem from "../components/FollowUserItem";
import InfiniteList from "../containers/InfiniteList";
import Layout from "../containers/Layout";
import { LinkTabsContainer } from "../containers/Tabs";
import { FollowStatus } from "../types/constants";
import { MockUser, PaginationParamsResult } from "../types/mock-api-types";

const LiWrapper = styled(ListGroupItem)`
  width: 100%;
  text-align: start;
  &:hover {
    background-color: rgb(247, 247, 247);
    cursor: pointer;
  }
  border: 0;
`;
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const RecomendedFollowsPage: React.FunctionComponent = () => {
  const tabsData = [
    {
      label: "Followers",
      key: "/followers",
    },

    {
      label: "Following",
      key: "/following",
    },
  ];

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
    }
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
      <LinkTabsContainer tabsData={tabsData} defaultActiveKey={"/following"} />
      {mockUsers && (
        <ListGroup>
          <InfiniteList
            showMore={fetchAndProcessData}
            data={mockUsers}
            itemComponent={(itemData) => (
              <LiWrapper>
                <FollowerUserItem key={itemData.id} user={itemData} />
              </LiWrapper>
            )}
          />
        </ListGroup>
      )}
    </Layout>
  );
};

export default RecomendedFollowsPage;
