import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { GiAbstract013 } from "react-icons/gi";
import { GameEngineContext } from "../game-engine-context";
import { UiControllerContext } from "../ui-controller-context";
import ContractDisplay from "./contractDisplay";
import { elementToSymbolMap } from "./creationDisplay";

export default function PrestigeDisplay() {
    const uiContext = useContext(UiControllerContext)
    const { gameEngine } = useContext(GameEngineContext)
    const prestigeClicked = () => {
        gameEngine.player.prestige.prestige(gameEngine)
    }
    return <Box style={{ alignItems: "center", alignContent: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <ContractDisplay />
        <Stack direction={"row"} style={{ alignItems: "center" }} spacing={1}>
            <span>{gameEngine.player.prestige.points}</span>
            <GiAbstract013 />
            <Button onClick={prestigeClicked} disabled={!gameEngine.player.prestige.canPrestige(gameEngine)}>
                Prestige
            </Button>
        </Stack>
        <Stack direction={"column"} style={{ alignItems: "center" }} spacing={1}>
            {gameEngine.player.prestige.getAvailableUpgrades(gameEngine).map(upgrade => {
                const upgradeClicked = () => {
                    gameEngine.player.prestige.buyUpgrade(upgrade.type)
                }
                return <Card onClick={upgradeClicked} key={upgrade.type} style={{ outline: gameEngine.player.prestige.canAffordUpgrade(upgrade.type) ? "auto" : "none" }}>
                    <CardContent>
                        <Stack direction={"row"} style={{ alignItems: "center" }} spacing={1}>
                            <Typography>{upgrade.name}</Typography>
                            <Typography>{gameEngine.player.prestige.upgrades[upgrade.type] || 0}/{upgrade.max}</Typography>
                            <Typography>{gameEngine.player.prestige.getUpgradeCost(upgrade.type)}</Typography>
                            {upgrade.elementalMultipliers?.map(multiplier => {
                                return (
                                    <Stack direction={"row"} style={{ alignItems: "center" }} key={multiplier.type + "-prestige-multiplier"}>
                                        <span>{multiplier.multiplier}x</span>
                                        {elementToSymbolMap[multiplier.type]}
                                    </Stack>
                                )
                            })}
                        </Stack>
                    </CardContent>
                </Card>
            })}
        </Stack>
    </Box >
}