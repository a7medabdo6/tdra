import React, { useEffect, useState } from "react";
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
import { useAddUpdateUser, useOneUser } from "../Api/Hooks/Users";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonCom from "../components/Skeleton";
import { useRolees } from "../Api/Hooks/Roles";
import CurrentUser from "../CurrentUser";
function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: roles } = useRolees("");
  const { data, isLoading } =
    id != "add" ? useOneUser({ id }) : { data: null, isLoading: false };
  const [obj, setObj] = useState({
    userName: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    roleId: null,
    password: "",
    confirmPassword: "",
  });
  const { user }: { user: any } = CurrentUser();
  useEffect(() => {
    if (user) {
      if (user?.role != "Admin" && user.role != "Editor") {
        navigate("/");
      }
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      const userRole = roles?.filter((item: any) => item?.name == data.role);

      setObj(data);
      setObj((old) => {
        return { ...old, roleId: userRole?.[0]?.id };
      });
    }
  }, [data]);
  const { mutate, isLoading: isLoadingUpdate, error } = useAddUpdateUser();
  console.log(error?.response?.data?.errors, "errorerror");

  const updateOrAdd = () => {
    const result = roles?.filter((item: any) => obj.roleId == item?.id);

    if (!obj.password) {
      mutate({
        userName: obj.userName,
        fullName: obj.fullName,
        phoneNumber: obj.phoneNumber,
        email: obj.email,
        // RoleId: result?.[0].id,
        roleId: result?.[0]?.id,
        id,
      });
    } else {
      mutate({
        ...obj,
        roleId: result?.[0]?.id,
        phoneNumber: obj.phoneNumber,
        userName: obj.userName,
        fullName: obj.fullName,
        // RoleId: result?.[0].id,
      });
    }
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
            }}
          >
            <ArrowBackIcon />
          </Box>

          <Typography sx={{ marginInline: "10px" }}>
            {" "}
            {id != "add" ? "Edit User" : "Add User"}
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
                <Typography sx={{ marginInline: "8px" }}>Full Name</Typography>

                <TextField
                  value={obj?.fullName}
                  onChange={(e) => {
                    setObj((old) => {
                      return { ...old, fullName: e.target.value };
                    });
                  }}
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
                {error?.response?.data?.errors?.["FullName"] && (
                  <Typography
                    sx={{
                      marginInline: "8px",
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                    }}
                  >
                    {error?.response?.data?.errors?.["FullName"][0]}
                  </Typography>
                )}
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
                  value={obj?.userName}
                  onChange={(e) => {
                    setObj((old) => {
                      return { ...old, userName: e.target.value };
                    });
                  }}
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
                {error?.response?.data?.errors?.["UserName"] && (
                  <Typography
                    sx={{
                      marginInline: "8px",
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                    }}
                  >
                    {error?.response?.data?.errors?.["UserName"][0]}
                  </Typography>
                )}
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
                  value={obj?.email}
                  onChange={(e) => {
                    setObj((old) => {
                      return { ...old, email: e.target.value };
                    });
                  }}
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
                {error?.response?.data?.errors?.["Email"] && (
                  <Typography
                    sx={{
                      marginInline: "8px",
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                    }}
                  >
                    {error?.response?.data?.errors?.["Email"][0]}
                  </Typography>
                )}
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
                  value={obj?.phoneNumber}
                  onChange={(e) => {
                    setObj((old) => {
                      return { ...old, phoneNumber: e.target.value };
                    });
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      backgroundColor: "#bcbbbb1c",
                      borderRadius: "14px",
                      border: "unset !important",
                    },
                  }}
                  variant="outlined"
                  placeholder="Phone Number"
                  style={{ width: "100%", borderRadius: "20px" }}
                />
                {error?.response?.data?.errors?.["PhoneNumber"] && (
                  <Typography
                    sx={{
                      marginInline: "8px",
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                    }}
                  >
                    {error?.response?.data?.errors?.["PhoneNumber"][0]}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
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
                    value={obj?.roleId}
                    onChange={(e) => {
                      setObj((old: any) => {
                        return { ...old, roleId: e.target.value };
                      });
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {roles?.map((item: any) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {error?.response?.data?.errors?.["RoleId"] && (
                  <Typography
                    sx={{
                      marginInline: "8px",
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                    }}
                  >
                    {error?.response?.data?.errors?.["RoleId"][0]}
                  </Typography>
                )}
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
                  value={obj?.password}
                  onChange={(e) => {
                    setObj((old) => {
                      return { ...old, password: e.target.value };
                    });
                  }}
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
                {error?.response?.data?.errors?.["Password"] && (
                  <Typography
                    sx={{
                      marginInline: "8px",
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                    }}
                  >
                    {error?.response?.data?.errors?.["Password"][0]}
                  </Typography>
                )}
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
                  value={obj?.confirmPassword}
                  onChange={(e) => {
                    setObj((old) => {
                      return { ...old, confirmPassword: e.target.value };
                    });
                  }}
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
                {error?.response?.data?.errors?.["ConfirmPassword"] && (
                  <Typography
                    sx={{
                      marginInline: "8px",
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                    }}
                  >
                    {error?.response?.data?.errors?.["ConfirmPassword"][0]}
                  </Typography>
                )}
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
                  onClick={() => navigate(-1)}
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

export default UserDetails;
