import { Container } from "react-bootstrap";
import styled from "styled-components";

import { MockTrend } from "../types/mock-api-types";
import { DotsDropDown } from "./ThreeDotedButton";

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
export const TrendItem = ({ trend }: { trend: MockTrend }) => {
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
        <span className="pb-1 text-secondary">Твітів: </span>
        <span className="pb-1 text-secondary">{trend.tweetsCount}</span>
      </Container>
      <DotsDropDown />
    </StyledLink>
  );
};
