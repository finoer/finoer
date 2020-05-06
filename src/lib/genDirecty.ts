import glob from 'glob';
import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer'

// 此文件暂时不用， 后续优化时会用到， 用于兼容用户选择的文件夹
/**
 *
 * @param projectName
 */
export default function genDirecty(projectName: string): Promise<string> | undefined {
  let list = glob.sync('*');
  let rootName = path.basename(process.cwd());

  if(list.length) {
    if(list.filter((name) => isDirecty(name, projectName)).length !== 0) {
      console.log(`项目${projectName}已经存在`)
      return
    }

    return Promise.resolve(projectName)
  }else if(rootName === projectName) {
    return inquirer.prompt([
        {
            name: 'buildInCurrent',
            message: '当前目录为空， 且目录名称和项目名称相同， 是否直接在当前目录下创建新项目？',
            type: 'confirm',
            default: true
        }
    ]).then(answer => {
        return Promise.resolve(answer.buildInCurrent ? '.' : projectName)
    })
  }else {
    return Promise.resolve(projectName)
  }
}


function isDirecty(name: string, projectName: string) {
  const fileName = path.resolve(process.cwd(), path.join('.', name));
  let isDir = true

  return fs.stat(fileName, function(err: any, stats) {
      console.error(err)

      isDir = stats.isDirectory()

      return name.indexOf(projectName) !== -1 && isDir
  })
}
