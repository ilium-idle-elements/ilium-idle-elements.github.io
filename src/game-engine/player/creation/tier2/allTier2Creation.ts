import {
  createCinderCreatable,
  getCinderProgress,
  unlockCinder,
} from "./cinder";
import { createGaleCreatable, getGaleProgress, unlockGale } from "./gale";
import { createRainCreatable, getRainProgress, unlockRain } from "./rain";
import { createSoilCreatable, getSoilProgress, unlockSoil } from "./soil";
import { Tier2CreatableTypes } from "./tier2CreatableTypes";

export const AllTier2Creation = {
  [Tier2CreatableTypes.CINDER]: createCinderCreatable,
  [Tier2CreatableTypes.GALE]: createGaleCreatable,
  [Tier2CreatableTypes.RAIN]: createRainCreatable,
  [Tier2CreatableTypes.SOIL]: createSoilCreatable,
};

export const AllTier2CreatableProgress = {
  [Tier2CreatableTypes.CINDER]: getCinderProgress,
  [Tier2CreatableTypes.GALE]: getGaleProgress,
  [Tier2CreatableTypes.RAIN]: getRainProgress,
  [Tier2CreatableTypes.SOIL]: getSoilProgress,
};

export const AllTier2CreatableUnlocks = {
  [Tier2CreatableTypes.CINDER]: unlockCinder,
  [Tier2CreatableTypes.GALE]: unlockGale,
  [Tier2CreatableTypes.RAIN]: unlockRain,
  [Tier2CreatableTypes.SOIL]: unlockSoil,
};
