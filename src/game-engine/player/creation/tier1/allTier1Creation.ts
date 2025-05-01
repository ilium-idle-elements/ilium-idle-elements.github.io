import { createGustCreatable, getGustProgress, unlockGust } from "./gust";
import { createMudCreatable, getMudProgress, unlockMud } from "./mud";
import { createBlazeCreatable, getBlazeProgress, unlockBlaze } from "./blaze";
import { Tier1CreatableTypes } from "./tier1CreatableTypes";
import { createMistCreatable, getMistProgress, unlockMist } from "./mist";

export const AllTier1Creation = {
    [Tier1CreatableTypes.BLAZE]: createBlazeCreatable,
    [Tier1CreatableTypes.GUST]: createGustCreatable,
    [Tier1CreatableTypes.MIST]: createMistCreatable,
    [Tier1CreatableTypes.MUD]: createMudCreatable,
}

export const AllTier1CreatableProgress = {
    [Tier1CreatableTypes.BLAZE]: getBlazeProgress,
    [Tier1CreatableTypes.GUST]: getGustProgress,
    [Tier1CreatableTypes.MIST]: getMistProgress,
    [Tier1CreatableTypes.MUD]: getMudProgress,
}

export const AllTier1CreatableUnlocks = {
    [Tier1CreatableTypes.BLAZE]: unlockBlaze,
    [Tier1CreatableTypes.GUST]: unlockGust,
    [Tier1CreatableTypes.MIST]: unlockMist,
    [Tier1CreatableTypes.MUD]: unlockMud,
}