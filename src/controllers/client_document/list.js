import ClientDocument from '../../models/ClientDocument';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ query }, res) => {
  const client_documents = await ClientDocument.search(query);

  res.status(200).json(client_documents.map(client_document => client_document.serialize()));
};
