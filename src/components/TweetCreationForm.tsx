// import React from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { EmojiSmile, Image, Globe2 } from "react-bootstrap-icons";
import styled from "styled-components";

const StyledFormControl = styled(Form.Control)`
  &:focus {
    box-shadow: none;
  }
`;

const TweetCreationForm = () => {
  return (
    <div>
      <div className="justify-content-start">
        <div>
          <img
            src="http://dummyimage.com/105x100.png/5fa2dd/ffffff"
            width="48px"
            height="48px"
            className="me-auto rounded-circle"
          />
        </div>
        <div>
          container
          <div>
            <StyledFormControl
              placeholder="Що відбувається?"
              className="border-0"
            />
          </div>
          <div>
            <Button>
              <Globe2 />
              Відповідати можусть усі користувачі
            </Button>
          </div>
          <div>
            <Image />
            <EmojiSmile />
          </div>
        </div>
      </div>

      <Form>
        <Form.Group className="justify-comtent-start">
          <Stack direction="horizontal" gap={2} className="mx-2">
            <img
              src="http://dummyimage.com/105x100.png/5fa2dd/ffffff"
              width="48px"
              height="48px"
              className="me-auto rounded-circle"
            />
            <StyledFormControl
              placeholder="Що відбувається?"
              className="border-0"
            />
          </Stack>
        </Form.Group>
        <Form.Group>
          <Button>Відповідати можусть усі користувачі</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TweetCreationForm;
