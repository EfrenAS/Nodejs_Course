import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
  .options("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    description: "Multiplication Base number",
  })
  .option("l", {
    alias: "limit",
    type: "number",
    default: 10,
    description: "Limit of multiplication",
  })
  .option("s", {
    alias: "show",
    tyoe: "boolean",
    default: false,
    description: "Show result of multiplication",
  })
  .option("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    describe: "File name",
  })
  .option("d", {
    alias: "destination",
    type: "string",
    default: "outputs",
    describe: "File destination",
  })
  .check((argv, options) => {
    if (argv.b < 1)
      throw new Error("Error: Base number must be greater than 1");

    return true;
  })
  .parseSync();
