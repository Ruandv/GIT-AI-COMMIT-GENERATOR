#!/usr/bin/env node
import { Command } from 'commander';
import figlet from 'figlet';
import dotenv from 'dotenv';

import pkg from '../package.json';
import { addEnvCmd, addSecretCmd, initCmd, removeEnvCmd, removeSecretCmd, unInitCmd } from './commands';
import { generateCommitMessageCmd } from './commands/commitMessage';

const myProgram = async () => {
  dotenv.config();
  let commands: Command[] = [];
  commands.push(initCmd);
  commands.push(unInitCmd);
  commands.push(addSecretCmd);
  commands.push(removeSecretCmd);
  commands.push(addEnvCmd);
  commands.push(removeEnvCmd);
  commands.push(generateCommitMessageCmd)

  const program = new Command(); // Create a new
  program.version(pkg.version);
  program.description(pkg.description);
  program.name(pkg.name);
  
  for (let command of commands) {
    program.addCommand(command);
  }

  const figletPromise = new Promise((resolve, reject) => {
    figlet("Nintex CLI", (err, data) => {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        reject(err);
        return;
      }
      console.log(data); 
      resolve(data);
    });
  });
  await figletPromise;

  program.parse();
};
myProgram();