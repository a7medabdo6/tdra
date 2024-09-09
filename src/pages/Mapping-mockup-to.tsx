import React, { useEffect } from "react";
import {
  Box,
  Card,
  Container,
  Divider,
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
import { GetAttachment } from "../Api/Hooks/Dashboard";
import { toast } from "react-toastify";

function MappingMockingTo() {
  const { id } = useParams();

  // const navigate = useNavigate();
  const { data, isLoading } = useOneEntityMockingTo({ id });

  const handleDownload = async (id: any) => {
    const res = await GetAttachment(id);
    console.log(res, "ressss");

    if (res?.response?.data?.StatusCode == 500) {
      toast.error(res?.response?.data?.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const trimmedBase64 = res?.document?.split(",")[1];

    const byteCharacters = atob(trimmedBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = res?.fileName || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    console.log(data, "dataaaa");
  }, [data]);

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
                  {data?.map((parent: any) => {
                    return (
                      <>
                        {parent?.connection?.map((item: any) => {
                          if (
                            item?.name == "Main Correspondance" ||
                            item?.name == "Supportive Documents"
                          ) {
                            return null;
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
                                  style={{
                                    width: "100%",
                                    borderRadius: "20px",
                                  }}
                                  inputProps={{ "aria-label": "Without label" }}
                                ></TextField>
                              </FormControl>
                            </Grid>
                          );
                        })}

                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          sx={{
                            paddingTop: "0px !important",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {parent?.connection.some(
                            (item: any) => item?.name == "Main Correspondance"
                          ) && (
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "20px",
                                marginTop: "50px",
                                width: "100%",
                                marginInline: "10px",
                              }}
                            >
                              Main Correspondance
                            </Typography>
                          )}
                        </Grid>
                        {parent?.connection?.map((item: any) => {
                          if (item?.name == "Main Correspondance") {
                            return item?.attachments?.map(
                              (sub: any, subindex: any) => {
                                console.log(sub, "subbbb");
                                if (!sub?.document.includes("image")) {
                                  return (
                                    <Grid
                                      item
                                      key={item?.id}
                                      xs={2}
                                      sm={2}
                                      md={4}
                                      sx={{
                                        paddingTop: "0px !important",
                                        justifyContent: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Card
                                        sx={{
                                          padding: "20px",
                                          margin: "10px",
                                          minHeight: "265px",
                                        }}
                                      >
                                        <Typography
                                          sx={{ marginInline: "8px" }}
                                        >
                                          {sub?.fileName}
                                        </Typography>
                                        <BasicButton
                                          onClick={() => handleDownload(sub.id)}
                                          text="Download"
                                          bgColor={COLORS.secondary}
                                          textColor={COLORS.white}
                                          style={{ padding: "5px 7px" }}
                                        />
                                        <Box sx={{ marginTop: "15px" }}>
                                          <Typography sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                marginRight: "5px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              documentPasskey:
                                            </Typography>
                                            {sub?.documentPasskey}
                                          </Typography>
                                          <Typography sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                marginRight: "5px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              documentReference:
                                            </Typography>
                                            {sub?.documentReference}
                                          </Typography>
                                          <Typography sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                marginRight: "5px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              documentNo:
                                            </Typography>
                                            {sub?.documentNo}
                                          </Typography>
                                          <Typography sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                marginRight: "5px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              documentDate:
                                            </Typography>
                                            {sub?.documentDate}
                                          </Typography>
                                        </Box>
                                      </Card>
                                    </Grid>
                                  );
                                }
                                return (
                                  <Grid
                                    item
                                    key={subindex}
                                    xs={2}
                                    sm={2}
                                    md={4}
                                    sx={{
                                      paddingTop: "0px !important",
                                      justifyContent: "center",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Card
                                      sx={{
                                        padding: "20px",
                                        margin: "10px",
                                        minHeight: "265px",
                                      }}
                                    >
                                      <Typography sx={{ marginInline: "8px" }}>
                                        {item?.name}
                                      </Typography>
                                      <img
                                        src={sub?.document}
                                        alt="Your Image"
                                        style={{
                                          maxWidth: "100%",
                                          height: "auto",
                                          width: "100px",
                                        }}
                                      />
                                      <Box sx={{ marginTop: "15px" }}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              marginRight: "5px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            documentPasskey:
                                          </Typography>
                                          {sub?.documentPasskey}
                                        </Typography>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              marginRight: "5px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            documentReference:
                                          </Typography>
                                          {sub?.documentReference}
                                        </Typography>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              marginRight: "5px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            documentNo:
                                          </Typography>
                                          {sub?.documentNo}
                                        </Typography>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              marginRight: "5px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            documentDate:
                                          </Typography>
                                          {sub?.documentDate}
                                        </Typography>
                                      </Box>
                                    </Card>
                                  </Grid>
                                );
                              }
                            );
                          }
                        })}

                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          sx={{
                            paddingTop: "0px !important",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {parent?.connection.some(
                            (item: any) => item?.name == "Supportive Documents"
                          ) && (
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "20px",
                                marginTop: "50px",
                                width: "100%",
                                marginInline: "10px",
                              }}
                            >
                              Supportive Documents
                            </Typography>
                          )}
                        </Grid>
                        {parent?.connection?.map((item: any) => {
                          if (item?.name == "Supportive Documents") {
                            return item?.attachments?.map(
                              (sub: any, subindex: any) => {
                                if (!sub?.document.includes("image")) {
                                  return (
                                    <Grid
                                      item
                                      key={item?.id}
                                      xs={2}
                                      sm={2}
                                      md={4}
                                      sx={{
                                        paddingTop: "0px !important",
                                        justifyContent: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Card
                                        sx={{
                                          padding: "20px",
                                          margin: "10px",
                                          minHeight: "265px",
                                        }}
                                      >
                                        <Typography
                                          sx={{ marginInline: "8px" }}
                                        >
                                          {sub?.fileName}
                                        </Typography>
                                        <BasicButton
                                          onClick={() => handleDownload(sub.id)}
                                          text="Download"
                                          bgColor={COLORS.secondary}
                                          textColor={COLORS.white}
                                          style={{ padding: "5px 7px" }}
                                        />
                                        <Box sx={{ marginTop: "15px" }}>
                                          <Typography sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                marginRight: "5px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              documentPasskey:
                                            </Typography>
                                            {sub?.documentPasskey}
                                          </Typography>
                                          <Typography sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                marginRight: "5px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              documentReference:
                                            </Typography>
                                            {sub?.documentReference}
                                          </Typography>
                                          <Typography sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                marginRight: "5px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              documentNo:
                                            </Typography>
                                            {sub?.documentNo}
                                          </Typography>
                                          <Typography sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                marginRight: "5px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              documentDate:
                                            </Typography>
                                            {sub?.documentDate}
                                          </Typography>
                                        </Box>
                                      </Card>
                                    </Grid>
                                  );
                                }
                                return (
                                  <Grid
                                    item
                                    key={subindex}
                                    xs={2}
                                    sm={2}
                                    md={4}
                                    sx={{
                                      paddingTop: "0px !important",
                                      justifyContent: "center",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Card
                                      sx={{
                                        padding: "20px",
                                        margin: "10px",
                                        minHeight: "265px",
                                      }}
                                    >
                                      <Typography sx={{ marginInline: "8px" }}>
                                        {item?.name}
                                      </Typography>
                                      <img
                                        src={sub?.document}
                                        alt="Your Image"
                                        style={{
                                          maxWidth: "100%",
                                          height: "auto",
                                          width: "100px",
                                        }}
                                      />
                                      <Box sx={{ marginTop: "15px" }}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              marginRight: "5px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            documentPasskey:
                                          </Typography>
                                          {sub?.documentPasskey}
                                        </Typography>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              marginRight: "5px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            documentReference:
                                          </Typography>
                                          {sub?.documentReference}
                                        </Typography>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              marginRight: "5px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            documentNo:
                                          </Typography>
                                          {sub?.documentNo}
                                        </Typography>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              marginRight: "5px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            documentDate:
                                          </Typography>
                                          {sub?.documentDate}
                                        </Typography>
                                      </Box>
                                    </Card>
                                  </Grid>
                                );
                              }
                            );
                          }
                        })}
                        <Divider
                          sx={{
                            background: "gray",
                            width: "100%",
                            marginBlock: "10px",
                          }}
                        />
                      </>
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
