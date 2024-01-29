import React, { useState } from "react";
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
import { COLORS } from "../constants/insex";
import SkeletonCom from "../components/Skeleton";

import BasicButton from "../components/common/Buttons/Button";
import { useEntities, usePostMock } from "../Api/Hooks/EntityManagment";
import { useFetchAllFieldsWithoutDocument } from "../Api/Hooks/EntityMapping";
import SelectComponenetForCategory from "../components/SelectComponenetForCategory";
import InputFileUpload from "../components/common/Buttons/FileUpload";

function MappingDynamicInputs() {
  const [text] = useState("");
  const [base64Image, setBase64Image] = useState<any>([]);

  const { data, isLoading } = useEntities(text);
  const { data: allFieldsWithoutDocument } = useFetchAllFieldsWithoutDocument();

  const { mutate: mutatePostMock, isLoading: isLoadingFieldMapping } =
    usePostMock();

  const [inputFields, setInputFields] = useState<any>({});
  // const [selectedFile, setSelectedFile] = useState(null);

  // const [fileName, setFileName] = useState<any>("");

  const handleFileChange = (event: any, type: any) => {
    const files = event.target.files;
    console.log(files, "filess");

    if (files?.length > 0) {
      console.log(files, "filess length");

      for (let index = 0; index < files.length; index++) {
        const reader = new FileReader();
        const fileName = files[index].name;
        // setFileName(fileName);

        reader.onloadend = () => {
          console.log(fileName, "filess reas");

          const base64String = reader.result;
          setBase64Image((old: any) => {
            return [
              ...old,
              {
                fileName: fileName,
                document: base64String,
                documentType: type == "Supportive Documents" ? "Extra" : "Main",
              },
            ];
          });
        };
        reader.readAsDataURL(files[index]);
      }
    }
  };
  const handleEntityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ): void => {
    setInputFields((old: any) => {
      return {
        ...old,
        [fieldName]: event.target.value,
      };
    });
  };

  const SubmitMapping = () => {
    const { entity, ...reset } = inputFields;

    const obj = {
      entityId: entity,
      fieldValues: {
        ...reset,
        // entityId: null,
        // ...(base64Image && { "File Name": fileName }),
      },
      ...(base64Image.length > 0 && { attachments: base64Image }),

      ...(base64Image?.length > 0 && { isAttachment: true }),
    };
    mutatePostMock(obj);
  };

  return (
    <Container sx={{ marginTop: "30px" }}>
      <Grid container spacing={3}>
        {/* <Grid
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
        </Grid> */}

        {isLoading ? (
          <SkeletonCom />
        ) : (
          <>
            <>
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
                    <Typography sx={{ marginInline: "8px" }}>Entity</Typography>
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
                        onChange={(e: any) => handleEntityChange(e, "entity")}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {data?.map((item: any) => (
                          <MenuItem key={item} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {allFieldsWithoutDocument?.map((item: any) => {
                    if (item?.type == "Enum") {
                      return (
                        <SelectComponenetForCategory
                          key={item.name}
                          item={item}
                          handleEntityChange={handleEntityChange}
                        />
                      );
                    }
                    if (item?.type == "Attachment") {
                      return (
                        <Box key={item.name}>
                          <InputFileUpload
                            item={item}
                            handleFileChange={handleFileChange}
                          />
                        </Box>
                      );
                    }
                    return (
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
                            onChange={(e: any) => {
                              handleEntityChange(e, item.name);
                            }}
                            variant="outlined"
                            placeholder={item?.name}
                            style={{ width: "100%", borderRadius: "20px" }}
                            inputProps={{ "aria-label": "Without label" }}
                          ></TextField>
                        </FormControl>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <Box sx={{ marginTop: "20px" }}>
                      {base64Image.map((item: any, index: any) => {
                        if (item?.documentType == "Main") {
                          return (
                            <Typography sx={{ margin: "10px" }} key={index}>
                              {item?.fileName}
                            </Typography>
                          );
                        }
                      })}
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ marginTop: "20px" }}>
                      {base64Image.map((item: any, index: any) => {
                        if (item?.documentType == "Extra") {
                          return (
                            <Typography sx={{ margin: "10px" }} key={index}>
                              {item?.fileName}
                            </Typography>
                          );
                        }
                      })}
                    </Box>
                  </Grid>
                </Grid>

                {data?.toFields?.length != 0 && (
                  <BasicButton
                    text="Submit"
                    bgColor={COLORS.primary}
                    textColor={COLORS.white}
                    style={{
                      borderRadius: "10px",
                      marginTop: "50px",
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
