import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";

import { LeftPanel } from "../components/LeftPanel";
import { RightPanel } from "../components/RightPanel";
import ErrorsToaster from "./ErrorsToaster";

const GeneralContainer = styled.main`
  word-break: break-all;
`;

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  errors?: Array<string>;
}

const Layout = ({ children, title, errors }: LayoutProps) => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{title ? `${title} | Leleka` : "Leleka"}</title>
        </Helmet>
        <GeneralContainer className="container-xxl">
          {errors?.length &&
            errors.map((err) => (
              <ErrorsToaster errorMsg={err} key={`__error:${err}__`} />
            ))}
          <div className="row">
            <LeftPanel />
            <main className="col-xl-6 col-lg-6 col-md-11 col-sm-11 col-12">
              {children}
            </main>
            <RightPanel />
          </div>
        </GeneralContainer>
      </HelmetProvider>
    </>
  );
};

export default Layout;
