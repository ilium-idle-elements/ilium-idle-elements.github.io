import { Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { GiTiedScroll } from "react-icons/gi"
import { ElementType } from "../../game-engine/player/elements/elementType"
import { GameEngineContext } from "../game-engine-context"
import { UiControllerContext } from "../ui-controller-context"
import { elementToSymbolMap } from "./creationDisplay"

export default function ContractDisplay() {
    const uiContext = useContext(UiControllerContext)
    const { gameEngine } = useContext(GameEngineContext)

    return (
        <Stack direction={"column"} spacing={1} style={{ alignItems: "center" }}>
            <Stack direction={"row"} style={{ alignItems: "center" }} spacing={1}>
                <Typography>{gameEngine.player.contracts.completionCount}</Typography>
                <GiTiedScroll />
            </Stack>
            <Stack direction={"row"} style={{ alignItems: "center" }} spacing={1}>
                {Object.entries(gameEngine.player.contracts.elementAmounts).map(([elementType, amount]) => {
                    return (
                        <Stack direction={"row"} style={{ alignItems: "center" }} key={elementType + "-total"}>
                            <Typography>{amount.round().toNumber()}</Typography>
                            {elementToSymbolMap[elementType as ElementType]}
                        </Stack>
                    )
                })}
            </Stack>
        </Stack>
    )
}