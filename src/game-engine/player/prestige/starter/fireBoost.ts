import { ElementType } from "../../elements/elementType";
import { PrestigeUpgrade } from "../prestigeUpgrades";
import { AllStarterPrestigeTypes } from "./allStarterPrestigeTypes";

export const FireBoost: PrestigeUpgrade = {
    type: AllStarterPrestigeTypes.FIRE_BOOST,
    name: "Fire Boost",
    cost: 5,
    levelMultiplier: 2,
    max: 5,
    elementalMultipliers: [
        { type: ElementType.FIRE, multiplier: 2 },
    ],
};