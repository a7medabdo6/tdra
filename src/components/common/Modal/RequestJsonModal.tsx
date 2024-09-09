import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BasicButton from "../Buttons/Button";
import { COLORS } from "../../../constants/insex";
import { useFetchRequestJsonData } from "../../../Api/Hooks/Dashboard";
import { CircularProgress, Grid } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
interface modalProps {
  open: boolean;
  setOpen: any;
  isLoading?: boolean;
  id: any;
}
const RequestJsonModalCom: React.FC<modalProps> = ({ open, setOpen, id }) => {
  const handleClose = () => setOpen(false);
  const { data, isLoading } = useFetchRequestJsonData({
    comunnicationId: id,
  });

  // const handleDownload = (base64PdfData: any, name: string) => {
  //   const trimmedBase64 = base64PdfData; //.split(",")[1];

  //   const byteCharacters = atob(trimmedBase64);
  //   const byteNumbers = new Array(byteCharacters.length);

  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }

  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: "application/pdf" });

  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = name || "document.pdf";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          paddingBottom: "10px",
          border: "unset !important",
          borderRadius: "10px",
          "& .MuiBox-root": {
            border: "unset !important",
            borderRadius: "10px",
            width: "60%",
          },
        }}
      >
        <Box sx={style}>
          {isLoading ? (
            <CircularProgress
              sx={{ height: "50px !important", width: "50px !important" }}
            />
          ) : !data ? (
            <Typography
              component={"p"}
              style={{ marginInline: "5px" }}
              color={COLORS.primary}
            >
              No Content
            </Typography>
          ) : (
            <Grid container spacing={3}>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{
                  paddingBlock: "10px !important",
                }}
              >
                <Typography
                  sx={{
                    marginInline: "8px",
                    display: "flex",
                  }}
                >
                  From Email :
                  <Typography
                    component={"p"}
                    style={{ marginInline: "5px" }}
                    color={COLORS.primary}
                  >
                    {data?.FieldValues?.["From Email"]}
                  </Typography>
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{
                  paddingBlock: "10px !important",
                }}
              >
                <Typography
                  sx={{
                    marginInline: "8px",
                    display: "flex",
                  }}
                >
                  Po Box :
                  <Typography
                    component={"p"}
                    style={{ marginInline: "5px" }}
                    color={COLORS.primary}
                  >
                    {data?.FieldValues?.["Po Box"]}
                  </Typography>
                </Typography>
              </Grid>{" "}
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{
                  paddingBlock: "10px !important",
                }}
              >
                <Typography
                  sx={{
                    marginInline: "8px",
                    display: "flex",
                  }}
                >
                  Reference Number :
                  <Typography
                    component={"p"}
                    style={{ marginInline: "5px" }}
                    color={COLORS.primary}
                  >
                    {data?.FieldValues?.["Reference Number"]}
                  </Typography>
                </Typography>
              </Grid>{" "}
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{
                  paddingBlock: "10px !important",
                }}
              >
                <Typography
                  sx={{
                    marginInline: "8px",
                    display: "flex",
                  }}
                >
                  Subject :
                  <Typography
                    component={"p"}
                    style={{ marginInline: "5px" }}
                    color={COLORS.primary}
                  >
                    {data?.FieldValues?.["Subject"]}
                  </Typography>
                </Typography>
              </Grid>{" "}
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{
                  paddingBlock: "10px !important",
                }}
              >
                <Typography
                  sx={{
                    marginInline: "8px",
                    display: "flex",
                  }}
                >
                  Target Entity :
                  <Typography
                    component={"p"}
                    style={{ marginInline: "5px" }}
                    color={COLORS.primary}
                  >
                    {data?.FieldValues?.["Target Entity"]}
                  </Typography>
                </Typography>
              </Grid>{" "}
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{
                  paddingBlock: "10px !important",
                }}
              >
                <Typography
                  sx={{
                    marginInline: "8px",
                    display: "flex",
                  }}
                >
                  Urgency Level :
                  <Typography
                    component={"span"}
                    style={{ marginInline: "5px" }}
                    color={COLORS.primary}
                  >
                    {data?.FieldValues?.["Urgency Level"]}
                  </Typography>
                </Typography>
              </Grid>{" "}
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{
                  paddingBlock: "10px !important",
                }}
              >
                <Typography
                  sx={{
                    marginInline: "8px",
                    display: "flex",
                  }}
                >
                  Sending Party Address :
                  <Typography
                    component={"p"}
                    style={{ marginInline: "5px" }}
                    color={COLORS.primary}
                  >
                    {data?.FieldValues?.["Sending Party Address"]}
                  </Typography>
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{
                  paddingBlock: "10px !important",
                }}
              >
                <Typography
                  sx={{
                    marginInline: "8px",
                    display: "flex",
                  }}
                >
                  Confidentiality Level :
                  <Typography
                    component={"p"}
                    style={{ marginInline: "5px" }}
                    color={COLORS.primary}
                  >
                    {data?.FieldValues?.["Confidentiality Level"]}
                  </Typography>
                </Typography>
              </Grid>{" "}
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                sx={{
                  paddingBlock: "10px !important",
                }}
              >
                <Typography
                  sx={{
                    marginInline: "8px",
                    display: "flex",
                  }}
                >
                  Notes :
                  <Typography
                    component={"p"}
                    style={{ marginInline: "5px" }}
                    color={COLORS.primary}
                  >
                    {data?.FieldValues?.["Notes"]}
                  </Typography>
                </Typography>
              </Grid>
              {data?.Attachments?.map((item: any) => {
                if (item?.DocumentType == 1) {
                  return (
                    <Grid
                      item
                      key={item?.id}
                      xs={6}
                      sm={6}
                      md={6}
                      sx={{
                        paddingTop: "0px !important",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ marginInline: "8px" }}>
                        File Name
                      </Typography>
                      <Typography
                        component={"p"}
                        style={{ marginInline: "5px" }}
                        color={COLORS.primary}
                      >
                        {item?.FileName}
                      </Typography>
                      {/* <BasicButton
                        onClick={() =>
                          handleDownload(item.Document, item.FileName)
                        }
                        text="Download"
                        bgColor={COLORS.secondary}
                        textColor={COLORS.white}
                        style={{ padding: "5px 7px" }}
                      /> */}
                    </Grid>
                  );
                }
              })}
            </Grid>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <BasicButton
              text="Cancel"
              textColor={COLORS.white}
              bgColor={COLORS.primary}
              onClick={() => setOpen(false)}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default RequestJsonModalCom;
