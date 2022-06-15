'user strict'

// TODO: Code a function renderMeme() that renders an image
// on the canvas and a line of text on top

// renderMeme()
function renderMeme() {
  const meme = getMeme()
  const img = getImg(meme.selectedImgId)
  gCtx.restore()
  drawImg(img.url)
  gCtx.font = '48px Ariel'
  setTimeout(() => {
    drawText(meme.lines[meme.selectedLineIdx].txt, 100, 100)
    gCtx.save()
  }, 10)
}

function drawImg(url) {
  var img = new Image()
  img.src = url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
  }
}

function drawText(text, x, y) {
  console.log(text, x, y)
  gCtx.lineWidth = 1
  gCtx.fillStyle = '#fff'
  gCtx.strokeStyle = '#000'

  gCtx.fillText(text, x, y, 300)
  gCtx.strokeText(text, x, y, 300)
}

function onSetTextLine(txt) {
  setTextLine(txt)

  renderMeme()
}
