import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { TrendItem } from "../components/TrendItem";
import { MockTrend } from "../types/mock-api-types";

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Trends = () => {
  const trends: Array<MockTrend> = [
    {
      id: "1",
      categoryName: "Полытика",
      categoryValue: "Aktyalne",
      contentRefName: "zaporiska AES",
      tweetsCount: 1234,
    },
    {
      id: "2",
      categoryName: "trending",
      categoryValue: "Ukraine",
      contentRefName: "zaporiska AES",
      tweetsCount: 1234,
    },
    {
      id: "3",
      categoryName: "Полытика",
      categoryValue: "Aktyalne",
      contentRefName: "zaporiska AES",
      tweetsCount: 1234,
    },
  ];
  const { t } = useTranslation();
  return (
    <div className="bg-light my-3 mx-1 rounded-3">
      <div className="py-3 px-3 fs-5 fw-bold">{t("trends.windowTitle")}</div>
      {trends.map((tr) => (
        <TrendItem key={tr.id} trend={tr} />
      ))}
      <StyledLink
        href="/trends"
        className="text-decoration-none text-reset d-flex flex-row py-2"
      >
        <Container className="py-2 px-3">
          <p className="py-1 text-info">{t("common.showMore")}</p>
        </Container>
      </StyledLink>
    </div>
  );
};

export default Trends;
