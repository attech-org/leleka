import _ from "lodash";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CardImage } from "react-bootstrap-icons";
import styled from "styled-components";

import { customFetcher } from "../services/customFetcher";

const StyledCardImg = styled(Card.Img)`
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const StyledWrapperImage = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 0px;
`;
export interface APIOutput {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  hostname?: string;
  url?: string;
}
interface PropsUrl {
  url: string;
}

const LinkPreview = ({ url }: PropsUrl) => {
  const MOCK: APIOutput = {
    description: "",
    image: "",
    title: "",
    siteName: "",
    hostname: "",
    url,
  };

  const [response, setResponse] = useState(MOCK);

  const getResponse = async () => {
    const res: APIOutput = await customFetcher(url);
    if (res.image) {
      res.description = _.truncate(res.description, {
        length: 130,
        separator: /,? +/,
      });
    } else {
      res.description = _.truncate(res.description, {
        length: 100,
        separator: /,? +/,
      });
    }

    setResponse(res);
  };

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <>
      {response.image ? (
        <a target="blank" className="text-decoration-none" href={response.url}>
          <Card className="rounded-4 text-secondary">
            <StyledCardImg src={response.image} />
            <Card.Body>
              <Card.Text className="mb-2 d-flex align-items-center">
                {response.siteName}
                {response.siteName && response.hostname && (
                  <span className="mb-1 mx-1">.</span>
                )}
                {response.hostname}
              </Card.Text>
              <Card.Subtitle className="mb-2">{response.title}</Card.Subtitle>
              <Card.Text>{response.description}</Card.Text>
            </Card.Body>
          </Card>
        </a>
      ) : Object.keys(response).length == 1 ? (
        <p>{MOCK.url}</p>
      ) : (
        <a target="blank" className=" text-decoration-none" href={response.url}>
          <div className="text-black border rounded-4 d-flex justify-content-start ">
            <StyledWrapperImage className="border-end px-5 d-flex justify-content-center align-items-center bg-light">
              <CardImage color="rgb(83, 100, 113)" size={40} />
            </StyledWrapperImage>
            <Card.Body className="text-secondary ms-2 me-4 my-3">
              <Card.Text className="d-flex align-items-center">
                {response.siteName}
                {response.siteName && response.hostname && (
                  <span className="mb-1 mx-1">.</span>
                )}
                {response.hostname}
              </Card.Text>
              <Card.Title>{response.title}</Card.Title>
              <Card.Text>{response.description}</Card.Text>
            </Card.Body>
          </div>
        </a>
      )}
    </>
  );
};

export default LinkPreview;
