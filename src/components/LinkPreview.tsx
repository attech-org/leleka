import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

import { getLinkPreview } from "../services/linkPreview";

interface PropsUrl {
  url: string;
}

const LinkPreview = ({ url }: PropsUrl) => {
  const MOCK = {
    description: "",
    image: "",
    title: "",
    url,
  };

  const [response, setResponse] = useState(MOCK);

  useEffect(() => {
    getLinkPreview(url).then((res) => setResponse(res));
  }, []);

  return (
    <Card className="d-flex flex-column align-items-center">
      <Card.Img variant="top" src={response.image} />
      <Card.Body>
        <Card.Title>{response.title}</Card.Title>
        <Card.Text>{response.description}</Card.Text>
        <Button href={response.url} target="blank" variant="light">
          {response.url}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LinkPreview;
