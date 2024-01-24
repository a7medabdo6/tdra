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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import SkeletonCom from "../components/Skeleton";

import BasicButton from "../components/common/Buttons/Button";
import { useEntities, usePostMock } from "../Api/Hooks/EntityManagment";
import { useFetchAllFieldsWithoutDocument } from "../Api/Hooks/EntityMapping";
import SelectComponenetForCategory from "../components/SelectComponenetForCategory";
import InputFileUpload from "../components/common/Buttons/FileUpload";

function MappingDynamicInputs() {
  const [text] = useState("");
  const [base64Image, setBase64Image] = useState<any>("");

  const navigate = useNavigate();
  const { data, isLoading } = useEntities(text);
  const { data: allFieldsWithoutDocument } = useFetchAllFieldsWithoutDocument();

  const { mutate: mutatePostMock, isLoading: isLoadingFieldMapping } =
    usePostMock();

  const [inputFields, setInputFields] = useState<any>({});
  // const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The result property contains the base64 encoded string
        const base64String = reader.result;
        setBase64Image(base64String);
      };

      // Read the image file as a data URL
      reader.readAsDataURL(file);
    }

    // You can perform additional actions with the selected file if needed
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
        ...(base64Image && { Document: base64Image }),
      },
      ...(base64Image && { isAttachment: true }),
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
                        <InputFileUpload
                          key={item.name}
                          item={item}
                          handleFileChange={handleFileChange}
                        />
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
                {data?.toFields?.length != 0 && (
                  <BasicButton
                    text="Save"
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
