import { Box } from "@mui/material";
import { useContext } from "react";
import { DrawerHeader } from "./navigation-drawer";
import SettingsDisplay from "./settings-display";
import { DISPLAY_CONTENT, UiControllerContext } from "./ui-controller-context";
import CreationDisplay from "./creation/creationDisplay";

export default function MainPanel() {
  const uiContext = useContext(UiControllerContext)

  return <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <DrawerHeader />
    {uiContext.selectedContent === DISPLAY_CONTENT.CREATION && <CreationDisplay />}
    {uiContext.selectedContent === DISPLAY_CONTENT.SETTINGS && <SettingsDisplay />}
  </Box>
}