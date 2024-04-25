# Arm: This is a test project for combining JSON files

# Install git using apt

```
sudo apt install git-all
```

# Verify git installation

```
git --version
```

## Git version should display for example

git version 2.30.1

## Follow below instructions to run the script.

# Install node:

[NodeJS](https://nodejs.org/en/download)
follow steps for mac or windows.

# Node Version:

Minimum version required for node is 18.17+

If you have already npm installed run the below command to update npm

```
npm update
```

# Typescript Version:

Minimum version required for typescript is 5.4+

Install the latest version of [Typescript] (https://www.typescriptlang.org/download).

# Install ts-node with npm:

This project uses ts-node to run typescript files.
ts-node eliminates the need to manually transpile TypeScript files before execution.
When installing, this might require permission to run as an administrator or super user based on the OS

Install ts-node globally:

```
npm install -g ts-node
```

# Verify ts-node installation

```
ts-node -v
```

## ts-node version should display for example

v10.9.2

# Clone the arm-technical-assessment repository from [here](https://github.com/divyaavutala/arm-technical-assessment) using below command

```
git clone https://github.com/divyaavutala/arm-technical-assessment.git
```

## The above command will create the arm-technical-assessment folder in the present working directory. cd to the directory, arm-technical-assessment.

- It is advised to download and Install VSCode suitable for your OS.
- Open VSCode.
- In VSCode, browse to arm-technical-assessment folder and open it as a folder.
- This will open the Typescript project in VS Code.
- Browse to the correct root folder from terminal

## To install all the required packages at the root of the project, use:

```
npm install
```

## Available scripts:

## To combine JSON files in a directory, use:

```
npm run combine ${directory path}
```

- This script generates an output.json file in the src folder with the final output.
- Executing the above command with a new directory will replace the existing output.
- Any errors will be logged in the console.

## Use the below command to run unit tests:

```
npm test
```

- Each test case has it's own dataset and expected output files for reference.
- For example, the first test case uses src/test/dataset-1 for the input and the expected output is stored in src/test/output-1.json.

# Assumptions

- If no directory is provided while running the script to combine files, src/data is used instead.
- Code has permission to read from and write to the file system without error
- TS/JS injection securities have already been implemented
- Each JSON object has a Vendor and Name provided
