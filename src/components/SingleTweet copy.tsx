import { Container, Card, Button, Row, Col, Dropdown } from "react-bootstrap";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  font-family: Arial, Helvetica, sans-serif;
  background-color: #ffdf28;
  max-width: 598px;
  padding: 0 16px;
  height: 334px;
  border: solid 1px;
`;

const StyledCard = styled(Card)`
  max-width: 566px;
  border-radius: 0;
  border: none;
`;

const StyledCardBody = styled(Card.Body)`
  max-width: 566px;
  border-radius: 0;
  border: none;
`;

const StyledCardHeader = styled(Card.Header)`
  max-width: 566px;
  height: 48px;
  margin-top: 12px;
  margin-bottom: 4px;
`;

const StyledDataRow = styled(Card.Body)`
  height: 20px;
  margin: 16px 0;
  border-radius: 0;
  border: none;
  background-color: #fffbe7;
  font-size: 15px;
`;

const StyledCardFooter = styled(Card.Footer)`
  background-color: #aaaaaa;
`;

const SingleTweet = () => {
  return (
    <div>
      <StyledContainer>
        <StyledCard>
          <StyledCardHeader>
            <Row>
              <Col>
                <Card.Img
                  variant="top"
                  src="logo.png"
                  alt="logo"
                  width="48px"
                  height="48px"
                />
              </Col>
              <Col>
                <Row>Ярослав Львівський</Row>
                <Row>@justlviv</Row>
              </Col>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    ...
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      Почати читати
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Додати/Видалити
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Ігнорувати</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>{" "}
              </Col>
            </Row>
          </StyledCardHeader>
          <Card.Body>
            <Card.Text>
              "Все, бля, я поняв, як блокування дальності знімати" - Андрій,
              мобілізований it-спеціаліст, член екіпажу HIMARS. 9 серпня 2022.
            </Card.Text>
            <Card.Text>Перевести курлик</Card.Text>
          </Card.Body>
          <StyledCardBody>
            <StyledDataRow>
              <Col>10:00 AM · 10 сер. 2022 р.</Col>
              <Col>Leleka Web App</Col>
            </StyledDataRow>
          </StyledCardBody>
          <Card.Body>
            <Row>
              <Col>1 215 рекурликів</Col>
              <Col>44 курлика с цитатами</Col>
              <Col>11,8 тис. відміток «Подобається»</Col>
            </Row>
          </Card.Body>
          <StyledCardFooter>
            <Row>
              <Col>
                <Button>Відп</Button>
              </Col>
              <Col>
                <Button>Рекур</Button>
              </Col>
              <Col>
                <Button>Впод</Button>
              </Col>
              <Col>
                <Button>Розш</Button>
              </Col>
            </Row>
          </StyledCardFooter>
        </StyledCard>
      </StyledContainer>
    </div>
  );
};

export default SingleTweet;
