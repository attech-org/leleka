import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { AsyncSearch } from "../components/AsyncSearch";
import Recommendations from "../containers/Recommendations";
import Trends from "../containers/Trends";

const Wrapper = styled.div``;

const FixMenu = styled.div`
  position: fixed;
  width: 24.5%;
  padding-top: 0.5%;
`;

export const RightPanel = () => {
  const location = useLocation();

  return (
    <Wrapper className="col-xl-4 col-lg-4">
      <FixMenu>
        <AsyncSearch />
        {!location.pathname.includes("trends") && <Trends />}
        <Recommendations />
      </FixMenu>
    </Wrapper>
  );
};
