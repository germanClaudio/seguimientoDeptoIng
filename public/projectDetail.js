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
