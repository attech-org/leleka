import { Container, OverlayTrigger, Popover, Button } from "react-bootstrap";
import { ThreeDots, EmojiFrown } from "react-bootstrap-icons";
import styled from "styled-components";

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const StyledPopover = styled(Popover)`
  --bs-popover-max-width: 500px;
  inset: 45px -45px auto auto !important;
  .popover-arrow {
    display: none;
  }
  .popover-body {
    padding: 0;
  }
`;

const StyledButton = styled(Button)`
  :focus:not(:focus-visible) {
    box-shadow: none;
  }
`;

const Trends = () => {
  return (
    <div className="bg-light m-4 rounded-3">
      <div className="py-3 px-2 fs-3 fw-bold">Тренди для вас</div>
      <StyledLink
        href="#"
        className="text-decoration-none text-reset d-flex flex-row py-2"
      >
        <Container className="pb-2">
          <p className="pb-1 text-secondary">Політика · Актуальне</p>
          <p className="pb-1 fs-5 fw-bold">Zaporizhzhia NPP</p>
          <span className="pb-1 text-secondary">Твітів: </span>
          <span className="pb-1 text-secondary">8 038</span>
        </Container>
        <div className="align-items-start align-top">
          <OverlayTrigger
            transition
            rootClose
            trigger="click"
            key="left"
            placement="left"
            overlay={
              <StyledPopover id="popover-positioned-left">
                <Popover.Body>
                  <p>
                    <StyledLink
                      className="text-decoration-none text-reset d-flex flex-row p-2 fs-5"
                      href="#"
                    >
                      <span className="px-3">
                        <EmojiFrown />
                      </span>
                      Цей твіт мене не цікавить
                    </StyledLink>
                  </p>
                  <p>
                    <StyledLink
                      className="text-decoration-none text-reset d-flex flex-row p-2 fs-5"
                      href="#"
                    >
                      <span className="px-3">
                        <EmojiFrown />
                      </span>
                      Цей тренд шкідливий або містить багато спаму
                    </StyledLink>
                  </p>
                </Popover.Body>
              </StyledPopover>
            }
          >
            <StyledButton className="text-secondary" variant="link">
              <ThreeDots size={24} />
            </StyledButton>
          </OverlayTrigger>
        </div>
      </StyledLink>
      <StyledLink
        href="#"
        className="text-decoration-none text-reset d-flex flex-row py-2"
      >
        <Container className="pb-2">
          <p className="pb-1 text-secondary">Україна · Актуальне</p>
          <p className="pb-1 fs-5 fw-bold">#anxiety</p>
          <span className="pb-1 text-secondary">Твітів: </span>
          <span className="pb-1 text-secondary">5 038</span>
        </Container>
        <div className="align-items-start align-top">
          <OverlayTrigger
            transition
            rootClose
            trigger="click"
            key="left"
            placement="left"
            overlay={
              <StyledPopover id="popover-positioned-left">
                <Popover.Body>
                  <p>
                    <StyledLink
                      className="text-decoration-none text-reset d-flex flex-row p-2 fs-5"
                      href="#"
                    >
                      <span className="px-3">
                        <EmojiFrown />
                      </span>
                      Цей твіт мене не цікавить
                    </StyledLink>
                  </p>
                  <p>
                    <StyledLink
                      className="text-decoration-none text-reset d-flex flex-row p-2 fs-5"
                      href="#"
                    >
                      <span className="px-3">
                        <EmojiFrown />
                      </span>
                      Цей тренд шкідливий або містить багато спаму
                    </StyledLink>
                  </p>
                </Popover.Body>
              </StyledPopover>
            }
          >
            <StyledButton className="text-secondary" variant="link">
              <ThreeDots size={24} />
            </StyledButton>
          </OverlayTrigger>
        </div>
      </StyledLink>
      <StyledLink
        href="#"
        className="text-decoration-none text-reset d-flex flex-row py-2"
      >
        <Container className="pb-2">
          <p className="pb-1 text-secondary">Україна · Актуальне</p>
          <p className="pb-1 fs-5 fw-bold">ATACMS</p>
          <span className="pb-1 text-secondary">Твітів: </span>
          <span className="pb-1 text-secondary">2 770</span>
        </Container>
        <div className="align-items-start align-top">
          <OverlayTrigger
            transition
            rootClose
            trigger="click"
            key="left"
            placement="left"
            overlay={
              <StyledPopover id="popover-positioned-left">
                <Popover.Body>
                  <p>
                    <StyledLink
                      className="text-decoration-none text-reset d-flex flex-row p-2 fs-5"
                      href="#"
                    >
                      <span className="px-3">
                        <EmojiFrown />
                      </span>
                      Цей твіт мене не цікавить
                    </StyledLink>
                  </p>
                  <p>
                    <StyledLink
                      className="text-decoration-none text-reset d-flex flex-row p-2 fs-5"
                      href="#"
                    >
                      <span className="px-3">
                        <EmojiFrown />
                      </span>
                      Цей тренд шкідливий або містить багато спаму
                    </StyledLink>
                  </p>
                </Popover.Body>
              </StyledPopover>
            }
          >
            <StyledButton className="text-secondary" variant="link">
              <ThreeDots size={24} />
            </StyledButton>
          </OverlayTrigger>
        </div>
      </StyledLink>
      <StyledLink
        href="#"
        className="text-decoration-none text-reset d-flex flex-row py-2"
      >
        <Container className="py-2">
          <p className="py-1 fs-5 text-primary">Показати більше</p>
        </Container>
      </StyledLink>
    </div>
  );
};

export default Trends;
