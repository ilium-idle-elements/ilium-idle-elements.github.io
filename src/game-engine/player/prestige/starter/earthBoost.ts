import { ElementType } from "../../elements/elementType";
import { PrestigeUpgrade } from "../prestigeUpgrades";
import { AllStarterPrestigeTypes } from "./allStarterPrestigeTypes";

export const EarthBoost: PrestigeUpgrade = {
    type: AllStarterPrestigeTypes.EARTH_BOOST,
    name: "Earth Boost",
    cost: 5,
    levelMultiplier: 2,
    max: 5,
    elementalMultipliers: [
        { type: ElementType.EARTH, multiplier: 2 },
    ],
};