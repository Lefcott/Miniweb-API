import * as readmyfcomic from './readmyfcomic';

export default [
  {
    project_code: 'readmyfcomic',
    entity: 'user',
    apply: item => {
      readmyfcomic.apply_complete_name(item);
      readmyfcomic.apply_views_count(item);
      readmyfcomic.apply_rating_average(item);
      item.value.ratings = undefined;
      item.value.views = undefined;
    }
  },
  {
    project_code: 'readmyfcomic',
    entity: 'comic',
    apply: item => {
      readmyfcomic.apply_views_count(item);
      item.value.views = undefined;
    }
  },
  {
    project_code: 'readmyfcomic',
    entity: 'forum',
    apply: item => {
      readmyfcomic.apply_comments_count(item);
      readmyfcomic.apply_views_count(item);
      item.value.comments = undefined;
      item.value.views = undefined;
    }
  }
];
