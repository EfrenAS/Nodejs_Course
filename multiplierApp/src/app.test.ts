import { ServerApp } from "./presentation/server-app";

describe("App", () => {
  test("should call ServerApp.run with options", async () => {
    const ServerRunMock = jest.fn();
    ServerApp.run = ServerRunMock;
    process.argv = [
      "node",
      "app.js",
      "-b",
      "5",
      "-l",
      "10",
      "-s",
      "true",
      "-n",
      "test-file",
      "-d",
      "test-destination",
    ];

    await import("./app");

    expect(ServerRunMock).toHaveBeenCalledWith({
      base: 5,
      limit: 10,
      showTable: true,
      fileName: "test-file",
      fileDestination: "test-destination",
    });
  });
});
