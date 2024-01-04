import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { COLORS } from "../../../constants/insex";

interface StaticsCardProps {
  alignText?: string;
  bgcolor?: string;
  textColor?: string;
  valueColor?: string;
  border?: boolean;
  text?: string;
}
const StaticsCard: React.FC<StaticsCardProps> = ({
  alignText = "end",
  bgcolor = "unset",
  textColor = "unset",
  valueColor = "unset",
  border = true,
  text = "Grid",
}) => {
  return (
    <Card
      sx={{
        borderRadius: "25px",
        border: border ? `1px solid ${COLORS.secondary}` : "unset",
        boxShadow: "unset",
        marginBlock: "10px",
        background: bgcolor,
      }}
    >
      <CardContent>
        <CardContent sx={{ padding: 0, paddingBottom: "0px !important" }}>
          <Typography variant="h6" sx={{ color: textColor }}>
            {text}
          </Typography>
          <Typography
            color="primary"
            variant="h6"
            sx={{ textAlign: alignText, color: valueColor, fontWeight: "bold" }}
          >
            {" "}
            232.93
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default StaticsCard;