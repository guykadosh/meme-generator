'use strict'

// Rendering functions
function renderGallery() {
  const imgs = getImgs()
  let strHTMLs = `<article class="gallery-img">
                    <input
                      type="file"
                      class="file-input"
                      name="image"
                      onchange="onImgInput(event)"
                    />
                  </article>`

  strHTMLs += imgs
    .map(
      img => `<article class="gallery-img" onclick="onImgSelect(${img.id})">
              <img src="${img.url}"  alt="" />
            </article> `
    )
    .join('')

  document.querySelector('.gallery-imgs').innerHTML = strHTMLs
}

function renderSavedMemes() {
  const memes = getMemes()

  const strHTMLs = memes.map((meme, idx) => {
    let img = new Image()
    img.src = meme.dataImg

    return `<article class="gallery-img" onclick="onMemeSelect(${idx})">
      <img src="${img.src}"  alt="" />
    </article> `
  })

  document.querySelector('.gallery-memes').innerHTML = strHTMLs.join('')
}

function renderKeywords() {
  const keywords = getKeywordsMap()

  let strHTMLs = ''
  for (const key in keywords) {
    strHTMLs += `<p class="keyword" onclick="onKeywordClick('${key}')" style="font-size: ${keywords[key]}px; cursor: pointer;">${key}</p>`
  }

  document.querySelector('.pop-keywords').innerHTML = strHTMLs
}

function renderDatalistKeywords() {
  const keywords = getKeywords()

  const strHTMLS = keywords.map(keyword => `<option value="${keyword}" />`)

  document.querySelector('#keywords-list').innerHTML = strHTMLS.join('')
}

// Handle Events on gallery

// Intial load gallery from loading page(hiding hero)
function onLoadGallery() {
  document.querySelector('.hero').classList.add('hero-hidden')
  document.querySelector('.header').style.opacity = '1'
  document.querySelector('.gallery').style.display = 'flex'
  document.querySelector('.footer').style.display = 'flex'
}

// Shows gallery after page loaded
function onShowGallery() {
  document.querySelector('.gallery').style.display = 'flex'
  document.querySelector('.editor-container').style.display = 'none'
  document.querySelector('.memes').style.display = 'none'

  renderGallery()
  initGMeme()
}

// Shows saved meme gallery
function onShowSavedMemes() {
  document.querySelector('.gallery').style.display = 'none'
  document.querySelector('.editor-container').style.display = 'none'
  document.querySelector('.memes').style.display = 'block'

  renderSavedMemes()
}

// On select img from gallery
function onImgSelect(imgId) {
  setImg(imgId)

  document.querySelector('.gallery').style.display = 'none'
  document.querySelector('.editor-container').style.display = 'flex'

  // Add Resize event only first time editor loads
  window.addEventListener('resize', resizeCanvas)

  // renderMeme()
  resizeCanvas()
}

// On select meme from saved memes
function onMemeSelect(memeIdx) {
  setMeme(memeIdx)

  document.querySelector('.memes').style.display = 'none'
  document.querySelector('.editor-container').style.display = 'flex'

  // renderMeme()
  resizeCanvas()
}

function onGenerateRandomMeme() {
  document.querySelector('.gallery').style.display = 'none'
  document.querySelector('.editor-container').style.display = 'flex'

  resizeCanvas()
  generateRandomMeme()

  renderMeme()
}

// Handles search events
function onSetFilterText(txt) {
  setFilterByTxt(txt)

  renderGallery()
}

function onKeywordClick(key) {
  increaseClickCount(key)

  document.querySelector('.filter-txt-input').value = key
  onSetFilterText(key)
  renderKeywords()
}

// Handle user uploading img
function onImgInput(ev) {
  loadImageFromInput(ev, onUploadImg)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()
  //After we read the file
  reader.onload = function (event) {
    var img = new Image() // Create a new html img element
    img.src = event.target.result // Set the img src to the img file we read
    //Run the callBack func , To render the img on the canvas
    img.onload = onImageReady.bind(null, img)
  }
  reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function onUploadImg(img) {
  const imgItem = setUploadedImg(img)
  setImg(imgItem.id)

  document.querySelector('.gallery').style.display = 'none'
  document.querySelector('.editor-container').style.display = 'flex'

  resizeCanvas()
}
