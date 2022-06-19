'use strict'

let gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

// Handle Drawings
function drawImg(img) {
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function drawText(line) {
  const text = line.txt
  const { x, y } = line.pos

  // Style
  gCtx.lineWidth = 0.5
  gCtx.fillStyle = line.color
  gCtx.strokeStyle = line.stroke
  gCtx.font = `${line.weight} ${line.fontSize}px ${line.font}`

  // Rotate
  gCtx.save()
  gCtx.translate(x + line.width / 2, y - line.fontSize / 2)
  gCtx.rotate((Math.PI / 180) * line.degree)
  gCtx.translate(-(x + line.width / 2), -(y - line.fontSize / 2))

  // Draw
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)

  gCtx.restore()
}

// Draws rect around selected line
function drawSelectedRect(line) {
  const lineArea = getLineArea(line)
  gCtx.lineWidth = 1
  gCtx.strokeStyle = '#fff'
  gCtx.fillStyle = '#fff'
  // gCtx.save()
  gCtx.setLineDash([4, 2])
  gCtx.strokeRect(
    lineArea.x - 5,
    lineArea.y - lineArea.height + 5,
    lineArea.width + 5,
    lineArea.height
  )

  gCtx.stroke()

  // Add Resize Corner
  gCtx.fillRect(
    lineArea.x + lineArea.width - 4,
    lineArea.y - lineArea.height + 2,
    8,
    8
  )

  // Draw Rotate Circle
  gCtx.arc(lineArea.x + lineArea.width / 2, lineArea.y + 5, 5, 0, Math.PI * 2)
  gCtx.fill()
}

// Events on Canvas (Mouse & Touch)
function onDown(ev) {
  //Get the ev pos from mouse or touch
  const pos = getEvPos(ev)

  const lineIdx = getClickedLine(pos)

  if (lineIdx === -1) {
    renderMeme(true)
    const elInlineInput = document.querySelector('.edit-input')
    if (elInlineInput) elInlineInput.remove()
    return
  }

  setSelectedLine(lineIdx)

  //Save the pos we start from
  gStartPos = pos

  if (checkOnResize(pos)) {
    alert('Resizing...')
    document.body.style.cursor = 'nesw-resize'
    setLineResize(true)
    renderMeme()
    return
  }

  if (checkOnRotate(pos)) {
    alert('Rotating...')
    document.body.style.cursor = 'alias'
    setLineRotate(true)
    renderMeme()
    return
  }

  const line = getLineByIdx(lineIdx)
  updateInputVal(line)

  renderMeme()
  setLineDrag(true)

  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const line = getSelectedLine()

  if (!line.isDrag && !line.isResize && !line.isRotate) return

  const pos = getEvPos(ev)
  //Calc the delta , the diff we moved
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y

  // Handle wanted editing accordinly
  if (line.isResize) resizeLine(dx)
  if (line.isDrag) dragLine(dx, dy)
  if (line.isRotate) rotateLine(dy)

  setLineWidth(calcualteTextWidth(line))

  //Save the last pos , we remember where we`ve been and move accordingly
  gStartPos = pos

  //Update Meme
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  setLineResize(false)
  setLineRotate(false)
  document.body.style.cursor = 'grab'
}

function onDoubleClick(ev) {
  const pos = getEvPos(ev)
  const lineIdx = getClickedLine(pos)
  const line = getSelectedLine()

  if (lineIdx === -1) {
    renderMeme(true)
    return
  }

  renderInlineInput(line)
}

// Canvas Utils
function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')

  const ratio = elContainer.offsetWidth / gCanvas.width
  setNewLineSizes(ratio)

  gCanvas.width = elContainer.offsetWidth

  // gCanvas.height = elContainer.offsetHeight
  renderMeme()
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]

    pos = {
      x: ev.pageX - ev.target.offsetLeft - 20,
      y: ev.pageY - ev.target.offsetParent.offsetTop,
    }
  }

  return pos
}

function renderInlineInput(line) {
  const elContainer = document.querySelector('.canvas-input')

  elContainer.style.top = line.pos.y - line.fontSize - 2 + 'px'
  elContainer.style.left = line.pos.x - 3 + 'px'

  const strHTML = `<input value="${line.txt}" oninput="onSetTextInline(this.value)" style="color: ${line.color}; font-size: ${line.fontSize}px; font-family: ${line.font};" class="edit-input" />`

  elContainer.innerHTML = strHTML
}
