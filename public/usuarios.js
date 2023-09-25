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
    const timestamp = new Date().toLocaleString('en-GB')

    socket.emit('newUsuario', {
        name,
        lastName,
        email,
        username,
        avatar,
        password,
        status,
        admin,
        timestamp
    })
    return false
}

const renderUser = (arrUsers) => {
    const arrayUser = arrUsers
    const green = 'success'
    const red = 'danger'
    const dark = 'dark'
    const grey = 'secondary'
    const active = 'Active'
    const inactive = 'Inactive'
    const admin = 'Admin'
    const user = 'User'
    
    const html = arrUsers.map((element) => {
        let optionStatus = element.status ? green : red
        let optionAdmin = element.admin ? dark : grey
        let showStatus = element.status ? active : inactive
        let showAdmin = element.admin ? admin : user
        let idChain = element._id.substring(19)

        return (`<tr>
                    <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                    <td class="text-center">${element.name}</td>
                    <td class="text-center">${element.lastName}</td>
                    <td class="text-center">${element.email}</td>
                    <td class="text-center">${element.username}</td>
                    <td class="text-center"><img class="img-fluid rounded py-2" alt="Avatar" src='${element.avatar}' width="90px" height="70px"></td>
                    <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                    <td class="text-center"><span class="badge rounded-pill bg-${optionAdmin}"> ${showAdmin} </span></td>
                    <td class="text-center">
                        <div class="d-block align-items-center text-center">
                            <a href="/api/usuarios/${element._id}" class="btn btn-primary btn-sm me-1"><i class="fa fa-pencil"></i></a>
                            <a href="/api/usuarios/delete/${element._id}" class="btn btn-danger btn-sm mx-1"><i class="fa fa-trash"></i></a>
                        </div>
                    </td>
                </tr>`)
    }).join(" ");

    document.getElementById('mostrarUsuarios').innerHTML = html

    const htmlUserList = 
        ( `<caption id="capProdList">Cantidad Total de Usuarios ${arrayUser.length}</caption>`)

    document.getElementById('capUserList').innerHTML = htmlUserList
}