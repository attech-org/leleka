import styled from "styled-components";

import Search from "../containers/Search";
import Trends from "../containers/Trends";

const Wrapper = styled.div`
  height: 150vh; // optional

  position: sticky;
  top: 0;

  background-color: lightgreen;

  @media (max-width: 1000px) {
    display: none;
  }
`;
export const RightPanel = () => {
  return (
    <Wrapper>
      <Search />
      <Trends />
    </Wrapper>
  );
};
