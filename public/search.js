// -------------- Show Searched Products ----------------
socket.on('searchProductsAll', async (arrProd) => {
    renderSearchedProduct (await arrProd)
})

const searchProduct = () => {
    const name = document.getElementById('nameSearch').value
    // const code = document.getElementById('code').value

    socket.emit('searchProductoAll', {
        name,
    })
    return false
}

const renderSearchedProduct = (arrProd) => {
    const noStock = 'No Stock'
    const lastAvailable = 'Last Availables'
    let stock = ''
    const red = 'danger'
    const green = 'success'
    const grey = 'secondary'

    if(arrProd.length === 0) {
        const htmlSearchProductNull = 
        (`<div class="container">
            <div class="row row-cols-3 row-cols-md-2 g-4 justify-content-evenly">
            <div class="col mx-auto">
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
            <div class="col-md-4">
                <img src="https://www.shutterstock.com/image-vector/dead-emoji-face-flat-style-260nw-1655058412.jpg" width="75px" height="75px" class="img-fluid rounded-start" alt="Product not found">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">Product Not Found</h5>
                <p class="card-text">Sorry, we couldn't find the product.</p>
                <p class="card-text"><small class="text-muted">Try again with a different Name or Code</small></p>
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>`
        )
        
        document.getElementById('showProductSearch').innerHTML = htmlSearchProductNull
    
    } else {
        const htmlSearchProduct = arrProd.map((element) => {
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
                document.getElementById('showProductSearch').innerHTML = htmlSearchProduct
    }
}