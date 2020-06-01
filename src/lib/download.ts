import path from 'path'
import ora from 'ora'
import { downloadDirectory } from './contants'
import {DownloadRepo} from '@snower/d'

/**
 * @func  clone the code repository remotely
 * @param target project name
 * @param templateUrl code repository
 */
function downloadRepo(target: string, templateUrl: string): Promise<any> {
  target = path.join(downloadDirectory || '.',  target);

  return new Promise((resolve, reject) => {
    const spinner = ora(`Downloading the template from ${templateUrl}`);
    spinner.start()
    const d = new DownloadRepo();
    d.download(templateUrl, target, { clone: true }, (err: any) => {
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
