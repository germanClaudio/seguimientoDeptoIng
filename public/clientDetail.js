const socket = io.connect()
const Swal = require('sweetalert2');

function formatDate(date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    return day + "-" + month + "-" + year + "_" + hours + "." + min + "." + sec
}

// --------------------- update client ----------------------------- 
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
