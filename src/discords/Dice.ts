import type { ArgsOf, Client } from "@typeit/discord";
import type { Dice, Transform } from "../dice-grammar";
import { Discord, On, Once, Guard } from "@typeit/discord";
import * as diceParser from "../dice-grammar";
import * as kwargsParser from "../kwargs-grammar";
import identity from "lodash/identity";
import range from "lodash/range";

const commandPrefix = [".", "。"];

export const isCommand = async (
    [message]: ArgsOf<"message">,
    _: unknown,
    next: () => Promise<unknown>
): Promise<void> => {
    if (message.content[0] && commandPrefix.includes(message.content[0])) {
        await next();
    }
};

const diceUsage =
    "Basic Syntax: \n" +
    "   `(<REPEAT>#)?<DICE TOSS TIMES>?[dD]<DICE SIDES | DICE OPTIONS | %>(+<OFFSET>)?([Xx*]<MULTIPLIER>)`\n\n" +
    "Examples: \n" +
    "   `3d6`: toss a 6 sided dice 3 times\n" +
    "   `3#3d6`: for 3 times, toss a 6 sided dice 3 times\n" +
    "   `d[1, 2, 0]`: choose randomly from numbers 1, 2 and 0\n\n" +
    "Advanced Uses: \n" +
    "   Dice Groups: \n" +
    "       Two or more dice can be grouped with `,` as seperator \n" +
    "       e.g.: `3#(3d6, 2d3)`, `3D[2, 3], 2D%+50`\n";

const rollCommands = ["roll", "r"];

@Discord()
export abstract class RollDice {
    @Once("ready")
    private onReady(_, client: Client) {
        console.log(`Bot ${client.user?.tag} is ready.`);
    }

    @On("message")
    @Guard(isCommand)
    private onMessage([message]: ArgsOf<"message">): void {
        let parsedCommand: ParsedCommand;
        try {
            parsedCommand = parseCommand(message.content);
        } catch (e) {
            console.error("command parsing error", e);
            return;
        }

        console.log(`received command: ${JSON.stringify(parsedCommand)}`);

        const { commandName, commandBody: raw, kwargs } = parsedCommand;

        if (rollCommands.includes(commandName)) {
            const {
                debug = false,
                help = false,
                min = false,
                "no-roll": noRoll = false,
            } = (kwargs as any) ?? {};

            let parsed!: Dice;

            if (help) {
                message.channel.send(diceUsage);
                return;
            }

            if (raw.length)
                try {
                    parsed = diceParser.parse(raw);
                } catch (e) {
                    console.error("parsing error", e);
                    return;
                }

            if (typeof parsed !== "undefined") {
                const rolled = (noRoll ? identity : roll)(parsed);
                if (rolled)
                    message.reply(
                        debug
                            ? JSON.stringify(rolled)
                            : min
                            ? `${rolled.result}`
                            : rolled.formatted
                    );
                return;
            }
        }
    }
}

type RollResult = {
    results: number[] | RollResult[];
    result: number;
    formatted: string;
};

function roll(dice: Dice): RollResult {
    let results: RollResult[] | number[];
    let result: number;
    let formatted: string;

    const { transforms = [] } = dice;
    const trans = transfromFunc(transforms);

    switch (dice.type) {
        case "dice": {
            const { sides, times } = dice;
            results = range(times ?? 1)
                .map(
                    Array.isArray(sides)
                        ? () => choice(sides)
                        : () => randint(1, sides + 1)
                )
                .map(trans);
            result = Array.isArray(results)
                ? results.reduce((a, b) => a + b)
                : results;
            formatted = simpleFormatResults(results) + ` = **${result}**`;
            break;
        }
        case "repeat": {
            const { times } = dice;
            results = range(times).map(() => roll(dice.dice));
            result = results.reduce((a, b) => a + b.result, 0);
            formatted = simpleFormatResults(results) + ` = **${result}**`;
            break;
        }
        case "group": {
            results = dice.dice.map(roll);
            result = results.reduce((a, b) => a + b.result, 0);
            formatted = simpleFormatResults(results) + ` = **${result}**`;
            break;
        }
    }
    return {
        result,
        results,
        formatted,
    };

    function randint(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function choice<T>(arr: T[]): T {
        return arr[randint(0, arr.length)];
    }
    // function indent(str: string, ind = "  "): string {
    //     return (ind + str).replaceAll("\n", "\n" + ind);
    // }
    function add(a: number, b: number): number {
        return a + b;
    }
    function mul(a: number, b: number): number {
        return a * b;
    }
    function transfromFunc(trans: Transform[]): (n: number) => number {
        return (n: number) =>
            trans.reduce(
                (a, { type, value }) =>
                    ({ multiplier: mul, offset: add }[type](a, value)),
                n
            );
    }
    function simpleFormatResults(
        res: RollResult[] | number[],
        deep = false
    ): string {
        const backtick = deep ? "" : "`";
        return `${backtick}[${res
            .map((r) =>
                typeof r === "number" ? r : simpleFormatResults(r.results, true)
            )
            .join("+")}]${backtick}`;
    }
}

const commandRegex = /(?:\.|。)(?<command>[a-zA-Z+\-#$%@]+)(?<kwargs>\(.*?\))?/;
interface ParsedCommand<T = any> {
    commandName: string;
    commandBody: string;
    kwargs?: T | undefined;
}

function parseCommand<T = any>(cmd: string): ParsedCommand<T> {
    const matchedCommand = cmd.match(commandRegex)!;

    if (matchedCommand) {
        const { command: commandName, kwargs } =
            matchedCommand.groups as unknown as {
                command: string;
                kwargs: string;
            };
        return {
            commandName,
            commandBody: cmd.replace(commandRegex, "").trim(),
            kwargs: kwargs ? kwargsParser.parse<T>(kwargs) : void 0,
        };
    }
    throw Error("not a command");
}

const sign = {
    "-": -1,
    "+": 1,
    [-1]: "-",
    [1]: "+",
};
