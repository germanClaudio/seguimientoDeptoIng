const socket = io.connect();

// --------------- Update Client ------------------------
// ----------- Logo Client Image behavior ---------------
const dropAreaLogoUpdate = document.getElementById('drop-areaLogoUpdate')
const fileInputLogoUpdate = document.getElementById('fileInputLogoUpdate')
const fileImputTextLogoUpdate = document.getElementById('fileInputTextLogoUpdate')
const removeImageButtonLogoUpdate = document.getElementById('removeImageLogoUpdate')
const alertLogoUpdate = document.getElementById('alertLogoUpdate')

dropAreaLogoUpdate.style.width = "300px"
dropAreaLogoUpdate.style.height = "200px"
dropAreaLogoUpdate.style.border = "2px dashed #ccc"
dropAreaLogoUpdate.style.margin = "0 auto 0 50px"
dropAreaLogoUpdate.style.borderRadius = "5px"
dropAreaLogoUpdate.style.textAlign = "center"
dropAreaLogoUpdate.style.lineHeight = "200px"

dropAreaLogoUpdate.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropAreaLogoUpdate.style.border = '2px dashed #77d'
    dropAreaLogoUpdate.style.backgroundColor = '#7777dd10'
})

dropAreaLogoUpdate.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropAreaLogoUpdate.style.border = '2px dashed #ccc'
    dropAreaLogoUpdate.style.backgroundColor = '#666666'
    removeImageButtonLogoUpdate.style.display = 'none'
})

function alertNotImageLogoUpdate() {
    alertLogoUpdate.style.display = 'flex'
    removeImageButtonLogoUpdate.style.display = 'none'
    dropAreaLogoUpdate.style.border = "2px dashed #ccc"
    dropAreaLogoUpdate.style.textAlign = "center"
    dropAreaLogoUpdate.style.backgroundColor = '#666666'
    dropAreaLogoUpdate.style.display = 'block'
    dropAreaLogoUpdate.innerHTML = 'Arrastra y suelta una imagen aquí'
}

dropAreaLogoUpdate.addEventListener('drop', (e) => {
    e.preventDefault()
    dropAreaLogoUpdate.style.border = '3px dashed #2d2'
    dropAreaLogoUpdate.style.backgroundColor = '#22dd2210'
    const file = e.dataTransfer.files[0]

    if (file && file.type.startsWith('image/')) {
        fileInputLogoUpdate.files = e.dataTransfer.files
        let pathToImage = '../../../src/images/upload/LogoClientImages/'
        fileImputTextLogoUpdate.value = pathToImage + file.name
        removeImageButtonLogoUpdate.style.display = 'flex'
        alertLogoUpdate.style.display = 'none'
        handleFileUploadLogoUpdate(file)
    } else {
        alertNotImageLogoUpdate()
    }     
})

dropAreaLogoUpdate.addEventListener('click', () => {
    fileInputLogoUpdate.click()
})

fileInputLogoUpdate.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputLogoUpdate.files[0]
    
    if (file && file.type.startsWith('image/')) { 
        let pathToImage = '../../../src/images/upload/LogoClientImages/'
        fileImputTextLogoUpdate.value = pathToImage + file.name
        removeImageButtonLogoUpdate.style.display = 'flex'
        alertLogoUpdate.style.display = 'none'
        handleFileUploadLogoUpdate(file)
    } else {
        alertNotImageLogoUpdate()
    }     
})

function handleFileUploadLogoUpdate(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaLogoUpdate.innerHTML = 
                `<img class="p-2 mb-5" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                alertLogoUpdate.style.display = 'none'
        }

    } else {
        alertNotImageLogoUpdate()
    }
}

removeImageButtonLogoUpdate.addEventListener('click', ()=> {
    fileImputTextLogoUpdate.value = ''
    dropAreaLogoUpdate.style.border = "2px dashed #ccc"
    dropAreaLogoUpdate.style.textAlign = "center"
    dropAreaLogoUpdate.style.backgroundColor = '#666666'
    dropAreaLogoUpdate.style.display = 'block'
    dropAreaLogoUpdate.innerHTML = 'Arrastra y suelta una imagen aquí'
    removeImageButtonLogoUpdate.style.display = 'none'
    alertLogoUpdate.style.display = 'none'
})

function message(clientName) {
        Swal.fire({
        title: 'Esta seguro?',
        text: `El cliente ${clientName} será modificado!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, modificalo!'
      }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("formUpdateClient").submit()
          Swal.fire(
            'Modificado!',
            `El cliente ${clientName}, ha sido modificado exitosamente.`,
            'success'
          )
        } else {
            Swal.fire(
                'No modificado!',
                `El cliente ${clientName}, no ha sido modificado.`,
                'info'
              )
              return false
        }
      })
}

const btnUpdate = document.getElementById('btnUpdateClient')
btnUpdate.addEventListener('click', (event)=>{
    event.preventDefault()
    const clientName = document.getElementById('name').value
    message(clientName)
})