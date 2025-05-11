import Decimal from "decimal.js";
import GameEngine from "../../game-engine";
import { ElementType } from "../elements/elementType";
import { CreatableType } from "./creatableType";

export type ElementalGain = {
    type: ElementType
    amountPerLevel: Decimal
}

export type ElementalGainMultiplier = {
    type: ElementType
    multiplier: Decimal
}

export type SavedCreatableData = {
    progress: Decimal
    level: Decimal
}

export type CreatableData = {
    type: CreatableType
    displayName: string
    difficultyBase: number
    difficultyExponent: number
    elementType: ElementType
    progress?: Decimal
    elementalGains?: ElementalGain[]
    elementalGainMultipliers?: ElementalGainMultiplier[]
    level?: Decimal
}

export default class Creatable {
    type: CreatableType
    displayName: string
    difficultyBase: number
    difficultyExponent: number
    elementType: ElementType
    progress: Decimal
    elementalGains: ElementalGain[]
    elementalGainMultipliers: ElementalGainMultiplier[]
    level: Decimal

    constructor(data: CreatableData) {
        this.type = data.type
        this.displayName = data.displayName
        this.difficultyBase = data.difficultyBase
        this.difficultyExponent = data.difficultyExponent
        this.elementType = data.elementType
        this.progress = data.progress ? new Decimal(data.progress) : new Decimal(0)
        this.elementalGains = data.elementalGains ? data.elementalGains.map(elementalGain => {
            return {
                type: elementalGain.type,
                amountPerLevel: new Decimal(elementalGain.amountPerLevel),
            }
        }) : []
        this.elementalGainMultipliers = data.elementalGainMultipliers ? data.elementalGainMultipliers.map(elementalGainMultiplier => {
            return {
                type: elementalGainMultiplier.type,
                multiplier: new Decimal(elementalGainMultiplier.multiplier),
            }
        }) : []
        this.level = data.level ? new Decimal(data.level) : new Decimal(0)
    }

    addProgress(amount: Decimal, gameEngine: GameEngine) {
        this.progress = this.progress.plus(amount)
        while (this.levelUp(gameEngine)) { }
    }

    getProgressNeededToLevel() {
        const scalingIncrease = this.level.div(100).plus(1)
        const exponentialScaling = scalingIncrease.times(this.difficultyExponent)
        return new Decimal(this.difficultyBase).times(this.level.plus(1)).toPower(exponentialScaling).round()
    }

    canLevelUp() {
        return this.progress.greaterThanOrEqualTo(this.getProgressNeededToLevel())
    }

    levelUp(gameEngine: GameEngine) {
        if (this.canLevelUp()) {
            this.progress = this.progress.minus(this.getProgressNeededToLevel())
            this.level = this.level.plus(1)
            this.elementalGains.forEach(elementalGain => {
                gameEngine.player.addElement(elementalGain.type, elementalGain.amountPerLevel)
            })
            return true
        }

        return false
    }
}