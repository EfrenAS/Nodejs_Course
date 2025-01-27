// import { yargs } from "yargs";

import exp from "constants";

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import("./args.plugin");

  return yarg;
};

describe("Test Args Plugin", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("Should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  test("Should return configuration with custom values", async () => {
    const customArgs = [
      "-b",
      "5",
      "-l",
      "20",
      "-s",
      "true",
      "-n",
      "test",
      "-d",
      "test",
    ];

    const customArgsResult = {
      b: 5,
      l: 20,
      s: "true",
      n: "test",
      d: "test",
    };

    const argv = await runCommand(customArgs);
    expect(argv).toEqual(expect.objectContaining(customArgsResult));
  });
});
