'use strict'

let gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

// Drawing
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
  console.log(line.width)
  const lineArea = getLineArea(line)
  gCtx.lineWidth = 1
  gCtx.strokeStyle = '#f8f9fa'

  gCtx.strokeRect(
    lineArea.x - 5,
    lineArea.y - lineArea.height + 5,
    lineArea.width,
    lineArea.height
  )

  gCtx.stroke()
}

// Events on Canvas
function onDown(ev) {
  //Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  const lineIdx = getClickedLine(pos)

  if (lineIdx === -1) return

  setSelectedLine(lineIdx)

  const line = getLineByIdx(lineIdx)
  updateInputVal(line)

  renderMeme()
  setLineDrag(true)
  //Save the pos we start from
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const line = getSelectedLine()
  if (!line.isDrag) return

  const pos = getEvPos(ev)
  //Calc the delta , the diff we moved
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  dragLine(dx, dy)
  //Save the last pos , we remember where we`ve been and move accordingly
  gStartPos = pos

  //Update Meme
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}

function resizeCanvas(doRender = true) {
  var elContainer = document.querySelector('.canvas-container')
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = elContainer.offsetHeight
  if (doRender) renderMeme()
}

function getEvPos(ev) {
  //Gets the offset pos , the default pos
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (gTouchEvs.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
