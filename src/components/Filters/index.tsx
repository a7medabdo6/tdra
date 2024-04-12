import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { COLORS } from "../../constants/insex";
import BasicButton from "../common/Buttons/Button";
import DateInput from "../common/Buttons/DateInput";
import SearchInput from "../common/Inputs/Searchinput";
import moment from "moment";

function FilterMonth({
  title,
  showMonths = true,
  showFilterBtn = true,

  debouncedOnChange,
  showSearchInput = false,
  filters,
  setFilters,
}: any) {
  const [showFilters, setShowFilters] = useState(false);
  const [monthClicked, setmonthClicked] = useState("");

  const handleShowFilters = () => {
    setShowFilters((old) => !old);
  };
  const handleMonthClicked = (type: any) => {
    if (type == "1m") {
      setmonthClicked("1m");
      const firstDay = moment().startOf("month").format("YYYY-MM-DD");
      const lastDay = moment().endOf("month").format("YYYY-MM-DD");
      setFilters(() => {
        return {
          fromDate: moment(firstDay).format("lll"),
          toDate: moment(lastDay).format("lll"),
        };
      });
    } else if (type == "6m") {
      setmonthClicked("6m");
      const firstDay = moment().startOf("month").format("YYYY-MM-DD");
      const lastDaySixMonthsLater = moment()
        .add(6, "months")
        .endOf("month")
        .format("YYYY-MM-DD");
      setFilters(() => {
        return {
          fromDate: moment(firstDay).format("lll"),
          toDate: moment(lastDaySixMonthsLater).format("lll"),
        };
      });
    } else if (type == "1y") {
      setmonthClicked("1y");
      const firstDay = moment().startOf("month").format("YYYY-MM-DD");
      const lastDay12MonthsLater = moment()
        .add(12, "months")
        .endOf("month")
        .format("YYYY-MM-DD");
      setFilters(() => {
        return {
          fromDate: moment(firstDay).format("lll"),
          toDate: moment(lastDay12MonthsLater).format("lll"),
        };
      });
    } else if (type == "5y") {
      setmonthClicked("5y");
      const firstDay = moment().startOf("month").format("YYYY-MM-DD");
      const lastDay12MonthsLater = moment()
        .add(5, "years")
        .endOf("year")
        .format("YYYY-MM-DD");
      setFilters(() => {
        return {
          fromDate: moment(firstDay).format("lll"),
          toDate: moment(lastDay12MonthsLater).format("lll"),
        };
      });
    } else {
      setmonthClicked("max");

      setFilters(() => {
        return {};
      });
    }
  };
  return (
    <Box className="d-flex justify-content-between" sx={{ marginLeft: "40px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: { xs: "none", sm: "block" } }}>
          {/* Communication Line Chart */}
          <Box
            className="d-flex month_filters"
            sx={{ justifyContent: "flex-end", marginRight: "30px" }}
          >
            {showMonths && (
              <>
                {" "}
                <Typography
                  onClick={() => handleMonthClicked("1m")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "20px",
                    cursor: "pointer",
                    color: monthClicked == "1m" ? "#9D805F" : "unset",
                  }}
                >
                  1M
                </Typography>
                <Typography
                  onClick={() => handleMonthClicked("6m")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "20px",
                    cursor: "pointer",
                    color: monthClicked == "6m" ? "#9D805F" : "unset",
                  }}
                >
                  6M
                </Typography>
                <Typography
                  onClick={() => handleMonthClicked("1y")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "20px",
                    cursor: "pointer",
                    color: monthClicked == "1y" ? "#9D805F" : "unset",
                  }}
                >
                  1Y
                </Typography>
                <Typography
                  onClick={() => handleMonthClicked("5y")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "20px",
                    cursor: "pointer",
                    color: monthClicked == "5y" ? "#9D805F" : "unset",
                  }}
                >
                  5Y
                </Typography>
                <Typography
                  onClick={() => handleMonthClicked("max")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "20px",
                    cursor: "pointer",
                    color: monthClicked == "max" ? "#9D805F" : "unset",
                  }}
                >
                  MAX
                </Typography>
              </>
            )}

            <Box className="d-flex">
              <Box className="fitler_status d-flex">
                {" "}
                <CircleIcon
                  sx={{
                    color: "#9D805F",
                    fontSize: "15px",
                    marginInline: "5px",
                  }}
                />{" "}
                Success
              </Box>
              <Box className="fitler_status d-flex">
                {" "}
                <CircleIcon
                  sx={{
                    color: "#354B62",
                    fontSize: "15px",
                    marginInline: "5px",
                  }}
                />{" "}
                Failure
              </Box>
            </Box>
            {showFilterBtn && (
              <Box
                sx={{
                  boxShadow: "unset",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <BasicButton
                  style={{
                    //   position: "absolute",
                    //   right: "10px",
                    //   top: "-40px",
                    width: "150px",
                  }}
                  text={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <FilterListIcon />
                      <Typography>
                        Filter
                      </Typography> <KeyboardArrowDownIcon />{" "}
                    </Box>
                  }
                  bgColor={COLORS.secondary}
                  textColor={COLORS.white}
                  onClick={handleShowFilters}
                />
                {showFilters && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      position: "absolute",
                      right: "10px",
                      top: "60px",
                      width: "350px",
                      flexDirection: "column",
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <DateInput
                        initValue={filters.fromDate}
                        text="From: "
                        onChange={setFilters}
                        name={"fromDate"}
                        bgColor={COLORS.secondary}
                        textColor={COLORS.white}
                        style={{ padding: "5px 7px" }}
                      />

                      <DateInput
                        text="To: "
                        onChange={setFilters}
                        name={"toDate"}
                        bgColor={COLORS.secondary}
                        textColor={COLORS.white}
                        style={{ padding: "5px 7px" }}
                      />
                    </Box>
                    {showSearchInput && (
                      <SearchInput
                        style={{
                          backgroundColor: COLORS.secondary,
                          color: COLORS.white,

                          "& .MuiOutlinedInput-root": {
                            color: COLORS.white,
                          },
                          "& .MuiInputBase-input": {
                            padding: "10px",
                          },
                        }}
                        onchange={debouncedOnChange}
                      />
                    )}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FilterMonth;
