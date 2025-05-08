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

export const createRainCreatable = (data?: SavedCreatableData) => {
  return new Creatable({
    type: Tier2CreatableTypes.RAIN,
    displayName: "Rain",
    difficultyBase: TIER2_DIFFICULTY_BASE,
    difficultyExponent: TIER2_DIFFICULTY_EXPONENT,
    elementType: ElementType.WATER,
    progress: data ? new Decimal(data.progress) : new Decimal(0),
    elementalGains: [],
    elementalGainMultipliers: [
      {
        type: ElementType.WATER,
        multiplier: new Decimal(TIER2_CREATION_MUTIPLIER),
      },
    ],
    level: data ? new Decimal(data.level) : new Decimal(0),
  });
};

export const getRainProgress = (gameEngine: GameEngine) => {
  return new Decimal(1);
};

export const unlockRain = (gameEngine: GameEngine) => {
  const player = gameEngine.player;
  const dewAmount = player.creatables[StarterCreatableTypes.DEW];
  const mistAmount = player.creatables[Tier1CreatableTypes.MIST];
  if (
    dewAmount &&
    dewAmount.level.greaterThanOrEqualTo(20) &&
    mistAmount &&
    mistAmount.level.greaterThanOrEqualTo(15)
  ) {
    return Tier2CreatableTypes.RAIN;
  }

  return null;
};
