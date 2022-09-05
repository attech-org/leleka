import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Recommendations from "../containers/Recommendations";
import Search from "../containers/Search";
import Trends from "../containers/Trends";

const Wrapper = styled.div``;
export const RightPanel = () => {
  const { t } = useTranslation();
  return (
    <Wrapper className="col-xl-4 col-lg-4">
      <Search placeholder={t("search.placeholder")} />
      {!window.location.pathname.includes("/trends") && <Trends />}
      <Recommendations />
    </Wrapper>
  );
};
