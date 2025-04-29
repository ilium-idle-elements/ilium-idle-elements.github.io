import Decimal from 'decimal.js';
import React, { createContext, useState } from 'react';
import GameEngine from '../game-engine/game-engine';

export const GAME_STORAGE_KEY_NAME = "ilium-idle-elements"

Decimal.set({ toExpPos: 3 })

let gameEngine = new GameEngine()
try {
  gameEngine = localStorage[GAME_STORAGE_KEY_NAME] ? new GameEngine(JSON.parse(localStorage[GAME_STORAGE_KEY_NAME])) : new GameEngine()
} catch (e) {
  gameEngine = new GameEngine()
}

export type GameEngineContextProps = {
  gameEngine: GameEngine
  updateGameEngine: Function
}

export const GameEngineContext = createContext<GameEngineContextProps>({
  gameEngine: gameEngine,
  updateGameEngine: () => { }
});

export function GameEngineProvider({ children }: { children: React.ReactNode }) {
  const [gameEngineState, setGameEngineState] = useState({
    gameEngine: gameEngine,
    lastTimestamp: Date.now()
  })

  const fullContext = {
    gameEngine: gameEngineState.gameEngine,
    updateGameEngine: () => {
      localStorage[GAME_STORAGE_KEY_NAME] = JSON.stringify(gameEngineState.gameEngine)
      setGameEngineState({
        lastTimestamp: Date.now(),
        gameEngine: gameEngineState.gameEngine
      })
    }
  }

  fullContext.gameEngine.addUpdateFunction(fullContext.updateGameEngine)

  return <GameEngineContext.Provider value={fullContext}>
    {children}
  </GameEngineContext.Provider>
}