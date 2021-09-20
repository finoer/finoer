import path from 'path'
import Creator from '../commands/create';


interface Options {
  [propName: string]: string;
}

export async function initUserPreset(projectName: string, options: Options) {
  /**
   * handleing all user set options
   * 处理 options, --target， --preset， --setting等设置
   * 暂时只处理--target
   */

  // get the target directy passed in by the user
  const cwd: string = options.target || process.cwd();
  // locate folder
  const targetDir = path.resolve(cwd, projectName);

  // - create project classes, create readme, package.json, eslint and other files
  // - 该类主要是用于创建项目，包括readme.md, package.json， eslit配置等
  const creator = new Creator(projectName, targetDir)
  // start creating
  creator.create()
}

