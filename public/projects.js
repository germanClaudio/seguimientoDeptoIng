const socket = io.connect()

//  ---------------- Projects list ----------------
socket.on('projectsAll', (arrayProjects, arrUsers) => {
    const cadena = document.getElementById('mostrarUserName').innerText
    let indice = cadena.indexOf(",");
    const name = cadena.substring(0,indice)
    let index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin
        let userId = arrUsers[index]._id
        user ? renderProjectsForAdmin(arrayProjects, userId) : renderProjectsForUser(arrayProjects)
    }   
})

// --------------- Render Project table for AdminS -----------------------------------
const renderProjectsForAdmin = (arrayProjects) => {
    const arrayProyectos = arrayProjects
    
    const html = arrayProyectos.map((element) => {
        let green = 'success'
        let red = 'danger'
        let text = "Cotizado"
        let grey = 'secondary'
        let yellow = 'warning'
        let white = 'white'
        // let black = 'dark'
        // let blue = 'primary'
        let result = 'S/P'
        let colorResult = grey
        let colorLevel
        
        let ociArr = []
        function loopOcis() {
            for (let i=0; i < element.project[0].oci.length; i++) {
                ociArr.push(element.project[0].oci[i].ociNumber)
            }
            return ociArr.join('<br>')
        }

        // function loopPrio() {
        //     for (let i=0; i < element.project[0].oci.length; i++) {
        //         ociArr.push(element.project[0].oci[i].ociNumber)
        //     }
        //     return ociArr.join('<br>')
        // }

        // let ociArr = []
        // function loopModifId() {
        //     for (let i=0; i < element.modificator.length; i++) {
        //         modifArr.push(element.modificator[i])
        //     }
        //     return modifArr.join('<br>')
        // }

        if ( element.project[0].levelProject === true) {
            colorLevel = white
            colorResult = green
            text = "Ganado"
        } else {
            colorLevel = yellow
            colorResult = grey
            text = "Cotizado"
        }
        
        return (`<tr>
                    <td class="text-center">${element.project[0].codeProject}</td>
                    <td class="text-center">${element.project[0].projectName}</td>
                    <td class="text-center">${loopOcis()}</td>
                    <td class="text-center"><img class="img-fluid rounded m-2" alt="Imagen Proyecto" src='${element.project[0].imageProject}' width="100px" height="80px"></td>
                    <td class="text-center"><img class="img-fluid rounded m-2" alt="Logo Cliente" src='${element.client[0].logo}' width="80px" height="60px"></td>
                    <td class="text-center">${element.project[0].prioProject}</td>
                    <td class="text-center"><span class="badge rounded-pill bg-${colorResult} text-${colorLevel}">${text}</span></td>
                    <td class="text-center">${element.project[0].projectDescription}</td>
                    <td class="text-center">${element.project[0].oci[0].otProject}</td>
                    <td class="text-center">${element.project[0].statusProject}</td>
                    <td class="text-center">${element.project[0].statusProject}</td>
                    <td class="text-center">${element.timestamp}</td>
                    <td class="text-center">
                        <div class="d-block align-items-center">
                            <a href="#" class="btn btn-secondary btn-sm me-1 disabled" data-toggle="tooltip" data-placement="top" title="To Be Done"><i class="fa fa-eye"></i></a>
                            <a href="/api/proyectos/${element.project[0]._id}" class="btn btn-primary btn-sm mx-1"><i class="fa fa-pencil"></i></a>
                            <a href="/api/proyectos/delete/${element.project[0]._id}" class="btn btn-danger btn-sm mx-1"><i class="fa fa-trash"></i></a>
                        </div>
                    </td>
                </tr>`)
    }).join(" ");

    document.getElementById('mostrarProyectos').innerHTML = html

    const htmlProjectsList = 
        ( `<caption id="capProjectsList">Cantidad Total de Proyectos ${arrayProyectos.length}</caption>`)

    document.getElementById('capProjectsList').innerHTML = htmlProjectsList
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