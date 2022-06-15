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
}

function onShowGallery() {
  document.querySelector('.gallery').style.display = 'flex'
  document.querySelector('.editor-container').style.display = 'none'
}
