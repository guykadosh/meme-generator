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

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      align: 'left',
      color: 'red',
      stroke: 'black',
      font: 'Arial',
      fontSize: '40px',
      pos: { x: 10, y: 100 },
    },
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      align: 'left',
      color: 'red',
      stroke: 'black',
      font: 'Arial',
      fontSize: '40px',
      pos: { x: 10, y: 150 },
    },
  ],
}

function getMeme() {
  return gMeme
}

function setTextLine(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
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
  const num = +gMeme.lines[gMeme.selectedLineIdx].fontSize.match(/(\d+)/)[0]
  gMeme.lines[gMeme.selectedLineIdx].fontSize = `${num + diff}px`
}

function switchSelectedLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx === gMeme.lines.length) {
    gMeme.selectedLineIdx = 0
  }
  console.log(gMeme.selectedLineIdx)
}
