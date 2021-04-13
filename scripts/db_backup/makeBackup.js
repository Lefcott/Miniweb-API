import mongoose from 'mongoose';

import fs from 'fs';

export const makeBackup = async repoName =>
  new Promise(resolve => {
    mongoose.connection.on('open', () => {
      mongoose.connection.db.listCollections().toArray(async (err, collections) => {
        if (err) throw err;
        if (!fs.existsSync(`${repoName}/database`)) fs.mkdirSync(`${repoName}/database`);
        for (let i = 0; i < collections.length; i += 1) {
          const { name } = collections[i];
          const docs = await mongoose.connection.collection(name).find({}).toArray();
          fs.writeFileSync(`${repoName}/database/${name}.json`, JSON.stringify(docs, null, 2));
          log(`wrote ${docs.length} documents in collection ${name}`);
        }

        resolve();
      });
    });
  });
