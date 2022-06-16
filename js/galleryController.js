'use strict'

renderGallery()
function renderGallery() {
  const imgs = getImgs()

  const strHTMLs = imgs.map(
    img => `<article class="gallery-img" onclick="onImgSelect(${img.id})">
              <img src="${img.url}"  alt="" />
            </article> `
  )

  document.querySelector('.gallery-imgs').innerHTML = strHTMLs.join('')
}

renderSavedMemes()
function renderSavedMemes() {
  const imgs = getImgs()
  const memes = getMemes()

  const strHTMLs = memes.map(
    (meme, idx) => `<article class="gallery-img" onclick="onMemeSelect(${idx})">
              <img src="${imgs[meme.selectedImgId].url}"  alt="" />
            </article> `
  )

  document.querySelector('.gallery-memes').innerHTML = strHTMLs.join('')
}

function onMemeSelect(memeIdx) {
  setMeme(memeIdx)

  document.querySelector('.memes').style.display = 'none'
  document.querySelector('.editor-container').style.display = 'flex'

  renderMeme()
  resizeCanvas()
}

function onImgSelect(imgId) {
  setImg(imgId)

  document.querySelector('.gallery').style.display = 'none'
  document.querySelector('.editor-container').style.display = 'flex'

  renderMeme()
  resizeCanvas()
}

function onLoadGallery() {
  document.querySelector('.hero').classList.add('hero-hidden')
  document.querySelector('.header').style.opacity = '1'
  document.querySelector('.gallery').style.display = 'flex'
  document.querySelector('.footer').style.display = 'flex'
}

function onShowGallery() {
  document.querySelector('.gallery').style.display = 'flex'
  document.querySelector('.editor-container').style.display = 'none'
  document.querySelector('.memes').style.display = 'none'

  initGMeme()
}

function onShowSavedMemes() {
  document.querySelector('.gallery').style.display = 'none'
  document.querySelector('.editor-container').style.display = 'none'
  document.querySelector('.memes').style.display = 'block'
}

function onGenerateRandomMeme() {
  document.querySelector('.gallery').style.display = 'none'
  document.querySelector('.editor-container').style.display = 'flex'

  resizeCanvas()
  generateRandomMeme()

  renderMeme()
}
