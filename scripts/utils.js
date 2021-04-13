import { exec } from 'child_process';

const logger = (error, stdout, stderr) => {
  if (error) console.error(error);
  if (stdout) console.error(stdout);
  if (stderr) console.error(stderr);
};

export const run = command => exec(command, logger);
