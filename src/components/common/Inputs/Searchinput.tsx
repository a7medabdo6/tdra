import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput() {
  return (
    <TextField
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "40px",
          backgroundColor: "#bcbbbb1c",
          borderRadius: "14px",
          border: "unset !important",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "unset !important",
        },
      }}
      variant="outlined"
      placeholder="Search Lookup Value"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      style={{ width: "100%", borderRadius: "20px" }}
    />
  );
}

export default SearchInput;
