
import GameEngine from "../game-engine";
import { AllCreatableProgress, AllCreation, CreatableType } from "./creation/creatableType";
import Creatable from "./creation/creatable";
import { StarterCreatableTypes } from "./creation/starter/starterCreatableTypes";
import { Modifier } from "typescript";
import Decimal from "decimal.js";
import { amber } from "@mui/material/colors";
import { ElementType } from "./elements/elementType";

export type PlayerCreatables = {
  [key in CreatableType]?: Creatable
}

export type PlayerElements = {
  [key in ElementType]?: Decimal
}

const recreateCreatableMap = (creatables: PlayerCreatables) => {
  const output: PlayerCreatables = {}
  Object.values(creatables).forEach(creatable => {
    output[creatable.type] = AllCreation[creatable.type](creatable)
  })

  return output
}

const recreateElementMap = (elements: PlayerElements) => {
  const output: PlayerElements = {}
  Object.entries(elements).forEach(([element, amount]) => {
    output[element as ElementType] = new Decimal(amount)
  })

  return output
}

export default class Player {
  creatables: PlayerCreatables
  elements: PlayerElements
  training: CreatableType[]

  constructor(player?: Player) {
    this.creatables = player ? recreateCreatableMap(player.creatables) : {}
    this.elements = player ? recreateElementMap(player.elements) : {}
    this.training = player ? player.training : []
  }

  getElementMultiplier(element: ElementType) {
    let multiplier = new Decimal(1)
    for (const creatable of Object.values(this.creatables)) {
      let currentMultiplier = new Decimal(1)
      for (const elementalMultiplier of creatable.elementalGainMultipliers) {
        if (elementalMultiplier.type === element) {
          currentMultiplier = currentMultiplier.plus(elementalMultiplier.multiplier.times(creatable.level).div(100))
        }
      }
      multiplier = multiplier.times(currentMultiplier)
    }

    return multiplier
  }

  addElement(element: ElementType, amount: Decimal) {
    const elementAmount = this.elements[element]
    if (elementAmount) {
      this.elements[element] = elementAmount.plus(amount)
    } else {
      this.elements[element] = new Decimal(amount)
    }
  }

  getCreatable(creatableType: CreatableType) {
    return this.creatables[creatableType]
  }

  addNewCreatable(creatableType: CreatableType) {
    if (!this.getCreatable(creatableType)) {
      this.creatables[creatableType] = AllCreation[creatableType]()
    }
  }

  getAvailableCreatables(gameEngine: GameEngine) {
    return StarterCreatableTypes
  }

  prestigeReset() {
  }

  gainProgress(timeModifier: number, gameEngine: GameEngine) {
    for (const creatableType of this.training) {
      const creatable = this.creatables[creatableType]
      if (creatable) {
        const progressAmount = AllCreatableProgress[creatableType](gameEngine)
        creatable.addProgress(progressAmount.times(timeModifier), gameEngine)
      }
    }
  }

  stopTraining(creatableType: CreatableType) {
    this.training = this.training.filter(type => {
      return type !== creatableType
    })
  }

  train(creatableType: CreatableType, gameEngine: GameEngine) {
    if (this.creatables[creatableType]) {
      if (this.training.length < this.getTrainingMax(gameEngine) && !this.training.includes(creatableType)) {
        this.training.push(creatableType)
      }
    }
  }

  getTrainingMax(gameEngine: GameEngine) {
    return 1
  }
}