import styled from "styled-components";

import { LeftPanel } from "../components/LeftPanel";
import { RightPanel } from "../components/RightPanel";
import { LinkWithQuery } from "./LinkWithLang";

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
  withoutNavigation?: boolean;
  children?: React.ReactNode;
}

const Layout = ({ children, withoutNavigation }: LayoutProps) => {
  return (
    <>
      {!withoutNavigation && (
        <header>
          <ul>
            <li>
              <LinkWithQuery to="/">Home</LinkWithQuery>
              <LinkWithQuery to="/about">About</LinkWithQuery>
              <LinkWithQuery to="/authorization">Authorization</LinkWithQuery>
            </li>
          </ul>
        </header>
      )}
      <GeneralContainer>
        <LeftPanel />
        <Main>{children}</Main>
        <RightPanel />
      </GeneralContainer>
    </>
  );
};

export default Layout;
