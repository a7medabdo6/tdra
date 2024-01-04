import { Button } from "@mui/material";
import React from "react";

interface BasicButtonProps {
  textColor: string;
  bgColor: string;
  text: string;
  style?: any;
  onClick?: any;
}
const BasicButton: React.FC<BasicButtonProps> = ({
  textColor,
  bgColor,
  text,
  style,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        boxShadow: "unset",
        marginInline: "10px",
        ...style,
      }}
      variant="contained"
    >
      {text}
    </Button>
  );
};

export default BasicButton;
