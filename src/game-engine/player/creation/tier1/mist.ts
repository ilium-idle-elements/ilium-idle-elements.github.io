import Decimal from "decimal.js"
import GameEngine from "../../../game-engine"
import { ElementType } from "../../elements/elementType"
import Creatable, { SavedCreatableData } from "../creatable"
import { StarterCreatableTypes } from "../starter/starterCreatableTypes"
import { TIER1_CREATION_AMOUNT, TIER1_CREATION_MUTIPLIER, TIER1_DIFFICULTY_BASE, TIER1_DIFFICULTY_EXPONENT, Tier1CreatableTypes } from "./tier1CreatableTypes"

export const createMistCreatable = (data?: SavedCreatableData) => {
    return new Creatable({
        type: Tier1CreatableTypes.MIST,
        displayName: "Mist",
        difficultyBase: TIER1_DIFFICULTY_BASE,
        difficultyExponent: TIER1_DIFFICULTY_EXPONENT,
        elementType: ElementType.WATER,
        progress: data ? new Decimal(data.progress) : new Decimal(0),
        elementalGains: [
            {
                type: ElementType.WATER,
                amountPerLevel: new Decimal(TIER1_CREATION_AMOUNT)
            }
        ],
        elementalGainMultipliers: [
            {
                type: ElementType.WATER,
                multiplier: new Decimal(TIER1_CREATION_MUTIPLIER)
            }
        ],
        level: data ? new Decimal(data.level) : new Decimal(0)
    })
}

export const getMistProgress = (gameEngine: GameEngine) => {
    return new Decimal(1)
}

export const unlockMist = (gameEngine: GameEngine) => {
    const player = gameEngine.player
    const dewAmount = player.creatables[StarterCreatableTypes.DEW]
    const breezeAmount = player.creatables[StarterCreatableTypes.BREEZE]
    if (dewAmount && dewAmount.level.greaterThanOrEqualTo(10) &&
        breezeAmount && breezeAmount.level.greaterThanOrEqualTo(5)) {
        return Tier1CreatableTypes.MIST
    }

    return null
}