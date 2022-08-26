import styled from "styled-components";

import { LeftPanel } from "../components/LeftPanel";
import { RightPanel } from "../components/RightPanel";

const GeneralContainer = styled.main`
  display: grid;

  grid-template-rows: 200vh; // optional
  grid-template-columns: 20% 49% 31%;

  @media (max-width: 1280px) {
    grid-template-columns: 5% 63% 38%;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 7% 93%;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: calc(100vh - 50px) 50px;
  }
`;

const Main = styled.main`
  text-align: center;
`;

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <GeneralContainer className="container">
      <LeftPanel />
      <Main>{children}</Main>
      <RightPanel />
    </GeneralContainer>
  );
};

export default Layout;
