import Decimal from "decimal.js";
import { CreatableType } from "./creatableType";
import { ElementType } from "../elements/elementType";

export enum ModifierType {
    ADDITIVE = "ADDITIVE",
    MULTIPLICATIVE = "MULTIPLICATIVE"
}

export type Modifier = {
    type: ModifierType
    amountPerLevel: Decimal
}

export type SavedCreatableData = {
    progress: Decimal
    level: Decimal
}

export type CreatableData = {
    type: CreatableType
    difficultyBase: number
    difficultyExponent: number
    elementType: ElementType
    progress?: Decimal
    modifiers: Modifier[]
    level?: Decimal
}

export default class Creatable {
    type: CreatableType
    difficultyBase: number
    difficultyExponent: number
    elementType: ElementType
    progress: Decimal
    modifiers: Modifier[]
    level: Decimal

    constructor(data: CreatableData) {
        this.type = data.type
        this.difficultyBase = data.difficultyBase
        this.difficultyExponent = data.difficultyExponent
        this.elementType = data.elementType
        this.progress = data.progress ? new Decimal(data.progress) : new Decimal(0)
        this.modifiers = data.modifiers.map(modifier => {
            return {
                type: modifier.type,
                amountPerLevel: new Decimal(modifier.amountPerLevel)
            }
        })
        this.level = data.level ? new Decimal(data.level) : new Decimal(0)
    }
    
    addProgress(amount: Decimal) {
        this.progress = this.progress.plus(amount)
        this.levelUp()
    }

    getProgressNeededToLevel() {
        return new Decimal(this.level.plus(1).times(this.difficultyBase)).toPower(this.difficultyExponent).round()
    }

    canLevelUp() {
        return this.progress.greaterThanOrEqualTo(this.getProgressNeededToLevel())
    }

    levelUp() {
        if (this.canLevelUp()) {
            this.level = this.level.plus(1)
            this.progress = new Decimal(0)
        }
    }
}