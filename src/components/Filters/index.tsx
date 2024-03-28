import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { COLORS } from "../../constants/insex";
import BasicButton from "../common/Buttons/Button";
import DateInput from "../common/Buttons/DateInput";
import SearchInput from "../common/Inputs/Searchinput";

function FilterMonth({
  title,
  showMonths = true,
  showFilterBtn = true,

  debouncedOnChange,

  filters,
  setFilters,
}: any) {
  const [showFilters, setShowFilters] = useState(false);
  const handleShowFilters = () => {
    setShowFilters((old) => !old);
  };
  return (
    <Box className="d-flex justify-content-between" sx={{ marginLeft: "40px" }}>
      <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>

      {/* Communication Line Chart */}
      <Box className="d-flex month_filters">
        {showMonths && (
          <>
            {" "}
            <Typography
              sx={{ display: "flex", alignItems: "center", height: "20px" }}
            >
              1M
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", height: "20px" }}
            >
              6M
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", height: "20px" }}
            >
              1Y
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", height: "20px" }}
            >
              5Y
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", height: "20px" }}
            >
              MAX
            </Typography>
          </>
        )}

        <Box className="d-flex">
          <Box className="fitler_status d-flex">
            {" "}
            <CircleIcon
              sx={{ color: "#9D805F", fontSize: "15px", marginInline: "5px" }}
            />{" "}
            Success
          </Box>
          <Box className="fitler_status d-flex">
            {" "}
            <CircleIcon
              sx={{ color: "#354B62", fontSize: "15px", marginInline: "5px" }}
            />{" "}
            Failure
          </Box>
        </Box>
        {showFilterBtn && (
          <Box
            className="w-100"
            sx={{
              width: "100%",
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
                  <Typography>Filter</Typography> <KeyboardArrowDownIcon />{" "}
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
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default FilterMonth;
