import React, { useEffect, useState } from "react";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useOneEntityMapping } from "../Api/Hooks/EntityMapping";
import { useParams } from "react-router-dom";
import SkeletonCom from "../components/Skeleton";
function MappingScreen() {
  const { id } = useParams();
  const { data, isLoading } = useOneEntityMapping({ id });
  const [obj, setObj] = useState({
    name: "",
    phone: "",
    email: "",
    serviceUrl: "",
    isEnabled: false,
    isDeactivated: false,
    fields: [],
  });
  useEffect(() => {
    if (data) {
      setObj(data);
    }
  }, [data]);
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            marginBottom: 2,
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

          <Typography sx={{ marginInline: "10px" }}>Mapping Screen</Typography>
        </Grid>
        {isLoading && data ? (
          <SkeletonCom />
        ) : (
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
                <Typography sx={{ marginInline: "8px" }}>
                  Urgency Level
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
                  placeholder="Urgency Level  "
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
                <Typography sx={{ marginInline: "8px" }}>Subject </Typography>
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
                  placeholder="Subject"
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
                  Confidentiality Level
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
                  placeholder=" Confidentiality Level"
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
                  Reference Nubmer
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
                  placeholder="Reference Nubmer"
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
                <Typography sx={{ marginInline: "8px" }}>From Email</Typography>
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
                  placeholder="From Email"
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
                <Typography sx={{ marginInline: "8px" }}>Po BOx</Typography>
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
                  placeholder="Po BOx"
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
                  Sending Party Address
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
                  placeholder="Sending Party Address"
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
                  Target Entity
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
                  placeholder="Target Entity"
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
                  Document NO
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
                  placeholder="Document NO"
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
                  Document Date
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
                  placeholder="Document Date"
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
                <Typography sx={{ marginInline: "8px" }}>File Name</Typography>
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
                  placeholder="File Name"
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
                  Document Reference
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
                  placeholder="Document Reference"
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
                  Document Passkey
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
                  placeholder="Document Passkey"
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
                <Typography sx={{ marginInline: "8px" }}>Notes</Typography>
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
                  placeholder="Notes"
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
                  marginTop: "5%",
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
        )}
      </Grid>
    </Container>
  );
}

export default MappingScreen;
