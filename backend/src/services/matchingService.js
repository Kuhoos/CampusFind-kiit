function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function removeStopWords(tokens) {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'is', 'it',
    'at', 'by', 'be', 'this', 'that', 'from', 'as', 'my', 'your', 'our', 'their', 'was',
    'were', 'into', 'out', 'up', 'down', 'near', 'inside', 'around'
  ]);

  return tokens.filter((token) => !stopWords.has(token));
}

function jaccardSimilarity(left, right) {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  const intersection = [...leftSet].filter((value) => rightSet.has(value)).length;
  const union = new Set([...leftSet, ...rightSet]).size;

  if (union === 0) return 0;
  return intersection / union;
}

function computeMatchScore(lostItem, foundItem) {
  const categoryWeight = 30;
  const keywordWeight = 40;
  const locationWeight = 20;
  const dateWeight = 10;

  const categoryScore = lostItem.category && foundItem.category && lostItem.category === foundItem.category ? categoryWeight : 0;

  const lostTokens = removeStopWords(normalizeText(lostItem.title + ' ' + lostItem.description + ' ' + lostItem.brand + ' ' + lostItem.color));
  const foundTokens = removeStopWords(normalizeText(foundItem.title + ' ' + foundItem.description + ' ' + foundItem.brand + ' ' + foundItem.color));
  const keywordScoreValue = Math.round(jaccardSimilarity(lostTokens, foundTokens) * keywordWeight);

  const locationScoreValue = lostItem.location && foundItem.location && String(lostItem.location).toLowerCase() === String(foundItem.location).toLowerCase()
    ? locationWeight
    : 0;

  const dateDistance = Math.abs(new Date(lostItem.date).getTime() - new Date(foundItem.date).getTime());
  const days = Math.max(1, dateDistance / (1000 * 60 * 60 * 24));
  const dateScoreValue = days <= 7 ? dateWeight : Math.max(0, Math.round((7 / Math.min(days, 30)) * dateWeight));

  const total = categoryScore + keywordScoreValue + locationScoreValue + dateScoreValue;

  return {
    categoryScore,
    keywordScore: keywordScoreValue,
    locationScore: locationScoreValue,
    dateScore: dateScoreValue,
    totalScore: Math.min(total, 100)
  };
}

module.exports = {
  normalizeText,
  removeStopWords,
  jaccardSimilarity,
  computeMatchScore
};
