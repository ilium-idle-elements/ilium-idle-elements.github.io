import {
  AllStarterCreatableProgress,
  AllStarterCreation,
} from "./starter/allStarterCreation";
import { StarterCreatableTypes } from "./starter/starterCreatableTypes";
import {
  AllTier1CreatableProgress,
  AllTier1CreatableUnlocks,
  AllTier1Creation,
} from "./tier1/allTier1Creation";
import { Tier1CreatableTypes } from "./tier1/tier1CreatableTypes";
import {
  AllTier2CreatableProgress,
  AllTier2CreatableUnlocks,
  AllTier2Creation,
} from "./tier2/allTier2Creation";
import { Tier2CreatableTypes } from "./tier2/tier2CreatableTypes";

export type CreatableType =
  | StarterCreatableTypes
  | Tier1CreatableTypes
  | Tier2CreatableTypes;

export const AllCreatableProgress = {
  ...AllStarterCreatableProgress,
  ...AllTier1CreatableProgress,
  ...AllTier2CreatableProgress,
};

export const AllCreation = {
  ...AllStarterCreation,
  ...AllTier1Creation,
  ...AllTier2Creation,
};

export const AllCreatableUnlocks = {
  ...AllTier1CreatableUnlocks,
  ...AllTier2CreatableUnlocks,
};
