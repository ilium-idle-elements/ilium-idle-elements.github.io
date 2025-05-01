import Decimal from "decimal.js"
import { ElementType } from "../../elements/elementType"
import Creatable, { SavedCreatableData } from "../creatable"
import GameEngine from "../../../game-engine"
import { TIER1_DIFFICULTY_BASE, TIER1_DIFFICULTY_EXPONENT, Tier1CreatableTypes } from "./tier1CreatableTypes"
import { StarterCreatableTypes } from "../starter/starterCreatableTypes"

export const createMudCreatable = (data?: SavedCreatableData) => {
    return new Creatable({
        type: Tier1CreatableTypes.MUD,
        displayName: "Mud",
        difficultyBase: TIER1_DIFFICULTY_BASE,
        difficultyExponent: TIER1_DIFFICULTY_EXPONENT,
        elementType: ElementType.EARTH,
        progress: data ? new Decimal(data.progress) : new Decimal(0),
        elementalGains: [
            {
                type: ElementType.EARTH,
                amountPerLevel: new Decimal(1)
            }
        ],
        elementalGainMultipliers: [
            {
                type: ElementType.EARTH,
                multiplier: new Decimal(5)
            }
        ],
        level: data ? new Decimal(data.level) : new Decimal(0)
    })
}

export const getMudProgress = (gameEngine: GameEngine) => {
    return new Decimal(1)
}

export const unlockMud = (gameEngine: GameEngine) => {
    const player = gameEngine.player
    const clayAmount = player.creatables[StarterCreatableTypes.CLAY]
    const dewAmount = player.creatables[StarterCreatableTypes.DEW]
    if (clayAmount && clayAmount.level.greaterThanOrEqualTo(10) && 
        dewAmount && dewAmount.level.greaterThanOrEqualTo(5)) {
            return Tier1CreatableTypes.MUD
    }

    return null
}