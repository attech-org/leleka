import styled from "styled-components";

import { AsyncSearch } from "../components/AsyncSearch";
import Recommendations from "../containers/Recommendations";
import Trends from "../containers/Trends";

const Wrapper = styled.div``;
export const RightPanel = () => {
  return (
    <Wrapper className="col-xl-4 col-lg-4">
      <AsyncSearch />
      {!window.location.pathname.includes("/trends") && <Trends />}
      <Recommendations />
    </Wrapper>
  );
};
