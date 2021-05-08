import User from '../../models/User';
import ItemModel from '../../models/ItemModel';
import Project from '../../models/Project';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.find_from_session(session);
  const project = await Project.find_by_code(params.project_code);

  user.validate_project_ownership(project);
  const item_model = await ItemModel.findOne({ entity: params.item_model_entity });

  res.json(item_model);
};
