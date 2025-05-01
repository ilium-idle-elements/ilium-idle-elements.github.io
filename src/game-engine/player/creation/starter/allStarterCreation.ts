import { createBreezeCreatable, getBreezeProgress } from "./breeze";
import { createClayCreatable, getClayProgress } from "./clay";
import { createDewCreatable, getDewProgress } from "./dew";
import { createEmberCreatable, getEmberProgress } from "./ember";
import { StarterCreatableTypes } from "./starterCreatableTypes";

export const AllStarterCreation = {
    [StarterCreatableTypes.EMBER]: createEmberCreatable,
    [StarterCreatableTypes.BREEZE]: createBreezeCreatable,
    [StarterCreatableTypes.DEW]: createDewCreatable,
    [StarterCreatableTypes.CLAY]: createClayCreatable,
}

export const AllStarterCreatableProgress = {
    [StarterCreatableTypes.EMBER]: getEmberProgress,
    [StarterCreatableTypes.BREEZE]: getBreezeProgress,
    [StarterCreatableTypes.DEW]: getDewProgress,
    [StarterCreatableTypes.CLAY]: getClayProgress,
}