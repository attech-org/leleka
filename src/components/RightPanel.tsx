import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  return (
    <Wrapper className="col-xl-4 col-lg-4">
      <StickySearch>
        <AsyncSearch />
      </StickySearch>
      {!location.pathname.includes("trends") && <Trends />}
      <Recommendations />
    </Wrapper>
  );
};
