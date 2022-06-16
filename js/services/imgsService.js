'use strict'

const gImgs = [
  { id: 1, url: 'images/memes/1.jpg', keywords: ['politics', 'funny'] },
  { id: 2, url: 'images/memes/2.jpg', keywords: ['cute', 'puppy'] },
  { id: 3, url: 'images/memes/3.jpg', keywords: ['cute', 'baby'] },
  { id: 4, url: 'images/memes/4.jpg', keywords: ['cute', 'cat'] },
  { id: 5, url: 'images/memes/5.jpg', keywords: ['victory', 'baby'] },
  { id: 6, url: 'images/memes/6.jpg', keywords: ['funny', 'popular'] },
  { id: 7, url: 'images/memes/7.jpg', keywords: ['cute', 'baby'] },
  { id: 8, url: 'images/memes/8.jpg', keywords: ['funny', 'clown'] },
  { id: 9, url: 'images/memes/9.jpg', keywords: ['evil', 'baby'] },
  { id: 10, url: 'images/memes/10.jpg', keywords: ['funny', 'politics'] },
  { id: 11, url: 'images/memes/11.jpg', keywords: ['lovely', 'sport'] },
  { id: 12, url: 'images/memes/12.jpg', keywords: ['tv', 'inspire'] },
  { id: 13, url: 'images/memes/13.jpg', keywords: ['tv', 'inspire'] },
  { id: 14, url: 'images/memes/14.jpg', keywords: ['tv', 'cool'] },
  { id: 15, url: 'images/memes/15.jpg', keywords: ['tv', 'cool'] },
  { id: 16, url: 'images/memes/16.jpg', keywords: ['tv', 'funny'] },
  { id: 17, url: 'images/memes/17.jpg', keywords: ['politics', 'evil'] },
  { id: 18, url: 'images/memes/18.jpg', keywords: ['tv', 'toy'] },
  { id: 19, url: 'images/memes/19.jpg', keywords: ['tv', 'toy'] },
  { id: 20, url: 'images/memes/20.jpg', keywords: ['tv', 'toy'] },
  { id: 21, url: 'images/memes/21.jpg', keywords: ['tv', 'toy'] },
  { id: 22, url: 'images/memes/22.jpg', keywords: ['tv', 'toy'] },
  { id: 23, url: 'images/memes/23.jpg', keywords: ['tv', 'toy'] },
  { id: 24, url: 'images/memes/24.jpg', keywords: ['tv', 'toy'] },
]

let gId = 25

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

const gFilterBy = {
  txt: '',
  key: '',
}

function getImgs() {
  let imgs = gImgs

  if (gFilterBy.txt) {
    console.log('i got in')
    imgs = imgs.filter(img =>
      img.keywords.some(key => key.includes(gFilterBy.txt))
    )
    console.log(imgs)
  }

  return imgs
}

function getImg(imgId) {
  return gImgs.find(img => img.id === imgId)
}

function getKeywords() {
  return gKeywords
}

function setFilterByTxt(txt) {
  gFilterBy.txt = txt
  console.log(gFilterBy)
}

function setUploadedImg(img) {
  const imgItem = {
    id: gId++,
    url: img.src,
    keywords: ['tv', 'toy'],
  }

  gImgs.push(imgItem)

  return imgItem
}
