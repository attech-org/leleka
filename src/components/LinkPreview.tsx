import { useEffect, useState } from "react";
import styled from "styled-components";

interface PropsUrl {
  url: string;
}

const Wrapper = styled.div`
  width: 300px;
`;

const LinkPreview: React.FC<PropsUrl> = ({ url }) => {
  const dataObject = {
    key: "5077f2d1873bbe183521eb490ff0e2bb",
    q: url,
  };

  const [responseObject, setResponseobject] = useState({
    description: "",
    image: "",
    title: "",
    url: "",
  });

  useEffect(() => {
    fetch("https://api.linkpreview.net", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(dataObject),
    })
      .then((res) => {
        if (res.status != 200) {
          // console.log(res.status);
          throw new Error("something went wrong");
        }
        return res.json();
      })
      .then((response) => {
        setResponseobject(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Wrapper className="card">
      <img src={responseObject.image} className="card-img-top" alt="preview" />

      <div className="card-body ">
        <h5 className="card-title  fw-bold">{responseObject.title}</h5>
        <p className="card-text">{responseObject.description}</p>
        <a
          href={responseObject.url}
          target="blank"
          className="btn btn-light d-block mt-3"
        >
          {responseObject.url}
        </a>
      </div>
    </Wrapper>
  );
};

export default LinkPreview;
