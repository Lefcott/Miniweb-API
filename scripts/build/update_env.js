import fs from 'fs';

import projectDir from '../../src/utils/projectDir';

export const updateEnv = () =>
  new Promise(resolve => {
    fs.unlink(`${projectDir}/src/env.json`, async error => {
      if (error) console.error(error);
      fs.writeFile(`${projectDir}/src/env.json`, JSON.stringify(process.env), writeError => {
        if (writeError) console.error(writeError);
        resolve(true);
      });
    });
  });
