import {
  Container,
  Grid,
  Typography,
  debounce,
  useMediaQuery,
} from "@mui/material";

import React, { useState } from "react";
import BasicTable from "../components/common/Table/Table";
import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import SearchInput from "../components/common/Inputs/Searchinput";
import { useEntities } from "../Api/Hooks/EntityManagment";
import SkeletonCom from "../components/Skeleton";
import { useNavigate } from "react-router-dom";
import CurrentUser from "../CurrentUser";
const Headers = [
  { label: "Id", key: "id" },
  { label: "Entity Name", key: "name" },
  { label: "phone", key: "phone" },
  { label: "Email", key: "email" },
  { label: "Services URL", key: "serviceUrl" },
  { label: "Is Enabled", key: "isEnabled" },
];

// const dummyData = [
//   {
//     "id": 1,
//     "name": "test 1",
//     "phone": "+962788210993",
//     "email": "ola@gm.com",
//     "serviceUrl": "string",
//     "isEnabled": true,
//     "isDeactivated": false,
//     "fields": []
//   },
//   {
//     id: 2,
//     entityName: "Company B",
//     phone: "987-654-3210",
//     email: "companyB@example.com",
//     servicesURL: "https://servicesB.com",
//     isEnabled: false,
//     link: "/entity-details",
//     linkMapping: "/mapping-screen",
//   },
//   {
//     id: 3,
//     entityName: "Company C",
//     phone: "555-123-4567",
//     email: "companyC@example.com",
//     servicesURL: "https://servicesC.com",
//     isEnabled: true,
//     link: "/entity-details",
//     linkMapping: "/mapping-screen",
//   },
//   // Add more objects as needed
// ];

const EntitiesManagement: React.FC<any> = () => {
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const [text, setText] = useState("");
  const { user } = CurrentUser();
  const { data, isLoading } = useEntities(text);
  const navigate = useNavigate();
  const onChangeSearch = (value: string) => {
    setText(value);
  };
  const debouncedOnChange = debounce(onChangeSearch, 500);

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
                  onClick={() => navigate("/entity-details/add")}
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
              <SearchInput onchange={debouncedOnChange} />
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
                  onClick={() => navigate("/entity-details/add")}
                  text="Add Entity"
                  bgColor={COLORS.primary}
                  textColor={COLORS.white}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {isLoading ? (
          <SkeletonCom />
        ) : (
          <Grid item xs={12} sm={12} md={12}>
            <BasicTable
              Headers={Headers}
              data={data}
              actions={true}
              middleBtn={true}
              user={user}
              link="/entity-details"
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default EntitiesManagement;
