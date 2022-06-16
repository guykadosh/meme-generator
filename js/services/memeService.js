'user strict'

const gPlaceholder = 'Write Something Here...'
const KEY = 'memesDB'

const gEmojis = [
  '😎',
  '😁',
  '😍',
  '🤣',
  '😪',
  '💩',
  '🤬',
  '🙈',
  '🙉',
  '🙊',
  '🤐',
]

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

function getMemes() {
  return gMemes
}

function getMeme() {
  return gMeme
}

function getEmojis() {
  return gEmojis
}

function setMeme(memeIdx) {
  gMeme = gMemes[memeIdx]
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function getLineByIdx(lineIdx) {
  return gMeme.lines[lineIdx]
}

function setTextLine(txt, lineIdx = gMeme.selectedLineIdx) {
  gMeme.lines[lineIdx].txt = txt

  return gMeme.lines[lineIdx]
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setFillColor(color, lineIdx = gMeme.selectedLineIdx) {
  gMeme.lines[lineIdx].color = color
}

function setStrokeColor(color, lineIdx = gMeme.selectedLineIdx) {
  gMeme.lines[lineIdx].stroke = color
}

function setFontSize(size, lineIdx = gMeme.selectedLineIdx) {
  gMeme.lines[lineIdx].fontSize = size
}

function changeFontSize(diff, lineIdx = gMeme.selectedLineIdx) {
  gMeme.lines[lineIdx].fontSize += diff

  return gMeme.lines[lineIdx]
}

function switchSelectedLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    gMeme.selectedLineIdx = 0
  }

  return gMeme.lines[gMeme.selectedLineIdx]
}

function setSelectedLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx

  return gMeme.lines[gMeme.selectedLineIdx]
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
      x >= lineArea.x &&
      x <= lineArea.x + lineArea.width &&
      y <= lineArea.y &&
      y >= lineArea.y - lineArea.height
    )
  })

  return lineIdx
}

function setLineWidth(width, line = gMeme.lines[gMeme.selectedLineIdx]) {
  line.width = width
  return width
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
  gMeme.lines[gMeme.selectedLineIdx].font = fontFamily
}

function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function dragLine(dx, dy) {
  const line = getSelectedLine()

  line.pos.x += dx
  line.pos.y += dy
}

function saveMeme() {
  gMemes.push(JSON.parse(JSON.stringify(gMeme)))

  _saveMemesToStorage()
}

function getPlaceholder() {
  return gPlaceholder
}

function _createLine(txt, y = 100) {
  return {
    txt,
    size: 20,
    align: 'start',
    color: '#fff',
    stroke: 'black',
    font: 'Impact',
    weight: '700',
    width: 382.4,
    fontSize: 30,
    pos: { x: 10, y },
    isDrag: false,
  }
}

function _loadMemesFromStorage() {
  gMemes = loadFromStorage(KEY)

  if (!gMemes) gMemes = []
}

function _saveMemesToStorage() {
  saveToStorage(KEY, gMemes)
}
