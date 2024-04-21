#!/usr/bin/env node
import { Command } from 'commander';
import figlet from 'figlet';
import dotenv from 'dotenv';

import pkg from '../package.json';
import { generateCommitMessageCmd } from './commands';
import logger from './utility/logger';

const myProgram = async () => {
  dotenv.config();
  let commands: Command[] = [];
  commands.push(generateCommitMessageCmd)

  const program = new Command();
  program.version(pkg.version);
  program.description(pkg.description);
  program.name(pkg.name);
  
  for (let command of commands) {
    program.addCommand(command);
  }

  const figletPromise = new Promise((resolve, reject) => {
    figlet("GIT-AI CLI", (err, data) => {
      if (err) {
        logger.info("Something went wrong...");
        logger.info(err);
        reject(err);
        return;
      }
      logger.info(data); 
      resolve(data);
    });
  });
  await figletPromise;

  program.parse();
};
myProgram();

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1); // Exit the process with an error code
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Exit the process with an error code
});