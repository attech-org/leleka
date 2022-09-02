import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { MockTrend } from "../types/mock-api-types";
import { ContextMenu } from "./ContextMenu";

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
export const TrendItem = ({ trend }: { trend: MockTrend }) => {
  const { t } = useTranslation();

  return (
    <StyledLink
      id="trendLink"
      href="#"
      className="text-decoration-none  text-reset d-flex flex-row py-2"
    >
      <Container className="py-2 px-3">
        <p className="pb-1 text-secondary">
          {trend.categoryName} · {trend.categoryValue}
        </p>
        <p className="pb-1 fw-bold">{trend.contentRefName}</p>
        <span className="pb-1 text-secondary">{t("trends.tweets")}</span>
        <span className="pb-1 text-secondary">{` ${trend.tweetsCount}`}</span>
      </Container>
      <ContextMenu
        contextItems={[
          {
            itemId: `context_menu_trend_${trend.id}__interested`,
            contextItemText: t("trends.trendInterest"),
            onClick: async () => {
              return;
            },
          },
          {
            itemId: `context_menu_trend_${trend.id}__spam_report`,
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
