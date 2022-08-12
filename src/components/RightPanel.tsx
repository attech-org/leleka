import styled from "styled-components";

const Wrapper = styled.div`
  height: 150vh; // optional

  position: sticky;
  top: 0;

  background-color: lightgreen;

  @media (max-width: 1000px) {
    display: none;
  }
`;
export const RightPanel = () => {
  return (
    <Wrapper>
      <div>right side</div>
    </Wrapper>
  );
};
