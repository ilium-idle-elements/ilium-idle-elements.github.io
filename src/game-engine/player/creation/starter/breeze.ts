import Decimal from "decimal.js"
import GameEngine from "../../../game-engine"
import { ElementType } from "../../elements/elementType"
import Creatable, { SavedCreatableData } from "../creatable"
import { STARTER_DIFFICULTY_BASE, STARTER_DIFFICULTY_EXPONENT, STARTER_PROGRESS, StarterCreatableTypes } from "./starterCreatableTypes"

export const createBreezeCreatable = (data?: SavedCreatableData) => {
    return new Creatable({
        type: StarterCreatableTypes.BREEZE,
        displayName: "Breeze",
        difficultyBase: STARTER_DIFFICULTY_BASE,
        difficultyExponent: STARTER_DIFFICULTY_EXPONENT,
        elementType: ElementType.AIR,
        progress: data ? new Decimal(data.progress) : new Decimal(0),
        elementalGains: [
            {
                type: ElementType.AIR,
                amountPerLevel: new Decimal(1)
            }
        ],
        level: data ? new Decimal(data.level) : new Decimal(0)
    })
}

export const getBreezeProgress = (gameEngine: GameEngine) => {
    return new Decimal(STARTER_PROGRESS)
}