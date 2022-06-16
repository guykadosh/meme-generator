'use strict'

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

  updateInputVal(line)

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

function onSaveMeme() {
  saveMeme()
}

function generateRandomMeme() {
  const imgs = getImgs()
  const imgId = imgs[getRandomIntInc(0, imgs.length - 1)].id
  setImg(imgId)

  // Randomize first line
  generateRandomLine(0)

  const num = getRandomIntInc(0, 1)

  // if num = 1 add another sentence
  if (num) {
    addLine(getRandomSentence())
    generateRandomLine(1)
  }
}

function generateRandomLine(lineIdx) {
  // console.log(lineIdx)
  setTextLine(getRandomSentence(), lineIdx)
  setFontSize(getRandomIntInc(20, 40), lineIdx)
  setStrokeColor(getRandomColor(), lineIdx)
  setFillColor(getRandomColor(), lineIdx)
}

function calcualteTextWidth(txt) {
  const metrics = gCtx.measureText(txt)
  const width =
    Math.abs(metrics.actualBoundingBoxLeft) +
    Math.abs(metrics.actualBoundingBoxRight)

  return width
}

function updateInputVal(line) {
  const elInput = document.querySelector('.text-line')

  if (line.txt !== getPlaceholder()) {
    elInput.value = line.txt
  } else {
    elInput.value = ''
    elInput.setAttribute('placeholder', getPlaceholder())
  }
}
