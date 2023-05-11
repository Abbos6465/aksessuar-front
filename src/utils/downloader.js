export function base64Downloader(response) {
  const a = response.fileName ? response.fileName.split('.') : response.filename.split('.')
  const type = a[a.length - 1]
  let typestr = ''
  switch (type) {
    case 'pdf': {
      typestr = 'application/pdf'
      break
    }
    case 'jpeg': {
      typestr = 'image/jpeg'
      break
    }
    case 'png': {
      typestr = 'image/png'
      break
    }
    case 'jpg': {
      typestr = 'image/jpg'
      break
    }
    case 'bmp': {
      typestr = 'image/bmp'
      break
    }
    case 'doc': {
      typestr = 'application/msword'
      break
    }
    case 'docx': {
      typestr = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      break
    }
  }
  const url = window.URL.createObjectURL(base64ImageToBlob(response.base ? response.base : response.content, typestr))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', response.fileName ? response.fileName : response.filename) // or any other extension
  document.body.appendChild(link)
  link.click()
}
function base64ImageToBlob(str, type) {
  var imageContent = atob(str)

  var buffer = new ArrayBuffer(imageContent.length)
  var view = new Uint8Array(buffer)

  for (var n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n)
  }
  var blob = new Blob([buffer], { type: type })

  return blob
}
