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
  { id: 18, url: 'images/memes/18.jpg', keywords: ['funny', 'popular'] },
  { id: 19, url: 'images/memes/19.jpg', keywords: ['funny', 'popular'] },
  { id: 20, url: 'images/memes/20.jpg', keywords: ['funny', 'popular'] },
  { id: 21, url: 'images/memes/21.jpg', keywords: ['funny', 'tv'] },
  { id: 22, url: 'images/memes/22.jpg', keywords: ['funny', 'popular'] },
  { id: 23, url: 'images/memes/23.jpg', keywords: ['funny', 'popular'] },
  { id: 24, url: 'images/memes/24.jpg', keywords: ['funny', 'kids'] },
  { id: 25, url: 'images/memes/25.jpg', keywords: ['funny', 'kids'] },
  { id: 26, url: 'images/memes/26.jpg', keywords: ['funny', 'kids'] },
  { id: 27, url: 'images/memes/27.jpg', keywords: ['funny', 'kids'] },
  { id: 28, url: 'images/memes/28.jpg', keywords: ['funny', 'kids'] },
  { id: 29, url: 'images/memes/29.jpg', keywords: ['funny', 'kids'] },
]

let gId = 25

const gFilterBy = {
  txt: '',
  key: '',
}

function getImgs() {
  let imgs = gImgs

  if (gFilterBy.txt) {
    imgs = imgs.filter(img =>
      img.keywords.some(key => key.includes(gFilterBy.txt))
    )
  }

  return imgs
}

function getImg(imgId) {
  return gImgs.find(img => img.id === imgId)
}

function setFilterByTxt(txt) {
  gFilterBy.txt = txt
}

function setUploadedImg(img) {
  const imgItem = {
    id: gId++,
    url: img.src,
    keywords: ['popular', 'funny'],
  }

  gImgs.push(imgItem)

  return imgItem
}
