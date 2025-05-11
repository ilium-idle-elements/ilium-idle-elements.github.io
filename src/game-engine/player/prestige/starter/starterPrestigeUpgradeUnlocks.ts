import GameEngine from "../../../game-engine";
import { AllStarterPrestigeTypes } from "./allStarterPrestigeTypes";

export const unlockStarterPrestige = (gameEngine: GameEngine) => {
    if (gameEngine.player.contracts.completionCount >= 1 || gameEngine.player.prestige.count >= 1) {
        return [AllStarterPrestigeTypes.ALL_ELEMENTAL_BOOST, AllStarterPrestigeTypes.FIRE_BOOST, AllStarterPrestigeTypes.WATER_BOOST, AllStarterPrestigeTypes.AIR_BOOST, AllStarterPrestigeTypes.EARTH_BOOST];
    }

    return []
}