import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { COLORS } from "../constants/insex";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonCom from "../components/Skeleton";

import BasicButton from "../components/common/Buttons/Button";
import { useOneEntity, usePostMock } from "../Api/Hooks/EntityManagment";

interface InputField {
  id: string;
  value: string;
}
function MappingDynamicInputs() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { data, isLoading } = useOneEntity({ id });
  const { mutate: mutatePostMock, isLoading: isLoadingFieldMapping } =
    usePostMock();

  const [inputFields, setInputFields] = useState<InputField[]>([]);

  // const [dynamicInputsMapping, setdynamicInputsMapping] = useState<any>([]);
  // const HandleDynamicInputsChange = (
  //   event: any,
  //   index: any,
  //   fromId: any
  // ): void => {
  //   // setInputFields(values);
  //   const dynamicInputsObj = [...dynamicInputsMapping];
  //   const filteredList = dynamicInputsObj.filter((item) => item.key != index);
  //   setdynamicInputsMapping(() => {
  //     return [
  //       ...filteredList,
  //       {
  //         toEntityFieldId: event.target.value.id,
  //         key: index,
  //         fromEntityFieldId: fromId,
  //       },
  //     ];
  //   });
  // };
  const SubmitMapping = () => {
    const obj = {
      fromEntityId: id,
      toEntityId: data?.toEntityId,
      entityFieldDTOs: inputFields,
    };
    mutatePostMock(obj);
  };

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

          <Typography sx={{ marginInline: "10px" }}>Mapping Mocking</Typography>
        </Grid>

        {isLoading ? (
          <SkeletonCom />
        ) : (
          <>
            <>
              <Grid item xs={12} sm={12} md={12} sx={{ marginBlock: 4 }}>
                <Grid container spacing={3}>
                  {data?.fields?.map((item: any) => (
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
                          // value={obj?.phone}
                          onChange={(e) => {
                            setInputFields((old: any) => {
                              if (old.length > 0) {
                                const newarr = old.filter(
                                  (sub: any) => item.id == sub.id
                                );
                                const oldone = old.filter(
                                  (sub: any) => item.id != sub.id
                                );
                                if (newarr?.length > 0) {
                                  console.log(newarr, "neeeeeee");

                                  newarr[0].value = e.target.value;
                                  return [...oldone, newarr[0]];
                                } else {
                                  return [
                                    ...old,
                                    { id: item?.id, value: e.target.value },
                                  ];
                                }
                              }
                              return [
                                ...old,
                                { id: item?.id, value: e.target.value },
                              ];
                            });
                          }}
                          variant="outlined"
                          placeholder={item?.name}
                          style={{ width: "100%", borderRadius: "20px" }}
                          inputProps={{ "aria-label": "Without label" }}
                        ></TextField>
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
            </>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default MappingDynamicInputs;
