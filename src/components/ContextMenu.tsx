import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import { ThreeDots, EmojiFrown } from "react-bootstrap-icons";
import styled from "styled-components";

const StyledLink = styled.div`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
    cursor: pointer;
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
  height: 40px;
  width: 40px;
  :focus:not(:focus-visible) {
    box-shadow: none;
  }
  :hover {
    color: rgb(29, 155, 240) !important;
    background-color: rgba(29, 155, 240, 0.1) !important;
  }
`;

export interface ContextMenuItemProp {
  itemId: string;
  contextItemText: string;
  onClick: (id?: string) => void;
}
export const ContextMenu = ({
  contextItems,
}: {
  contextItems: Array<ContextMenuItemProp>;
}) => {
  return (
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
              {contextItems &&
                contextItems.map((ci) => {
                  return (
                    <StyledLink
                      key={ci.itemId}
                      className="text-decoration-none text-reset d-flex flex-row p-2 fs-5"
                      onClick={() => {
                        ci.onClick();
                      }}
                    >
                      <span className="px-3">
                        <EmojiFrown />
                      </span>
                      {ci.contextItemText}
                    </StyledLink>
                  );
                })}
            </Popover.Body>
          </StyledPopover>
        }
      >
        <StyledButton
          className="text-secondary me-2 p-0 rounded-circle"
          variant="link"
        >
          <ThreeDots size={20} />
        </StyledButton>
      </OverlayTrigger>
    </div>
  );
};
