const socket = io.connect();

function formatDate(date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    return day + "-" + month + "-" + year + "_" + hours + "." + min + "." + sec
}

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


//--------------------- update client ----------------------------- 
socket.on('updateCliente', async (arrClient) => {
    renderUpdatedClient (await arrClient)
})

const updateCliente = () => {
    const _id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const timestamp = formatDate(new Date())
    const logo = document.getElementById('logo').value
    const project = Number(document.getElementById('project').value)
    const code = document.getElementById('code').value
    let e = Boolean(document.getElementById('status'))
    const status = e

    socket.emit('updateCliente', {
        _id,
        name,
        logo,
        code,
        status,
        project,
        timestamp
    })
    return false
}    

const renderUpdatedClient = (arrClient) => {
    const html2 = arrClient.map((element) => {
        return (`<div class="d-block mx-auto my-3 w-75 text-center alert alert-success h5"
        role="alert">Cliente ${element.name} actualizado exitosamente!</div>`
            )
    }).join(" ");
    document.getElementById('updateCliente').innerHTML = html2
}
