import execa from 'execa'
import fs from 'fs-extra'
import MetalSmith from 'metalsmith'
import inquirer, { Answers } from 'inquirer';
import logSymbols from 'log-symbols'
import chalk from 'chalk'
import { catchDownloadDirectory } from "../../lib/constants";
import { waitFnloading, download } from '../../lib/utils';
import { OutroPrompts } from '../../template/prompts';

/**
*  class for project roject creation tool
*
* @param projectName - name for project
* @param targetDir - project address
*/
class Creator {
  // name for project
  public projectName: string;
  // project address
  public targetDir: string;

  constructor(name: string, targetDir: string) {
    this.projectName = name;
    this.targetDir = targetDir;
  }

  /**
   * @func
   * create a project from the cache directory,
   */
  async create() {
    // get cache directory path and create cache directory
    const cacheDir: string = catchDownloadDirectory;
    // cache file directory
    const cacheArray: Array<string> = [`${cacheDir}base`, `${cacheDir}${this.projectName}`];

    // remove previous cache items
    if (fs.existsSync(cacheArray[0]) || fs.existsSync(cacheArray[1])) {
      await this.removeMultipleDir(cacheArray);
    }

    // get remote basic projects
    await waitFnloading<string>(download, '🚀 fetching template from remote....')('https://github.com:finoer/fino#dev', cacheArray[0]);

    const templateList = JSON.parse(fs.readFileSync(`${cacheArray[0]}/templates.json`, 'utf8'));

    const templatePrompts = new OutroPrompts('list', 'template', 'plase choise a template to create project', templateList);

    // select the template that the user needs to create
    const answer: Answers = await inquirer.prompt([templatePrompts]);
    // downloading repo from remote
    await waitFnloading<string>(download, '🚀 downloading Repo....')(answer.template, cacheArray[1]);

    // reading the base directory and operate on the target template
    const operateJson = JSON.parse(fs.readFileSync(`${cacheArray[0]}/operate.json`, 'utf8'));

    // get remote template name
    const remoteProjectReg = /(https\:\/\/github\.com\:finoer\/)|(\#[A-Za-z]*)/g;
    const remoteProject = answer.template.replace(remoteProjectReg, '');

    /** */
    if (operateJson[remoteProject]) {

      // remove target folder file
      await this.removeMultipleDir(operateJson[remoteProject].delete, cacheArray[1]);

      // copy the initial file from the base inquiry
      await this.copyMultipleDir(operateJson[remoteProject].replace, cacheArray[1], cacheArray[0]);
    }

    // generator project from cache dir
    MetalSmith(__dirname)
      .source(cacheArray[1])
      .destination(this.targetDir)
      .use(async (files: MetalSmith.Files, metal: MetalSmith, done: MetalSmith.Callback) => {

        // set basic project information like project name, author, description....
        const projectInfoPrompt = operateJson[remoteProject].prompts
        const projectInfo = await inquirer.prompt(projectInfoPrompt);

        const meta = metal.metadata();

        Object.assign(meta, projectInfo);

        delete files['prompts.json']

        done(null, files, metal);
      })
      .use(async (files: MetalSmith.Files, metal: MetalSmith, done: MetalSmith.Callback) => {
        Object.keys(files).map(async (file: string) => {
          if (file === 'package.json') {
            const info = metal.metadata()
            let content = JSON.parse(files[file].contents.toString());

            Object.assign(content, info);
            // writing
            files[file].contents = Buffer.from(JSON.stringify(content))
          }
        })
        done(null, files, metal);
      })
      .build(() => {
        console.log(logSymbols.success, chalk.green('创建成功:)，准备执行install～'));

        this.server()

        // ExtensionScriptApis()

      });
  }

  /**
   *
   * @param base
   * @param dirs
   */
  async removeMultipleDir(dirArray: string[], base?: string,) {
    if (!dirArray) { return }

    const basePath = base ? base + '/' : ''

    for (let i = 0; i < dirArray.length; i++) {
      const targetFile = dirArray[i];
      await fs.remove(`${basePath}${targetFile}`);
    }
  }

  async copyMultipleDir(dirArray: string[], dest: string, base?: string,) {
    if (!dirArray) { return }

    const basePath = base ? base + '/' : ''
    for (let i = 0; i < dirArray.length; i++) {
      const targetFile = dirArray[i];

      await fs.copySync(`${basePath}/${targetFile}`, dest);
    }
  }

  server() {
    execa('npm', ['install'], {
      cwd: this.targetDir,
      stdio: 'inherit'
    }).then((result: execa.ExecaReturnValue<string>) => {
      console.log(chalk.green(result));
      execa('npm', ['run', 'dev'], {
        cwd: this.targetDir,
        stdio: 'inherit'
      }).then((res: execa.ExecaReturnValue<string>) => {
        console.log(chalk.green(res));
      })
    })
  }
}

export default Creator;
