import { Command } from 'commander';
import { packageInfo } from './lib/contants'
import create from './create'

const program = new Command('fino-cli');

program.version(packageInfo.version)

program
  .command('create <project-name>')
  .alias('c')
  .description('create a fino project')
  .action((projectName) => {
    create(projectName)
  })
  .parse(process.argv)

