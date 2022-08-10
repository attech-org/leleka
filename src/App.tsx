import React from "react";
import styled from "styled-components";

const Button = styled.button`
  all: unset;
  padding: 0.5rem 1rem;
  background-color: violet;
  border-radius: 5px;
  text-transform: uppercase;
`

const App: React.FunctionComponent = () => (
  <div>
    Leleka is running...
    <Button>hit me!</Button>
  </div>
);

export default App;
