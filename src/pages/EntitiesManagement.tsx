import { Container, Grid, Typography } from "@mui/material";

import React from "react";
import BasicTable from "../components/common/Table/Table";
import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import SearchInput from "../components/common/Inputs/Searchinput";
const Headers = [
  "Id",
  "Entity Name",
  "phone",
  "Email ",
  "Services URL",
  "Is Enabled",
  "Actions",
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

const EntitiesManagement: React.FC<any> = () => {
  return (
    <Container>
      <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              sx={{
                paddingTop: "10px !important",
              }}
            >
              <Typography>Entity list</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{
                paddingTop: "0px !important",
              }}
            >
              <SearchInput />
            </Grid>
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "10px !important",
              }}
            >
              <BasicButton
                text="Add Entity"
                bgColor={COLORS.primary}
                textColor={COLORS.white}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BasicTable
            Headers={Headers}
            data={dummyData}
            actions={true}
            middleBtn={true}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EntitiesManagement;
