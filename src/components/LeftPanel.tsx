import styled from "styled-components";

import LanguageSwitcher from "../containers/LanguageSwitcher";
import NavigationBar from "./NavigationBar";

const Div = styled.div`
  height: 100vh;

  background-color: yellowgreen;
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
        <LanguageSwitcher />
        <NavigationBar />
      </Div>
    </Wrapper>
  );
};
