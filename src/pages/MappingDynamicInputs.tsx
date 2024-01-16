import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { COLORS } from "../constants/insex";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePostMapping } from "../Api/Hooks/EntityMapping";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonCom from "../components/Skeleton";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuListComposition from "../components/common/Buttons/Dropdown";
import BasicButton from "../components/common/Buttons/Button";
import {
  useAddUpdateFieldMappingEntity,
  useOneEntityWithMapping,
} from "../Api/Hooks/EntityManagment";

// const EntityFieldType = [
//   "None",
//   "Int",
//   "String",
//   "Date",
//   "Enum",
//   "List",
//   "Attachment",
// ];
// interface InputField {
//   name: string;
//   type: string;
//   key: number;
// }
function MappingDynamicInputs() {
  const { id } = useParams();
  const [selectedEntity, setSelectedEntity] = React.useState<any>({
    name: "To Mapping",
  });

  const navigate = useNavigate();
  const { data, isLoading } = useOneEntityWithMapping({ id });
  const { mutate, isLoading: isLoadingMapping } = usePostMapping();
  const { mutate: mutateLinkMapping, isLoading: isLoadingFieldMapping } =
    useAddUpdateFieldMappingEntity();
  // const [onLabelClick, setOnLabelClick] = useState<any>({ "0": false });

  // useEffect(() => {
  //   if (data) {
  //   }
  // }, [data]);

  // const [inputFields, setInputFields] = useState<InputField[]>([]);

  // useEffect(() => {
  //   // Initialize input fields with keys on mount
  //   setInputFields([{ name: "", type: "", key: generateKey() }]);
  // }, []);

  // const generateKey = (): number => {
  //   return Date.now();
  // };
  const Submit = () => {
    mutate({
      fromEntityId: id ? +id : null,
      toEntityId: selectedEntity?.id,
      fields: [],
    });
  };
  // const handleInputChange = (
  //   index: number,
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   fieldName: "name" | "type"
  // ): void => {
  //   const values = [...inputFields];
  //   values[index][fieldName] = event.target.value;
  //   setInputFields(values);
  // };
  const [dynamicInputsMapping, setdynamicInputsMapping] = useState<any>([]);
  const HandleDynamicInputsChange = (
    event: any,
    index: any,
    fromId: any
  ): void => {
    // setInputFields(values);
    const dynamicInputsObj = [...dynamicInputsMapping];
    const filteredList = dynamicInputsObj.filter((item) => item.key != index);
    setdynamicInputsMapping(() => {
      return [
        ...filteredList,
        {
          // type: event.target.value?.name,
          toEntityFieldId: event.target.value.id,
          key: index,
          fromEntityFieldId: fromId,
        },
      ];
    });
  };
  const SubmitMapping = () => {
    mutateLinkMapping(dynamicInputsMapping);
  };
  useEffect(() => {
    console.log(dynamicInputsMapping, "dynamicInputsMapping");
  }, [dynamicInputsMapping]);

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
  // useEffect(() => {
  //   console.log(onLabelClick, "onlab");
  // }, [onLabelClick]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
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
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </Box>

          <Typography sx={{ marginInline: "10px" }}>Mapping Screen</Typography>
        </Grid>

        {isLoading ? (
          <SkeletonCom />
        ) : (
          <>
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
              <BasicButton
                // onClick={() => navigate(`/mapping-screen/${row.id}`)}
                textColor={
                  selectedEntity.name == "To Mapping"
                    ? COLORS.white
                    : COLORS.orange
                }
                bgColor={
                  selectedEntity.name == "To Mapping"
                    ? COLORS.secondary
                    : COLORS.lightOrange
                }
                text="From Mapping"
              />
              <MenuListComposition
                text=""
                textColor={
                  selectedEntity.name == "To Mapping"
                    ? COLORS.orange
                    : COLORS.white
                }
                bgColor={
                  selectedEntity.name == "To Mapping"
                    ? COLORS.lightOrange
                    : COLORS.secondary
                }
                rowData={data}
                setSelectedEntity={setSelectedEntity}
                selectedEntity={selectedEntity}
              />
            </Grid>
            <>
              {selectedEntity.name == "To Mapping" && (
                <Grid item xs={12} sm={12} md={12} sx={{ marginBlock: 4 }}>
                  <Grid container spacing={3}>
                    {data?.fromFields?.map((item: any, index: any) => (
                      <Grid
                        item
                        key={item?.id}
                        xs={6}
                        sm={6}
                        md={6}
                        sx={{
                          paddingTop: "0px !important",
                        }}
                      >
                        <Typography sx={{ marginInline: "8px" }}>
                          {item?.name}
                        </Typography>

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
                            value={dynamicInputsMapping.toEntityFieldId}
                            onChange={(e: any) =>
                              HandleDynamicInputsChange(e, index, item.id)
                            }
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value={"none"}>None</MenuItem>
                            {data?.toFields?.map((item: any) => (
                              <MenuItem key={item} value={item}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                  {data?.toFields?.length != 0 && (
                    <BasicButton
                      text="Save"
                      bgColor={COLORS.primary}
                      textColor={COLORS.white}
                      style={{
                        borderRadius: "10px",
                      }}
                      isLoading={isLoadingFieldMapping}
                      onClick={SubmitMapping}
                    />
                  )}
                </Grid>
              )}
            </>
            {selectedEntity.name != "To Mapping" && (
              <Grid item xs={12} sm={12} md={12} sx={{ marginBlock: 4 }}>
                <Grid container spacing={3}>
                  {/* {inputFields.map((inputField, index) => (
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
                  ))} */}
                  {/* <Grid
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
                  </Grid> */}

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
                    {/* <BasicButton
                      text="Edit"
                      bgColor={COLORS.secondary}
                      textColor={COLORS.white}
                      style={{
                        borderRadius: "10px",
                      }}
                    /> */}
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
            )}
          </>
        )}
      </Grid>
    </Container>
  );
}

export default MappingDynamicInputs;
