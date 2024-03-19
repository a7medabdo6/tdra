import {
  Container,
  Grid,
  Typography,
  debounce,
  useMediaQuery,
} from "@mui/material";

import React, { useState } from "react";
import BasicTable from "../components/common/Table/Table";
import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import SearchInput from "../components/common/Inputs/Searchinput";
import { useNavigate } from "react-router-dom";
import SkeletonCom from "../components/Skeleton";
import ServerError from "../components/Error/ServerError";
import { useCategoryes, useDeleteCategory } from "../Api/Hooks/Category";
import CurrentUser from "../CurrentUser";
const Headers = [
  { label: "Id", key: "id" },
  { label: "Name ", key: "name" },
  // { label: "Description", key: "description" },
];

const Category: React.FC<any> = () => {
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const [text, setText] = useState("");

  const { data, isLoading, isError } = useCategoryes(text);
  const navigate = useNavigate();
  const { mutate, isLoading: isLoadingDelete } = useDeleteCategory();
  const DeleteFun = (id: any) => {
    mutate({ id });
  };
  const onChangeSearch = (value: string) => {
    setText(value);
  };
  const debouncedOnChange = debounce(onChangeSearch, 500);
  const { user } = CurrentUser();
  return (
    <Container>
      <Grid
        container
        spacing={3}
        sx={{
          marginBlock: isSmallScreen ? "0px" : "20px",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={6}
              sm={3}
              md={3}
              sx={{
                paddingTop: "10px !important",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>
                Lookup Management
              </Typography>
            </Grid>
            {isSmallScreen && (
              <Grid
                item
                xs={6}
                sm={3}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "10px !important",
                  marginBottom: "20px",
                }}
              >
                <BasicButton
                  onClick={() => navigate("/category-details/add")}
                  text="Add Category "
                  bgColor={COLORS.primary}
                  textColor={COLORS.white}
                  style={{ fontSize: "9px" }}
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              sx={{
                paddingTop: "0px !important",
              }}
            >
              <SearchInput onchange={debouncedOnChange} />
            </Grid>
            {!isSmallScreen && (
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "0px !important",
                }}
              >
                <BasicButton
                  text="Add Category"
                  onClick={() => navigate("/category-details/add")}
                  bgColor={COLORS.primary}
                  textColor={COLORS.white}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {isError ? (
          <ServerError />
        ) : isLoading ? (
          <SkeletonCom />
        ) : (
          <Grid item xs={12} sm={12} md={12}>
            <BasicTable
              Headers={Headers}
              data={data}
              actions={true}
              middleBtn={false}
              deletebtn={true}
              user={user}
              deleteFun={DeleteFun}
              isLoadingDelete={isLoadingDelete}
              link="/lookup-management"
              textForEdit="View"
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Category;
