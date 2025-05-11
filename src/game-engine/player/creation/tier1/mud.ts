import Decimal from "decimal.js"
import GameEngine from "../../../game-engine"
import { ElementType } from "../../elements/elementType"
import Creatable, { SavedCreatableData } from "../creatable"
import { StarterCreatableTypes } from "../starter/starterCreatableTypes"
import { TIER1_CREATION_AMOUNT, TIER1_CREATION_MUTIPLIER, TIER1_DIFFICULTY_BASE, TIER1_DIFFICULTY_EXPONENT, Tier1CreatableTypes } from "./tier1CreatableTypes"

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
                amountPerLevel: new Decimal(TIER1_CREATION_AMOUNT)
            }
        ],
        elementalGainMultipliers: [
            {
                type: ElementType.EARTH,
                multiplier: new Decimal(TIER1_CREATION_MUTIPLIER)
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
    if (clayAmount && clayAmount.level.greaterThanOrEqualTo(8) &&
        dewAmount && dewAmount.level.greaterThanOrEqualTo(4)) {
        return Tier1CreatableTypes.MUD
    }

    return null
}