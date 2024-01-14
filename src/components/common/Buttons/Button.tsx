import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface BasicButtonProps {
  textColor: string;
  bgColor: string;
  text: any;
  style?: any;
  onClick?: any;
  isLoading?: boolean;
}
const BasicButton: React.FC<BasicButtonProps> = ({
  textColor,
  bgColor,
  text,
  style,
  onClick,
  isLoading,
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
      {isLoading ? (
        <CircularProgress
          sx={{ height: "20px !important", width: "20px !important" }}
        />
      ) : (
        text
      )}
    </Button>
  );
};

export default BasicButton;
