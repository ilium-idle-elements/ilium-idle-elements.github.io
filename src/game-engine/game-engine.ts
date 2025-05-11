import Player from "./player/player";

export default class GameEngine {
  gameLoop: NodeJS.Timer | undefined
  player: Player
  updateDisplay?: Function

  constructor(gameEngine?: GameEngine) {
    this.gameLoop = undefined
    this.player = gameEngine ? new Player(gameEngine.player) : new Player()
    this.startGameLoop()
  }

  addUpdateFunction(updateDisplay: Function) {
    this.updateDisplay = updateDisplay
  }

  startGameLoop() {
    this.gameLoop = setInterval(() => {
      performGameLoop(this)
      if (this.updateDisplay) {
        this.updateDisplay()
      }
    }, 1000)
  }

  stopGameLoop() {
    clearInterval(this.gameLoop)
  }

  reset() {
    this.stopGameLoop()
    this.player = new Player()
    this.startGameLoop()
  }
}

function performGameLoop(gameEngine: GameEngine) {
  Object.values(gameEngine.player.getAvailableCreatables(gameEngine)).forEach(creationType => {
    gameEngine.player.addNewCreatable(creationType)
  })
  gameEngine.player.gainProgress(1, gameEngine)
  gameEngine.player.contracts.completeContract(gameEngine)
}