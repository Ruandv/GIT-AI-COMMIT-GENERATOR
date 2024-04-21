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

The project provides several commands for managing .env files and secrets:

- `init`: Initialize the project with some default .env and Secrets. See [`initCmd`](command:_github.copilot.openSymbolInFile?%5B%22src%2Fcommands%2Finit.ts%22%2C%22initCmd%22%5D "src/commands/init.ts").
- `uninit`: Decommission the project by deleting all the defaults. See [`unInitCmd`](command:_github.copilot.openSymbolInFile?%5B%22src%2Fcommands%2Finit.ts%22%2C%22unInitCmd%22%5D "src/commands/init.ts").
- `generate-commit`: Create an AI commit message. See [`generateCommitMessageCmd`](command:_github.copilot.openSymbolInFile?%5B%22src%2Fcommands%2FcommitMessage.ts%22%2C%22generateCommitMessageCmd%22%5D "src/commands/commitMessage.ts").
