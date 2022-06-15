'use strict'

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

function onSetTextLine(txt) {
  const line = setTextLine(txt)

  setLineWidth(gCtx.measureText(line.txt).width)

  renderMeme()
}

function onChangeFillColor(color) {
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
  const line = addLine()
  document
    .querySelector('.text-line')
    .setAttribute('placeholder', getPlaceholder())

  setLineWidth(gCtx.measureText(line.txt).width)
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
