'user strict'

const gPlaceholder = 'Write Something Here...'
const KEY = 'memesDB'

let gMemes
let gMeme

_loadMemesFromStorage()

function initGMeme() {
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [_createLine(gPlaceholder)],
  }
}

// Getters
function getMemes() {
  return gMemes
}

function getMeme() {
  return gMeme
}

function getPlaceholder() {
  return gPlaceholder
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function getLineByIdx(lineIdx) {
  return gMeme.lines[lineIdx]
}

function getLineWidth() {
  return gMeme.lines[gMeme.selectedLineIdx].width
}

function getLineArea(line) {
  return {
    x: line.pos.x,
    y: line.pos.y,
    width: line.width + 5,
    height: line.fontSize + 5,
  }
}

function getClickedLine({ x, y }) {
  const lineIdx = gMeme.lines.findIndex(line => {
    const lineArea = getLineArea(line)

    return (
      x >= lineArea.x - 5 &&
      x <= lineArea.x + lineArea.width + 5 &&
      y <= lineArea.y + 5 &&
      y >= lineArea.y - lineArea.height - 5
    )
  })

  return lineIdx
}

// Setters
function setMeme(memeIdx) {
  gMeme = gMemes[memeIdx]
}

function setTextLine(txt, lineIdx = gMeme.selectedLineIdx) {
  gMeme.lines[lineIdx].txt = txt

  return gMeme.lines[lineIdx]
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setSelectedLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx

  return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineWidth(width, line = gMeme.lines[gMeme.selectedLineIdx]) {
  line.width = width
  return width
}

// Colors
function setFillColor(color, lineIdx = gMeme.selectedLineIdx) {
  gMeme.lines[lineIdx].color = color
}

function setStrokeColor(color, lineIdx = gMeme.selectedLineIdx) {
  gMeme.lines[lineIdx].stroke = color
}

// Fonts
function setFontSize(size, lineIdx = gMeme.selectedLineIdx) {
  gMeme.lines[lineIdx].fontSize = size
}

function setTextAlign(align) {
  gMeme.lines[gMeme.selectedLineIdx].align = align

  const line = gMeme.lines[gMeme.selectedLineIdx]

  switch (line.align) {
    case 'start':
      line.pos.x = 10
      break

    case 'center':
      line.pos.x = (gCanvas.width - line.width) / 2
      break

    case 'end':
      line.pos.x = gCanvas.width - 10 - line.width
      break
  }
}

function setFontFamily(fontFamily) {
  const line = getSelectedLine()
  line.font = fontFamily

  return line
}

// Line state setters
function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function setLineResize(isResize) {
  const line = getSelectedLine()
  line.isResize = isResize
}

function setLineRotate(isRotate) {
  const line = getSelectedLine()
  line.isRotate = isRotate
}

function setNewLineSizes(ratio) {
  gMeme.lines.forEach(line => {
    line.fontSize *= ratio
    line.width *= ratio
  })
}

// Additional Manipulation Functions
function addLine(txt = gPlaceholder) {
  let y = gMeme.lines[gMeme.lines.length - 1].pos.y + 50
  if (y >= gCanvas.height - gMeme.lines[gMeme.selectedLineIdx].fontSize) y = 50

  const line = _createLine(txt, y)

  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1

  return line
}

function removeLine() {
  if (gMeme.lines.length === 1) return true

  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  gMeme.selectedLineIdx = gMeme.lines.length - 1

  return false
}

function switchSelectedLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    gMeme.selectedLineIdx = 0
  }

  return gMeme.lines[gMeme.selectedLineIdx]
}

function changeFontSize(diff, lineIdx = gMeme.selectedLineIdx) {
  gMeme.lines[lineIdx].fontSize += diff

  return gMeme.lines[lineIdx]
}

function moveLine(diff) {
  const currY = gMeme.lines[gMeme.selectedLineIdx].pos.y
  const fontSize = gMeme.lines[gMeme.selectedLineIdx].fontSize
  if (
    (diff < 0 && currY <= fontSize + 5) ||
    (diff > 0 && currY >= gCanvas.height - fontSize / 2)
  ) {
    return
  }

  gMeme.lines[gMeme.selectedLineIdx].pos.y += diff

  return gMeme.lines[gMeme.selectedLineIdx]
}

function checkOnResize(pos) {
  const line = getSelectedLine()

  const corner = { x: line.pos.x + line.width + 5, y: line.pos.y - 25 }
  const distance = calcAbsDistace(pos, corner)

  return distance < 10
}

function checkOnRotate(pos) {
  const line = getSelectedLine()

  const center = {
    x: line.pos.x + line.width / 2,
    y: line.pos.y + 3,
  }

  const distance = calcAbsDistace(pos, center)
  return distance < 15
}

// Handle state changes
function dragLine(dx, dy) {
  const line = getSelectedLine()

  line.pos.x += dx
  line.pos.y += dy
}

function resizeLine(diff) {
  const line = getSelectedLine()

  // Dont let user go to awful sizes
  if ((line.fontSize < 15 && diff < 0) || (line.fontSize > 50 && diff > 0)) {
    return
  }

  line.fontSize += diff
}

// TODO: Fix this ;(
function rotateLine(diff) {
  const line = getSelectedLine()

  line.degree += diff
}

function saveMeme() {
  gMeme.dataImg = gCanvas.toDataURL('image/jpeg')
  gMemes.push(JSON.parse(JSON.stringify(gMeme)))

  _saveMemesToStorage()
}

// Private functions
function _createLine(txt, y = 100) {
  return {
    txt,
    align: 'start',
    color: '#fff',
    stroke: 'black',
    font: 'Impact',
    weight: '700',
    width: 388,
    fontSize: 40,
    pos: { x: 10, y },
    isDrag: false,
    isResize: false,
    isRotate: false,
    degree: 0,
  }
}

function _loadMemesFromStorage() {
  gMemes = loadFromStorage(KEY)

  if (!gMemes) gMemes = []
}

function _saveMemesToStorage() {
  saveToStorage(KEY, gMemes)
}
