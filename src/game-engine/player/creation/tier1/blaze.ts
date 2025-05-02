import Decimal from "decimal.js"
import GameEngine from "../../../game-engine"
import { ElementType } from "../../elements/elementType"
import Creatable, { SavedCreatableData } from "../creatable"
import { StarterCreatableTypes } from "../starter/starterCreatableTypes"
import { TIER1_CREATION_AMOUNT, TIER1_CREATION_MUTIPLIER, TIER1_DIFFICULTY_BASE, TIER1_DIFFICULTY_EXPONENT, Tier1CreatableTypes } from "./tier1CreatableTypes"

export const createBlazeCreatable = (data?: SavedCreatableData) => {
    return new Creatable({
        type: Tier1CreatableTypes.BLAZE,
        displayName: "Blaze",
        difficultyBase: TIER1_DIFFICULTY_BASE,
        difficultyExponent: TIER1_DIFFICULTY_EXPONENT,
        elementType: ElementType.FIRE,
        progress: data ? new Decimal(data.progress) : new Decimal(0),
        elementalGains: [
            {
                type: ElementType.FIRE,
                amountPerLevel: new Decimal(TIER1_CREATION_AMOUNT)
            }
        ],
        elementalGainMultipliers: [
            {
                type: ElementType.FIRE,
                multiplier: new Decimal(TIER1_CREATION_MUTIPLIER)
            }
        ],
        level: data ? new Decimal(data.level) : new Decimal(0)
    })
}

export const getBlazeProgress = (gameEngine: GameEngine) => {
    return new Decimal(1)
}

export const unlockBlaze = (gameEngine: GameEngine) => {
    const player = gameEngine.player
    const emberAmount = player.creatables[StarterCreatableTypes.EMBER]
    const breezeAmount = player.creatables[StarterCreatableTypes.BREEZE]
    if (emberAmount && emberAmount.level.greaterThanOrEqualTo(10) &&
        breezeAmount && breezeAmount.level.greaterThanOrEqualTo(5)) {
        return Tier1CreatableTypes.BLAZE
    }

    return null
}