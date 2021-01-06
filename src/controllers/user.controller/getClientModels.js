import User from '../../models/User';
import ClientModel from '../../models/ClientModel';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.validateSession(session, params);
  const client_models = await ClientModel.find({ table_name: user.table_names });

  res.status(200).json(client_models);
};
