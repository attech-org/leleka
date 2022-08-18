import styled from "styled-components";

const Button = styled.button`
  width: 20%;
  background-color: grey;
`;

const Input = styled.input`
  width: 80%;
  margin-left: 10px;
  margin-right: 10px;
`;

const Block = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const InputLine: React.FC = () => {
  return (
    <Block>
      <Input placeholder="Напиши свій коментар" />
      <Button className="btn">Коментувати</Button>
    </Block>
  );
};
