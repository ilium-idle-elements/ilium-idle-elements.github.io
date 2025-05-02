import { Box } from "@mui/material";
import { useContext } from "react";
import CreationDisplay from "./creation/creationDisplay";
import SettingsDisplay from "./settings-display";
import { DISPLAY_CONTENT, UiControllerContext } from "./ui-controller-context";

export default function MainPanel() {
  const uiContext = useContext(UiControllerContext);

  return (
    <Box component="main">
      {uiContext.selectedContent === DISPLAY_CONTENT.CREATION && (
        <CreationDisplay />
      )}
      {uiContext.selectedContent === DISPLAY_CONTENT.SETTINGS && (
        <SettingsDisplay />
      )}
    </Box>
  );
}
