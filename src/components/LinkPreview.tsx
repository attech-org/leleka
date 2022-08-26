import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

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

  useEffect(() => {
    customFetcher(url).then((res) => {
      if (res.image[0] !== "h") {
        res.image = "https://" + res.hostname + res.image;
      }
      setResponse(res);
    });
  }, []);

  return (
    <Card className="text-start">
      <Card.Img src={response.image} />
      <Card.Body>
        <Card.Title>{response.title}</Card.Title>
        <Card.Text>{response.description}</Card.Text>
        <Button
          className="mt-3 d-flex align-items-center"
          href={response.url}
          target="blank"
          variant="light"
        >
          {response.siteName}
          <span className="mb-1 mx-1">.</span>
          {response.hostname}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LinkPreview;
