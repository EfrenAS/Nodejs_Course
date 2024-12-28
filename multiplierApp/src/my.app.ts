/**
 * This is my propouse to the task of the lesson 75 of the course nodejs
 * Tutor: fernando herrera
 * Date: 2024-12-27
 * Task: Create a program that reads a number and displays the multiplication table of that number
 */

import { writeContentToFile } from "./utils/file-manager.plugin";
import { multiplication } from "./utils/mutliplication-plugin";

const FRAME = "=========================";
const TITLE = "       Tabla del 5    ";
const MULTIPLICAND = 5;

const result = multiplication({ MULTIPLICAND });

console.log(FRAME);
console.log(TITLE);
console.log(FRAME);
const resultToSave = result.map((value) => {
  console.log(value);
  return `${value} \n`;
});

const FOLDER_NAME = "outputs/";
const FILE_NAME = "tabla-del-5.txt";

writeContentToFile({
  path: FOLDER_NAME,
  fileName: FILE_NAME,
  content: resultToSave,
})
  .then(() => {
    console.log("Successfully saved to file");
  })
  .catch((err) => {
    console.log(err);
  });
