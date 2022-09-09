import styled from "styled-components";

import { LeftPanel } from "../components/LeftPanel";
import { RightPanel } from "../components/RightPanel";
import ErrorsToaster from "./ErrorsToaster";

const GeneralContainer = styled.main``;

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <GeneralContainer className="container-xxl">
      <ErrorsToaster />
      <div className="row">
        <LeftPanel />
        <main className="col-xl-6 col-lg-6 col-md-11 col-sm-11 col-12">
          {children}
        </main>
        <RightPanel />
      </div>
    </GeneralContainer>
  );
};

export default Layout;
