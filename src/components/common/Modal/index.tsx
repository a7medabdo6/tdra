import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BasicButton from "../Buttons/Button";
import { COLORS } from "../../../constants/insex";
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
};
interface modalProps {
  open: boolean;
  setOpen: any;
  onSubmit: any;
  isLoading?: boolean;
}
const ModalForDelete: React.FC<modalProps> = ({
  open,
  setOpen,
  onSubmit,
  isLoading,
}) => {
  const handleClose = () => setOpen(false);

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
          },
        }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{ marginBottom: "30px" }}
          >
            Are you sure you want to delete this record?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <BasicButton
              text="Delete"
              textColor={COLORS.white}
              bgColor={COLORS.red}
              onClick={() => {
                onSubmit();
                setTimeout(() => {
                  setOpen(false);
                }, 1000);
              }}
              isLoading={isLoading}
              style={{
                "&:hover": {
                  backgroundColor: COLORS.red,
                },
              }}
            />
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
export default ModalForDelete;
