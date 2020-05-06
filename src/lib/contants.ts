import { realpathSync, readJsonSync } from 'fs-extra';
import { resolve } from 'path';

export const rootPath = realpathSync(process.cwd());

export const packageInfo = readJsonSync(resolve(__dirname, '../../package.json'));

export const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`

/**
 *  Resolve the path relative to the project root directory to an absolute path
 *  @param
 */
export  const resolveRoot = (relativePath: string) => {
    resolve(rootPath, relativePath)
}
