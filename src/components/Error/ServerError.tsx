import { Box } from "@mui/material";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
function ServerError() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: "50px" }} />
    </Box>
  );
}

export default ServerError;
