import { Container, Grid, useMediaQuery } from "@mui/material";

import React from "react";
import BasicTable from "../components/common/Table/Table";
import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import BasicTabs from "../components/common/Tab";
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
    link: "/route-details",
  },
  {
    id: 2,
    entityName: "Company B",
    phone: "987-654-3210",
    email: "companyB@example.com",
    servicesURL: "https://servicesB.com",
    isEnabled: false,
    link: "/route-details",
  },
  {
    id: 3,
    entityName: "Company C",
    phone: "555-123-4567",
    email: "companyC@example.com",
    servicesURL: "https://servicesC.com",
    isEnabled: true,
    link: "/route-details",
  },
  // Add more objects as needed
];

const UserManagement: React.FC<any> = () => {
  const isSmallScreen = useMediaQuery("(max-width:700px)");

  return (
    <Container>
      <BasicTabs
        itemOne={
          <Grid
            container
            spacing={3}
            sx={{ marginBlock: isSmallScreen ? "0px" : "20px" }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    paddingTop: "0px !important",
                    paddingLeft: "0px !important",
                  }}
                >
                  <SearchInput />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: isSmallScreen ? "flex-start" : "flex-end",
                    paddingTop: isSmallScreen ? "20px" : "10px !important",
                    paddingLeft: isSmallScreen ? "0px !important" : "auto",
                  }}
                >
                  <BasicButton
                    text="Add New User"
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
                middleBtn={false}
                deletebtn={false}
              />
            </Grid>
          </Grid>
        }
        itemTow={
          <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    paddingTop: "0px !important",
                    paddingLeft: "0px !important",
                  }}
                >
                  <SearchInput />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: isSmallScreen ? "flex-start" : "flex-end",
                    paddingTop: isSmallScreen ? "20px" : "10px !important",
                    paddingLeft: isSmallScreen ? "0px !important" : "auto",
                  }}
                >
                  <BasicButton
                    text="Add New Role"
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
                middleBtn={false}
                deletebtn={false}
                haveButtons={true}
              />
            </Grid>
          </Grid>
        }
      />
    </Container>
  );
};

export default UserManagement;
