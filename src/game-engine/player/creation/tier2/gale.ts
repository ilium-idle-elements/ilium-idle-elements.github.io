import Decimal from "decimal.js";
import GameEngine from "../../../game-engine";
import { ElementType } from "../../elements/elementType";
import Creatable, { SavedCreatableData } from "../creatable";
import { StarterCreatableTypes } from "../starter/starterCreatableTypes";
import {
  TIER2_CREATION_MUTIPLIER,
  TIER2_DIFFICULTY_BASE,
  TIER2_DIFFICULTY_EXPONENT,
  Tier2CreatableTypes,
} from "./tier2CreatableTypes";

export const createGaleCreatable = (data?: SavedCreatableData) => {
  return new Creatable({
    type: Tier2CreatableTypes.GALE,
    displayName: "Gale",
    difficultyBase: TIER2_DIFFICULTY_BASE,
    difficultyExponent: TIER2_DIFFICULTY_EXPONENT,
    elementType: ElementType.AIR,
    progress: data ? new Decimal(data.progress) : new Decimal(0),
    elementalGains: [],
    elementalGainMultipliers: [
      {
        type: ElementType.AIR,
        multiplier: new Decimal(TIER2_CREATION_MUTIPLIER),
      },
    ],
    level: data ? new Decimal(data.level) : new Decimal(0),
  });
};

export const getGaleProgress = (gameEngine: GameEngine) => {
  return new Decimal(1);
};

export const unlockGale = (gameEngine: GameEngine) => {
  const player = gameEngine.player;
  const breezeAmount = player.creatables[StarterCreatableTypes.BREEZE];
  if (breezeAmount && breezeAmount.level.greaterThanOrEqualTo(40)) {
    return Tier2CreatableTypes.GALE;
  }

  return null;
};
