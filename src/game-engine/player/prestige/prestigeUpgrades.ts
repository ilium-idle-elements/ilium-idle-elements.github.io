import { ElementType } from "../elements/elementType";
import { PrestigeUpgradeType } from "./prestigeUpgradeType";

export type PrestigeUpgrade = {
  type: PrestigeUpgradeType;
  name: string;
  cost: number;
  levelMultiplier: number;
  max: number;
  elementalMultipliers?: {
    type: ElementType;
    multiplier: number;
  }[]
};
