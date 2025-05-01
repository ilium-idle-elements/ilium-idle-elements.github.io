import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext } from "react";
import { GiMetalBar, GiUpgrade } from "react-icons/gi";
import { MdSettings } from "react-icons/md";
import { GameEngineContext } from "../game-engine-context";
import { DISPLAY_CONTENT, UiControllerContext } from "../ui-controller-context";

export default function NavigationButtonsDisplay() {
    const uiContext = useContext(UiControllerContext)
    const { gameEngine } = useContext(GameEngineContext)

    const handleAlignment = (event: any, newAlignment: DISPLAY_CONTENT) => {
        uiContext.setSelectedContent(newAlignment);
    };

    return <Box style={{ alignContent: "center" }}>
        <ToggleButtonGroup
            value={uiContext.selectedContent}
            exclusive
            onChange={handleAlignment}
            size={"large"}
        >
            <ToggleButton value={DISPLAY_CONTENT.CREATION}>
                <GiMetalBar />
            </ToggleButton>
            <ToggleButton value={DISPLAY_CONTENT.PRESTIGE}>
                <GiUpgrade />
            </ToggleButton>
            <ToggleButton value={DISPLAY_CONTENT.SETTINGS}>
                <MdSettings />
            </ToggleButton>
        </ToggleButtonGroup>
    </Box>;
}