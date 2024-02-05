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

// -------------- Show All Clients ----------------
socket.on('clientsAll', async (arrClients) => {
    renderClient (await arrClients)
})

const addClient = () => {
        const newCliente = {
            creator: {
                uname: document.getElementById('unameHidden').value
            },
            name: document.getElementById('name').value,
            code: document.getElementById('code').value,
            logo: document.getElementById('logo').value,
            project: document.getElementById('project').value,
            status: Boolean(true),
            timestamp: formatDate(new Date())
        }
        
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
 
    return (`<div class="col-lg-3 col-md-4 col-sm-6">
                <div class="shadow-lg card rounded-3 m-3" style="width: 15rem;">
                    <img src="${element.logo}" class="card-img-top rounded-5 mx-auto px-5 pt-2" alt="Logo Cliente" style=max-height="105px" >
                    <div class="card-body">
                        <h6 class="card-title"><strong>${element.name}</strong></h6>
                        <p class="card-text">Codigo: ${element.code}<br>
                                                <span class="badge rounded-pill bg-${colorStatus}">${text}</span><br>
                                                Proyectos: <span class="badge rounded-pill bg-${colorResult}">${result}</span>
                        </p>
                        <div class=".card-footer-client">
                            <a class="btn mx-auto text-light w-75 my-1 small ${disabled}" type="submit" href="/api/clientes/projects/${element._id}" style="background-color: #1d1d1d;">
                                <i class="fa-solid fa-diagram-project"></i>
                                    Proyectos
                            </a>        
                            <a class="btn mx-auto text-light w-75 my-1 small" type="submit" href="/api/clientes/select/${element._id}" style="background-color: #272787;">
                                <i class="fa-solid fa-info-circle"></i>
                                    Cliente
                            </a>
                        </div>
                    </div>
                </div>
            </div>`
            )
    }).join(" ");
        
    document.getElementById('mostrarClientes').innerHTML = html
}