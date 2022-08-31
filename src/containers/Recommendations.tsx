import { Container, Button, Image } from "react-bootstrap";
import styled from "styled-components";

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const StyledImage = styled(Image)`
  width: 3rem;
  height: 3rem;
`;

const Recommendations = () => {
  return (
    <div className="bg-light mx-1 my-2 rounded-3">
      <div className="py-3 px-3 fs-5 fw-bold">Рекомендовані</div>
      <StyledLink
        href="#"
        className="text-decoration-none text-reset d-flex py-2 px-3 align-items-center justify-content-between"
      >
        <div className="d-flex align-items-center flex-shrink-0">
          <div>
            <StyledImage
              roundedCircle
              fluid
              src="https://mdbootstrap.com/img/new/slides/041.webp"
            />
          </div>
          <div className="px-3">
            <p className="pb-1 fw-bold">Кібердімон 🇺🇦</p>
            <p className="pb-1 text-secondary">@dp_standup</p>
          </div>
        </div>
        <div>
          <Button
            className="rounded-pill fw-bold px-2"
            variant="dark"
            size="sm"
          >
            Читати
          </Button>
        </div>
      </StyledLink>
      <StyledLink
        href="#"
        className="text-decoration-none text-reset d-flex py-2 px-3 align-items-center justify-content-between"
      >
        <div className="d-flex align-items-center flex-shrink-0">
          <div>
            <StyledImage
              roundedCircle
              fluid
              src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
            />
          </div>
          <div className="px-3">
            <p className="pb-1 fw-bold">medgoblin</p>
            <p className="pb-1 text-secondary">@med_goblin</p>
          </div>
        </div>
        <div>
          <Button
            className="rounded-pill fw-bold px-2"
            variant="outline-secondary"
            size="sm"
          >
            Читає(те)
          </Button>
        </div>
      </StyledLink>
      <StyledLink
        href="#"
        className="text-decoration-none text-reset d-flex flex-row py-2"
      >
        <Container className="py-2 px-4">
          <p className="py-1 text-info">Показати більше</p>
        </Container>
      </StyledLink>
    </div>
  );
};

export default Recommendations;
