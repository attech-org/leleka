import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Tag } from "../types";
import { ContextMenu } from "./ContextMenu";

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
export const TrendItem = (trend: Tag) => {
  const { t } = useTranslation();

  return (
    <StyledLink
      id="trendLink"
      href="#"
      className="text-decoration-none  text-reset d-flex flex-row py-2"
    >
      <Container className="py-2 px-3">
        <p className="pb-1 text-secondary">{trend.name}</p>
        <p className="pb-1 fw-bold">{trend.name}</p>
        <span className="pb-1 text-secondary">{t("trends.tweets")}</span>
        <span className="pb-1 text-secondary">{` ${
          trend.stats?.tweets || 1
        }`}</span>
      </Container>
      <ContextMenu
        contextItems={[
          {
            itemId: `context_menu_trend_${trend._id}__interested`,
            contextItemText: t("trends.trendInterest"),
            onClick: async () => {
              return;
            },
          },
          {
            itemId: `context_menu_trend_${trend._id}__spam_report`,
            contextItemText: t("trends.trendSpam"),
            onClick: async () => {
              return;
            },
          },
        ]}
      />
    </StyledLink>
  );
};
