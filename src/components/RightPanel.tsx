import { useParams } from "react-router-dom";
import styled from "styled-components";

import { AsyncSearch } from "../components/AsyncSearch";
import Recommendations from "../containers/Recommendations";
import Trends from "../containers/Trends";

const Wrapper = styled.div``;

const StickySearch = styled.div`
  position: sticky;
  top: 1.5%;
`;

export const RightPanel = () => {
  const match = useParams();
  const trends = match.trends || "";

  return (
    <Wrapper className="col-xl-4 col-lg-4">
      <StickySearch>
        <AsyncSearch />
      </StickySearch>
      {!trends.includes("trends") && <Trends />}
      <Recommendations />
    </Wrapper>
  );
};
