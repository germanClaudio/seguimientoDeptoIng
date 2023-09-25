const socket = io.connect()

//  ---------------- Clients list ----------------
socket.on('clientsAll', (arrClient, arrUsers) => {
    const cadena = document.getElementById('mostrarUserName').innerText
    let indice = cadena.indexOf(",");
    const name = cadena.substring(0,indice)
    let index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin
        let userId = arrUsers[index]._id
        user ? renderClientAdmin(arrClient, userId) : renderClientUser(arrClient)
    }   
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
    
    socket.emit('newCliente', newCliente
    )
    return false
}

// --------------- Render Admin -----------------------------------
const renderClientAdmin = (arrClient) => {
    const arrayClient = arrClient
    
    const html = arrClient.map((element) => {
        let green = 'success'
        let red = 'danger'
        let text = "Activo"
        let grey = 'secondary'
        let black = 'dark'
        let blue = 'primary'
        let result = 'S/P'
        let colorResult = grey
        let idChain = element._id.substring(19)
        
        let userArr = []
        function loopUserId() {
            for (let i=0; i < element.creator.length; i++) {
                userArr.push(element.creator[i])
            }
            return userArr.join('<br>')
        }

        let modifArr = []
        function loopModifId() {
            for (let i=0; i < element.modificator.length; i++) {
                modifArr.push(element.modificator[i])
            }
            return modifArr.join('<br>')
        }

        if ( element.status === true && element.project > 0) {
            colorStatus = green
            colorResult = black
            result = element.project
        } else if ( element.status === true && element.project === 0 ) {
            colorStatus = green
        } else if ( element.status === false && element.project > 0 ) {
            colorStatus = red
            colorResult = blue
            result = element.project
            text = "Inactivo"
        } else if ( element.status === false && element.project === 0 ) {
            colorStatus = red
            text = "Inactivo"
        }
        
        return (`<tr>
                    <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                    <td class="text-center">${element.name}</td>
                    <td class="text-center"><img class="img-fluid rounded m-2" alt="Logo Cliente" src='${element.logo}' width="100px" height="80px"></td>
                    <td class="text-center">${element.code}</td>
                    <td class="text-center"><span class="badge rounded-pill bg-${colorStatus}">${text}</span></td>
                    <td class="text-center"><span class="badge rounded-pill bg-${colorResult}">${result}</span></td>
                    <td class="text-center">${loopUserId()}</td>
                    <td class="text-center">${element.timestamp}</td>
                    <td class="text-center">${loopModifId()}</td>
                    <td class="text-center">${element.modifiedOn}</td>
                    <td class="text-center">
                        <div class="d-block align-items-center">
                            <a href="#" class="btn btn-secondary btn-sm me-1 disabled" data-toggle="tooltip" data-placement="top" title="To Be Done"><i class="fa fa-eye"></i></a>
                            <a href="/api/clientes/${element._id}" class="btn btn-primary btn-sm mx-1"><i class="fa fa-pencil"></i></a>
                            <a href="/api/clientes/delete/${element._id}" class="btn btn-danger btn-sm mx-1"><i class="fa fa-trash"></i></a>
                        </div>
                    </td>
                </tr>`)
    }).join(" ");

    document.getElementById('mostrarClientes').innerHTML = html

    const htmlClientList = 
        ( `<caption id="capClientList">Cantidad Total de Clientes ${arrayClient.length}</caption>`)

    document.getElementById('capClientList').innerHTML = htmlClientList
}

//----------------------- Render User -------------------------------
const renderClientUser = (arrClient) => {
    const arrayClient = arrClient
    
    const html = arrClient.map((element) => {
        let green = 'success'
        let red = 'danger'
        let text = "Activo"
        let grey = 'secondary'
        let black = 'dark'
        let blue = 'primary'
        let result = 'S/P'
        let colorResult = grey
        let idChain = element._id.substring(19)
        
        if ( element.status === true && element.project > 0) {
            colorStatus = green
            colorResult = black
            result = element.project
        } else if ( element.status === true && element.project === 0 ) {
            colorStatus = green
        } else if ( element.status === false && element.project > 0 ) {
            colorStatus = red
            colorResult = blue
            result = element.project
            text = "Inactivo"
        } else if ( element.status === false && element.project === 0 ) {
            colorStatus = red
            text = "Inactivo"
        }

        return (`<tr>
                    <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                    <td class="text-center">${element.name}</td>
                    <td class="text-center"><img class="img-fluid rounded m-2" alt="Logo Cliente" src='${element.logo}' width="100px" height="80px"></td>
                    <td class="text-center">${element.code}</td>
                    <td class="text-center"><span class="badge rounded-pill bg-${colorStatus}">${text}</span></td>
                    <td class="text-center"><span class="badge rounded-pill bg-${colorResult}">${result}</span></td>
                    <td class="text-center">${element.creator}</td>
                    <td class="text-center">${element.timestamp}</td>
                    <td class="text-center">
                        <a href="#" class="btn btn-secondary btn-sm me-1disabled" data-toggle="tooltip" data-placement="top" title="To Be Done"><i class="fa fa-eye"></i></a>
                        <i class="fa fa-info-circle fa-2x ms-1" data-toggle="tooltip" data-placement="top" title="Solo Admin puede modificar esto" aria-hidden="true"></i>
                    </td>
                </tr>`)
    }).join(" ");

    document.getElementById('mostrarClientes').innerHTML = html

    const htmlClientList = 
        ( `<caption id="capClientList">Cantidad Total de Clientes ${arrayClient.length}</caption>`)

    document.getElementById('capClientList').innerHTML = htmlClientList
}