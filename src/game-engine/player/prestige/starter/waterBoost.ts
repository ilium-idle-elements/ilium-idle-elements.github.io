import { ElementType } from "../../elements/elementType";
import { PrestigeUpgrade } from "../prestigeUpgrades";
import { AllStarterPrestigeTypes } from "./allStarterPrestigeTypes";

export const WaterBoost: PrestigeUpgrade = {
    type: AllStarterPrestigeTypes.WATER_BOOST,
    name: "Water Boost",
    cost: 5,
    levelMultiplier: 2,
    max: 5,
    elementalMultipliers: [
        { type: ElementType.WATER, multiplier: 2 },
    ],
};