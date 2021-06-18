import type { ArgsOf, Client } from "@typeit/discord";
import type { Dice } from "../dice-grammar";
import { Discord, On, Once, Guard } from "@typeit/discord";
import * as diceParser from "../dice-grammar";
import * as kwargsParser from "../kwargs-grammar";
import identity from "lodash/identity";

export const isCommand = async (
    [message]: ArgsOf<"message">,
    _: unknown,
    next: () => Promise<unknown>
): Promise<void> => {
    if (message.content.startsWith("!")) {
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
        const parsedCommand = parseCommand(message.content);

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

    switch (dice.type) {
        case "dice": {
            const { sides, multiplier, offset, times } = dice;
            results = Array.from(range(times ?? 1)).map(
                Array.isArray(sides)
                    ? () => choice(sides) * (multiplier ?? 1) + (offset ?? 0)
                    : () =>
                          randint(1, sides + 1) * (multiplier ?? 1) +
                          (offset ?? 0)
            );
            result = Array.isArray(results)
                ? results.reduce((a, b) => a + b)
                : results;
            formatted =
                (times ? `${times}` : "") +
                `d${JSON.stringify(sides)}` +
                (multiplier ? `*${multiplier}` : "") +
                (offset
                    ? `${offset >= 0 ? "+" : "-"}${Math.abs(offset)}`
                    : "") +
                (results.length > 1 ? `(${results.join("+")})` : "") +
                `=${result}`;
            break;
        }
        case "repeat": {
            const { times } = dice;
            results = Array.from(range(times)).map(() => roll(dice.dice));
            result = results.reduce((a, b) => a + b.result, 0);
            formatted = `{\n${indent(
                results.map((r) => r.formatted).join(" +\n")
            )}\n}=${result}`;
            break;
        }
        case "group": {
            results = dice.dice.map(roll);
            result = results.reduce((a, b) => a + b.result, 0);
            formatted = `[\n${indent(
                results.map((r) => r.formatted).join(" +\n")
            )}\n]=${result}`;
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
    function* range(n: number): Generator<number> {
        for (let i = 0; i < n; i++) yield i;
    }
    function indent(str: string, ind = "  "): string {
        return (ind + str).replaceAll("\n", "\n" + ind);
    }
}

const commandRegex = /!(?<command>[a-zA-Z+\-#$%@]+)(?<kwargs>\(.*?\))?/;

function parseCommand<T = unknown>(
    cmd: string
): {
    commandName: string;
    commandBody: string;
    kwargs?: T | undefined;
} {
    const matchedCommand = cmd.match(commandRegex)!;

    if (matchedCommand) {
        const { command: commandName, kwargs } =
            matchedCommand.groups as unknown as {
                command: string;
                kwargs: string;
            };
        return {
            commandName,
            commandBody: cmd.replace(commandRegex, ""),
            kwargs: kwargs ? kwargsParser.parse<T>(kwargs) : void 0,
        };
    }
    throw Error("not a command");
}
