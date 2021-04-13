import moment from 'moment';

import '../../src/load_env';
import '../../src/globals';
import '../../src/database';

import { dbRepourl } from '../config';
import { run } from '../utils';

import { makeBackup } from './makeBackup';

const repoName = 'DB-Backup';

run(
  `
  git clone ${dbRepourl} ${repoName};
  git config user.email "lefcott@hotmail.com";
  git config user.name "updater";
`
).on('exit', async () => {
  await makeBackup(repoName);
  run(`
      cd ${repoName};
      git config user.name "updater";
      git add .;
      git commit -m "Update DB ${moment().format('DD/MM/YYYY hh:mm A')}";
      git push origin master;
`).on('exit', () => {
    run(`rm -rf ./${repoName};`).on('exit', () => {
      process.exit();
    });
  });
});
