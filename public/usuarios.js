const socket = io.connect()


//   Users historial ----------------
socket.on('usersAll', (arrUsers) => {
    renderUser(arrUsers)
})

const addNewUser = () => {
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const avatar = document.getElementById('avatar').value
    const password = document.getElementById('password').value
    const status = true
    const admin = false
    
    const selectedElement = document.getElementById("permiso")
    const selectedValue = selectedElement.value
    

    const timestamp = new Date().toLocaleString('en-GB')
    const creatorName = document.getElementById('userNameHidden').value
    const creatorLastName = document.getElementById('userLastNameHidden').value
    const creator = [creatorName, creatorLastName]
    const modificator = []
    const modifiedOn = ""

    socket.emit('newUsuario', {
        name,
        lastName,
        email,
        username,
        avatar,
        password,
        status,
        admin,
        selectedValue,
        timestamp,
        creator,
        modificator,
        modifiedOn
    })
    return false
}

const renderUser = (arrUsers) => {
    const arrayUser = arrUsers
    const green = 'success'
    const red = 'danger'
    const dark = 'dark'
    const grey = 'secondary'
    const yellow = 'warning'
    const cian = 'info'
    const active = 'Active'
    const inactive = 'Inactive'
    const admin = 'Admin'
    const user = 'User'
        
    const html = arrUsers.map((element) => {
        let optionStatus = element.status ? green : red
        let optionAdmin = element.admin ? dark : grey
        var optionPermiso = element.permiso ? grey : red
        let showStatus = element.status ? active : inactive
        let showAdmin = element.admin ? admin : user
        let idChain = element._id.substring(19)
        var showPermiso = "Diseño/Simulación"
        
            if (element.permiso === 'diseno') {
                showPermiso = "Diseño"
                optionPermiso = cian
            } else if (element.permiso === "simulacion") {
                showPermiso = 'Simulación'
                optionPermiso = yellow
            } else if (element.permiso === "disenoSimulacion") {
                showPermiso
                optionPermiso = red
            } else {
                showPermiso = 'Sin permisos asociados'
            }

        return (`<tr>
                    <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                    <td class="text-center">${element.name}</td>
                    <td class="text-center">${element.lastName}</td>
                    <td class="text-center">${element.email}</td>
                    <td class="text-center">${element.username}</td>
                    <td class="text-center"><img class="img-fluid rounded py-2" alt="Avatar" src='${element.avatar}' width="90px" height="70px"></td>
                    <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                    <td class="text-center"><span class="badge rounded-pill bg-${optionAdmin}"> ${showAdmin} </span></td>
                    <td class="text-center"><span class="badge text-bg-${optionPermiso}"> ${showPermiso} </span></td>
                    <td class="text-center">
                        <div class="d-block align-items-center text-center">
                            <a href="/api/usuarios/${element._id}" class="btn btn-primary btn-sm me-1"><i class="fa-solid fa-user-pen"></i></a>
                            <a href="/api/usuarios/delete/${element._id}" class="btn btn-danger btn-sm mx-1"><i class="fa-solid fa-user-xmark"></i></a>
                        </div>
                    </td>
                </tr>`)
    }).join(" ");

    document.getElementById('mostrarUsuarios').innerHTML = html

    const htmlUserList = 
        ( `<caption id="capProdList">Cantidad Total de Usuarios ${arrayUser.length}</caption>`)

    document.getElementById('capUserList').innerHTML = htmlUserList
}


/*------------------ Evento cantidad de caracteres Password & Confirmar Password -----------------------*/
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById("newUserForm")
    form.reset()

    let inputPassword = document.getElementById('password')
    inputPassword.addEventListener("input", validarCamposPassword)
    
    let inputConfirmPassword = document.getElementById('confirmPassword')
    inputConfirmPassword.addEventListener("input", validarCamposPassAndConfirm)

    let inputName = document.getElementById('name')
    inputName.addEventListener("blur", resultadoNameLast)

    let inputLastName = document.getElementById('lastName')
    inputLastName.addEventListener("blur", resultadoNameLast)
    
    function validarCamposPassword() {
        let valorPassword = document.getElementById('password').value
        let caracteres = valorPassword.length
        
        if (valorPassword !== "" || valorPassword !== null) {
            if (valorPassword.length < 6) {
                document.getElementById('messagePass').style.color = '#ff1111'
                document.getElementById('messagePass').innerHTML
				= '☒ El password debe ser mínimo 6 caracteres y van: '+ caracteres
                document.getElementById('btnAddNewUser').disabled = true
                document.getElementById('btnAddNewUser').style.opacity = (0.4)
                document.getElementById('confirmPassword').disabled = true
            } else {
                document.getElementById('messagePass').style.color = '#33ff33'
                document.getElementById('messagePass').innerHTML
				= '🗹 Largo de Password aceptable!'
                document.getElementById('confirmPassword').disabled = false
            }
        } else {
            document.getElementById('messagePass').innerHTML = ""
            document.getElementById('btnAddNewUser').disabled = true
            document.getElementById('btnAddNewUser').style.opacity = (0.4)
            document.getElementById('confirmPassword').disabled = true
        }
    }
        
    function validarCamposPassAndConfirm() {
        let valorPassword = document.getElementById('password').value
        let valorConfirmPass = document.getElementById('confirmPassword').value
        
        if (valorPassword !== "" || valorConfirmPass !== "" || valorPassword !== null || valorConfirmPass !== null) {
            if (valorPassword !== valorConfirmPass) {
                
                document.getElementById('messageConfirmPass').style.color = '#ff1111'
                document.getElementById('messageConfirmPass').innerHTML
                = '☒ Los password debe coincidir!'
                document.getElementById('btnAddNewUser').disabled = true
                document.getElementById('btnAddNewUser').style.opacity = (0.4)
            } else {	
                document.getElementById('messageConfirmPass').style.color = '#33ff33'
                document.getElementById('messageConfirmPass').innerHTML
                = '🗹 Los Password coinciden!'
                document.getElementById('btnAddNewUser').disabled = false
                document.getElementById('btnAddNewUser').style.opacity = (1)
            }        
        } else {
            document.getElementById('messageConfirmPass').innerHTML = ""
            document.getElementById('btnAddNewUser').disabled = true
            document.getElementById('btnAddNewUser').style.opacity = (0.4)
            document.getElementById('confirmPassword').disabled = true
        }    
    }

    function resultadoNameLast() {
        let nameValue = inputName.value
        let lastNameValue = inputLastName.value

        let username = document.getElementById('username')

        if (nameValue && lastNameValue) {
            username.value = nameValue.charAt(0).toLowerCase()+lastNameValue.toLowerCase()
        }
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
                `<img class="p-2 mb-3" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
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