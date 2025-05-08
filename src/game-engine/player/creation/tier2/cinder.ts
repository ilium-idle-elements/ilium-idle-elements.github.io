import Decimal from "decimal.js";
import GameEngine from "../../../game-engine";
import { ElementType } from "../../elements/elementType";
import Creatable, { SavedCreatableData } from "../creatable";
import { StarterCreatableTypes } from "../starter/starterCreatableTypes";
import { Tier1CreatableTypes } from "../tier1/tier1CreatableTypes";
import {
  TIER2_CREATION_MUTIPLIER,
  TIER2_DIFFICULTY_BASE,
  TIER2_DIFFICULTY_EXPONENT,
  Tier2CreatableTypes,
} from "./tier2CreatableTypes";

export const createCinderCreatable = (data?: SavedCreatableData) => {
  return new Creatable({
    type: Tier2CreatableTypes.CINDER,
    displayName: "Cinder",
    difficultyBase: TIER2_DIFFICULTY_BASE,
    difficultyExponent: TIER2_DIFFICULTY_EXPONENT,
    elementType: ElementType.FIRE,
    progress: data ? new Decimal(data.progress) : new Decimal(0),
    elementalGains: [],
    elementalGainMultipliers: [
      {
        type: ElementType.FIRE,
        multiplier: new Decimal(TIER2_CREATION_MUTIPLIER),
      },
    ],
    level: data ? new Decimal(data.level) : new Decimal(0),
  });
};

export const getCinderProgress = (gameEngine: GameEngine) => {
  return new Decimal(1);
};

export const unlockCinder = (gameEngine: GameEngine) => {
  const player = gameEngine.player;
  const emberAmount = player.creatables[StarterCreatableTypes.EMBER];
  const blazeAmount = player.creatables[Tier1CreatableTypes.BLAZE];
  if (
    emberAmount &&
    emberAmount.level.greaterThanOrEqualTo(30) &&
    blazeAmount &&
    blazeAmount.level.greaterThanOrEqualTo(10)
  ) {
    return Tier2CreatableTypes.CINDER;
  }

  return null;
};
