import { Card, Row, Col, Container, Image, Dropdown } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const StyledCard = styled(Card)`
  font-family: "Segoe UI", Tahoma, Verdana, sans-serif;
  max-width: 598px;
  padding: 0 16px;
  border: none;
  text-align: left;
`;
const StyledImg = styled(Image)`
  width: 48px;
  height: 48px;
  padding: 0;
`;
// const StyledRow = styled(Row)`
//   padding: 0;
// `;

const Author = styled.div`
  height: 48px;
  /* background-color: #d4ffc7; */
  margin-top: 12px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
`;
const Logo = styled.img`
  margin-right: 12px;
  border-radius: 50%;
`;
const NameSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const NameWrapper = styled.div``;
const Name = styled.div`
  font-weight: bold;
  font-size: 16px;
  height: 20px;
  display: flex;
  align-items: center;
`;
const NickName = styled.div`
  font-size: 16px;
  height: 20px;
  display: flex;
  align-items: center;
`;
const SDropdownToggle = styled(Dropdown.Toggle)`
  border-radius: 50%;
  background-color: white;
  width: 18.75px;
  height: 18.75px;
  padding: 0;
  border: none;
  margin-left: 20px;
`;

const SingleTweetBS = () => {
  return (
    <div>
      <StyledCard>
        <Card.Header>
          <Container>
            <Row>
              <Col>
                <StyledImg
                  roundedCircle
                  src="https://pbs.twimg.com/profile_images/2204738923/justlviv_normal.jpg"
                />
              </Col>
              <Col>
                <Card.Title>Ярослав Львівський</Card.Title>
                <Card.Text>@justlviv</Card.Text>
              </Col>
              <Col>
                <Icon.ThreeDots />
              </Col>
            </Row>
          </Container>
        </Card.Header>

        <Author>
          <Logo src="https://pbs.twimg.com/profile_images/2204738923/justlviv_normal.jpg" />
          <NameSection>
            <NameWrapper>
              <Name>Ярослав Львівський</Name>
              <NickName>@justlviv</NickName>
            </NameWrapper>
            <Dropdown>
              <SDropdownToggle variant="success" id="dropdown-basic">
                <svg viewBox="0 0 24 24">
                  <g stroke="grey">
                    <circle cx="5" cy="10" r="2" />
                    <circle cx="12" cy="10" r="2" />
                    <circle cx="19" cy="10" r="2" />
                  </g>
                </svg>
              </SDropdownToggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Почати читати</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Додати/Видалити</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Ігнорувати</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </NameSection>
        </Author>

        <Card.Body>
          <Card.Text>
            "Все, бля, я поняв, як блокування дальності знімати" - Андрій,
            мобілізований it-спеціаліст, член екіпажу HIMARS. 9 серпня 2022.
          </Card.Text>
        </Card.Body>
        <Card.Footer>10:00 AM · 10 сер. 2022 р. - Leleka Web App</Card.Footer>
        <Card.Footer>
          1 215 рекурликів 44 курлика с цитатами 11,8 тис. відміток
          «Подобається»
        </Card.Footer>
        <Card.Footer>
          <Row>
            <Col>
              <Icon.Chat />
            </Col>
            <Col>
              <Icon.ArrowRepeat />
            </Col>
            <Col>
              <Icon.Heart />
            </Col>
            <Col>
              <Icon.Upload />
            </Col>
          </Row>
        </Card.Footer>
      </StyledCard>
    </div>
  );
};

export default SingleTweetBS;
