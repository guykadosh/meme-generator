let gCanvas
let gCtx

function init() {
  // Canvas
  gCanvas = document.querySelector('.canvas')
  gCtx = gCanvas.getContext('2d')

  renderGallery()
  renderSavedMemes()
  renderKeywords()
  renderDatalistKeywords()
  renderEmojis()
  initGMeme()

  // Events Listeners
  window.addEventListener('resize', resizeCanvas)
  addMouseListeners()
  addTouchListeners()
}

function toggleMenu() {
  document.body.classList.toggle('menu-open')
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
