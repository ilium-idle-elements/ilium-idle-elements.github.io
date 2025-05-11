import { ElementType } from "../../elements/elementType";
import { PrestigeUpgrade } from "../prestigeUpgrades";
import { AllStarterPrestigeTypes } from "./allStarterPrestigeTypes";

export const AllElementalBoost: PrestigeUpgrade = {
    type: AllStarterPrestigeTypes.ALL_ELEMENTAL_BOOST,
    name: "All Elemental Boost",
    cost: 1,
    levelMultiplier: 1,
    max: 1,
    elementalMultipliers: [
        { type: ElementType.FIRE, multiplier: 2 },
        { type: ElementType.WATER, multiplier: 2 },
        { type: ElementType.AIR, multiplier: 2 },
        { type: ElementType.EARTH, multiplier: 2 },
    ],
};