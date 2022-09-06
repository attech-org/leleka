import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LanguageSwitcher from "../containers/LanguageSwitcher";
import LoginForm from "../containers/LoginForm";
import Registration from "../containers/Registration";
import { userActions } from "../redux/reducers/user";
import { RootState } from "../redux/store";
import { loginUserAsLeleka1 } from "../services/api";
import NavigationBar from "./NavigationBar";

const Div = styled.div`
  background-color: yellowgreen;
`;

const Wrapper = styled.div``;
export const LeftPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  return (
    <Wrapper className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-12">
      <Div>
        <LanguageSwitcher />
        <NavigationBar />
        <LoginForm />
        <Registration />
        <button
          aria-label="leleka1 login"
          onClick={async () => {
            dispatch(userActions.setUserData(await loginUserAsLeleka1()));
          }}
        >
          Logis as leleka1
        </button>
        <button
          aria-label="leleka1 login"
          onClick={async () => {
            dispatch(userActions.resetUserData());
          }}
        >
          Logout
        </button>
        <button
          aria-label="leleka1 login"
          onClick={async () => {
            console.warn("User: ", user);
          }}
        >
          Console Log User Info
        </button>
      </Div>
    </Wrapper>
  );
};
