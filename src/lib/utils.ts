import ora from 'ora'

export const waitFnloading = (fn: any, message: string) => async (...args: any[]) => {
  const spinner = ora(message);
  spinner.start();
  const result = await fn(...args);
  spinner.succeed();

  return result
}
