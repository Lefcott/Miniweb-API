import fs from 'fs';

import projectDir from '../../src/utils/projectDir';

export const updateEnv = () =>
  new Promise(resolve => {
    fs.unlink(`${projectDir}/src/env.json`, async error => {
      if (error) console.error(error);
      const env = `{\n  ${Object.keys(process.env)
        .map(key => `"${key}": "${process.env[key].replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`)
        .join(',\n  ')}\n}\n`;
      fs.writeFile(`${projectDir}/src/env.json`, env, writeError => {
        if (writeError) console.error(writeError);
        resolve(true);
      });
    });
  });
