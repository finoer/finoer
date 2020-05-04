import path from 'path'
import ora from 'ora'
import { downloadDirectory } from './contants';

const download = require('download-git-repo')

/**
 * @func  clone the code repository remotely
 * @param target project name
 * @param templateUrl code repository
 */
function downloadRepo(target: string, templateUrl: string): Promise<any> {
  target = path.join(downloadDirectory || '.',  target);

  console.log('taget ------', target)


  return new Promise((resolve, reject) => {
    const spinner = ora(`正在下载项目模板，源地址：${templateUrl}`);
    spinner.start()
    download(templateUrl, target, { clone: true }, (err: any) => {
      if(err) {
          spinner.fail()
          reject(err)
      }else {
          spinner.succeed()
          resolve(target)
      }
    })
  })
}

export default downloadRepo
