import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  debounce,
} from "@mui/material";
import StaticsCard from "../components/common/Cards/StaticsCard";
import { COLORS } from "../constants/insex";
import { AreaChartSimple } from "../components/Charts/AreaChart";
import { BarChart } from "../components/Charts/BarChart";
// import BasicTable from "../components/common/Table/Table";
import BasicButton from "../components/common/Buttons/Button";
import ReactSimplyCarouselExample from "../components/Slider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  useFetchAPICommunicationgetapicommunicationsreceive,
  useFetchAPICommunicationgetapicommunicationssend,
  useFetchCommunicationgetcommunicationsperstatusmonth,
  useGetCommunicationsCount,
} from "../Api/Hooks/Dashboard";
import SkeletonCom from "../components/Skeleton";
import DateInput from "../components/common/Buttons/DateInput";
import moment from "moment";
import SearchInput from "../components/common/Inputs/Searchinput";

function Dashboard() {
  const [text, setText] = useState("");

  const [filters, setFilters] = useState({
    fromDate: moment("10/1/2023").format("lll"),
    toDate: moment(new Date()).format("lll"),
  });
  const [filtersForBarChart, setFiltersForBarChart] = useState({
    fromDate: moment("10/1/2023").format("lll"),
    toDate: moment(new Date()).format("lll"),
  });
  const { data, isLoading } = useGetCommunicationsCount(filters);
  const { data: communicationgetcommunicationsperstatusmonth } =
    useFetchCommunicationgetcommunicationsperstatusmonth();
  const { data: aPICommunicationgetapicommunicationssend } =
    useFetchAPICommunicationgetapicommunicationssend();

  const {
    data: aPICommunicationgetapicommunicationsrecieve,
    isLoading: aPICommunicationgetapicommunicationsrecieveLoading,
  } = useFetchAPICommunicationgetapicommunicationsreceive({
    ...filtersForBarChart,
    name: text,
  });
  const [firstChart, setFirstChart] = useState<any>({});
  const [secondChart, setSecondChart] = useState<any>({});
  const [thirdChart, setThirdChart] = useState<any>({});
  const labels = [
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
  ];
  useEffect(() => {
    const months =
      communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.map(
        (item: any) => item.month
      );
    // const succeedCounts =
    //   communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.map(
    //     (item: any) => item.succeedCount
    //   );
    // const failedCounts =
    //   communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.map(
    //     (item: any) => item.failedCount
    //   );
    const counts = communicationgetcommunicationsperstatusmonth?.counts;
    const datasucceed = labels.map((month) => {
      const monthData =
        communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.succeedCount : 0;
    });
    const datafailed = labels.map((month) => {
      const monthData =
        communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.failedCount : 0;
    });

    setFirstChart({
      months,
      succeedCounts: datasucceed,
      failedCounts: datafailed,
      counts,
    });
  }, [communicationgetcommunicationsperstatusmonth]);

  useEffect(() => {
    const months =
      aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.map(
        (item: any) => item.month
      );
    // const succeedCounts =
    //   aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.map(
    //     (item: any) => item.succeedCount
    //   );
    // const failedCounts =
    //   aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.map(
    //     (item: any) => item.failedCount
    //   );
    const datasucceed = labels.map((month) => {
      const monthData =
        aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.succeedCount : 0;
    });
    const datafailed = labels.map((month) => {
      const monthData =
        aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.failedCount : 0;
    });
    const counts = aPICommunicationgetapicommunicationssend?.counts;
    setSecondChart({
      months,
      succeedCounts: datasucceed,
      failedCounts: datafailed,
      counts,
    });
  }, [aPICommunicationgetapicommunicationssend]);

  useEffect(() => {
    const months =
      aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.map(
        (item: any) => item.month
      );
    // const succeedCounts =
    //   aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.map(
    //     (item: any) => item.succeedCount
    //   );
    // const failedCounts =
    //   aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.map(
    //     (item: any) => item.failedCount
    //   );
    const datasucceed = labels.map((month) => {
      const monthData =
        aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.succeedCount : null;
    });
    const datafailed = labels.map((month) => {
      const monthData =
        aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.failedCount : null;
    });
    const counts = aPICommunicationgetapicommunicationsrecieve?.counts;
    setThirdChart({
      months,
      succeedCounts: datasucceed,
      failedCounts: datafailed,
      counts,
    });
  }, [aPICommunicationgetapicommunicationsrecieve]);
  const [showFilters, setShowFilters] = useState(false);
  const handleShowFilters = () => {
    setShowFilters((old) => !old);
  };

  const onChangeSearch = (value: string) => {
    setText(value);
  };
  const debouncedOnChange = debounce(onChangeSearch, 500);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography component="h5" sx={{ color: "#666666" }} variant="h6">
              Dashboard
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
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
          </Box>
        </Grid>
        {isLoading ? (
          <SkeletonCom />
        ) : (
          <>
            <Grid
              sx={{ paddingTop: "10px !important" }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <StaticsCard
                text="Commnuication count"
                count={data?.communicationCount}
                bgcolor={COLORS.white}
                valueColor={COLORS.primary}
              />
            </Grid>
            <Grid
              sx={{ paddingTop: "10px !important" }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <StaticsCard
                text="Succeed"
                count={data?.communicationSucceedCount}
                bgcolor={COLORS.white}
                valueColor={COLORS.primary}
              />
            </Grid>
            <Grid
              sx={{ paddingTop: "10px !important" }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <StaticsCard
                text="Failed"
                count={data?.communicationFailedCount}
                bgcolor={COLORS.white}
                valueColor={COLORS.primary}
              />
            </Grid>
          </>
        )}
      </Grid>
      <div className="first_chart" style={{ marginTop: "10px" }}>
        <AreaChartSimple
          data={firstChart}
          type="normal"
          title={"Communication Line Chart"}
        />
      </div>
      <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
        <Grid item xs={12} sm={9} md={9}>
          <Card>
            <AreaChartSimple title={"Api Send Line Chart"} data={secondChart} />
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <StaticsCard
            text="Response Time"
            count={
              aPICommunicationgetapicommunicationssend?.averageResponseTime
            }
            alignText="center"
            valueColor={COLORS.black}
          />
          <StaticsCard
            alignText="center"
            text="Integration Status"
            count={aPICommunicationgetapicommunicationssend?.integrationStatus}
            valueColor={COLORS.green}
          />
          <StaticsCard
            text="Total Calls"
            alignText="center"
            bgcolor={COLORS.primary}
            textColor={COLORS.white}
            valueColor={COLORS.white}
            border={false}
            count={aPICommunicationgetapicommunicationssend?.totalCallsCount}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
        {aPICommunicationgetapicommunicationsrecieveLoading ? (
          <SkeletonCom></SkeletonCom>
        ) : (
          <Grid item xs={12} sm={9} md={9}>
            <Card>
              <AreaChartSimple
                title={"Api Receive Line Chart"}
                data={thirdChart}
              />
            </Card>
          </Grid>
        )}

        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <StaticsCard
            text="Response Time"
            alignText="center"
            count={
              aPICommunicationgetapicommunicationsrecieve?.averageResponseTime
            }
            valueColor={COLORS.black}
          />
          <StaticsCard
            text="Integration Status"
            alignText="center"
            count={
              aPICommunicationgetapicommunicationsrecieve?.integrationStatus
            }
            valueColor={COLORS.green}
          />
          <StaticsCard
            text="Total Calls"
            alignText="center"
            bgcolor={COLORS.primary}
            textColor={COLORS.white}
            valueColor={COLORS.white}
            border={false}
            count={aPICommunicationgetapicommunicationsrecieve?.totalCallsCount}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            className="w-100"
            sx={{
              backgroundColor: COLORS.grey,
              width: "100%",
              boxShadow: "unset",
              position: "relative",
              overflow: "visible",
            }}
          >
            <BasicButton
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
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
                  // width: "150px",
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
                    initValue={filtersForBarChart.fromDate}
                    text="From: "
                    onChange={setFiltersForBarChart}
                    name={"fromDate"}
                    bgColor={COLORS.secondary}
                    textColor={COLORS.white}
                    style={{ padding: "5px 7px" }}
                  />

                  <DateInput
                    text="To: "
                    onChange={setFiltersForBarChart}
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

            <BarChart />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            sx={{
              backgroundColor: COLORS.grey,
              width: "100%",
              position: "relative",
              boxShadow: "unset",
              height: "300px",
            }}
          >
            <Typography component="h5" variant="h5" sx={{ margin: "20px" }}>
              Top Entities
            </Typography>
            <ReactSimplyCarouselExample />
          </Card>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography component="h5" variant="h5" sx={{ margin: "10px" }}>
              Transaction Table
            </Typography>
            <BasicButton
              text="Export Excel"
              bgColor={COLORS.primary}
              textColor={COLORS.white}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBlock: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <BasicButton
                text="From: 1/2023"
                bgColor={COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />
              <BasicButton
                text="To: 1/2023"
                bgColor={COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <BasicButton
                text="Source Entity"
                bgColor={COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />
              <BasicButton
                text="Destination Entity"
                bgColor={COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />
            </Box>
          </Box>

          <BasicTable Headers={Headers} data={dummyData} />
        </Grid> */}
      </Grid>
    </Container>
  );
}

export default Dashboard;
