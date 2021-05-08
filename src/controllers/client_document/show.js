import Item from '../../models/Item';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const client_document = await Item.findById(params.client_document_id);

  if (!client_document) throw new NotFoundError('client document not found');

  res.json(client_document.sanitize(false));
};
