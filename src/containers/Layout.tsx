import styled from "styled-components";

import { LeftPanel } from "../components/LeftPanel";
import { RightPanel } from "../components/RightPanel";

const GeneralContainer = styled.main``;

const Main = styled.main`
  text-align: center;
`;

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <GeneralContainer className="container-xxl">
      <div className="row">
        <LeftPanel />
        <Main className="col-xl-6 col-lg-6 col-md-11 col-sm-11 col-12">
          {children}
        </Main>
        <RightPanel />
      </div>
    </GeneralContainer>
  );
};

export default Layout;
