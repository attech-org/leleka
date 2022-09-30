import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";

import { LeftPanel } from "../components/LeftPanel";
import { RightPanel } from "../components/RightPanel";
import ErrorsToaster from "./ErrorsToaster";

const GeneralContainer = styled.main`
  word-break: break-all;
`;

const FixMenu = styled.div`
  padding-top: 0.5%;
  word-break: normal;
`;

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{title ? `${title} | Leleka` : "Leleka"}</title>
        </Helmet>
        <GeneralContainer className="container-xxl">
          <ErrorsToaster />
          <FixMenu className="row">
            <LeftPanel />
            <main className="col-xl-6 col-lg-6 col-md-10 col-sm-11 col-12">
              {children}
            </main>
            <RightPanel />
          </FixMenu>
        </GeneralContainer>
      </HelmetProvider>
    </>
  );
};

export default Layout;
