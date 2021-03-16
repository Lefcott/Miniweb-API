export default [
  {
    project_code: 'readmyfcomic',
    entity: 'user',
    calculate: client_document => {
      client_document.value.complete_name = client_document.value.name;
      if (client_document.value.surname)
        client_document.value.complete_name += ` ${client_document.value.surname}`;
      client_document.value.views_count = client_document.value.views.length;
      client_document.value.rating_average =
        client_document.value.ratings.reduce((total, rating) => total + rating.score, 0) /
        client_document.value.ratings.length;
    }
  }
];
