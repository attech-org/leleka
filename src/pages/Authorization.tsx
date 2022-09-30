import { Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import LoginForm from "../containers/LoginForm";
import Registration from "../containers/Registration";
import bg from "../images/bg.png";
import icon_1 from "../images/icon_1.png";
import logo from "../images/logo.png";

const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const LeftPanel = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonArea = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightPanel = styled.div`
  width: 55%;
  height: 100%;
`;

const AuthorizationPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <LeftPanel className="position-relative">
        <Image
          src={bg}
          alt="Background"
          fluid
          className="position-absolute z-index-n1 h-100"
        />
        <Image
          src={logo}
          alt="logo"
          className="position-absolute z-index-n1 mt-6 w-75"
        />
      </LeftPanel>
      <RightPanel>
        <img src={icon_1} width="100px" alt="Logo" className="ps-5 pt-5" />
        <h1 className="text-nowrap fs-1 fw-bold ps-5 pt-5">
          {t("translation:authorization.mainTitle")}
        </h1>
        <h2 className="text-nowrap fs-2 fw-bold ps-5 py-3">
          {t("translation:authorization.secondTitle")}
        </h2>
        <ButtonArea className="ms-5 mt-5">
          <Registration />
          <div className="fs-6 text-secondary py-4 text-center">
            {t("login.or")}
          </div>
          <LoginForm />
        </ButtonArea>
      </RightPanel>
    </Wrapper>
  );
};

export default AuthorizationPage;
