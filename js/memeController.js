'use strict'

function renderMeme(ignoreSelected = false) {
  const meme = getMeme()
  const imgDraw = new Image()
  const img = getImg(meme.selectedImgId)
  imgDraw.src = img.url
  gCtx.restore()

  console.log('got called')
  gCanvas.height = (gCanvas.width * imgDraw.height) / imgDraw.width

  drawImg(imgDraw)
  meme.lines.forEach(line => drawText(line))
  if (!ignoreSelected) drawSelectedRect(meme.lines[meme.selectedLineIdx])
}

function renderEmojis() {
  const emojis = getEmojis()
  const strHTMLs = emojis.map(
    emoji => `<span onclick="onAddLine('${emoji}')">${emoji}</span>`
  )

  document.querySelector('.emoji-selector').innerHTML = strHTMLs.join('')
}

// Handle Events From Editor

// Adding new line
function onAddLine(txt = '') {
  // Add to model with requested line or default one
  const line = txt ? addLine(txt) : addLine()

  // Set input placeholder
  document
    .querySelector('.text-line')
    .setAttribute('placeholder', getPlaceholder())

  // Calculate line width
  setLineWidth(calcualteTextWidth(line))

  renderMeme()
}

// Removing Line
function onRemoveLine() {
  removeLine()

  renderMeme()
}

// Toggle between selected lines
function onSwitchTextLine() {
  const line = switchSelectedLine()

  updateInputVal(line)

  renderMeme()
}

// Changes text from input
function onSetTextLine(txt) {
  const line = setTextLine(txt)

  setLineWidth(gCtx.measureText(line.txt).width)

  renderMeme()
}

// Changes text from input on canvas
function onSetTextInline(txt) {
  onSetTextLine(txt)

  const line = getSelectedLine()

  document.querySelector('.text-line').value = txt
  document.querySelector('.edit-input').style.width = `${line.width + 5}px`
}

// Next 2 Functions handle chaging colors fill and stroke
function onChangeFillColor(color) {
  setFillColor(color)

  renderMeme()
}

function onChangeStrokeColor(color) {
  setStrokeColor(color)

  renderMeme()
}

// Handling Fonts Size and family change
function onChangeFontSize(diff) {
  const line = changeFontSize(diff)

  setLineWidth(calcualteTextWidth(line))

  alert(`Font Size: ${line.fontSize}px`)
  renderMeme()
}

function onSetFontFamily(fontFamily) {
  setFontFamily(fontFamily)

  renderMeme()
}

function onSetTextAlign(align) {
  setTextAlign(align)

  renderMeme()
}

function onMoveLine(diff) {
  moveLine(diff)

  renderMeme()
}

function onSaveMeme() {
  saveMeme()

  alert('Meme Saved')
}

// Handle Generating Random meme with random img and lines
function generateRandomMeme() {
  const imgs = getImgs()
  const imgId = imgs[getRandomIntInc(0, imgs.length - 1)].id
  setImg(imgId)

  // Randomize first line
  generateRandomLine(0)

  const num = getRandomIntInc(0, 2)

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

  // Resize fontsize until fits the canvas
  while (line.width > gCanvas.width) {
    line.fontSize -= 2
    setLineWidth(calcualteTextWidth(line), line)
  }
}

// Calculate Text Width
function calcualteTextWidth(line) {
  gCtx.font = `${line.fontSize}px ${line.font}`
  const metrics = gCtx.measureText(line.txt)
  const width =
    Math.abs(metrics.actualBoundingBoxLeft) +
    Math.abs(metrics.actualBoundingBoxRight)

  return width
}

// Update input value with given line's text
function updateInputVal(line) {
  const elInput = document.querySelector('.text-line')

  if (line.txt !== getPlaceholder()) {
    elInput.value = line.txt
  } else {
    elInput.value = ''
    elInput.setAttribute('placeholder', getPlaceholder())
  }
}
