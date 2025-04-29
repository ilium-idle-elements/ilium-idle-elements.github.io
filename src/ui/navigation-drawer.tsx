import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { GiBossKey, GiHamburgerMenu, GiMetalBar, GiPotionBall, GiUpgrade, GiWorld } from "react-icons/gi";
import { MdConstruction, MdSettings } from "react-icons/md";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { DISPLAY_CONTENT, UiControllerContext } from "./ui-controller-context";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
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

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function MiniDrawerAppBar() {
  const uiContext = React.useContext(UiControllerContext)
  return (
    <AppBar position="fixed" open={uiContext.drawerOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            uiContext.setDrawerOpen(true);
          }}
          edge="start"
          sx={{
            marginRight: 5,
            ...(uiContext.drawerOpen && { display: "none" }),
          }}
        >
          <GiHamburgerMenu />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Battleatro
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default function MiniDrawer() {
  const uiContext = React.useContext(UiControllerContext)
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={uiContext.drawerOpen}>
      <DrawerHeader>
        <IconButton
          onClick={() => {
            uiContext.setDrawerOpen(false);
          }}
        >
          {theme.direction === "rtl" ? <VscChevronRight /> : <VscChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key={"creation"} disablePadding sx={{ display: "block" }} onClick={() => { uiContext.setSelectedContent(DISPLAY_CONTENT.CREATION) }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: uiContext.drawerOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: uiContext.drawerOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <GiMetalBar />
            </ListItemIcon>
            <ListItemText
              primary={"Creation"}
              sx={{ opacity: uiContext.drawerOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={"prestige"} disablePadding sx={{ display: "block" }} onClick={() => { uiContext.setSelectedContent(DISPLAY_CONTENT.PRESTIGE) }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: uiContext.drawerOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: uiContext.drawerOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <GiUpgrade />
            </ListItemIcon>
            <ListItemText
              primary={"Prestige"}
              sx={{ opacity: uiContext.drawerOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={"settings"} disablePadding sx={{ display: "block" }} onClick={() => { uiContext.setSelectedContent(DISPLAY_CONTENT.SETTINGS) }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: uiContext.drawerOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: uiContext.drawerOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <MdSettings />
            </ListItemIcon>
            <ListItemText
              primary={"Settings"}
              sx={{ opacity: uiContext.drawerOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
