import { Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import moment from "moment";
import dayjs from "dayjs";
import moment from "moment";

interface BasicButtonProps {
  textColor: string;
  bgColor: string;
  text: any;
  style?: any;
  onClick?: any;
  isLoading?: boolean;
  initValue?: any;
  name?: string;
  onChange?: any;
}
const DateInput: React.FC<BasicButtonProps> = ({
  textColor,
  bgColor,
  text,
  style,
  initValue = null,
  isLoading,
  onChange,
  name,
}) => {
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleButtonClick = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date?.$d);
    onChange((old: any) => {
      return { ...old, [`${name}`]: moment(date?.$d).format("lll") };
    });
    setIsDatePickerVisible(false);
  };
  useEffect(() => {
    setSelectedDate(initValue ? initValue : new Date());
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        onClick={handleButtonClick}
        sx={{
          backgroundColor: bgColor,
          color: textColor,
          boxShadow: "unset",
          marginInline: "10px",
          ...style,
          zIndex: 1000,
        }}
        variant="contained"
      >
        {isLoading ? (
          <CircularProgress
            sx={{ height: "20px !important", width: "20px !important" }}
          />
        ) : (
          `${text} ${dayjs(selectedDate).format("DD/MM/YYYY")}`
        )}
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          sx={{
            position: "absolute",
            width: " 130px",
            left: "10px",
            opacity: 0,
            height: "40px",
            top: "-15px",
          }}
          components={["DatePicker", "DatePicker"]}
        >
          <DatePicker
            sx={{ opacity: 1, height: "40px" }}
            value={dayjs(selectedDate)}
            onChange={handleDateChange}
            open={isDatePickerVisible}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};

export default DateInput;
