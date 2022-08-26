import styled from "styled-components";

import LanguageSwitcher from "../containers/LanguageSwitcher";
import NavigationBar from "./NavigationBar";

const Div = styled.div`
  background-color: yellowgreen;
`;

const Wrapper = styled.div``;
export const LeftPanel = () => {
  return (
    <Wrapper className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-12">
      <Div>
        <LanguageSwitcher />
        <NavigationBar />
      </Div>
    </Wrapper>
  );
};
