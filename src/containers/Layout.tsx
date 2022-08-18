import styled from "styled-components";

import { LeftPanel } from "../components/LeftPanel";
import { RightPanel } from "../components/RightPanel";

const GeneralContainer = styled.main`
  display: grid;

  grid-template-rows: 200vh; // optional
  grid-template-columns: 25% 42% 33%;

  @media (max-width: 1280px) {
    grid-template-columns: 14% 48% 38%;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 19% 81%;
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
    <GeneralContainer>
      <LeftPanel />
      <Main>{children}</Main>
      <RightPanel />
    </GeneralContainer>
  );
};

export default Layout;
