import React, { useEffect, useState } from "react";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
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

function Dashboard() {
  const { data, isLoading } = useGetCommunicationsCount({ filter: 1 });
  const { data: communicationgetcommunicationsperstatusmonth } =
    useFetchCommunicationgetcommunicationsperstatusmonth();
  const { data: aPICommunicationgetapicommunicationssend } =
    useFetchAPICommunicationgetapicommunicationssend();

  const { data: aPICommunicationgetapicommunicationsrecieve } =
    useFetchAPICommunicationgetapicommunicationsreceive();
  // const { mutate } = useLogin();
  const [firstChart, setFirstChart] = useState<any>({});
  const [secondChart, setSecondChart] = useState<any>({});
  const [thirdChart, setThirdChart] = useState<any>({});

  useEffect(() => {
    const months =
      communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.map(
        (item: any) => item.month
      );
    const succeedCounts =
      communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.map(
        (item: any) => item.succeedCount
      );
    const failedCounts =
      communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.map(
        (item: any) => item.failedCount
      );
    const counts = communicationgetcommunicationsperstatusmonth?.counts;
    setFirstChart({ months, succeedCounts, failedCounts, counts });
  }, [communicationgetcommunicationsperstatusmonth]);

  useEffect(() => {
    const months =
      aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.map(
        (item: any) => item.month
      );
    const succeedCounts =
      aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.map(
        (item: any) => item.succeedCount
      );
    const failedCounts =
      aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.map(
        (item: any) => item.failedCount
      );
    const counts = aPICommunicationgetapicommunicationssend?.counts;
    setSecondChart({ months, succeedCounts, failedCounts, counts });
  }, [aPICommunicationgetapicommunicationssend]);

  useEffect(() => {
    const months =
      aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.map(
        (item: any) => item.month
      );
    const succeedCounts =
      aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.map(
        (item: any) => item.succeedCount
      );
    const failedCounts =
      aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.map(
        (item: any) => item.failedCount
      );
    const counts = aPICommunicationgetapicommunicationsrecieve?.counts;
    setThirdChart({ months, succeedCounts, failedCounts, counts });
  }, [aPICommunicationgetapicommunicationsrecieve]);
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
                text="From: "
                bgColor={COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />

              <DateInput
                text="To: "
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
      <div className="first_chart">
        <AreaChartSimple data={firstChart} />
      </div>
      <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
        <Grid item xs={12} sm={9} md={9}>
          <Card>
            <AreaChartSimple data={secondChart} />
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
        <Grid item xs={12} sm={9} md={9}>
          <Card>
            <AreaChartSimple data={thirdChart} />
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
            valueColor={COLORS.red}
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
            />
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
