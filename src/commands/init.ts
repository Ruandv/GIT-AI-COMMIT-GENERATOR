// crawl up through the directory tree to find all the package.json files add them to an array
// confirm with the user which level in the tree they want to create the .env file by listing the package.json directories
// and create a .env file with the default values in the relevant directory that was selected by the user

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import findRoots from '../utility/findRoots';
import { Command } from 'commander';

const initialize = async () => {
    var c = chalk.greenBright('initializing...');
    console.log(c);

    let currentDir = process.cwd();
    let rootFolder = await findRoots(currentDir);
    // Create a .env file with the default values in the relevant directory
    const data = `
    PORT=3000
    URL=http://localhost:3000
    `;

    const envFilePath = path.join(rootFolder, '.env');

    fs.writeFileSync(envFilePath, data, 'utf8');

    console.log(chalk.greenBright('.env file has been created'));

    // create the etc\secret folder 
    // create a file called PROJECT with no extension and write a json object with one property in it called name
    // create another file called SMEE-URL and set the value to https://smee.io/1234567890
    const secretsFilePath = path.join(rootFolder, 'etc', 'secrets');
    fs.mkdirSync(secretsFilePath, { recursive: true });
    console.log(chalk.green(`${secretsFilePath} folder has been created`));
    const secretFiles = [
        { name: 'PROJECT', value: `{"name":"Your Project Name"}` },
        { name: 'SMEE-URL', value: 'https://smee.io/1234567890' }
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
    console.log(chalk.blueBright(`REMEMBER TO UPDATE THESE FILES`));
}

const decommission = async () => {
    console.log(chalk.redBright('Decommissioning...'));
    let currentDir = process.cwd();
    const rootFolder = await findRoots(currentDir);

    const envFilePath = path.join(rootFolder, '.env');
    if (fs.existsSync(envFilePath)) {
        fs.unlinkSync(envFilePath);
        console.log(chalk.redBright('\tRemoved .env'));
    }
    const secretsDirPath = path.join(rootFolder, 'etc', 'secrets');
    if (fs.existsSync(secretsDirPath)) {
        fs.rmSync(secretsDirPath, { recursive: true });
        console.log(chalk.redBright('\tRemoved etc/secrets folder'));
    }

    const etcDirPath = path.join(rootFolder, 'etc');
    if (fs.existsSync(etcDirPath)) {
        fs.rmSync(etcDirPath, { recursive: true });
        console.log(chalk.redBright('\tRemoved etc folder'));
    }
    console.log(chalk.redBright('Decommissioned'));
};

export const initCmd = new Command('init').description('Initialize the project with some default .env and Secrets').action(async () => { await initialize() });
export const unInitCmd = new Command('uninit').description('Decommission the project by deleting all the defaults').action(async () => { await decommission() });
