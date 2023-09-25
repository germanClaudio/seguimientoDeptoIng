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

// -------------- Show All Clients ----------------
socket.on('clientsAll', async (arrClients) => {
    renderClient (await arrClients)
})

const addClient = () => {
        const newCliente = {
            creator: {
                // userId: document.getElementById('idHidden').value,
                // userName: document.getElementById('usernameHidden').value,
                // userLastName: document.getElementById('lastNameHidden').value,
                uname: document.getElementById('unameHidden').value
            },
            name: document.getElementById('name').value,
            code: document.getElementById('code').value,
            logo: document.getElementById('logo').value,
            project: document.getElementById('project').value,
            status: Boolean(true),
            timestamp: formatDate(new Date())
        }
        console.log('addCliente index.... ',newCliente)

    socket.emit('newCliente', newCliente
    )
    return false
}

const renderClient = (arrClient) => {
    
    const html = arrClient.map((element) => {
        let disabled = 'disabled'
        let green = 'success'
        let red = 'danger'
        let text = "Activo"
        let grey = 'secondary'
        let black = 'dark'
        let blue = 'primary'
        let result = 'S/P'
        colorResult = grey

    if ( element.status === true && element.project > 0 ) {
        disabled = ''
        colorStatus = green
        colorResult = red
        result = element.project
    } else if ( element.status === true && element.project === 0 ) {
        colorStatus = green
        colorResult = grey
    } else if ( element.status === false && element.project > 0 ) {
        disabled = ''
        colorStatus = red
        colorResult = blue
        result = element.project
        text = "Inactivo"
    } else if ( element.status === false && element.project === 0 ) {
        colorStatus = red
        text = "Inactivo"
    }

            return (`<div class="col m-3">
                        <div class="card h-100" style="width: 18rem;">
                            <img src="${element.logo}" class="card-img-top m-1 px-5 pt-1" alt="Picture not Founded" height="215px" >
                            <div class="card-body">
                                <h6 class="card-title"><strong>${element.name}</strong></h6>
                                <p class="card-text">Codigo: ${element.code}<br>
                                                     <span class="badge rounded-pill bg-${colorStatus}">${text}</span><br>
                                                     Proyectos: <span class="badge rounded-pill bg-${colorResult}">${result}</span>
                                </p>
                                <div class="card-footer">
                                <a class="btn btn-info mx-auto w-75 my-1 small ${disabled}" type="submit" href="/api/clientes/projects/${element._id}"><i class="fa fa-cogs"></i> Proyectos</a>        
                                    <a class="btn btn-dark mx-auto w-75 my-1 small" type="submit" href="/api/clientes/select/${element._id}"><i class="fa fa-info-circle"></i> Ver Cliente</a>
                                </div>
                            </div>
                        </div>
                    </div>`
                    )
    }).join(" ");
        
    document.getElementById('mostrarClientes').innerHTML = html
}

// --------------------- update Client ----------------------------------- 
socket.on('updateCliente', async (arrClient) => {
    renderUpdatedClient (await arrClient)
})

const updateClient = () => {
    const _id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const logo = document.getElementById('logo').value
    const code = document.getElementById('code').value
    const project = document.getElementById('project').value
    const status = Boolean(document.getElementById('status').value)
    const timestamp = formatDate(new Date())
    const creator = document.getElementById('creator').value

    socket.emit('updateCliente', {
        _id,
        name,
        logo,
        code,
        status,
        project,
        creator,
        timestamp
    })
    return false
}    

const renderUpdatedClient = (arrClient) => {
    const html2 = arrClient.map((element) => {
    
        return (`<div class="d-block mx-auto my-3 w-75 text-center alert alert-success h5"
        role="alert">Cliente ${element.name} actualizado exitosamente!</div>`
                )

        // return (
        //     // <!-- Modal -->
        //         <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        //             <div class="modal-dialog">
        //                 <div class="modal-content">
        //                 <div class="modal-header">
        //                     <h5 class="modal-title" id="staticBackdropLabel">Actualizacion de Cliente</h5>
        //                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        //                 </div>
        //                 <div class="modal-body">Cliente ${element.name} actualizado exitosamente!</div>
        //                 <div class="modal-footer">
        //                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        //                 </div>
        //                 </div>
        //             </div>
        //         </div>
        // )

    }).join(" ");

    document.getElementById('updateCliente').innerHTML = html2
}