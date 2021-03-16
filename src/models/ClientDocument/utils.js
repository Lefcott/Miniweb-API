import effects from './effects';

export const apply_effects = client_document => {
  effects.forEach(effect => {
    if (effect.project_code !== client_document.project_code) return;
    if (effect.entity !== client_document.entity) return;
    effect.apply(client_document);
  });
};
