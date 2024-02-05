const socket = io.connect()

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0');
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const YY = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return DD + "-" + MM + "-" + YY + " " + hh + "." + mm + "." + ss
}

function message(name, lastName, username) {
    Swal.fire({
    title: 'Esta seguro?',
    text: `El usuario ${name} ${lastName} será modificado!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificalo! <i class="fa-solid fa-user-pen"></i>',
    cancelButtonText: 'Cancelar <i class="fa-solid fa-user-shield"></i>'

  }).then((result) => {
    if (result.isConfirmed) {
        document.getElementById("formUpdateUser").submit()
      Swal.fire(
        `${username} modificado!`,
        `El usuario ${name} ${lastName} ha sido modificado exitosamente.`,
        'success'
      )
    } else {
        Swal.fire(
            `${username} no modificado!`,
            `El usuario ${name} ${lastName} no ha sido modificado.`,
            'info'
          )
        return false
    }
  })
}

const btnUpdate = document.getElementById('btnUpdateUser')
btnUpdate.addEventListener('click', (event)=>{
    event.preventDefault()
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const username = document.getElementById('username').value
    if (name && lastName && username) {
        message(name, lastName, username)
    }
})


// ----------- Avatar User Image behavior ---------------
const dropAreaAvatarUser = document.getElementById('drop-areaAvatarUser')
const fileInputAvatarUser = document.getElementById('fileInputAvatarUser')
const fileImputTextAvatarUser = document.getElementById('fileInputTextAvatarUser')
const removeImageButtonAvatarUser = document.getElementById('removeImageAvatarUser')
const alertAvatarUser = document.getElementById('alertAvatarUser')

dropAreaAvatarUser.style.width = "300px"
dropAreaAvatarUser.style.height = "200px"
dropAreaAvatarUser.style.border = "2px dashed #ccc"
dropAreaAvatarUser.style.margin = "0 auto 0 50px"
dropAreaAvatarUser.style.borderRadius = "5px"
dropAreaAvatarUser.style.textAlign = "center"
dropAreaAvatarUser.style.lineHeight = "200px"
dropAreaAvatarUser.style.cursor = "pointer"

dropAreaAvatarUser.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropAreaAvatarUser.style.border = '2px dashed #77d'
    dropAreaAvatarUser.style.backgroundColor = '#7777dd10'
})

dropAreaAvatarUser.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropAreaAvatarUser.style.border = '2px dashed #ccc'
    dropAreaAvatarUser.style.backgroundColor = '#838383'
    removeImageButtonAvatarUser.style.display = 'none'
})

function alertNotImageAvatarUser() {
    alertAvatarUser.style.display = 'flex'
    removeImageButtonAvatarUser.style.display = 'none'
    dropAreaAvatarUser.style.border = "2px dashed #ccc"
    dropAreaAvatarUser.style.textAlign = "center"
    dropAreaAvatarUser.style.backgroundColor = '#838383'
    dropAreaAvatarUser.style.display = 'block'
    dropAreaAvatarUser.innerHTML = 'Arrastra y suelta una imagen aquí'
}

dropAreaAvatarUser.addEventListener('drop', (e) => {
    e.preventDefault()
    dropAreaAvatarUser.style.border = '3px dashed #2d2'
    dropAreaAvatarUser.style.backgroundColor = '#22dd2210'
    const file = e.dataTransfer.files[0]

    if (file && file.type.startsWith('image/')) {
        fileInputAvatarUser.files = e.dataTransfer.files
        let pathToImage = '../../../src/images/upload/AvatarUsersImages/'
        fileImputTextAvatarUser.value = pathToImage + file.name
        removeImageButtonAvatarUser.style.display = 'flex'
        alertAvatarUser.style.display = 'none'
        handleFileUploadAvatarUser(file)
    } else {
        alertNotImageAvatarUser()
    }     
})

dropAreaAvatarUser.addEventListener('click', () => {
    fileInputAvatarUser.click()
})

fileInputAvatarUser.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputAvatarUser.files[0]
    
    if (file && file.type.startsWith('image/')) { 
        let pathToImage = '../../../src/images/upload/AvatarUsersImages/'
        fileImputTextAvatarUser.value = pathToImage + file.name
        removeImageButtonAvatarUser.style.display = 'flex'
        alertAvatarUser.style.display = 'none'
        handleFileUploadAvatarUser(file)
    } else {
        alertNotImageAvatarUser()
    }     
})

function handleFileUploadAvatarUser(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaAvatarUser.innerHTML = 
                `<img class="p-2 mb-5" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
            alertAvatarUser.style.display = 'none'
        }

    } else {
        alertNotImageAvatarUser()
    }
}

removeImageButtonAvatarUser.addEventListener('click', (event)=> {
    event.preventDefault()
    fileImputTextAvatarUser.value = ''
    dropAreaAvatarUser.style.border = "2px dashed #ccc"
    dropAreaAvatarUser.style.textAlign = "center"
    dropAreaAvatarUser.style.backgroundColor = '#838383'
    dropAreaAvatarUser.style.display = 'block'
    dropAreaAvatarUser.innerHTML = 'Arrastra y suelta una imagen aquí'
    removeImageButtonAvatarUser.style.display = 'none'
    alertAvatarUser.style.display = 'none'
})

const permisoHidden = document.getElementById('permisoHidden')
const permiso = document.getElementById('permiso')

document.addEventListener('DOMContentLoaded', ()=> {
    permisoHidden.value = permiso.value
})

permiso.addEventListener('change', ()=>{
    permisoHidden.value = permiso.value
})