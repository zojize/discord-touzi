import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "src/index.ts",
        plugins: [typescript(), terser()],
        output: {
            dir: "dist",
            format: "cjs",
            sourcemap: true,
        },
    },
    {
        input: ["src/discords/Dice.ts"],
        plugins: [typescript(), terser()],
        output: {
            dir: "dist/discords",
            format: "cjs",
            sourcemap: true,
        },
    },
];
