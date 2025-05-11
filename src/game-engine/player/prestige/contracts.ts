import Decimal from "decimal.js"
import GameEngine from "../../game-engine"
import { ElementType } from "../elements/elementType"

export type ElementAmounts = {
    [key in ElementType]: Decimal
}

export type ContractsData = {
    completionCount: number,
    elementAmounts: ElementAmounts
}

const randomModifiers = () => {
    while (true) {
        // Generate 3 random numbers between -1 and 1
        // Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
        // Multiplying by 2 gives a range of 0 to 2
        // Subtracting 1 gives a range of -1 to 1
        const r1 = Math.random() * 2 - 1;
        const r2 = Math.random() * 2 - 1;
        const r3 = Math.random() * 2 - 1;

        // Calculate the potential fourth number
        const r4Potential = -(r1 + r2 + r3);

        // Check if the potential fourth number is also within the range [-1, 1]
        if (r4Potential >= -1 && r4Potential <= 1) {
            // Return the numbers if the fourth is within range
            return [r1 + 1, r2 + 1, r3 + 1, r4Potential + 1];
        }
    }
}

export class Contracts {
    completionCount: number
    elementAmounts: ElementAmounts
    constructor(data?: ContractsData) {
        this.completionCount = data?.completionCount ?? 0
        this.elementAmounts = {
            [ElementType.AIR]: new Decimal(data?.elementAmounts[ElementType.AIR] || 100),
            [ElementType.EARTH]: new Decimal(data?.elementAmounts[ElementType.EARTH] || 100),
            [ElementType.FIRE]: new Decimal(data?.elementAmounts[ElementType.FIRE] || 100),
            [ElementType.WATER]: new Decimal(data?.elementAmounts[ElementType.WATER] || 100)
        }
    }

    canCompleteContract(gameEngine: GameEngine) {
        return gameEngine.player.elements[ElementType.AIR]?.greaterThanOrEqualTo(this.elementAmounts[ElementType.AIR]) &&
            gameEngine.player.elements[ElementType.EARTH]?.greaterThanOrEqualTo(this.elementAmounts[ElementType.EARTH]) &&
            gameEngine.player.elements[ElementType.FIRE]?.greaterThanOrEqualTo(this.elementAmounts[ElementType.FIRE]) &&
            gameEngine.player.elements[ElementType.WATER]?.greaterThanOrEqualTo(this.elementAmounts[ElementType.WATER])
    }

    completeContract(gameEngine: GameEngine) {
        if (this.canCompleteContract(gameEngine)) {
            gameEngine.player.removeElement(ElementType.AIR, this.elementAmounts[ElementType.AIR])
            gameEngine.player.removeElement(ElementType.EARTH, this.elementAmounts[ElementType.EARTH])
            gameEngine.player.removeElement(ElementType.FIRE, this.elementAmounts[ElementType.FIRE])
            gameEngine.player.removeElement(ElementType.WATER, this.elementAmounts[ElementType.WATER])
            this.completionCount += 1
            this.setElementAmounts()
        }
    }

    setElementAmounts() {
        const newRandomModifiers = randomModifiers()

        const airAmount = new Decimal(100).times(this.completionCount + 1).pow(1.2).times(newRandomModifiers[0])
        const earthAmount = new Decimal(100).times(this.completionCount + 1).pow(1.2).times(newRandomModifiers[1])
        const fireAmount = new Decimal(100).times(this.completionCount + 1).pow(1.2).times(newRandomModifiers[2])
        const waterAmount = new Decimal(100).times(this.completionCount + 1).pow(1.2).times(newRandomModifiers[3])

        this.elementAmounts = {
            [ElementType.AIR]: airAmount,
            [ElementType.EARTH]: earthAmount,
            [ElementType.FIRE]: fireAmount,
            [ElementType.WATER]: waterAmount
        }
    }
}