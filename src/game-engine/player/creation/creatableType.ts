import { AllStarterCreatableProgress, AllStarterCreation } from "./starter/allStarterCreation";
import { StarterCreatableTypes } from "./starter/starterCreatableTypes";
import { AllTier1CreatableProgress, AllTier1CreatableUnlocks, AllTier1Creation } from "./tier1/allTier1Creation";
import { Tier1CreatableTypes } from "./tier1/tier1CreatableTypes";

export type CreatableType = StarterCreatableTypes | Tier1CreatableTypes

export const AllCreatableProgress = {
    ...AllStarterCreatableProgress,
    ...AllTier1CreatableProgress,
}

export const AllCreation = {
    ...AllStarterCreation,
    ...AllTier1Creation,
}

export const AllCreatableUnlocks = {
    ...AllTier1CreatableUnlocks,
}