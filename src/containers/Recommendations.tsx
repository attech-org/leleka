import { Container, Button, Image } from "react-bootstrap";
import styled from "styled-components";

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const StyledImage = styled(Image)`
  width: 4rem;
  height: 4rem;
`;

const Recommendations = () => {
  return (
    <div className="bg-light m-4 rounded-3">
      <div className="py-3 px-4 fs-3 fw-bold">Рекомендовані</div>
      <StyledLink
        href="#"
        className="text-decoration-none text-reset d-flex py-2 px-4 align-items-center justify-content-between"
      >
        <div className="d-flex align-items-center ">
          <div>
            <StyledImage
              roundedCircle
              fluid
              src="https://mdbootstrap.com/img/new/slides/041.webp"
            />
          </div>
          <div className="p-3">
            <p className="pb-1 fs-5 fw-bold">Кібердімон 🇺🇦</p>
            <p className="pb-1 fs-5 text-secondary">@dp_standup</p>
          </div>
        </div>
        <div>
          <Button className="rounded-pill fs-5 fw-bold px-3" variant="dark">
            Читати
          </Button>
        </div>
      </StyledLink>
      <StyledLink
        href="#"
        className="text-decoration-none text-reset d-flex py-2 px-4 align-items-center justify-content-between"
      >
        <div className="d-flex align-items-center ">
          <div>
            <StyledImage
              roundedCircle
              fluid
              src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
            />
          </div>
          <div className="p-3">
            <p className="pb-1 fs-5 fw-bold">medgoblin</p>
            <p className="pb-1 fs-5 text-secondary">@med_goblin</p>
          </div>
        </div>
        <div>
          <Button
            className="rounded-pill fs-5 fw-bold px-3"
            variant="outline-secondary"
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
          <p className="py-1 fs-5 text-primary">Показати більше</p>
        </Container>
      </StyledLink>
    </div>
  );
};

export default Recommendations;
