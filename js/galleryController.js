'use strict'

function renderGallery() {
  const imgs = getImgs()

  const strHTMLs = imgs.map(
    img => `<article class="gallery-img" onclick="onImgSelect(${img.id})">
              <img src="${img.url}"  alt="" />
            </article> `
  )

  document.querySelector('.gallery-imgs').innerHTML = strHTMLs.join('')
}

// TODO: render mini canvases ?

function renderSavedMemes() {
  const imgs = getImgs()
  const memes = getMemes()

  const strHTMLs = memes.map((meme, idx) => {
    const img = imgs.find(img => img.id === meme.selectedImgId)
    return `<article class="gallery-img" onclick="onMemeSelect(${idx})">
      <img src="${img.url}"  alt="" />
    </article> `
  })

  document.querySelector('.gallery-memes').innerHTML = strHTMLs.join('')
}

function renderDatalistKeywords() {
  const keywords = getKeywords()

  const strHTMLS = keywords.map(keyword => `<option value="${keyword}" />`)

  console.log(strHTMLS.join(''))
  document.querySelector('#keywords-list').innerHTML = strHTMLS.join('')
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

  renderSavedMemes()
}

function onGenerateRandomMeme() {
  document.querySelector('.gallery').style.display = 'none'
  document.querySelector('.editor-container').style.display = 'flex'

  resizeCanvas()
  generateRandomMeme()

  renderMeme()
}

function onSetFilterText(txt) {
  setFilterByTxt(txt)

  renderGallery()
}
