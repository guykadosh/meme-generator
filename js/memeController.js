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
    drawSelectedRect(meme.lines[meme.selectedLineIdx])
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
  gCtx.lineWidth = 0.2
  gCtx.fillStyle = line.color
  gCtx.strokeStyle = line.stroke
  gCtx.font = `${line.weight} ${line.fontSize}px ${line.font}`
  gCtx.fillText(text, x, y)

  gCtx.strokeText(text, x, y)
}

function drawSelectedRect(line) {
  textWidth = getLineWidth()
  textHeight = line.fontSize

  gCtx.lineWidth = 1
  gCtx.strokeStyle = '#f8f9fa'
  gCtx.strokeRect(
    line.pos.x - 5,
    line.pos.y - textHeight + 5,
    textWidth + 10,
    textHeight + 5
  )
  gCtx.stroke()
}

function onSetTextLine(txt) {
  const line = setTextLine(txt)

  setLineWidth(gCtx.measureText(line.txt).width)

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
  const line = changeFontSize(diff)

  setLineWidth(gCtx.measureText(line.txt).width)

  renderMeme()
}

function onSwitchTextLine() {
  const line = switchSelectedLine()

  const elInput = document.querySelector('.text-line')

  if (line.txt !== getPlaceholder()) {
    elInput.value = line.txt
  } else {
    elInput.value = ''
    elInput.setAttribute('placeholder', getPlaceholder())
  }

  renderMeme()
}

function onMoveLine(diff) {
  moveLine(diff)

  renderMeme()
}

function onAddLine() {
  addLine()
  document
    .querySelector('.text-line')
    .setAttribute('placeholder', getPlaceholder())
  renderMeme()
}

function onRemoveLine() {
  removeLine()

  renderMeme()
}

function onSetTextAlign(align) {
  setTextAlign(align)

  renderMeme()
}

function onSetFontFamily(fontFamily) {
  setFontFamily(fontFamily)

  renderMeme()
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container')
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = elContainer.offsetHeight
  renderMeme()
}
