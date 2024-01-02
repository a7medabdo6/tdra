import React from "react";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function EntityDetails() {
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

          <Typography sx={{ marginInline: "10px" }}>
            Edit Entity Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ marginBlock: 4 }}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{
                paddingTop: "0px !important",
              }}
            >
              <Typography sx={{ marginInline: "8px" }}>Entity Name</Typography>

              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "unset !important",
                  },
                }}
                variant="outlined"
                placeholder="Entity Name  "
                style={{ width: "100%", borderRadius: "20px" }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{
                paddingTop: "0px !important",
              }}
            >
              <Typography sx={{ marginInline: "8px" }}>Phone </Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "unset !important",
                  },
                }}
                variant="outlined"
                placeholder="Phone"
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
                Services URL{" "}
              </Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "unset !important",
                  },
                }}
                variant="outlined"
                placeholder=" Services URL"
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
              <Typography sx={{ marginInline: "8px" }}>Email</Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "unset !important",
                  },
                }}
                variant="outlined"
                placeholder="Email"
                style={{ width: "100%", borderRadius: "20px" }}
              />
            </Grid>

            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{
                paddingTop: "30px !important",
                marginInline: "8px",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Is Enabled"
                />
                <FormControlLabel
                  sx={{
                    "& .MuiTypography-root": {
                      color: COLORS.red,
                    },
                  }}
                  control={<Checkbox />}
                  label="Deactivate Entity"
                />
              </FormGroup>
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

export default EntityDetails;
