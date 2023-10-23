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
    let arrayProyectos = arrayProjects
        
    const html = arrayProyectos.map((element) => {
        let green = 'success'
        let red = 'danger'
        let text = "Cotizado"
        let grey = 'secondary'
        let yellow = 'warning'
        let white = 'white'
        // let black = 'dark'
        // let blue = 'primary'
        // let result = 'S/P'
        let colorResult = grey
        let colorLevel
        
        let ociArr = []
        function loopOcis() {
            for (let i=0; i < element.project[0].oci.length; i++) {
                ociArr.push(element.project[0].oci[i].ociNumber)
            }
            return ociArr.join('<br>')
        }

        let otArr = []
        function loopOt() {
            for (let i=0; i < element.project[0].oci[0].otProject.length; i++) {
                otArr.push(element.project[0].oci[0].otProject[i].otNumber)
            }
            return otArr.join('<br>')
        }

        let opArr = []
        function loopOp() {
            for (let i=0; i < element.project[0].oci[0].otProject.length; i++) {
                opArr.push(element.project[0].oci[0].otProject[i].opNumber)
            }
            return opArr.join('<br>')
        }

        let DescriptionArr = []
        function loopDescription() {
            for (let i=0; i < element.project[0].oci[0].otProject.length; i++) {
                DescriptionArr.push(element.project[0].oci[0].otProject[i].opDescription)
            }
            return DescriptionArr.join('<br>')
        }

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
                    <td class="text-center"><img class="img-fluid rounded m-2" alt="Logo Cliente" src='${element.client[0].logo}' width="70px" height="55px"></td>
                    <td class="text-center"><span class="badge rounded-pill bg-dark">${element.project[0].prioProject}</span></td>
                    <td class="text-center"><span class="badge rounded-pill bg-${colorResult} text-${colorLevel}">${text}</span></td>
                    <td class="text-center">${element.project[0].projectDescription}</td>
                    <td class="text-center">${loopOt()}</td>
                    <td class="text-center">${loopOp()}</td>
                    <td class="text-center">${loopDescription()}</td>
                    <td class="text-center">${element.timestamp}</td>
                    <td class="text-center">
                        <div class="d-block align-items-center">
                            <a href="#" class="btn btn-secondary btn-sm me-1 disabled" data-toggle="tooltip" data-placement="top" title="To Be Done"><i class="fa fa-eye"></i></a>
                            <a href="/api/proyectos/selectProject/${element.project[0]._id}" class="btn btn-primary btn-sm mx-1"><i class="fa fa-pencil"></i></a>
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

//-------------------------------------------------------
// function order(icon) {
//     //console.log('orden / icon', orden, icon)
//     // arrayClient.sort((a, b) => {
//     //     return a.nombre - b.nombre
//     //   })

//     const iconAsc = (`<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>`)
//     const iconDesc = (`<i class="fa fa-sort-alpha-desc" aria-hidden="true"></i>`)
//     const resultado = icon == iconDesc ? iconAsc : iconDesc
    
//     document.getElementById('btnNombre').innerHTML = resultado
// }

// const btnNombre = document.getElementById('btnNombre')
// btnNombre.addEventListener('click', (event)=>{
//     event.preventDefault()
//     const icon = document.getElementById('btnNombre').innerHTML
//     let categoria = document.getElementById("btnNombre").value
//     console.log('categoria: ', categoria)
//     let query = window.location.search
//     if (query.includes("categoria=")) {
//         query = query.replace(/categoria=[^&]*/, "categoria=" + categoria);
//       } else {
//         query += "&categoria=" + categoria
//       }
//     order(icon)
//     window.location.replace(window.location.pathname + query)
// })