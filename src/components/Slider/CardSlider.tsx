import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "../../constants/insex";

function CardSlider({ item }: any) {
  return (
    <Card
      sx={{
        margin: "10px !important",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        borderRadius: "10px",
        boxShadow: "unset",
      }}
      style={{ width: 200, height: 200, margin: 20 }}
    >
      <Typography
        variant="h6"
        sx={{ lineHeight: "1.2", color: COLORS.secondary }}
      >
        {item?.entity}
      </Typography>
      <Box sx={{ marginBlock: "10px" }}>
        <Typography sx={{ color: COLORS.secondary }}>
          Total Sent: {item?.totalSent}
        </Typography>
        <Typography>Total Recieved : {item?.totalReceived}</Typography>
      </Box>
    </Card>
  );
}

export default CardSlider;
