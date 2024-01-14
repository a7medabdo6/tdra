import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useAddUpdateEntity,
  useDeleteEntity,
  useOneEntity,
} from "../Api/Hooks/EntityManagment";
import SkeletonCom from "../components/Skeleton";
function EntityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } =
    id != "add" ? useOneEntity({ id }) : { data: null, isLoading: false };
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
  const { mutate, isLoading: isLoadingUpdate } = useAddUpdateEntity();
  const { mutate: deleteOne, isLoading: isLoadingDelete } = useDeleteEntity();
  const updateOrAdd = () => {
    mutate(obj);
  };
  const Delete = () => {
    deleteOne(obj);
  };
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
            onClick={() => navigate(-1)}
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
              cursor: "pointer",
            }}
          >
            <ArrowBackIcon />
          </Box>

          <Typography sx={{ marginInline: "10px" }}>
            {id == "add" ? " Add Entity " : " Edit Entity Details"}
          </Typography>
        </Grid>
        {isLoading && !data ? (
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
                  Entity Name
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
                  value={obj?.name}
                  onChange={(e) => {
                    setObj((old) => {
                      return { ...old, name: e.target.value };
                    });
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
                  value={obj?.phone}
                  onChange={(e) => {
                    setObj((old) => {
                      return { ...old, phone: e.target.value };
                    });
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
                  value={obj?.serviceUrl}
                  onChange={(e) => {
                    setObj((old) => {
                      return { ...old, serviceUrl: e.target.value };
                    });
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
                  value={obj?.email}
                  onChange={(e) => {
                    setObj((old) => {
                      return { ...old, email: e.target.value };
                    });
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
                    control={
                      <Checkbox
                        value={obj?.isEnabled}
                        checked={obj?.isEnabled}
                        onChange={() => {
                          setObj((old) => {
                            return { ...old, isEnabled: !old?.isEnabled };
                          });
                        }}
                      />
                    }
                    label="Is Enabled"
                  />
                  <FormControlLabel
                    sx={{
                      "& .MuiTypography-root": {
                        color: COLORS.red,
                      },
                    }}
                    control={
                      <Checkbox
                        value={obj?.isDeactivated}
                        checked={obj?.isDeactivated}
                        onChange={() => {
                          setObj((old) => {
                            return {
                              ...old,
                              isDeactivated: !old?.isDeactivated,
                            };
                          });
                        }}
                      />
                    }
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
                {id == "add" && (
                  <BasicButton
                    onClick={updateOrAdd}
                    isLoading={isLoadingUpdate}
                    text="Save"
                    bgColor={COLORS.primary}
                    textColor={COLORS.white}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                )}

                {id != "add" && (
                  <BasicButton
                    onClick={updateOrAdd}
                    isLoading={isLoadingUpdate}
                    text="Edit"
                    bgColor={COLORS.secondary}
                    textColor={COLORS.white}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                )}

                <BasicButton
                  text="Cancel"
                  onClick={Delete}
                  bgColor={COLORS.white}
                  isLoading={isLoadingDelete}
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

export default EntityDetails;
