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
  return (
    <Wrapper className="col-xl-4 col-lg-4">
      <StickySearch>
        <AsyncSearch />
      </StickySearch>
      {!window.location.hash.includes("/trends") && <Trends />}
      <Recommendations />
    </Wrapper>
  );
};
