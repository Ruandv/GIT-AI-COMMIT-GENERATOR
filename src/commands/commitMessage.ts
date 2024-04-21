// crawl up through the directory tree to find all the package.json files add them to an array
// confirm with the user which level in the tree they want to create the .env file by listing the package.json directories
// and create a .env file with the default values in the relevant directory that was selected by the user

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import findRoots from '../utility/findRoots';
import { Command, Argument } from 'commander';
import AiService from '../services/ai-service';
import logger from '../utility/logger'; // Import the logger module

const generateMessage = async (fileName: string) => {
    logger.info(chalk.greenBright('Creating new commit message...'));
    const service = AiService.getInstance();

    let currentDir = process.cwd();
    let rootFolder = await findRoots(currentDir);
    const envFilePath = path.join(rootFolder, 'diff', `${fileName}.diff`);
    logger.info(chalk.greenBright(`\tprocessing... (${fileName})`));

    if (!fs.existsSync(envFilePath)) {
        logger.info(chalk.redBright(`\t${fileName} not found in .diff`));        
        fs.mkdirSync(path.join(rootFolder, 'diff'), { recursive: true });
        fs.writeFileSync(envFilePath, 'no diff found');
    }

    const fileContent = fs.readFileSync(envFilePath, 'utf8');
    const res = await service.generateCommitMessage(fileContent);
    console.info(chalk.cyanBright(`\t${res.message}`));
    fs.writeFileSync(path.join(rootFolder, 'diff', `${fileName}.commit`), res.message);
    return res.message;
}

const generateCommitMessageCmd = new Command('generate-commit')
    .description('Create a AI commit message')
    .addArgument(new Argument("<fileName>", "Name of the file that contains the diff"))
    .action(async (fileName: string) => { await generateMessage(fileName) });

export { generateCommitMessageCmd };