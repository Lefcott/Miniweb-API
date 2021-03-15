import ClientDocument from '../../models/ClientDocument';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ query }, res) => {
  const { count } = query;
  const client_documents = await ClientDocument.search(query);

  if (count) return res.json({ count: client_documents });

  res.json(client_documents.map(client_document => client_document.sanitize()));
};
