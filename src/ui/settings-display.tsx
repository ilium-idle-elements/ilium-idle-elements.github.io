import { Button, Stack } from "@mui/material";
import { useContext } from "react";
import { GameEngineContext } from "./game-engine-context";

export default function SettingsDisplay() {
  const { gameEngine, updateGameEngine } = useContext(GameEngineContext)

  const pause = () => {
    gameEngine.stopGameLoop()
    updateGameEngine()
  }

  const reset = () => {
    gameEngine.reset()
    updateGameEngine()
  }

  return <Stack>
    <Button onClick={pause}>Pause</Button>
    <Button onClick={reset}>Reset</Button>
  </Stack>
}