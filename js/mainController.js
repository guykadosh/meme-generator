let gCanvas
let gCtx

function init() {
  // Canvas
  gCanvas = document.querySelector('.canvas')
  gCtx = gCanvas.getContext('2d')

  // Intialize Model
  initGMeme()

  // Rendering
  renderGallery()
  renderSavedMemes()
  renderKeywords()
  renderDatalistKeywords()
  renderEmojis()

  // Events Listeners
  addEventListeners()
  addMouseListeners()
  addTouchListeners()
}

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}

function addEventListeners() {
  document.querySelector('.btn-download').addEventListener('click', onDownload)
}

function addMouseListeners() {
  gCanvas.addEventListener('mousemove', onMove)
  gCanvas.addEventListener('mousedown', onDown)
  gCanvas.addEventListener('mouseup', onUp)
  gCanvas.addEventListener('dblclick', onDoubleClick)
}

function addTouchListeners() {
  gCanvas.addEventListener('touchmove', onMove)
  gCanvas.addEventListener('touchstart', onDown)
  gCanvas.addEventListener('touchend', onUp)
}
