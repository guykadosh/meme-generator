function uploadImg() {
  const imgDataUrl = gCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    //Encode the instance of certain characters in the url
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log(encodedUploadedImgUrl)
    document.querySelector(
      '.user-msg'
    ).innerText = `Your photo is available here: ${uploadedImgUrl}`
    //Create a link that on click will make a post in facebook with the image we uploaded
    document.querySelector('.share-container').innerHTML = `
    <span class="label"><a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
    Share   
      </a></span>
    <span class="icon">
      <i class="fa-solid fa-share-nodes"></i>
    </span>
      `
  }
  //Send the image to the server
  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  //Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)
  //Send a post req with the image to the server
  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  }) //Gets the result and extract the text/ url from it
    .then(res => res.text())
    .then(url => {
      console.log('Got back live url:', url)
      //Pass the url we got to the callBack func onSuccess, that will create the link to facebook
      onSuccess(url)
      alert('Upload Successfull')
    })
    .catch(err => {
      console.error(err)
    })
}

function onDownload() {
  const elBtn = document.querySelector('.btn-download')

  renderMeme(true)

  alert('Preparing...')

  const strHTMLs = `
  <a href="#" download="my-img.jpg">
  <span class="label">Click Again!</span>
  <span class="icon">
  <i class="fa-solid fa-download"></i>
  </span>`

  elBtn.innerHTML = strHTMLs
  window.removeEventListener('resize', resizeCanvas)
  elBtn.removeEventListener('click', onDownload)
  elBtn.addEventListener('click', downloadImg)
}

function downloadImg() {
  const elBtn = document.querySelector('.btn-download')
  const elLink = document.querySelector('.btn-download a')

  const imgContent = gCanvas.toDataURL('image/jpeg') // image/jpeg the default format

  elLink.href = imgContent
  alert('Downloading...')

  const strHTMLs = `
                <span class="label">Download</span>
                <span class="icon">
                  <i class="fa-solid fa-download"></i>
                </span>`

  elBtn.innerHTML = strHTMLs

  window.addEventListener('resize', resizeCanvas)
  elBtn.addEventListener('click', onDownload)
  elBtn.removeEventListener('click', downloadImg)
}
