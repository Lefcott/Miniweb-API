import Configuration from '../../models/Configuration';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ query }, res) => {
  const configurations = await Configuration.find(query);
  res.json(configurations);
};
