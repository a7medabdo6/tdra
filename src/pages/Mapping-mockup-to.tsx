import React from "react";
import {
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { COLORS } from "../constants/insex";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import SkeletonCom from "../components/Skeleton";

import { useOneEntityMockingTo } from "../Api/Hooks/EntityManagment";
import BasicButton from "../components/common/Buttons/Button";

function MappingMockingTo() {
  const { id } = useParams();

  // const navigate = useNavigate();
  const { data, isLoading } = useOneEntityMockingTo({ id });
  const handleDownload = (base64PdfData: any, name: string) => {
    const trimmedBase64 = base64PdfData.split(",")[1];

    const byteCharacters = atob(trimmedBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Container>
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

          <Typography sx={{ marginInline: "10px" }}>
            Mapping Mocking To
          </Typography>
        </Grid> */}

        {isLoading ? (
          <SkeletonCom />
        ) : (
          <>
            <>
              <Grid item xs={12} sm={12} md={12} sx={{ marginBlock: 4 }}>
                <Grid container spacing={3}>
                  {data?.map((item: any) => {
                    if (
                      item?.name == "Document" &&
                      item.value.includes("image")
                    ) {
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
                          <img
                            src={item?.value}
                            alt="Your Image"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </Grid>
                      );
                    }
                    if (item?.name == "Document") {
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
                          <BasicButton
                            onClick={() =>
                              handleDownload(item.value, item.name)
                            }
                            text="Download"
                            bgColor={COLORS.secondary}
                            textColor={COLORS.white}
                            style={{ padding: "5px 7px" }}
                          />
                        </Grid>
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
                            value={item?.value}
                            disabled={true}
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
              </Grid>
            </>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default MappingMockingTo;
