const gKeywordSearchCountMap = {
  funny: 24,
  cat: 16,
  baby: 8,
  tv: 10,
  cool: 18,
  politics: 20,
  tv: 18,
}

const gKeywords = [
  'tv',
  'politics',
  'evil',
  'baby',
  'funny',
  'cute',
  'cool',
  'inspire',
  'clown',
  'lovely',
  'popular',
]

function getKeywords() {
  return gKeywords
}

function getKeywordsMap() {
  return gKeywordSearchCountMap
}

function increaseClickCount(key) {
  gKeywordSearchCountMap[key]++
}
