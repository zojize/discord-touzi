export type DiceTypes = "dice" | "repeat" | "group";

export type TransformTypes = "multiplier" | "offset";

export interface Transform {
    type: TransformTypes;
    value: number;
}

interface BaseDice {
    type: DiceTypes;
    transforms?: Transform[];
}
export interface BasicDice extends BaseDice {
    type: "dice";
    sides: number | number[];
    times?: number;
}

export interface RepeatedDice extends BaseDice {
    type: "repeat";
    times: number;
    dice: BasicDice | RepeatedDice | DiceGroup;
}

export interface DiceGroup extends BaseDice {
    type: "group";
    dice: (BasicDice | RepeatedDice | DiceGroup)[];
}

export type Dice = BasicDice | RepeatedDice | DiceGroup;

export declare function parse(diceCode: string): Dice;

export declare class SyntaxError extends Error {}
