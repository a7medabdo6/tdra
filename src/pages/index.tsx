import React from "react";
import { Card, Container, Grid } from "@mui/material";
import StaticsCard from "../components/common/Cards/StaticsCard";
import { COLORS } from "../constants/insex";
import { AreaChartSimple } from "../components/Charts/AreaChart";
import { BarChart } from "../components/Charts/BarChart";
import BasicTable from "../components/common/Table/Table";

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
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StaticsCard bgcolor={COLORS.white} valueColor={COLORS.primary} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StaticsCard bgcolor={COLORS.white} valueColor={COLORS.primary} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StaticsCard bgcolor={COLORS.white} valueColor={COLORS.primary} />
        </Grid>
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
          xs={3}
          sm={3}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <StaticsCard alignText="center" valueColor={COLORS.black} />
          <StaticsCard alignText="center" valueColor={COLORS.green} />
          <StaticsCard
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
          xs={3}
          sm={3}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <StaticsCard alignText="center" valueColor={COLORS.black} />
          <StaticsCard alignText="center" valueColor={COLORS.red} />
          <StaticsCard
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
              height: "300px",
            }}
          >
            <BarChart />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BasicTable Headers={Headers} data={dummyData} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
