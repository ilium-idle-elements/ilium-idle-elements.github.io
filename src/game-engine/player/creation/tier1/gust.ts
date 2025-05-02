import Decimal from "decimal.js"
import GameEngine from "../../../game-engine"
import { ElementType } from "../../elements/elementType"
import Creatable, { SavedCreatableData } from "../creatable"
import { StarterCreatableTypes } from "../starter/starterCreatableTypes"
import { TIER1_CREATION_AMOUNT, TIER1_CREATION_MUTIPLIER, TIER1_DIFFICULTY_BASE, TIER1_DIFFICULTY_EXPONENT, Tier1CreatableTypes } from "./tier1CreatableTypes"

export const createGustCreatable = (data?: SavedCreatableData) => {
    return new Creatable({
        type: Tier1CreatableTypes.GUST,
        displayName: "Gust",
        difficultyBase: TIER1_DIFFICULTY_BASE,
        difficultyExponent: TIER1_DIFFICULTY_EXPONENT,
        elementType: ElementType.AIR,
        progress: data ? new Decimal(data.progress) : new Decimal(0),
        elementalGains: [
            {
                type: ElementType.AIR,
                amountPerLevel: new Decimal(TIER1_CREATION_AMOUNT)
            }
        ],
        elementalGainMultipliers: [
            {
                type: ElementType.AIR,
                multiplier: new Decimal(TIER1_CREATION_MUTIPLIER)
            }
        ],
        level: data ? new Decimal(data.level) : new Decimal(0)
    })
}

export const getGustProgress = (gameEngine: GameEngine) => {
    return new Decimal(1)
}

export const unlockGust = (gameEngine: GameEngine) => {
    const player = gameEngine.player
    const breezeAmount = player.creatables[StarterCreatableTypes.BREEZE]
    if (breezeAmount && breezeAmount.level.greaterThanOrEqualTo(15)) {
        return Tier1CreatableTypes.GUST
    }

    return null
}