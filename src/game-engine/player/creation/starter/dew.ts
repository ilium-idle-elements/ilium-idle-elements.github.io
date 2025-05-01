import Decimal from "decimal.js"
import { ElementType } from "../../elements/elementType"
import Creatable, { SavedCreatableData } from "../creatable"
import { STARTER_DIFFICULTY_BASE, STARTER_DIFFICULTY_EXPONENT, StarterCreatableTypes } from "./starterCreatableTypes"
import GameEngine from "../../../game-engine"

export const createDewCreatable = (data?: SavedCreatableData) => {
    return new Creatable({
        type: StarterCreatableTypes.DEW,
        displayName: "Dew",
        difficultyBase: STARTER_DIFFICULTY_BASE,
        difficultyExponent: STARTER_DIFFICULTY_EXPONENT,
        elementType: ElementType.WATER,
        progress: data ? new Decimal(data.progress) : new Decimal(0),
        elementalGains: [
            {
                type: ElementType.WATER,
                amountPerLevel: new Decimal(1)
            }
        ],
        level: data ? new Decimal(data.level) : new Decimal(0)
    })
}

export const getDewProgress = (gameEngine: GameEngine) => {
    return new Decimal(1)
}