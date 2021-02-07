import ChecklistItem from '../../models/ChecklistItem';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ query, session }, res) => {
  const checklistItems = await ChecklistItem.find({ ...query, enabled: true });
  res.json(checklistItems);
};
