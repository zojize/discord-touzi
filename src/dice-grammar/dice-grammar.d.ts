export type DiceTypes = "dice" | "repeat" | "group";

export interface BasicDice {
    type: "dice";
    sides: number | number[];
    multiplier?: number;
    offset?: number;
    times?: number;
}

export interface RepeatedDice {
    type: "repeat";
    times: number;
    dice: BasicDice | RepeatedDice | DiceGroup;
}

export interface DiceGroup {
    type: "group";
    dice: (BasicDice | RepeatedDice | DiceGroup)[];
}

export type Dice = BasicDice | RepeatedDice | DiceGroup;

export declare function parse(diceCode: string): Dice;

export declare class SyntaxError extends Error {}
