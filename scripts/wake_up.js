/* eslint-disable no-await-in-loop */
import axios from 'axios';

import wait from '../src/utils/wait';

const urls = [
  'http://dev.dancotll.com',
  'http://dev.dashboard.dancotll.com',
  'http://dev.businessgo-api.dancotll.com'
];

const execute = async () => {
  for (let i = 0; i < urls.length; i += 1) {
    const url = urls[i];
    axios.get(url);
    await wait(1000);
  }
};

execute();
