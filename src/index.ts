import { Command } from 'commander';
import { getOptionsArg } from './lib/utils';
import { initUserPreset } from './lib/create'

const program = new Command('fino-cli');

program
  .command('create <project-name>')
  .alias('c')
  .description('create a new project powered by fino-cli')
  .option('-t, --target <path>', 'set clone path directiery')
  .action((projectName, ctx: Command) => {
    // Get user incoming parameters
    const options = getOptionsArg(ctx);

    initUserPreset(projectName, options)

  }).parse(process.argv)
