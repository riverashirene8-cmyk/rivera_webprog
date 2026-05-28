import React, { useState } from "react";
import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";

const drawerWidth = 240;

const dashboardNavItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
  },
  {
    label: "Users",
    title: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),

  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  overflowX: "hidden",

  width: `calc(${theme.spacing(7)} + 1px)`,

  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",

  padding: theme.spacing(0, 1),

  minHeight: "64px",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,

  backgroundColor: "#1976d2",
  color: "#fff",

  height: "64px",

  justifyContent: "center",

  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

  transition: theme.transitions.create(
    ["width", "margin"],
    {
      easing: theme.transitions.easing.sharp,
      duration:
        theme.transitions.duration.leavingScreen,
    }
  ),

  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,

    transition: theme.transitions.create(
      ["width", "margin"],
      {
        easing: theme.transitions.easing.sharp,
        duration:
          theme.transitions.duration.enteringScreen,
      }
    ),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,

  flexShrink: 0,

  whiteSpace: "nowrap",

  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),

    "& .MuiDrawer-paper": {
      ...openedMixin(theme),

      backgroundColor: "#fff",

      color: "#111",

      top: 0,

      height: "100vh",

      borderRight: "1px solid #e0e0e0",
    },
  }),

  ...(!open && {
    ...closedMixin(theme),

    "& .MuiDrawer-paper": {
      ...closedMixin(theme),

      backgroundColor: "#fff",

      color: "#111",

      top: 0,

      height: "100vh",

      borderRight: "1px solid #e0e0e0",
    },
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: 8,

  backgroundColor: "rgba(255,255,255,0.15)",

  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  marginRight: theme.spacing(2),

  width: "100%",

  maxWidth: 250,
}));

const SearchIconWrapper = styled("div")(
  ({ theme }) => ({
    padding: theme.spacing(0, 2),

    height: "100%",

    position: "absolute",

    pointerEvents: "none",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",
  })
);

const StyledInputBase = styled(InputBase)(
  ({ theme }) => ({
    color: "#fff",

    width: "100%",

    "& .MuiInputBase-input": {
      padding: theme.spacing(1.2, 1, 1.2, 0),

      paddingLeft: `calc(1em + ${theme.spacing(
        4
      )})`,
    },
  })
);

const getPageTitle = (pathname) => {
  return (
    dashboardNavItems.find(
      (item) => item.to === pathname
    )?.title || "Dashboard"
  );
};

export default function DashLayout() {
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const location = useLocation();

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",

        minHeight: "100vh",

        backgroundColor: "#f5f7fb",

        overflow: "hidden",
      }}
    >
      <CssBaseline />

      {/* TOPBAR */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            {open ? (
              <MenuOpenIcon />
            ) : (
              <MenuIcon />
            )}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              fontWeight: 600,
            }}
          >
            {getPageTitle(location.pathname)}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase placeholder="Search..." />
          </Search>

          <Button
            variant="outlined"
            sx={{
              color: "#fff",

              borderColor: "#fff",

              "&:hover": {
                borderColor: "#fff",
                backgroundColor:
                  "rgba(255,255,255,0.1)",
              },
            }}
            onClick={() => navigate("/")}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={() => setOpen(false)}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {dashboardNavItems.map(
            ({ label, to, icon: Icon }) => (
              <ListItem
                key={to}
                disablePadding
                sx={{
                  display: "block",
                }}
              >
                <ListItemButton
                  component={Link}
                  to={to}
                  selected={
                    location.pathname === to
                  }
                  sx={{
                    minHeight: 48,

                    justifyContent: open
                      ? "initial"
                      : "center",

                    px: 2.5,

                    "&.Mui-selected": {
                      backgroundColor:
                        "#e3f2fd",

                      color: "#1976d2",

                      "& .MuiListItemIcon-root":
                        {
                          color: "#1976d2",
                        },
                    },

                    "&:hover": {
                      backgroundColor:
                        "#f5f5f5",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,

                      mr: open ? 3 : "auto",

                      justifyContent: "center",
                    }}
                  >
                    <Icon />
                  </ListItemIcon>

                  <ListItemText
                    primary={label}
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,

          p: 3,

          mt: "64px",

          minHeight: "100vh",

          backgroundColor: "#f5f7fb",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}