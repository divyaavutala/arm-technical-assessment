const { processJsonFiles } = require("../combineJSON");
const fs = require("fs");
const path = require("path");

jest.mock("fs");

describe("reads and parses JSON files", () => {
  test("Ensure that the `processJsonFiles` function combines all unique objects from multiple JSON files when all files contain unique data", () => {
    const directoryPath = "./src/test/dataset-1";
    const { finalJson, errors } = processJsonFiles(directoryPath);

    // Expected output provided in output-1.json
    const filePath = "./src/test/output-1.json";
    const expectedJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
    expect(finalJson).toEqual(expectedJson);
    expect(errors).toEqual([]);
  });

  test("Verify how the `processJsonFiles` function behaves when one of the JSON files is empty", () => {
    const directoryPath = "./src/test/dataset-2";
    const { finalJson, errors } = processJsonFiles(directoryPath);

    // Expected output provided in output-2.json
    const filePath = "./src/test/output-2.json";
    const expectedJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const expectedError = [
      {
        file: "src/test/dataset-2/boards-3.json",
        message: "Skipped due to error.",
      },
    ];
    expect(finalJson).toEqual(expectedJson);
    expect(errors).toEqual(expectedError);
  });

  test("Check the behavior of the `processJsonFiles` function when JSON files contain objects with the same vendors and names", () => {
    const directoryPath = "./src/test/dataset-3";
    const { finalJson, errors } = processJsonFiles(directoryPath);

    // Expected output provided in output-3.json
    const filePath = "./src/test/output-3.json";
    const expectedJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
    expect(finalJson).toEqual(expectedJson);
    expect(errors).toEqual([]);
  });

  test("Check the behavior of the `processJsonFiles` function when JSON files contain objects with new attributes", () => {
    const directoryPath = "./src/test/dataset-4";
    const { finalJson, errors } = processJsonFiles(directoryPath);

    // Expected output provided in output-4.json
    const filePath = "./src/test/output-4.json";
    const expectedJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
    expect(finalJson).toEqual(expectedJson);
    expect(errors).toEqual([]);
  });
});
