// import { Container, Image } from "react-bootstrap";
import { Image } from "react-bootstrap";
import styled from "styled-components";

import Registration from "../containers/Registration";
// import bg from "../images/bg.png";
import logo from "../images/logo.png";
// import icon_1 from "../images/icon_1.png";

const AuthorizationPage: React.FC = () => {
  const Wrapper = styled.main`
    width: 100%;
    height: 2000px;
    display: flex;
    border: solid 1px blue;
  `;

  const LeftPanel = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    /* align-items: end; */
    justify-content: center;
    border: solid 1px black;
    background-image: url("./bg.png");
  `;

  const RightPanel = styled.div`
    width: 50%;
    height: 100%;
    align-items: start;
    justify-content: start;
    border: solid 1px black;
  `;

  return (
    <Wrapper>
      <LeftPanel className="position-relative">
        {/* <Image src={bg} alt="Background" fluid className="position-absolute z-index-n1 h-100" /> */}
        <Image
          src={logo}
          alt="logo"
          className="position-absolute z-index-n1 mt-6"
        />
      </LeftPanel>
      <RightPanel>
        <Registration />
      </RightPanel>
    </Wrapper>
  );
};

export default AuthorizationPage;
