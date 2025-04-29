import { Button, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import Decimal from "decimal.js";
import { useContext, useState } from "react";
import { GameEngineContext } from "../game-engine-context";
import { UiControllerContext } from "../ui-controller-context";
import { CreatableType } from "../../game-engine/player/creation/creatableType";
import { ElementType } from "../../game-engine/player/elements/elementType";
import { FaFire, FaMountain, FaWind } from "react-icons/fa"
import { GiWaterDrop } from "react-icons/gi";
import { ModifierType } from "../../game-engine/player/creation/creatable";

const elementToSymbolMap = {
  [ElementType.FIRE]: <FaFire style={{marginTop: 5}} color="red" />,
  [ElementType.AIR]: <FaWind color="green" />,
  [ElementType.EARTH]: <FaMountain color="brown" />,
  [ElementType.WATER]: <GiWaterDrop color="blue" />
}

const modifierTypeToOperatorDisplay = {
  [ModifierType.ADDITIVE]: "+",
  [ModifierType.MULTIPLICATIVE]: "x"
}

export default function CreationDisplay() {
  const uiContext = useContext(UiControllerContext)
  const { gameEngine, updateGameEngine } = useContext(GameEngineContext)
  const [selectedCard, setSelectedCard] = useState<CreatableType | null>(null)
  const availableCreatableTypes = gameEngine.player.getAvailableCreatables(gameEngine)
  console.log(availableCreatableTypes)

  return <Stack alignItems={"center"} direction={"column"} spacing={1}>
    {Object.values(availableCreatableTypes).map(creatableType => {
        const creatable = gameEngine.player.creatables[creatableType]
        console.log(creatable)
        return creatable && <Card>
        <CardActionArea
          onClick={() => {
            if (creatableType === selectedCard) {
              gameEngine.player.stopTraining(creatableType)
            } else {
              gameEngine.player.train(creatableType, gameEngine)
            }
            console.log(gameEngine.player.training)
            setSelectedCard(creatableType)
          }}
          data-active={selectedCard === creatableType ? '' : undefined}
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
              <Stack direction={"column"} spacing={1}>
              <Typography variant="h5" component="div">
              {creatable.type} - {creatable.level.toString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {creatable.progress.round().toNumber()} / {creatable.getProgressNeededToLevel().toNumber()}
            </Typography>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                {creatable.modifiers.map(modifier => {
                  return <Stack direction={"row"}>
                    <Typography>{modifierTypeToOperatorDisplay[modifier.type]}</Typography>
                    <Typography>{modifier.amountPerLevel.toNumber()}</Typography>
                    {elementToSymbolMap[modifier.modifiable]}
                  </Stack>
                })}
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    })}
  </Stack>
}