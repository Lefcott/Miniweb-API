import word from 'similar-words';

export const set_scores = (intents, text) => {
  const user_words = word.getNormalizedWords(text);

  intents.forEach(intent => {
    intent.score = 0;
    intent.phrases.forEach(phrase => {
      const phrase_words = word.getNormalizedWords(phrase);
      let current_score = 0;
      phrase_words.forEach(phrase_word => {
        user_words
          .filter(_ => _)
          .forEach(user_word => {
            current_score += word.areSimilar(phrase_word, user_word);
          });
      });
      intent.score += current_score ** 4;
    });
  });
};

export const get_max_score_intent = (intents = []) => {
  const max_score = Math.max(...intents.map(intent => intent.score));

  if (!max_score)
    return intents.find(intent => ['Texto No Reconocido', 'Text Not Recognized'].includes(intent.name));

  return intents.find(intent => intent.score === max_score);
};
