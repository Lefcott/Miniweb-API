import FormResponse from '../../models/FormResponse';
import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, query, params }, res) => {
  const user = await User.find_from_session(session);

  user.validate_project_ownership({}, params.project_code);

  const form_responses = await FormResponse.search(query, params);

  res.json(form_responses.map(form_response => form_response.sanitize()));
};
