import React from "react";
import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";

import { useOneCategory } from "../../Api/Hooks/Category";

function SelectComponenetForCategory({ item, handleEntityChange }: any) {
  const { data: category } = useOneCategory(item?.categoryId);

  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={6}
      sx={{
        paddingTop: "0px !important",
      }}
    >
      <Typography sx={{ marginInline: "8px" }}>{item?.name}</Typography>

      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          "&.MuiFormControl-root": {
            height: "40px",
            width: "100% !important",
            marginTop: "0px",
          },
        }}
      >
        <Select
          sx={{
            "&.MuiInputBase-root": {
              height: "40px",
              borderRadius: " 14px",
              backgroundColor: "#bcbbbb1c",
            },
          }}
          onChange={(e: any) => {
            handleEntityChange(e, item.name);
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {category?.lookupValues?.map((item: any) => (
            <MenuItem key={item} value={item.value}>
              {item?.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default SelectComponenetForCategory;
