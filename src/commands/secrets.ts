// crawl up through the directory tree to find all the package.json files add them to an array
// confirm with the user which level in the tree they want to create the .env file by listing the package.json directories
// and create a .env file with the default values in the relevant directory that was selected by the user

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import findRoots from '../utility/findRoots';
import { Command, Argument } from 'commander';


const createSecret = async (name: string, value: string) => {
    console.log(chalk.greenBright('Creating new secret...'));

    let currentDir = process.cwd();
    let rootFolder = await findRoots(currentDir);

    const secretsFilePath = path.join(rootFolder, 'etc', 'secrets');
    if (!fs.existsSync(secretsFilePath)) {
        fs.mkdirSync(secretsFilePath, { recursive: true });
        console.log(chalk.green(`${secretsFilePath} folder has been created`));
    }
    const secretFiles = [
        { name: name, value: value }
    ];
    secretFiles.forEach((secretFile) => {
        const secretFilePath = path.join(secretsFilePath, secretFile.name);
        if (!fs.existsSync(secretFilePath)) {
            fs.writeFileSync(secretFilePath, secretFile.value);
            console.log(chalk.greenBright(`\t${secretFile.name} secret has been created`));
        }
        else {
            console.log(chalk.redBright(`\t${secretFile.name} secret already exists`));
        }
    });
}

const deleteSecret = async (name: string) => {
    console.log(chalk.redBright('Deleting secret...'));
    let currentDir = process.cwd();
    const rootFolder = await findRoots(currentDir);

    const secretsDirPath = path.join(rootFolder, 'etc', 'secrets', name);
    if (fs.existsSync(secretsDirPath)) {
        fs.rmSync(secretsDirPath, { recursive: true });
        console.log(chalk.redBright(`\t${name} removed`));
    }
    else {
        console.log(chalk.redBright(`\t${name} secret does not exist`));
    }
};

const addSecretCmd = new Command('add-secret')
    .description('Add a new secret')
    .addArgument(new Argument("<secretName>", "Name of the secret"))
    .addArgument(new Argument("<secretValue>", "Value of the secret"))
    .action(async (secretName, secretValue) => { await createSecret(secretName, secretValue) });

const removeSecretCmd = new Command('delete-secret')
    .description('Delete a secret')
    .addArgument(new Argument("<secretName>", "Name of the secret"))
    .action(async (secretName) => { await deleteSecret(secretName) })
export { addSecretCmd, removeSecretCmd };