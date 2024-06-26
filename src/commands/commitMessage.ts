import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import findRoots from '../utility/findRoots';
import { Command, Argument } from 'commander';
import AiService from '../services/ai-service';
import logger from '../utility/logger'; // Import the logger module
import MissingVariable from '../exceptions/missingVariableException';

const generateMessage = async (fileName: string) => {
    let currentDir = process.cwd();
    let rootFolder = await findRoots(currentDir);
    try{

        logger.info(chalk.greenBright('Creating new commit message...'));
        const service = AiService.getInstance();
    
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
    catch(err:any){
        // check the type of error
        if(err instanceof MissingVariable){
            fs.writeFileSync(path.join(rootFolder, 'diff', `${fileName}.commit`), `# ${err.message}`);
        }
        logger.info(chalk.redBright('Error: ' + err.message));
    }
}

const generateCommitMessageCmd = new Command('generate-commit')
    .description('Create a AI commit message')
    .addArgument(new Argument("<fileName>", "Name of the file that contains the diff"))
    .action(async (fileName: string) => { await generateMessage(fileName) });

export { generateCommitMessageCmd };
