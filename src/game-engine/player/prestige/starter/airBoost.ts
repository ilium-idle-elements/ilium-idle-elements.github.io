import { ElementType } from "../../elements/elementType";
import { PrestigeUpgrade } from "../prestigeUpgrades";
import { AllStarterPrestigeTypes } from "./allStarterPrestigeTypes";

export const AirBoost: PrestigeUpgrade = {
    type: AllStarterPrestigeTypes.AIR_BOOST,
    name: "Air Boost",
    cost: 5,
    levelMultiplier: 2,
    max: 5,
    elementalMultipliers: [
        { type: ElementType.AIR, multiplier: 2 },
    ],
};