import React, { useEffect, useState } from "react";
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
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BasicButton from "../components/common/Buttons/Button";
import {
  useOneEntityFieldMappingsByEntityId,
  useaddUpdateListEntityFieldMapping,
} from "../Api/Hooks/EntityManagment";
import CurrentUser from "../CurrentUser";
import { useFetchAllFieldsWithoutDocument } from "../Api/Hooks/EntityMapping";

function MappingDynamicInputs() {
  const { id } = useParams();
  // const [selectedEntity, setSelectedEntity] = React.useState<any>({
  //   name: "To Mapping",
  // });
  const [inputFields, setInputFields] = useState<any[]>([]);

  const navigate = useNavigate();
  const { data, isLoading } = useFetchAllFieldsWithoutDocument();
  const { data: one } = useOneEntityFieldMappingsByEntityId({ id });

  const { mutate, isLoading: isLoadingMapping } =
    useaddUpdateListEntityFieldMapping();
  // const { mutate: mutateLinkMapping, isLoading: isLoadingFieldMapping } =
  //   useAddUpdateFieldMappingEntity();

  const Submit = () => {
    mutate(inputFields);
  };
  const { user }: { user: any } = CurrentUser();
  useEffect(() => {
    if (user) {
      if (user?.role != "Admin" && user.role != "Editor") {
        navigate("/");
      }
    }
  }, [user]);
  useEffect(() => {
    console.log(data, "datadatadata");

    setInputFields([]);
    if (data?.length > 0 && one?.length > 0) {
      for (let index = 0; index < data?.length; index++) {
        const result = one?.find(
          (obj: any) => obj.fieldName === data?.[index]?.name
        );
        if (result) {
          setInputFields((old: any) => {
            return [
              ...old,
              {
                fieldName: result?.fieldName,
                fieldMappedName: result?.fieldMappedName,
                entityId: id,
                index: data[index]?.id,
                ...(result?.fieldName ? { id: result?.id } : {}),
              },
            ];
          });
        }
      }
    }
  }, [one, data]);

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
            <Grid item xs={12} sm={12} md={12} sx={{ marginBlock: 4 }}>
              <Grid container spacing={3}>
                {data?.length > 0 &&
                  data?.map((item: any) => (
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
                          value={
                            inputFields?.find(
                              (obj: any) => obj.fieldName === item?.name
                            )?.fieldMappedName
                          }
                          onChange={(e) => {
                            setInputFields((old: any) => {
                              if (old.length > 0) {
                                const newarr = old.filter(
                                  (sub: any) => item.id == sub.index
                                );
                                const oldone = old.filter(
                                  (sub: any) => item.id != sub.index
                                );
                                if (newarr?.length > 0) {
                                  newarr[0].fieldMappedName = e.target.value;
                                  return [...oldone, newarr[0]];
                                } else {
                                  return [
                                    ...old,
                                    {
                                      fieldName: item?.name,
                                      fieldMappedName: e.target.value,
                                      entityId: id,
                                      index: item?.id,
                                    },
                                  ];
                                }
                              }
                              return [
                                ...old,
                                {
                                  fieldName: item?.name,
                                  fieldMappedName: e.target.value,
                                  entityId: id,
                                  index: item?.id,
                                },
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
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default MappingDynamicInputs;
