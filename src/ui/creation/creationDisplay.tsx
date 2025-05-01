import { Box, Button, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import Decimal from "decimal.js";
import { useContext, useState } from "react";
import { GameEngineContext } from "../game-engine-context";
import { UiControllerContext } from "../ui-controller-context";
import { CreatableType } from "../../game-engine/player/creation/creatableType";
import { ElementType } from "../../game-engine/player/elements/elementType";
import { FaFire, FaMountain, FaWind } from "react-icons/fa"
import { GiWaterDrop } from "react-icons/gi";
import CreationAmountsDisplay from "./creationAmounts";

export const elementToColorMap = {
  [ElementType.FIRE]: "red",
  [ElementType.AIR]: "green",
  [ElementType.EARTH]: "brown",
  [ElementType.WATER]: "blue"
}

export const elementToSymbolMap = {
  [ElementType.FIRE]: <FaFire color={elementToColorMap[ElementType.FIRE]} />,
  [ElementType.AIR]: <FaWind color={elementToColorMap[ElementType.AIR]} />,
  [ElementType.EARTH]: <FaMountain color={elementToColorMap[ElementType.EARTH]} />,
  [ElementType.WATER]: <GiWaterDrop color={elementToColorMap[ElementType.WATER]} />
}

export default function CreationDisplay() {
  const uiContext = useContext(UiControllerContext)
  const { gameEngine, updateGameEngine } = useContext(GameEngineContext)
  const training = gameEngine.player.training
  const availableCreatableTypes = gameEngine.player.getAvailableCreatables(gameEngine)

  return <Box style={{flex: 1, overflowY: "auto", paddingBottom: 5, paddingTop: 5}}>
      <Stack direction={"column"} spacing={1}>
        {Object.values(availableCreatableTypes).map(creatableType => {
            const creatable = gameEngine.player.creatables[creatableType]
            return creatable && <Card key={creatable.type}>
            <CardActionArea
              onClick={() => {
                if (training.includes(creatableType)) {
                  gameEngine.player.stopTraining(creatableType)
                } else {
                  gameEngine.player.train(creatableType, gameEngine)
                }
              }}
              data-active={training.includes(creatableType) ? '' : undefined}
              sx={{
                height: '100%',
                '&[data-active]': {
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: 'action.selectedHover',
                  },
                },
              }}
            >
              <CardContent sx={{ height: '100%' }}>
                <Stack direction={"row"} spacing={1}>
                  <Typography variant="h3" component="div" style={{backgroundColor: elementToColorMap[creatable.elementType], padding: "5px"}}>
                    {creatable.level.toString()}
                  </Typography>
                  <Stack direction={"column"} spacing={1}>
                    <Typography variant="h6" component="div">
                      {creatable.displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {creatable.progress.round().toNumber()} / {creatable.getProgressNeededToLevel().toNumber()}
                    </Typography>
                  </Stack>
                  <Stack direction={"column"} spacing={1}>
                    {creatable.elementalGains.map(elementalGain => {
                      return <Stack direction={"row"} style={{alignItems: "center"}} key={elementalGain.type + "-gain"}>
                        <Typography>+{elementalGain.amountPerLevel.toNumber()}</Typography>
                        {elementToSymbolMap[elementalGain.type]}
                      </Stack>
                    })}
                    {creatable.elementalGainMultipliers.map(elementalGainMultiplier => {
                      return <Stack direction={"row"} style={{alignItems: "center"}} key={elementalGainMultiplier.type + "-multiplier"}>
                        <Typography>+{elementalGainMultiplier.multiplier.toNumber()}%</Typography>
                        {elementToSymbolMap[elementalGainMultiplier.type]}
                      </Stack>
                    })}
                  </Stack>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        })}
      </Stack>
  </Box>
}