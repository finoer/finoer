import inquirer from 'inquirer'

import { templateList } from '../lib/templateList'
import download from './download'

/**
 * create a template project
 * @param options project name
 */
export default function create(options: string) {
  // get project name
  const projectName = options;

  // prompt the user to select a template
  inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      choices: templateList,
      message: 'plase choise a template to create project'
    }
  ]).then((answer) => {
    // locate the generated directory genDirecty(projectName)
    let next = Promise.resolve(projectName);

    if(next) {
      // download template
      download(next, answer.template)
    }
  })
}

