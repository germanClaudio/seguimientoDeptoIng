const socket = io.connect()

function formatDate(date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    return day + "-" + month + "-" + year + "_" + hours + "." + min + "." + sec
}

function message(name, lastName) {
    Swal.fire({
    title: 'Esta seguro?',
    text: `El usuario ${name} ${lastName} será modificado!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificalo!'
  }).then((result) => {
    if (result.isConfirmed) {
        document.getElementById("formUpdateUser").submit()
      Swal.fire(
        'Modificado!',
        `El usuario ${name} ${lastName} ha sido modificado exitosamente.`,
        'success'
      )
    } else {
        Swal.fire(
            'No modificado!',
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
    console.log('name y lastName...', name, lastName)
    message(name, lastName)
})


// --------------------- update ---------------------------------------- 
socket.on('updateUsuario', async (arrUser) => {
    renderUpdatedUser (await arrUser)
})

const updateUsuario = () => {
    const _id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const avatar = document.getElementById('picture').value
    const status = document.getElementById('status').checked
    status ? status = true : status = false
    const admin = document.getElementById('admin').checked
    admin ? admin = true : admin = false
    const timestamp = formatDate(new Date())

    socket.emit('updateUsuario', {
        _id,
        name,
        lastName,
        email,
        username,
        avatar,
        status,
        admin,
        timestamp
    })
    return false
}    

const renderUpdatedUser = (arrUser) => {
    const html2 = arrUser.map((element) => {
    
        return (`<div class="d-block mx-auto my-3 w-75 text-center alert alert-success h5"
        role="alert">Producto actualizado exitosamente!</div>`
                )
    }).join(" ");

    document.getElementById('updateUsuario').innerHTML = html2
}
