import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import ResponsiveAppBar from "./Appbar";
import { COLORS } from "../../constants/insex";
import logo from "../../assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface SideBarProps {
  children: string | JSX.Element | JSX.Element[];
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar: React.FC<SideBarProps> = ({ children }) => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const location = useLocation();
  const { pathname } = location;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ResponsiveAppBar
        open={open}
        setOpen={setOpen}
        handleDrawerOpen={handleDrawerOpen}
      />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ display: "flex", justifyContent: "center" }}>
          <CloseIcon
            style={{
              position: "absolute",
              top: "5px",
              right: "7px",
              cursor: "pointer",
            }}
            onClick={() => setOpen(false)}
          />
          <img style={{ height: "70px" }} src={logo} />
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton> */}
        </DrawerHeader>
        <List>
          {[
            { label: "Dashboard and Reports", link: "/" },
            { label: "Entities Management", link: "/entities-management" },
            { label: "Lookup Management", link: "/lookup-categories" },
            { label: "User Management", link: "/user-management" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item?.link}
              style={{ textDecoration: "unset" }}
            >
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  backgroundColor:
                    item?.link == pathname ? COLORS.primary : COLORS.white,
                  color: item?.link == pathname ? COLORS.white : COLORS.black,
                  marginInline: 1,
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemText
                    primary={item?.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};
export default Sidebar;
