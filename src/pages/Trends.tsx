import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, TabContainer } from "react-bootstrap";
import styled from "styled-components";

import { SinglePageHeader } from "../components/PageHeader";
import { TrendItem } from "../components/TrendItem";
import InfiniteList from "../containers/InfiniteList";
import Layout from "../containers/Layout";
import { MockTrend, PaginationParamsResult } from "../types/mock-api-types";

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
  const [mockTrends, setMockTrends] = useState<PaginationParamsResult>();

  const fetchAndProcessData = async (page = 1) => {
    const mockData: Array<MockTrend> = [];
    const tempPage = page === 1 ? 0 : page;

    for (let i = tempPage * 10; i < tempPage * 10 + 10; i++) {
      const id = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      const suffix: string = i.toString();
      mockData.push({
        id: id,
        categoryName: "category name" + suffix,
        categoryValue: "category value" + suffix,
        tweetsCount: Math.floor(Math.random() * 1000),
        contentRefName: "Zaporizska aes",
      });
    }
    await sleep(2000);
    setMockTrends({
      docs: [...(mockTrends?.docs || []), ...mockData],
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
      <SinglePageHeader pageName="Trends" />
      <TabContainer />
      {mockTrends && (
        <ListGroup>
          <InfiniteList
            showMore={fetchAndProcessData}
            data={mockTrends}
            itemComponent={(itemData) => (
              <LiWrapper>
                <TrendItem key={itemData.id} trend={itemData} />
              </LiWrapper>
            )}
          />
        </ListGroup>
      )}
    </Layout>
  );
};

export default RecomendedFollowsPage;
