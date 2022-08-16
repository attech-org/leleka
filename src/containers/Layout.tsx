import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import LanguageSwitcher from "./LanguageSwitcher";

const GeneralContainer = styled.main`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
`;

const LeftPanel = styled.section`
  flex: 0 1 30%;
  background-color: yellowgreen;
`;

const RightPanel = styled.section`
  flex: 0 1 30%;
  background-color: lightgreen;
`;

interface LayoutProps {
  withoutNavigation?: boolean;
  children?: React.ReactNode;
}

const Layout = ({ children, withoutNavigation }: LayoutProps) => {
  const { t } = useTranslation();
  return (
    <>
      {!withoutNavigation && (
        <header>
          <ul>
            <li>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </header>
      )}
      <GeneralContainer>
        <LeftPanel>left side</LeftPanel>
        <>
          <div>{children}</div>
          <p>{t("test")}</p>
        </>
        <RightPanel>
          right side
          <LanguageSwitcher />
        </RightPanel>
      </GeneralContainer>
    </>
  );
};

export default Layout;
