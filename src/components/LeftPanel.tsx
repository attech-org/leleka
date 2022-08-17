import { Twitter } from "react-bootstrap-icons";
import styled from "styled-components";

import NavigationBar from "./NavigationBar";

const Div = styled.div`
  position: fixed;

  height: 100vh;

  background-color: yellowgreen;

  width: 25%;
  @media (max-width: 1280px) {
    width: 14%;
  }
  @media (max-width: 1000px) {
    width: 19%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  @media (max-width: 500px) {
    width: 100%;
    order: 1;
  }
`;
export const LeftPanel = () => {
  return (
    <Wrapper>
      <Div>
        <Twitter />
        <NavigationBar />
      </Div>
    </Wrapper>
  );
};
