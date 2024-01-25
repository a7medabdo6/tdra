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
import { useNavigate, useParams } from "react-router-dom";
import SkeletonCom from "../components/Skeleton";
import { useModulees } from "../Api/Hooks/Modules";
import { useAddUpdateRole, useOneRole } from "../Api/Hooks/Roles";
function AddRole() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useModulees();
  const [obj, setObj] = useState<any>({
    name: "",
    modules: [],
  });

  const { data: role } = id != "add" ? useOneRole({ id }) : { data: null };
  const { mutate, isLoading: isLoadingUpdate } = useAddUpdateRole();
  const updateOrAdd = () => {
    mutate({ ...role, name: obj.name, modulesIds: obj.modules });
  };
  useEffect(() => {
    if (role) {
      const Ids = role.modules.map((item: any) => item.id);

      setObj((old: any) => {
        return { ...old, name: role.name, modules: Ids };
      });
    }
  }, [role]);
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

          <Typography sx={{ marginInline: "10px" }}>Add Role</Typography>
        </Grid>
        {isLoading && data ? (
          <SkeletonCom />
        ) : (
          <Grid item xs={12} sm={12} md={12} sx={{ marginBlock: 4 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                sx={{
                  paddingTop: "0px !important",
                }}
              >
                <Typography sx={{ marginInline: "8px" }}> Name</Typography>

                <TextField
                  value={obj?.name}
                  onChange={(e) => {
                    setObj((old: any) => {
                      return { ...old, name: e.target.value };
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
              </Grid>

              <Grid
                item
                xs={6}
                sx={{ paddingTop: "0px !important" }}
                sm={6}
                md={6}
              >
                <Typography sx={{ marginInline: "8px" }}>Modules</Typography>
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
                    value={obj?.modules}
                    onChange={(e) => {
                      setObj((old: any) => {
                        return { ...old, modules: e.target.value };
                      });
                    }}
                    multiple={true}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {data?.map((item: any) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                    text="Save"
                    bgColor={COLORS.secondary}
                    textColor={COLORS.white}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                )}
                <BasicButton
                  onClick={() => navigate(-1)}
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

export default AddRole;
