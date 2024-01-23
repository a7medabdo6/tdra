import React, { useEffect, useState } from "react";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SkeletonCom from "../components/Skeleton";
import { useAddUpdateCategory, useOneCategory } from "../Api/Hooks/Category";
function CategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } =
    id != "add" ? useOneCategory({ id }) : { data: null, isLoading: false };
  const [obj, setObj] = useState({
    name: "",
  });
  useEffect(() => {
    // console.log(id, "iddddd");

    if (data) {
      setObj(data);
    }
  }, [data]);
  const { mutate, isLoading: isLoadingUpdate } = useAddUpdateCategory();
  const updateOrAdd = () => {
    mutate(obj);
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
            {id == "add" ? " Add Category " : " Edit Category Details"}
          </Typography>
        </Grid>
        {isLoading && data ? (
          <SkeletonCom />
        ) : (
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
                <Typography sx={{ marginInline: "8px" }}>
                  Category Name
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
                  placeholder="Category Name  "
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
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default CategoryDetails;
