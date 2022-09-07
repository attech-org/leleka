import styled from "styled-components";

import LanguageSwitcher from "../containers/LanguageSwitcher";
import LoginForm from "../containers/LoginForm";
import Registration from "../containers/Registration";
import NavigationBar from "./NavigationBar";

const Wrapper = styled.div``;
export const LeftPanel = () => {
  return (
    <Wrapper className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-12">
      <div>
        <LanguageSwitcher />
        <NavigationBar />
        <LoginForm />
        <Registration />
      </div>
    </Wrapper>
  );
};
