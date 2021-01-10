import ClientDocument from '../../models/ClientDocument';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const client_document = await ClientDocument.findById(params._id);

  if (!client_document) return res.status(404).json({ message: 'client document not found' });

  res.status(200).json(client_document);
};
