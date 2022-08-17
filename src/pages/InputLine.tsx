import { Input, Paper } from "@mui/material";
import { Button } from "react-bootstrap";
import "./InputLine.css";

export const InputLine: React.FC = () => {
  return (
    <Paper className="paper">
      <Input className="input" placeholder="Напиши свій коментарій" />
      <Button className="btn2">Коментувати</Button>
    </Paper>
  );
};
