import * as readmyfcomic from './readmyfcomic';

export default [
  {
    project_code: 'readmyfcomic',
    entity: 'user',
    apply: client_document => {
      readmyfcomic.apply_complete_name(client_document);
      readmyfcomic.apply_views_count(client_document);
      readmyfcomic.apply_rating_average(client_document);
      client_document.value.ratings = undefined;
      client_document.value.views = undefined;
    }
  },
  {
    project_code: 'readmyfcomic',
    entity: 'forum',
    apply: client_document => {
      readmyfcomic.apply_comments_count(client_document);
      readmyfcomic.apply_views_count(client_document);
      client_document.value.comments = undefined;
      client_document.value.views = undefined;
    }
  }
];
