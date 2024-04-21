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

## NOTE: 
make sure that the project that consumes the CLI has the following variables set
    AI_SERVICE_URL=
    AI_SERVICE_SECRET=
