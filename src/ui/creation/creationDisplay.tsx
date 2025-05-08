import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { FaFire, FaMountain, FaWind } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";
import { SiElement } from "react-icons/si";
import { ElementType } from "../../game-engine/player/elements/elementType";
import { GameEngineContext } from "../game-engine-context";
import { UiControllerContext } from "../ui-controller-context";

const CREATABLES_PER_PAGE = 6;

export const elementToColorMap = {
  [ElementType.FIRE]: "red",
  [ElementType.AIR]: "green",
  [ElementType.EARTH]: "brown",
  [ElementType.WATER]: "blue",
};

export const elementToSymbolMap = {
  [ElementType.FIRE]: <FaFire color={elementToColorMap[ElementType.FIRE]} />,
  [ElementType.AIR]: <FaWind color={elementToColorMap[ElementType.AIR]} />,
  [ElementType.EARTH]: (
    <FaMountain color={elementToColorMap[ElementType.EARTH]} />
  ),
  [ElementType.WATER]: (
    <GiWaterDrop color={elementToColorMap[ElementType.WATER]} />
  ),
};

export default function CreationDisplay() {
  const uiContext = useContext(UiControllerContext);
  const { gameEngine, updateGameEngine } = useContext(GameEngineContext);
  const training = gameEngine.player.training;
  const availableCreatableTypes =
    gameEngine.player.getAvailableCreatables(gameEngine);
  const pageCount = Math.ceil(
    availableCreatableTypes.length / CREATABLES_PER_PAGE
  );
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * CREATABLES_PER_PAGE;
  const endIndex = currentPage * CREATABLES_PER_PAGE;
  const visibleCreatableTypes = availableCreatableTypes.slice(
    startIndex,
    endIndex
  );

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: 5,
        paddingTop: 5,
      }}
    >
      <Box
        style={{
          whiteSpace: "nowrap",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          marginBottom: 10,
          alignItems: "center",
          zIndex: 1,
          paddingTop: "8px",
          paddingLeft: "8px",
          paddingBottom: "8px",
          backgroundColor: "black",
        }}
      >
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((index) => {
          const startIndex = (index - 1) * CREATABLES_PER_PAGE;
          const endIndex = index * CREATABLES_PER_PAGE;
          const visibleCreatablesForThisPage = availableCreatableTypes.slice(
            startIndex,
            endIndex
          );
          const clickHandler = () => {
            setCurrentPage(index);
          };
          return (
            <Button
              variant={currentPage === index ? "contained" : "outlined"}
              onClick={clickHandler}
              style={{ borderRadius: "8px", marginRight: 5 }}
              size={"small"}
              key={index}
            >
              {index}
              {training.some((item) =>
                visibleCreatablesForThisPage.includes(item)
              ) ? (
                <SiElement />
              ) : null}
            </Button>
          );
        })}
      </Box>
      <Box
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginTop: "48px",
          marginBottom: "116px",
        }}
      >
        <Stack direction={"column"} spacing={1}>
          {visibleCreatableTypes.map((creatableType) => {
            const creatable = gameEngine.player.creatables[creatableType];
            return (
              creatable && (
                <Card key={creatable.type}>
                  <CardActionArea
                    onClick={() => {
                      if (training.includes(creatableType)) {
                        gameEngine.player.stopTraining(creatableType);
                      } else {
                        gameEngine.player.train(creatableType, gameEngine);
                      }
                    }}
                    data-active={
                      training.includes(creatableType) ? "" : undefined
                    }
                    sx={{
                      height: "100%",
                      "&[data-active]": {
                        backgroundColor: "action.selected",
                        "&:hover": {
                          backgroundColor: "action.selectedHover",
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ height: "100%" }}>
                      <Stack direction={"row"} spacing={1}>
                        <Typography
                          variant="h3"
                          component="div"
                          style={{
                            backgroundColor:
                              elementToColorMap[creatable.elementType],
                            padding: "5px",
                          }}
                        >
                          {creatable.level.toString()}
                        </Typography>
                        <Stack direction={"column"} spacing={1}>
                          <Typography variant="h6" component="div">
                            {creatable.displayName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {creatable.progress.round().toNumber()} /{" "}
                            {creatable.getProgressNeededToLevel().toNumber()}
                          </Typography>
                        </Stack>
                        <Stack direction={"column"} spacing={1}>
                          {creatable.elementalGains.map((elementalGain) => {
                            return (
                              <Stack
                                direction={"row"}
                                style={{ alignItems: "center" }}
                                key={elementalGain.type + "-gain"}
                              >
                                <Typography>
                                  +{elementalGain.amountPerLevel.toNumber()}
                                </Typography>
                                {elementToSymbolMap[elementalGain.type]}
                              </Stack>
                            );
                          })}
                          {creatable.elementalGainMultipliers.map(
                            (elementalGainMultiplier) => {
                              return (
                                <Stack
                                  direction={"row"}
                                  style={{ alignItems: "center" }}
                                  key={
                                    elementalGainMultiplier.type + "-multiplier"
                                  }
                                >
                                  <Typography>
                                    +
                                    {elementalGainMultiplier.multiplier.toNumber()}
                                    %
                                  </Typography>
                                  {
                                    elementToSymbolMap[
                                      elementalGainMultiplier.type
                                    ]
                                  }
                                </Stack>
                              );
                            }
                          )}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
}
