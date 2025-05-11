import { AirBoost } from "./airBoost";
import { AllElementalBoost } from "./allElementalBoost";
import { AllStarterPrestigeTypes } from "./allStarterPrestigeTypes";
import { EarthBoost } from "./earthBoost";
import { FireBoost } from "./fireBoost";
import { WaterBoost } from "./waterBoost";

export const AllStarterPrestigeUpgrades = {
    [AllStarterPrestigeTypes.ALL_ELEMENTAL_BOOST]: AllElementalBoost,
    [AllStarterPrestigeTypes.FIRE_BOOST]: FireBoost,
    [AllStarterPrestigeTypes.WATER_BOOST]: WaterBoost,
    [AllStarterPrestigeTypes.AIR_BOOST]: AirBoost,
    [AllStarterPrestigeTypes.EARTH_BOOST]: EarthBoost,
}