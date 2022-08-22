import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { EmojiSmile, Image as ImageIcon, Globe2 } from "react-bootstrap-icons";
import styled from "styled-components";

const StyledFormControl = styled(Form.Control)`
  &:focus {
    box-shadow: none;
  }
`;
const StyledButton = styled(Button)`
  &:hover {
    box-shadow: none;
  }
`;
const StyledIcon = styled.div`
  height: 32px;
  width: 32px;
  color: #2929ff;
`;

const TweetCreationForm = () => {
  return (
    <div>
      <Container className="p-2">
        <Row>
          <Col xs={{ span: 1, offset: 0 }}>
            <img
              src="http://dummyimage.com/105x100.png/5fa2dd/ffffff"
              width="48px"
              height="48px"
              className="me-auto rounded-circle"
            />
          </Col>
          <Col xs={{ span: 11, offset: 0 }}>
            <StyledFormControl
              placeholder="Що відбувається?"
              className="border-0"
              size="lg"
            />

            <Container className="border-bottom">
              <StyledButton
                size="sm"
                className="my-2 d-flex align-items-center secondary rounded-5 fw-bold text-primary bg-white border-0"
              >
                <Globe2 className="me-1" />
                <span>Відповідати можусть усі користувачі</span>
              </StyledButton>
            </Container>

            <Container>
              <Row size="lg">
                <Col
                  xs={{ span: 1, offset: 0 }}
                  className="d-flex justify-content-start align-items-center p-2"
                >
                  <StyledIcon>
                    <ImageIcon className="mx-1" />
                  </StyledIcon>
                  <StyledIcon>
                    <EmojiSmile className="mx-1" />
                  </StyledIcon>
                </Col>
                <Col
                  xs={{ span: 11, offset: 0 }}
                  className="d-flex justify-content-end align-items-center p-2"
                >
                  <Button className="rounded-5">Твітнути</Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TweetCreationForm;
