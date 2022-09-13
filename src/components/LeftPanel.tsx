import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LanguageSwitcher from "../containers/LanguageSwitcher";
import LoginForm from "../containers/LoginForm";
import Registration from "../containers/Registration";
import { userActions } from "../redux/reducers/user";
import { AppDispatch, RootState } from "../redux/store";
import NavigationBar from "./NavigationBar";

const Wrapper = styled.div``;

const FixMenu = styled.div`
  position: fixed;
  width: 13%;
  padding-top: 0.5%;
`;

export const LeftPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = useSelector<RootState>((store) => store.user._id);

  return (
    <Wrapper className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-12">
      <FixMenu>
        <LanguageSwitcher />
        <NavigationBar />

        <LoginForm />
        <Registration />

        {!currentUserId ? (
          <span />
        ) : (
          <Button // temporary button
            variant="danger"
            onClick={() => dispatch(userActions.resetUserData())}
          >
            logout
          </Button>
        )}
      </FixMenu>
    </Wrapper>
  );
};
