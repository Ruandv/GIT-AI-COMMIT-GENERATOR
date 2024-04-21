// crawl up through the directory tree to find all the package.json files add them to an array
// confirm with the user which level in the tree they want to create the .env file by listing the package.json directories
// and create a .env file with the default values in the relevant directory that was selected by the user

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import findRoots from '../utility/findRoots';
import { Command, Argument } from 'commander';
import dotenv from 'dotenv';

const createEnv = async (name: string, value: string) => {
    console.log(chalk.greenBright('Creating new env value...'));

    let currentDir = process.cwd();
    let rootFolder = await findRoots(currentDir);
    const envFilePath = path.join(rootFolder, '.env');

    let envData: any = {};
    if (fs.existsSync(envFilePath)) {
        const envFileContent = fs.readFileSync(envFilePath, 'utf8');
        envData = dotenv.parse(envFileContent); // will return an object
    }

    // append the new name and value to the .env data
    envData[name] = value;

    // convert the env data object back to a string
    const newEnvFileContent = Object.entries(envData)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    fs.writeFileSync(envFilePath, newEnvFileContent);
}

const deleteEnv = async (name: string) => {
    console.log(chalk.redBright('Deleting env value...'));
    let currentDir = process.cwd();
    const rootFolder = await findRoots(currentDir);
    const envFilePath = path.join(rootFolder, '.env');
    if (fs.existsSync(envFilePath)) {
        const envFileContent = fs.readFileSync(envFilePath, 'utf8');
        let envData = dotenv.parse(envFileContent); // will return an object
        if (envData[name]) {
            delete envData[name];
            const newEnvFileContent = Object.entries(envData)
                .map(([key, value]) => `${key}=${value}`)
                .join('\n');
            fs.writeFileSync(envFilePath, newEnvFileContent);
            console.log(chalk.redBright(`\t${name} removed`));
        }
        else {
            console.log(chalk.redBright(`\t${name} not found in .env`));
        }
    }
    else {
        console.log(chalk.redBright(`\t${name} not found in .env`));
    }
};

const addEnvCmd = new Command('add-env')
    .description('Add a new environment variable')
    .addArgument(new Argument("<envName>", "Name of the string"))
    .addArgument(new Argument("<envValue>", "Value of the string"))
    .action(async (envName, envValue) => { await createEnv(envName, envValue) });

const removeEnvCmd = new Command('remove-env')
    .description('Delete a env variable from the .env file')
    .addArgument(new Argument("<envName>", "Name of the string to be removed"))
    .action(async (envName) => { await deleteEnv(envName) })

export { addEnvCmd, removeEnvCmd };