import * as utils from './utils';

export default [
  {
    project_code: 'readmyfcomic',
    entity: 'user',
    apply: client_document => {
      utils.apply_complete_name(client_document);
      utils.apply_views_count(client_document);
      utils.apply_rating_average(client_document);
      client_document.value.ratings = undefined;
      client_document.value.views = undefined;
    }
  }
];
