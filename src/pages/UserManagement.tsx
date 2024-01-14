import { Container, Grid, useMediaQuery } from "@mui/material";

import React from "react";
import BasicTable from "../components/common/Table/Table";
import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import BasicTabs from "../components/common/Tab";
import SearchInput from "../components/common/Inputs/Searchinput";
import { useDeleteUser, useUseres } from "../Api/Hooks/Users";
import { useNavigate } from "react-router-dom";
import ServerError from "../components/Error/ServerError";
import SkeletonCom from "../components/Skeleton";
import { useRolees } from "../Api/Hooks/Roles";
import TableRole from "../components/common/Table/TableRole";
const Headers = [
  { label: "Id", key: "id" },
  { label: "Username ", key: "userName" },
  { label: "Full Name", key: "fullName" },
  { label: "Mobile", key: "phoneNumber" },
  { label: "Email", key: "email" },
  { label: "Role", key: "role" },
];
const HeadersRoles = [
  { label: "Id", key: "id" },
  { label: "Role Name ", key: "name" },
  { label: "Assigned Modules", key: "modules" },
];

const UserManagement: React.FC<any> = () => {
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const { data, isLoading, isError } = useUseres();
  const { data: roles, isLoading: isLoadingRoles } = useRolees();

  const navigate = useNavigate();
  const { mutate, isLoading: isLoadingDelete } = useDeleteUser();
  const DeleteFun = (id: any) => {
    mutate({ id });
  };
  return (
    <Container>
      <BasicTabs
        itemOne={
          <Grid
            container
            spacing={3}
            sx={{ marginBlock: isSmallScreen ? "0px" : "20px" }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    paddingTop: "0px !important",
                    paddingLeft: "0px !important",
                  }}
                >
                  <SearchInput />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: isSmallScreen ? "flex-start" : "flex-end",
                    paddingTop: isSmallScreen ? "20px" : "10px !important",
                    paddingLeft: isSmallScreen ? "0px !important" : "auto",
                  }}
                >
                  <BasicButton
                    text="Add New User"
                    onClick={() => navigate("/user-details/add")}
                    bgColor={COLORS.primary}
                    textColor={COLORS.white}
                  />
                </Grid>
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
                  deletebtn={false}
                  link="/user-details"
                />
              </Grid>
            )}
          </Grid>
        }
        itemTow={
          <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    paddingTop: "0px !important",
                    paddingLeft: "0px !important",
                  }}
                >
                  <SearchInput />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: isSmallScreen ? "flex-start" : "flex-end",
                    paddingTop: isSmallScreen ? "20px" : "10px !important",
                    paddingLeft: isSmallScreen ? "0px !important" : "auto",
                  }}
                >
                  <BasicButton
                    text="Add New Role"
                    onClick={() => navigate("/add-role/add")}
                    bgColor={COLORS.primary}
                    textColor={COLORS.white}
                  />
                </Grid>
              </Grid>
            </Grid>
            {isError ? (
              <ServerError />
            ) : isLoadingRoles ? (
              <SkeletonCom />
            ) : (
              <Grid item xs={12} sm={12} md={12}>
                <TableRole
                  Headers={HeadersRoles}
                  data={roles}
                  actions={true}
                  middleBtn={false}
                  deletebtn={false}
                  haveButtons={true}
                  deleteFun={DeleteFun}
                  isLoadingDelete={isLoadingDelete}
                  link="/add-role"
                />
              </Grid>
            )}
          </Grid>
        }
      />
    </Container>
  );
};

export default UserManagement;
