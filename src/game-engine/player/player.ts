
import GameEngine from "../game-engine";
import { AllCreatableProgress, AllCreation, CreatableType } from "./creation/creatableType";
import Creatable from "./creation/creatable";
import { StarterCreatableTypes } from "./creation/starter/starterCreatableTypes";

export type PlayerCreatables = {
  [key in CreatableType]?: Creatable
}

const recreateCreatableMap = (creatables: PlayerCreatables) => {
  const output: PlayerCreatables = {}
  Object.values(creatables).forEach(creatable => {
    output[creatable.type] = AllCreation[creatable.type](creatable)
  })

  return output
}

export default class Player {
  creatables: PlayerCreatables
  training: CreatableType[]

  constructor(player?: Player) {
    this.creatables = player ? recreateCreatableMap(player.creatables) : {}
    this.training = player ? player.training : []
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
        creatable.addProgress(progressAmount.times(timeModifier))
      }
    }
  }

  stopTraining(creatableType: CreatableType) {
    this.training.filter(type => {
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