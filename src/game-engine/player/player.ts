
import Decimal from "decimal.js";
import GameEngine from "../game-engine";
import Creatable from "./creation/creatable";
import { AllCreatableProgress, AllCreatableUnlocks, AllCreation, CreatableType } from "./creation/creatableType";
import { StarterCreatableTypes } from "./creation/starter/starterCreatableTypes";
import { ElementType } from "./elements/elementType";
import { AllPrestigeUpgrades } from "./prestige/allPrestigeUpgrades";
import { Contracts } from "./prestige/contracts";
import Prestige from "./prestige/prestige";
import { PrestigeUpgradeType } from "./prestige/prestigeUpgradeType";

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
  contracts: Contracts
  prestige: Prestige

  constructor(player?: Player) {
    this.creatables = player ? recreateCreatableMap(player.creatables) : {}
    this.elements = player ? recreateElementMap(player.elements) : {}
    this.training = player ? player.training : []
    this.contracts = player ? new Contracts(player.contracts) : new Contracts()
    this.prestige = player ? new Prestige(player.prestige) : new Prestige()
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

    for (const [prestigeUpgradeType, level] of Object.entries(this.prestige.upgrades)) {
      const prestigeUpgrade = AllPrestigeUpgrades[prestigeUpgradeType as PrestigeUpgradeType]
      let prestigeMultiplier = new Decimal(1)
      if (prestigeUpgrade.elementalMultipliers) {
        for (const prestigeElementalMultiplier of prestigeUpgrade.elementalMultipliers) {
          if (prestigeElementalMultiplier.type === element) {
            prestigeMultiplier = prestigeMultiplier.plus(prestigeElementalMultiplier.multiplier * level)
          }
        }
      }
      multiplier = multiplier.times(prestigeMultiplier)
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

  removeElement(element: ElementType, amount: Decimal) {
    const elementAmount = this.elements[element]
    if (elementAmount && elementAmount.greaterThanOrEqualTo(amount)) {
      this.elements[element] = elementAmount.minus(amount)
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
    const availableCreatables: CreatableType[] = Object.values(StarterCreatableTypes)
    Object.entries(AllCreatableUnlocks).forEach(([elementType, unlockFunction]) => {
      const typeToAdd = unlockFunction(gameEngine)
      if (typeToAdd) {
        availableCreatables.push(typeToAdd as CreatableType)
      }
    })
    return availableCreatables
  }

  prestigeReset() {
    this.creatables = {}
    this.elements = {}
    this.training = []
    this.contracts = new Contracts()
  }

  gainProgress(timeModifier: number, gameEngine: GameEngine) {
    for (const creatableType of this.training) {
      const creatable = this.creatables[creatableType]
      if (creatable) {
        const progressAmount = AllCreatableProgress[creatableType](gameEngine)
        const elementMultiplier = this.getElementMultiplier(creatable.elementType)
        creatable.addProgress(progressAmount.times(elementMultiplier).times(timeModifier), gameEngine)
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