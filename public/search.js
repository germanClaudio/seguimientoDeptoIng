// -------------- Show Searched Clients ----------------
socket.on('searchClientsAll', async (arrClientSearch) => {
    console.log('searchClientsAll---', arrClientSearch)
    renderSearchedClients (await arrClientSearch)
})

const searchClient = () => {
    const query = document.getElementById('query').value
    
    socket.emit('searchClienteAll', {
        query
    })
    return false
}

const renderSearchedClients = (arrClientSeach) => {
    const noStock = 'No Stock'
    const lastAvailable = 'Last Availables'
    let stock = ''
    const red = 'danger'
    const green = 'success'
    const grey = 'secondary'

    if(arrClientSeach.length === 0) {
        const htmlSearchClientNull = 
        (`<div class="container">
            <div class="row row-cols-3 row-cols-md-2 g-4 justify-content-evenly">
                <div class="col mx-auto">
                    <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="https://www.shutterstock.com/image-vector/dead-emoji-face-flat-style-260nw-1655058412.jpg"
                                    width="75px" height="75px" class="img-fluid rounded-start"
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
            if(element.stock >= 3 && element.stock < 6) {
                stock = lastAvailable
                disabled = ''
                color = red
            } else if(element.stock === 0 ) {
                stock = noStock
                color = grey
            } else {
                stock = element.stock
                disabled = ''
                color = green
            }
            
            if(element.stock > 0) { 
                return (`<div class="container">
                <div class="row row-cols-3 row-cols-md-2 g-4 justify-content-evenly">
                <div class="col mx-auto">
                <div class="card h-100 mx-auto" style="width: 18rem;">
                <img src="${element.picture}" class="card-img-top" alt="Picture not Founded" >
                <div class="card-body">
                <h6 class="card-title"><strong>${element.name}</strong></h6>
                <p class="card-text">${element.description}<br>
                Price (USD): ${element.price}<br>
                Code: ${element.code}<br>
                Stock: <span class="badge rounded-pill bg-${color}">${stock}</span><br>
                Category: ${element.category}<br>
                </p>
                <div class="card-footer">         
                <a href="/api/productos/select/${element._id}" class="btn btn-dark mx-auto w-75" role="button"><i class="fa fa-info-circle"></i> See Details</a>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>`
                )
            } else {
                return (`<div class="container">
                <div class="row row-cols-3 row-cols-md-2 g-4 justify-content-evenly">
                <div class="col mx-auto">
                <div class="card h-100 mx-auto" style="width: 18rem;">
                <img src="${element.picture}" class="card-img-top" alt="Picture not Founded" height="215px" >
                <div class="card-body">
                <h6 class="card-title"><strong>${element.name}</strong></h6>
                <p class="card-text">${element.description}<br>
                Price (USD): ${element.price}<br>
                Code: ${element.code}<br>
                Stock: <span class="badge rounded-pill bg-${color}">${stock}</span><br>
                Category: ${element.category}<br>
                </p>
                <div class="card-footer">         
                <span class="badge rounded-pill bg-${color}"><i class="fa fa-frown-o"></i> Sorry! No stock</span>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>`
                )
            }
        }).join(" ");
                document.getElementById('showClientSearch').innerHTML = htmlSearchClient
    }
}