import GameEngine from "../../game-engine";
import { AllPrestigeUpgrades } from "./allPrestigeUpgrades";
import { AllPrestigeUpgradeUnlocks } from "./allPrestigeUpgradeUnlocks";
import { PrestigeUpgradeType } from "./prestigeUpgradeType";

export default class Prestige {
  count: number;
  points: number;
  totalPointsGained: number;
  upgrades: { [key in PrestigeUpgradeType]?: number };

  constructor(data?: Prestige) {
    this.points = data?.points ?? 0;
    this.totalPointsGained = data?.totalPointsGained ?? 0;
    this.upgrades = data?.upgrades ?? {};
    this.count = data?.count ?? 0;
  }

  getUpgradeCost(upgradeType: PrestigeUpgradeType) {
    return AllPrestigeUpgrades[upgradeType].cost * Math.pow(AllPrestigeUpgrades[upgradeType].levelMultiplier, this.upgrades[upgradeType] || 0);
  }

  canAffordUpgrade(upgradeType: PrestigeUpgradeType) {
    return this.points >= this.getUpgradeCost(upgradeType) && (this.upgrades[upgradeType] || 0) < AllPrestigeUpgrades[upgradeType].max;
  }

  buyUpgrade(upgradeType: PrestigeUpgradeType) {
    if (this.canAffordUpgrade(upgradeType)) {
      this.points -= this.getUpgradeCost(upgradeType);
      this.upgrades[upgradeType] = (this.upgrades[upgradeType] || 0) + 1;
    }
  }

  getAvailableUpgrades(gameEngine: GameEngine) {
    const availableUpgrades = [];
    for (const unlockFunction of AllPrestigeUpgradeUnlocks) {
      const upgradeTypes = unlockFunction(gameEngine);
      for (const upgradeType of upgradeTypes) {
        const upgrade = AllPrestigeUpgrades[upgradeType];
        availableUpgrades.push(upgrade);
      }
    }

    return availableUpgrades

  }

  canPrestige(gameEngine: GameEngine) {
    return gameEngine.player.contracts.completionCount > 0;
  }

  prestige(gameEngine: GameEngine) {
    if (this.canPrestige(gameEngine)) {
      const pointsToAdd = gameEngine.player.contracts.completionCount;
      this.points += pointsToAdd;
      this.totalPointsGained += pointsToAdd;
      this.count += 1;
      gameEngine.player.prestigeReset();
    }
  }

  // Add methods related to prestige functionality here
}
