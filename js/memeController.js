'use strict'

function renderMeme() {
  const meme = getMeme()
  const img = getImg(meme.selectedImgId)

  const imgDraw = new Image()
  imgDraw.src = img.url

  const elContainer = document.querySelector('.canvas-container')
  console.log(imgDraw.height, imgDraw.width)
  console.log(elContainer.height)
  gCanvas.height = (gCanvas.width * imgDraw.height) / imgDraw.width
  console.log(elContainer.height)
  // resizeCanvas(false)

  gCtx.restore()
  drawImg(img.url)

  setTimeout(() => {
    meme.lines.forEach(line => drawText(line))
    drawSelectedRect(meme.lines[meme.selectedLineIdx])
    gCtx.save()
  }, 10)
}

function renderEmojis() {
  const emojis = getEmojis()
  const strHTMLs = emojis.map(
    emoji => `<span onclick="onAddLine('${emoji}')">${emoji}</span>`
  )

  document.querySelector('.emoji-selector').innerHTML = strHTMLs.join('')
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

  setLineWidth(calcualteTextWidth(line))

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

function onAddLine(txt = '') {
  const line = txt ? addLine(txt) : addLine()
  document
    .querySelector('.text-line')
    .setAttribute('placeholder', getPlaceholder())

  setLineWidth(calcualteTextWidth(line))
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

  const num = getRandomIntInc(0, 2)

  console.log(num)
  // if num = 2 add another sentence
  if (num === 2) {
    addLine(getRandomSentence())
    generateRandomLine(1)
  }
}

function generateRandomLine(lineIdx) {
  setTextLine(getRandomSentence(), lineIdx)
  setFontSize(getRandomIntInc(20, 40), lineIdx)
  setStrokeColor(getRandomColor(), lineIdx)
  setFillColor(getRandomColor(), lineIdx)

  const line = getLineByIdx(lineIdx)
  setLineWidth(calcualteTextWidth(line), line)

  // Resize until fits the canvas
  while (line.width > gCanvas.width) {
    line.fontSize -= 2
    setLineWidth(calcualteTextWidth(line), line)
  }
}

function calcualteTextWidth(line) {
  gCtx.font = `${line.fontSize}px ${line.font}`
  const metrics = gCtx.measureText(line.txt)
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
