import { Container, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { GameEngineContext } from "../game-engine-context";
import { UiControllerContext } from "../ui-controller-context";
import { ElementType } from "../../game-engine/player/elements/elementType";
import { elementToSymbolMap } from "./creationDisplay";

export default function CreationAmountsDisplay() {
  const uiContext = useContext(UiControllerContext)
  const { gameEngine } = useContext(GameEngineContext)

  return <Stack direction={"column"} spacing={1} style={{alignItems: "center"}}>
    <Stack direction={"row"} style={{alignItems: "center"}} spacing={1}>
        {Object.entries(gameEngine.player.elements).map(([elementType, amount]) => {
            return <Stack direction={"row"} style={{alignItems: "center"}} key={elementType + "-total"}>
                <Typography>{amount.round().toNumber()}</Typography>
                {elementToSymbolMap[elementType as ElementType]}
            </Stack>
        })}
    </Stack>
    <Stack direction={"row"} style={{alignItems: "center"}} spacing={1}>
        {Object.values(ElementType).map(elementType => {
            return <Stack direction={"row"} style={{alignItems: "center"}} key={elementType + "-gain-mutiplier"}>
                <Typography>x{gameEngine.player.getElementMultiplier(elementType).toSignificantDigits(3).toNumber()}</Typography>
                {elementToSymbolMap[elementType as ElementType]}
            </Stack>
        })}
    </Stack>
</Stack>
}