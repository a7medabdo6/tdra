import { Container, Grid, Typography, useMediaQuery } from "@mui/material";

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
    link: "/entity-details",
    linkMapping: "/mapping-screen",
  },
  {
    id: 2,
    entityName: "Company B",
    phone: "987-654-3210",
    email: "companyB@example.com",
    servicesURL: "https://servicesB.com",
    isEnabled: false,
    link: "/entity-details",
    linkMapping: "/mapping-screen",
  },
  {
    id: 3,
    entityName: "Company C",
    phone: "555-123-4567",
    email: "companyC@example.com",
    servicesURL: "https://servicesC.com",
    isEnabled: true,
    link: "/entity-details",
    linkMapping: "/mapping-screen",
  },
  // Add more objects as needed
];

const EntitiesManagement: React.FC<any> = () => {
  const isSmallScreen = useMediaQuery("(max-width:700px)");

  return (
    <Container>
      <Grid
        container
        spacing={3}
        sx={{ marginBlock: isSmallScreen ? "0px" : "20px" }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={6}
              sm={3}
              md={3}
              sx={{
                paddingTop: "10px !important",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography>Entity list</Typography>
            </Grid>
            {isSmallScreen && (
              <Grid
                item
                xs={6}
                sm={3}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "10px !important",
                  marginBottom: "20px",
                }}
              >
                <BasicButton
                  text="Add Entity"
                  bgColor={COLORS.primary}
                  textColor={COLORS.white}
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              sx={{
                paddingTop: "0px !important",
              }}
            >
              <SearchInput />
            </Grid>
            {!isSmallScreen && (
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "0px !important",
                }}
              >
                <BasicButton
                  text="Add Entity"
                  bgColor={COLORS.primary}
                  textColor={COLORS.white}
                />
              </Grid>
            )}
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
