# GIT-AI-COMMIT-GENERATOR

This project, named "git-ai-commit", is a simple CLI for creating conventional commit messages.

## Installation

To install the project, clone the repository and run the following command in the project directory:

```sh
npm install
```
To build the project

```sh 
npm build
```

To run the project locally, use the following command:

```sh
npm run start
```

For Windows users, use the following command:

```sh
npm run start:windows
```

To install the package from this project

```sh
npm run local
```

To bump the version and create a tgz file

```sh
npm run package
```

## Commands

The project provides one command at the moment for managing your conventional commit:

- `generate-commit`: Create an AI commit message. See [`generateCommitMessageCmd`](command:_github.copilot.openSymbolInFile?%5B%22src%2Fcommands%2FcommitMessage.ts%22%2C%22generateCommitMessageCmd%22%5D "src/commands/commitMessage.ts").


## Update git hooks
on the project that you want to use this cli make sure you update the `.git\hooks\prepare-commit-msg` hook to be as below

```sh

#!/bin/sh

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

RM -rf "diff/*.*"
# GENERATE A DIFF FILE AND SAVE IT TO THE DIFF FOLDER
git diff --staged > diff/changes.diff
# CALL THE CLI TO GENERATE THE COMMIT MESSAGE USING AI
git-ai generate-commit changes
# READ THE GENERATED COMMIT MESSAGE
VAL=$(<diff/changes.commit)
# REMOVE THE DEFAULT COMMIT MESSAGE
RM -rf "$COMMIT_MSG_FILE"
# WRITE THE AI GENERATED COMMIT MESSAGE
echo "$VAL" >> "$COMMIT_MSG_FILE"

```

## NOTE: 
make sure that the project that consumes the CLI has the following variables set

    AI_SERVICE_URL= /* THE URL TO WHERE YOU ARE HOSTING THE [API](https://github.com/Ruandv/GIT_AI_COMMIT_API) */

    AI_SERVICE_SECRET= /* THE SECRET VALUE(s) that you allow */
