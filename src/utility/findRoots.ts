import readline from 'readline';
import fs from 'fs';
import path from 'path';

const findRoots = async (currentDir: string): Promise<string> => {
    const packageJsonDirs = [];
    while (currentDir !== path.parse(currentDir).root) {
        if (fs.existsSync(path.join(currentDir, 'package.json'))) {
            packageJsonDirs.push(currentDir);
        }
        currentDir = path.dirname(currentDir);
    }

    let folderIndex = 0;

    if (packageJsonDirs.length > 1) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        for (let i = 0; i < packageJsonDirs.length; i++) {
            console.log(`${i + 1}. ${packageJsonDirs[i]}`);
        }

        folderIndex = await new Promise<number>((resolve) => {
            rl.question('\nSelect the directory to create the .env file (enter the number, default is 1): ', (answer) => {
                const index = answer ? Number(answer) - 1 : 0;
                resolve(index);
                rl.close();
            });
        });
    }
    return packageJsonDirs[folderIndex];
}
export default findRoots;
