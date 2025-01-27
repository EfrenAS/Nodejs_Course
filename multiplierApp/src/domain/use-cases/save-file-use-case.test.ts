import fs from "node:fs";
import { SaveFile } from "./save-file.use-case";

describe("Save File Use Case", () => {
  const customOptions = {
    fileContent: "test content",
    fileDestination: "outputs",
    fileName: "table",
  };

  const customPath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  // afterEach(() => {
  //   if (fs.existsSync("outputs")) fs.rmSync("outputs", { recursive: true });

  //   if (fs.existsSync("custom-ouputs"))
  //     fs.rmSync("custom-ouputs", { recursive: true });
  // });

  // test("Should save file with default values", () => {
  //   const saveFile = new SaveFile();

  //   const result = saveFile.execute(customOptions);
  //   const isFileExist = fs.existsSync(customPath);
  //   const fileContent = fs.readFileSync(customPath, "utf8");

  //   expect(result).toBe(true);
  //   expect(isFileExist).toBe(true);
  //   expect(fileContent).toBe(customOptions.fileContent);
  // });

  // test("Should save file with custom values", () => {
  //   const saveFile = new SaveFile();

  //   const result = saveFile.execute(customOptions);
  //   const isFileExist = fs.existsSync(customPath);
  //   const fileContent = fs.readFileSync(customPath, "utf8");

  //   expect(result).toBe(true);
  //   expect(isFileExist).toBe(true);
  //   expect(fileContent).toBe(customOptions.fileContent);
  // });

  test("Should return false if directory could not be created", () => {
    const saveFile = new SaveFile();

    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error(
        "This is a custom error message from create directory testing"
      );
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  });

  test("Should return false if file could not be created", () => {
    const saveFile = new SaveFile();

    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error(
          "This is a custom error message from create file testing"
        );
      });

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);

    writeFileSpy.mockRestore();
  });
});
