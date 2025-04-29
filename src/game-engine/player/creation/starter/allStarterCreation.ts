import { createEmberCreatable, getEmberProgress } from "./ember";
import { StarterCreatableTypes } from "./starterCreatableTypes";

export const AllStarterCreation = {
    [StarterCreatableTypes.EMBER]: createEmberCreatable
}

export const AllStarterCreatableProgress = {
    [StarterCreatableTypes.EMBER]: getEmberProgress
}