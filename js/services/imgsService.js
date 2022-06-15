'use strict'

const gImgs = [
  { id: 1, url: 'images/memes/1.jpg', keywords: ['politics', 'funny'] },
  { id: 2, url: 'images/memes/2.jpg', keywords: ['cute', 'puppy'] },
  { id: 3, url: 'images/memes/3.jpg', keywords: ['cute', 'baby'] },
]

function getImgs() {
  return gImgs
}

function getImg(imgId) {
  return gImgs.find(img => img.id === imgId)
}
