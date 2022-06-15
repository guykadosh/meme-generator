let gCanvas
let gCtx

function init() {
  gCanvas = document.querySelector('.canvas')
  gCtx = gCanvas.getContext('2d')

  window.addEventListener('resize', resizeCanvas)
}

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}
