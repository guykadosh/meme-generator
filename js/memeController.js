'user strict'

// TODO: Code a function renderMeme() that renders an image
// on the canvas and a line of text on top

// renderMeme()
function renderMeme() {
  const meme = getMeme()
  const img = getImg(meme.selectedImgId)
  gCtx.restore()
  drawImg(img.url)

  setTimeout(() => {
    meme.lines.forEach(line => drawText(line))
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

function drawText(line) {
  const text = line.txt
  const { x, y } = line.pos
  gCtx.lineWidth = 0.5
  gCtx.fillStyle = line.color
  gCtx.strokeStyle = line.stroke
  gCtx.font = `${line.fontSize} ${line.font}`
  gCtx.fillText(text, x, y, 300)
  gCtx.strokeText(text, x, y, 300)
}

function onSetTextLine(txt) {
  setTextLine(txt)

  renderMeme()
}

function onChangeFillColor(color) {
  console.log(color)
  setFillColor(color)

  renderMeme()
}

function onChangeStrokeColor(color) {
  setStrokeColor(color)

  renderMeme()
}

function onChangeFontSize(diff) {
  changeFontSize(diff)

  renderMeme()
}
