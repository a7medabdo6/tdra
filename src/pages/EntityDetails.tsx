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
import { useAddUpdateEntity, useOneEntity } from "../Api/Hooks/EntityManagment";
import SkeletonCom from "../components/Skeleton";
import CurrentUser from "../CurrentUser";
// interface InputField {
//   name: string;
//   type: string;
//   key: number;
// }
// const EntityFieldType = [
//   "None",
//   "Int",
//   "String",
//   "Date",
//   "Enum",
//   "List",
//   "Attachment",
// ];
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
      setObj(data);
      // setInputFields(data?.fields);
    }
  }, [data]);
  const { mutate, isLoading: isLoadingUpdate } = useAddUpdateEntity();
  // const { mutate: deleteOne, isLoading: isLoadingDelete } = useDeleteEntity();
  const updateOrAdd = () => {
    mutate(obj);
  };
  // const Delete = () => {
  //   deleteOne(obj);
  // };
  // const { mutate: mutateAddEditEntity, isLoading: isLoadingMapping } =
  //   useAddEditEntity();

  // const [onLabelClick, setOnLabelClick] = useState<any>({ "0": false });

  // const [inputFields, setInputFields] = useState<InputField[]>([]);
  // const generateKey = (): number => {
  //   return Date.now();
  // };
  // useEffect(() => {
  //   // Initialize input fields with keys on mount
  //   setInputFields([{ name: "", type: "", key: generateKey() }]);
  // }, []);
  // const handleInputChange = (
  //   index: number,
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   fieldName: "name" | "type"
  // ): void => {
  //   const values = [...inputFields];
  //   values[index][fieldName] = event.target.value;
  //   setInputFields(values);
  // };
  // const handleAddField = (): void => {
  //   setInputFields([
  //     ...inputFields,
  //     { name: "", type: "", key: generateKey() },
  //   ]);
  // };
  // const handleRemoveField = (index: number): void => {
  //   const values = [...inputFields];
  //   values.splice(index, 1);
  //   setInputFields(values);
  // };
  // const Submit = () => {
  //   mutateAddEditEntity({
  //     id: id ? +id : null,
  //     fields: inputFields,
  //   });
  // };
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
                  onClick={() => navigate(-1)}
                  bgColor={COLORS.white}
                  // isLoading={isLoadingDelete}
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
            {/* {id != "add" && (
              <Grid item xs={12} sm={12} md={12} sx={{ marginBlock: 4 }}>
                <Grid container spacing={3}>
                  {inputFields.map((inputField, index) => (
                    <Grid
                      key={inputField.key}
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      sx={{
                        paddingTop: "0px !important",
                      }}
                    >
                      {!onLabelClick[`${index}`] && (
                        <Typography
                          onClick={() =>
                            setOnLabelClick((old: any) => {
                              return { ...old, [index]: true };
                            })
                          }
                          sx={{ marginInline: "8px", cursor: "pointer" }}
                        >
                          {inputField?.name
                            ? inputField?.name
                            : "Enter to edit label"}
                        </Typography>
                      )}

                      {onLabelClick[`${index}`] && (
                        <TextField
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "40px",
                              backgroundColor: "transparent",
                              borderRadius: "14px",
                              border: "unset !important",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "unset !important",
                            },
                          }}
                          variant="outlined"
                          placeholder="label  "
                          style={{ width: "100%", borderRadius: "20px" }}
                          id={`label-${inputField.key}`}
                          value={inputField.name}
                          onChange={(e: any) =>
                            handleInputChange(index, e, "name")
                          }
                          onBlur={() =>
                            setOnLabelClick((old: any) => {
                              return { ...old, [index]: false };
                            })
                          }
                        />
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
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
                            id={`value-${inputField.key}`}
                            value={inputField.type}
                            onChange={(e: any) =>
                              handleInputChange(index, e, "type")
                            }
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            {EntityFieldType?.map((item: any) => (
                              <MenuItem key={item} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <DoDisturbOnIcon
                          type="button"
                          sx={{
                            cursor: "pointer",
                            color: index != 0 ? COLORS.red : COLORS.black,
                          }}
                          onClick={() => handleRemoveField(index)}
                        />
                      </Box>
                    </Grid>
                  ))}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{
                      paddingTop: "20px !important",
                    }}
                  >
                    <AddCircleOutlineIcon
                      sx={{
                        borderRadius: "10px",
                        color: COLORS.primary,
                        cursor: "pointer",
                      }}
                      onClick={() => handleAddField()}
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
                      isLoading={isLoadingMapping}
                      onClick={Submit}
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
                      onClick={() => navigate(-1)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )} */}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default EntityDetails;
