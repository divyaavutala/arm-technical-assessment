const fs = require("fs");
const path = require("path");

// Function to read and parse JSON files
function readJsonFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(fileContent);
    if (!json.boards || json.boards.length === 0) {
      throw new Error("Empty or invalid data.");
    }
    return json;
  } catch (error) {
    console.error(
      `Error reading ${filePath}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return null;
  }
}

// Function to process all JSON files in a directory
function processJsonFiles(directoryPath) {
  const errors: { file: string; message: string }[] = [];

  // Read all JSON files from the specified directory
  const boardFiles = fs
    .readdirSync(directoryPath)
    .filter((file) => path.extname(file) === ".json")
    .map((file) => {
      const filePath = path.join(directoryPath, file);
      const fileContent = readJsonFile(filePath);
      if (fileContent === null) {
        errors.push({ file: filePath, message: "Skipped due to error." });
      }
      return fileContent;
    })
    .filter((file) => file !== null);

  const allBoards = boardFiles.flatMap((file) => file.boards);

  // Sort boards by vendor and then by name
  allBoards.sort(
    (a, b) => a.vendor.localeCompare(b.vendor) || a.name.localeCompare(b.name)
  );

  // Extract unique vendors
  const uniqueVendors = new Set(allBoards.map((board) => board.vendor));

  const finalJson = {
    boards: allBoards,
    _metadata: {
      totalNumberOfUniqueVendors: uniqueVendors.size,
      totalNumberOfBoards: allBoards.length,
    },
  };

  // Write to an output file
  fs.writeFileSync(
    path.join(__dirname, "..", "src", "output.json"),
    JSON.stringify(finalJson, null, 2)
  );

  return { finalJson, errors };
}

// Processing JSON files in a directory
const directoryPath = process.argv[2] || "./src/data";
const { finalJson, errors } = processJsonFiles(directoryPath);

// Output errors if any files were skipped
if (errors.length > 0) {
  console.error(`${errors.length} files were skipped due to errors:`);
}

module.exports = {
  readJsonFile,
  processJsonFiles,
};
