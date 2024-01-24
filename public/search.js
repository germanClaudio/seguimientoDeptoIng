// -------------- Show Searched Clients ----------------
socket.on('searchClientsAll', async (arrClientSearch) => {
    renderSearchedClients (await arrClientSearch)
})

const searchClient = () => {
    const query = document.getElementById('query').value
    const status = document.getElementById('status').value
    const proyectosRadio = document.getElementsByName('projects')
    
    for (let i=0; i<proyectosRadio.length; i++) {
        if (proyectosRadio[i].checked) {
            var proyectos = proyectosRadio[i].value
        }
      }

    socket.emit('searchClienteAll', {
        query,
        status,
        proyectos
    })
    return false
}

const renderSearchedClients = (arrClientSeach) => {
    
    if(arrClientSeach.length === 0) {
        const htmlSearchClientNull = 
        (`<div class="container">
            <div class="row row-cols-3 row-cols-md-2 g-4 justify-content-evenly">
                <div class="col mx-auto">
                    <div class="shadow-lg card mx-auto" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4 my-auto px-1">
                                <img src="https://www.shutterstock.com/image-vector/dead-emoji-face-flat-style-260nw-1655058412.jpg"
                                    max-width="170vw" class="img-fluid rounded"
                                    alt="Cliente no encontrado">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Cliente no encontrado</h5>
                                    <p class="card-text">Lo siento, no pudimos encontrar el cliente</p>
                                    <p class="card-text">
                                        <small class="text-muted">
                                            Pruebe nuevamente con un nombre o código diferente
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        )
        
        document.getElementById('showClientSearch').innerHTML = htmlSearchClientNull
    
    } else {
        const htmlSearchClient = arrClientSeach.map((element) => {

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
    
            return (`<div class="container">
                <div class="row row-cols-3 row-cols-md-2 g-4 justify-content-evenly">
                    <div class="col mx-auto">
                        <div class="shadow-lg card mx-auto" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4 my-auto px-1">
                                    <img src="${element.logo}"
                                        max-width="160vw" class="img-fluid rounded"
                                        alt="Logo Cliente">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title"><strong>${element.name}</strong></h5>
                                        <p class="card-text">Codigo: ${element.code}<br></p>
                                        <span class="badge rounded-pill bg-${colorStatus}">${text}</span><br>
                                            Proyectos: <span class="badge rounded-pill bg-${colorResult}">${result}
                                        </span>
                                    </div>
                                    <div class="card-footer">
                                        <div class="row">
                                            <div class="col">
                                                <a class="btn btn-info m-auto small ${disabled}" type="submit" href="/api/clientes/projects/${element._id}"><i class="fa-solid fa-diagram-project"></i> Proyectos</a>        
                                            </div>
                                            <div class="col">
                                                <a class="btn btn-dark m-auto small" type="submit" href="/api/clientes/select/${element._id}"><i class="fa-solid fa-info-circle"></i> Ver Cliente</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            )
        }).join("<br>");

        document.getElementById('showClientSearch').innerHTML = htmlSearchClient
    }
}