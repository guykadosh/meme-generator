'user strict'

const memesSentences = [
  'I never eat falafel',
  'DOMS DOMS EVERYWHERE',
  'Stop Using i in for loops',
  'Armed in knowledge',
  'Js error "Unexpected String"',
  'One does not simply write js',
  'I`m a simple man i see vanilla JS, i click like!',
  'JS, HTML,CSS?? Even my momma can do that',
  'May the force be with you',
  'I know JS',
  'JS Where everything is made up and the rules dont matter',
  'Not sure if im good at programming or good at googling',
  'But if we could',
  'JS what is this?',
  'Write hello world , add to cv 7 years experienced',
]

const gPlaceholder = 'Write Something Here...'

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: gPlaceholder,
      size: 20,
      align: 'start',
      color: '#fff',
      stroke: 'black',
      weight: '700',
      font: 'Impact',
      fontSize: 40,
      pos: { x: 10, y: 100 },
    },
  ],
}

function getMeme() {
  return gMeme
}

function setTextLine(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt

  return gMeme.lines[gMeme.selectedLineIdx]
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setFillColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setStrokeColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].stroke = color
}

function changeFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].fontSize += diff

  return gMeme.lines[gMeme.selectedLineIdx]
}

function switchSelectedLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    gMeme.selectedLineIdx = 0
  }

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

function addLine() {
  let y = gMeme.lines[gMeme.selectedLineIdx].pos.y + 50
  if (y >= gCanvas.height - gMeme.lines[gMeme.selectedLineIdx].fontSize) y = 50

  const line = {
    txt: gPlaceholder,
    size: 20,
    align: 'start',
    color: '#fff',
    stroke: 'black',
    font: 'Impact',
    weight: '700',
    fontSize: 40,
    pos: { x: 10, y },
  }

  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
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

function setLineWidth(width) {
  gMeme.lines[gMeme.selectedLineIdx].width = width
  return width
}

function setTextAlign(align) {
  gMeme.lines[gMeme.selectedLineIdx].align = align

  const line = gMeme.lines[gMeme.selectedLineIdx]
  console.log(line.align)
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

function getPlaceholder() {
  return gPlaceholder
}
