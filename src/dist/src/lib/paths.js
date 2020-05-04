import { realpathSync, readJsonSync } from 'fs-extra';
import { resolve } from 'path';
export var rootPath = realpathSync(process.cwd());
export var packageInfo = readJsonSync(resolve(__dirname, '../../package.json'));
/**
 *  Resolve the path relative to the project root directory to an absolute path
 *  @param
 */
export var resolveRoot = function (relativePath) {
    resolve(rootPath, relativePath);
};
