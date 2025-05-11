import GameEngine from "../game-engine/game-engine"
import { ElementType } from "../game-engine/player/elements/elementType"

export const prestigeUnlocked = (gameEngine: GameEngine) => {
    return (gameEngine.player.elements[ElementType.AIR]?.greaterThanOrEqualTo(50) &&
        gameEngine.player.elements[ElementType.EARTH]?.greaterThanOrEqualTo(50) &&
        gameEngine.player.elements[ElementType.FIRE]?.greaterThanOrEqualTo(50) &&
        gameEngine.player.elements[ElementType.WATER]?.greaterThanOrEqualTo(50)) ||
        gameEngine.player.contracts.completionCount >= 1 ||
        gameEngine.player.prestige.count >= 1
}