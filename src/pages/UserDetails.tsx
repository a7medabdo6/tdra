import React from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function UserDetails() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            marginBottom: 4,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              color: COLORS.white,
              backgroundColor: COLORS.secondary,
              borderRadius: "20px",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px ",
            }}
          >
            <ArrowBackIcon />
          </Box>

          <Typography sx={{ marginInline: "10px" }}>Edit User</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ marginBlock: 4 }}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                paddingTop: "0px !important",
              }}
            >
              <Typography sx={{ marginInline: "8px" }}>Full Name</Typography>

              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                }}
                variant="outlined"
                placeholder="Full Name  "
                style={{ width: "100%", borderRadius: "20px" }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{
                paddingTop: "20px !important",
              }}
            >
              <Typography sx={{ marginInline: "8px" }}>Username </Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                }}
                variant="outlined"
                placeholder="Username"
                style={{ width: "100%", borderRadius: "20px" }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{
                paddingTop: "20px !important",
              }}
            >
              <Typography sx={{ marginInline: "8px" }}>Email </Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                }}
                variant="outlined"
                placeholder=" Email"
                style={{ width: "100%", borderRadius: "20px" }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{
                paddingTop: "20px !important",
              }}
            >
              <Typography sx={{ marginInline: "8px" }}>Mobile</Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                }}
                variant="outlined"
                placeholder="Mobile"
                style={{ width: "100%", borderRadius: "20px" }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{
                paddingTop: "20px !important",
              }}
            >
              <Typography sx={{ marginInline: "8px" }}>Role</Typography>
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
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{
                paddingTop: "20px !important",
              }}
            >
              <Typography sx={{ marginInline: "8px" }}>Password</Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                }}
                variant="outlined"
                placeholder="Password"
                style={{ width: "100%", borderRadius: "20px" }}
              />
            </Grid>

            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{
                paddingTop: "20px !important",
              }}
            >
              <Typography sx={{ marginInline: "8px" }}>
                Confirm Password
              </Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                }}
                variant="outlined"
                placeholder="Confirm Password"
                style={{ width: "100%", borderRadius: "20px" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "10px !important",
                marginTop: "15%",
              }}
            >
              <BasicButton
                text="Save"
                bgColor={COLORS.primary}
                textColor={COLORS.white}
                style={{
                  borderRadius: "10px",
                }}
              />
              <BasicButton
                text="Edit"
                bgColor={COLORS.secondary}
                textColor={COLORS.white}
                style={{
                  borderRadius: "10px",
                }}
              />
              <BasicButton
                text="Cancel"
                bgColor={COLORS.white}
                textColor={COLORS.secondary}
                style={{
                  border: `1px solid ${COLORS.secondary}`,
                  borderRadius: "10px",
                  "&:hover": {
                    border: `1px solid ${COLORS.secondary}`,
                    color: COLORS.secondary,
                    backgroundColor: COLORS.white,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserDetails;
