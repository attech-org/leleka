import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CardImage } from "react-bootstrap-icons";

import { customFetcher } from "../services/customFetcher";

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
    const res = await customFetcher(url);
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
            <Card.Img className="rounded-4" src={response.image} />
            <Card.Body className="border-top">
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
      ) : (
        <a target="blank" className=" text-decoration-none" href={response.url}>
          <div className="text-black border rounded-4 d-flex justify-content-start ">
            <div className="border-end px-2">
              <CardImage size={100} />
            </div>
            <Card.Body className="text-secondary ms-2 ">
              <Card.Text className="mt-3 d-flex align-items-center">
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
