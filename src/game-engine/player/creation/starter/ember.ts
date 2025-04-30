import Decimal from "decimal.js"
import { ElementType } from "../../elements/elementType"
import Creatable, { SavedCreatableData } from "../creatable"
import { StarterCreatableTypes } from "./starterCreatableTypes"
import GameEngine from "../../../game-engine"

export const createEmberCreatable = (data?: SavedCreatableData) => {
    return new Creatable({
        type: StarterCreatableTypes.EMBER,
        displayName: "Ember",
        difficultyBase: 5,
        difficultyExponent: 1.1,
        elementType: ElementType.FIRE,
        progress: data ? new Decimal(data.progress) : new Decimal(0),
        elementalGains: [
            {
                type: ElementType.FIRE,
                amountPerLevel: new Decimal(1)
            }
        ],
        level: data ? new Decimal(data.level) : new Decimal(0)
    })
}

export const getEmberProgress = (gameEngine: GameEngine) => {
    return new Decimal(1)
}