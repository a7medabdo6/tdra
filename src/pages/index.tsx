import React from "react";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import StaticsCard from "../components/common/Cards/StaticsCard";
import { COLORS } from "../constants/insex";
import { AreaChartSimple } from "../components/Charts/AreaChart";
import { BarChart } from "../components/Charts/BarChart";
import BasicTable from "../components/common/Table/Table";
import BasicButton from "../components/common/Buttons/Button";
import ReactSimplyCarouselExample from "../components/Slider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useGetCommunicationsCount } from "../Api/Hooks/Dashboard";
import SkeletonCom from "../components/Skeleton";
const Headers = [
  "Id",
  "Entity Name",
  "phone",
  "Email ",
  "Services URL",
  "Is Enabled",
];
const dummyData = [
  {
    id: 1,
    entityName: "Company A",
    phone: "123-456-7890",
    email: "companyA@example.com",
    servicesURL: "https://servicesA.com",
    isEnabled: true,
  },
  {
    id: 2,
    entityName: "Company B",
    phone: "987-654-3210",
    email: "companyB@example.com",
    servicesURL: "https://servicesB.com",
    isEnabled: false,
  },
  {
    id: 3,
    entityName: "Company C",
    phone: "555-123-4567",
    email: "companyC@example.com",
    servicesURL: "https://servicesC.com",
    isEnabled: true,
  },
  // Add more objects as needed
];
function Dashboard() {
  const { data, isLoading } = useGetCommunicationsCount({ filter: 1 });
  // useEffect(() => {
  //   mutate({ email: "olak@blackstoneeit.com", password: "P@ssw0rd" });
  // }, []);
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
        <AreaChartSimple />
      </div>
      <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
        <Grid item xs={12} sm={9} md={9}>
          <Card>
            <AreaChartSimple />
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
            valueColor={COLORS.black}
          />
          <StaticsCard
            alignText="center"
            text="Integration Status"
            valueColor={COLORS.green}
          />
          <StaticsCard
            text="Total Calls"
            alignText="center"
            bgcolor={COLORS.primary}
            textColor={COLORS.white}
            valueColor={COLORS.white}
            border={false}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
        <Grid item xs={12} sm={9} md={9}>
          <Card>
            <AreaChartSimple />
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
            valueColor={COLORS.black}
          />
          <StaticsCard
            text="Integration Status"
            alignText="center"
            valueColor={COLORS.red}
          />
          <StaticsCard
            text="Total Calls"
            alignText="center"
            bgcolor={COLORS.primary}
            textColor={COLORS.white}
            valueColor={COLORS.white}
            border={false}
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
        <Grid item xs={12} sm={12} md={12}>
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
