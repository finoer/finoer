import { Command, Option } from 'commander';
import { DownloadRepo } from '@snower/d'
import ora from 'ora'

interface Options {
  [propName: string]: string;
}

/**
 * @func: commander passes the Command object itself as options,
 * extract only actual options into a fresh object.
 * @param ctx commander context
 */
export function getOptionsArg(ctx: Command): Options {
  const args: Options = {};

  ctx.options.forEach((option: Option) => {
    const key = camelize(option.long.replace(/^--/, ''));

    if(typeof ctx[key] !== 'undefined') {
      args[key] = ctx[key]
    }
  })

  return args
}

export function waitFnloading<T>(fn: (...restArg: Array<any>) => void, message: string) {
  return async (...args: Array<T>) => {
    const spinner = ora(message);
    spinner.start();
    const result = await fn(...args);
    spinner.succeed();
    return result
  }
}

export function download(api: string, dest: string) {
  const downloadRepo = new DownloadRepo();

  return new Promise((resolve) => {
    downloadRepo.download(api, dest, { clone: true }, () => {
      resolve()
    })
  })

}

function camelize(key: string) {
  return key.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}
