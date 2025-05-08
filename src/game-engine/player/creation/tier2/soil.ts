import Decimal from "decimal.js";
import GameEngine from "../../../game-engine";
import { ElementType } from "../../elements/elementType";
import Creatable, { SavedCreatableData } from "../creatable";
import { Tier1CreatableTypes } from "../tier1/tier1CreatableTypes";
import {
  TIER2_CREATION_MUTIPLIER,
  TIER2_DIFFICULTY_BASE,
  TIER2_DIFFICULTY_EXPONENT,
  Tier2CreatableTypes,
} from "./tier2CreatableTypes";

export const createSoilCreatable = (data?: SavedCreatableData) => {
  return new Creatable({
    type: Tier2CreatableTypes.SOIL,
    displayName: "Soil",
    difficultyBase: TIER2_DIFFICULTY_BASE,
    difficultyExponent: TIER2_DIFFICULTY_EXPONENT,
    elementType: ElementType.EARTH,
    progress: data ? new Decimal(data.progress) : new Decimal(0),
    elementalGains: [],
    elementalGainMultipliers: [
      {
        type: ElementType.EARTH,
        multiplier: new Decimal(TIER2_CREATION_MUTIPLIER),
      },
    ],
    level: data ? new Decimal(data.level) : new Decimal(0),
  });
};

export const getSoilProgress = (gameEngine: GameEngine) => {
  return new Decimal(1);
};

export const unlockSoil = (gameEngine: GameEngine) => {
  const player = gameEngine.player;
  const blazeAmount = player.creatables[Tier1CreatableTypes.BLAZE];
  const mudAmount = player.creatables[Tier1CreatableTypes.MUD];
  const gustAmount = player.creatables[Tier1CreatableTypes.GUST];
  const mistAmount = player.creatables[Tier1CreatableTypes.MIST];

  if (
    blazeAmount &&
    blazeAmount.level.greaterThanOrEqualTo(12) &&
    mudAmount &&
    mudAmount.level.greaterThanOrEqualTo(12) &&
    gustAmount &&
    gustAmount.level.greaterThanOrEqualTo(12) &&
    mistAmount &&
    mistAmount.level.greaterThanOrEqualTo(12)
  ) {
    return Tier2CreatableTypes.SOIL;
  }

  return null;
};
