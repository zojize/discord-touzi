import "reflect-metadata";
import { Intents } from "discord.js";
import { Client } from "@typeit/discord";
import dotenvLoad from "dotenv-load";

dotenvLoad();

(async function start() {
    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
        classes: [`${__dirname}/discords/*.js`],
        silent: true,
    });
    await client.login(process.env.TOKEN!);
})();
