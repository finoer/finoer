import fs from 'fs'
import logSymbols from 'log-symbols'
import inquirer from 'inquirer'
import chalk from 'chalk'
import downloadRepo from '../lib/download'
import generate from './generate'

/**
 * download template
 * @param next Destination folder
 * @param url repo url
 */
export default function download(next: Promise<string>, url: string) {
  next.then(root => {
    if(root !== '.') {
        fs.mkdirSync(root)
    }

    // clone template project
    return downloadRepo(root, url).then(target => {
      return {
        root,
        name: root,
        downloadTemp: target
      }
    }).then(context => {
      // ask the user for information
      inquirer.prompt([
        {
            name: 'projectName',
            message: 'project name',
            default: context.name
        },
        {
            name: 'author',
            message: 'author',
            default: 'yueqi'
        },
        {
            name: 'description',
            message: 'description for project',
            default: `A project named ${context.name}`
        }
      ]).then(answers=> {
          const metaData: any = {
            ...context,
            metadata: {
                ...answers
            }
          }

          console.log(logSymbols.success, chalk.green('创建成功:)'))
          console.log()
          console.log(chalk.green('cd ' + context.root + '\nnpm install\nnpm run serve'))

          return generate(metaData)
      }).catch(() => {
        console.log(logSymbols.error, chalk.green('创建失败:('))
      })
    })
  })
}
