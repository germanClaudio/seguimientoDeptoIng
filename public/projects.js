const socket = io.connect()

function sortTable(columnName) {
       
    const table = document.querySelector('table')
    const tbody = table.querySelector('tbody')
    const rows = Array.from(tbody.querySelectorAll('tr'))
    const column = tbody.querySelector(`[data-column="${columnName}"]`)
    const order = column.getAttribute('data-order')
  
    rows.sort((a, b) => {
        const aValue = a.querySelector(`[data-column="${columnName}"]`).textContent
        const bValue = b.querySelector(`[data-column="${columnName}"]`).textContent
    
        if (order === 'asc') {
          return aValue.localeCompare(bValue)
        } else {
          return bValue.localeCompare(aValue)
        }
    });
    
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    
      rows.forEach(row => tbody.appendChild(row))
    
      const btnClicked = document.getElementById(`${columnName}`)
      if(columnName === 'nombre' || columnName === 'nivel') {
          var iconDesc = (`<i class="fa-solid fa-sort-alpha-desc" aria-hidden="true"></i>`)
          var iconAsc = (`<i class="fa-solid fa-sort-alpha-asc" aria-hidden="true"></i>`)
      } else {
          var iconDesc = (`<i class="fa-solid fa-sort-amount-desc" aria-hidden="true"></i>`)
          var iconAsc = (`<i class="fa-solid fa-sort-amount-asc" aria-hidden="true"></i>`)
      }
      
      if (order === 'asc') {
        column.setAttribute('data-order', 'desc')
        btnClicked.innerHTML = iconDesc
    } else {
        column.setAttribute('data-order', 'asc')
        btnClicked.innerHTML = iconAsc
    }
}

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
        let colorResult = grey
        let colorLevel
                        
        // ----------- Loops de Array OCI ----------------
        function loopOci(j) {
            let ociArr = []
            let otVisibleLength = 0
            for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                if (element.project[0].oci[j].otProject[i].visible) {
                    otVisibleLength++
                }
            }
            
            if (otVisibleLength > 0 ) {
                if (otVisibleLength % 2 === 0) {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-1) {
                            if (element.project[0].oci[j].ociStatus) {
                                ociArr.push(element.project[0].oci[j].ociNumber)
                            } else {
                                ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            }
                        } else {
                            ociArr.push('&#8203;')
                        }
                    }

                } else {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-0.5) {
                            if (element.project[0].oci[j].ociStatus) {
                                ociArr.push(element.project[0].oci[j].ociNumber)
                            } else {
                                ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            }
                        } else {
                            ociArr.push('&#8203;')
                        }
                    }
                }
                return ociArr.join('<br>')

            } else {
                return (`${element.project[0].oci[j].ociNumber} <i class="fa-solid fa-circle-exclamation" title="Sin Datos" style="color: #fd7e14;"></i>`)
            }
        }

        let arrOciArr = []
        function loopArrayOci() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOciArr.push(loopOci(j))
                }
            }
            return arrOciArr.join('<hr>')
        }

        // ----------- Loops de Array OTs ----------------
        function loopOt(j) {
            let otArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {

                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) {
                        if (element.project[0].oci[j].otProject[i].otStatus) {
                            otArr.push(element.project[0].oci[j].otProject[i].otNumber)
                        } else {
                            otArr.push(element.project[0].oci[j].otProject[i].otNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OT Inactiva" style="color: #ff0000;"></i>')
                        }
                    }
                }
                return otArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }
        

        let arrOtArr = []
        function loopArrayOt() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOtArr.push(loopOt(j))
                }
            }
            return arrOtArr.join('<hr>')
        }

        // ----------- Loops de Array OPs ----------------
        function loopOp(j) {
            let opArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) {
                        opArr.push(element.project[0].oci[j].otProject[i].opNumber)
                    }
                }
                return opArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }

        let arrOpArr = []
        function loopArrayOp() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOpArr.push(loopOp(j))
                }
            }
            return arrOpArr.join('<hr>')
        }

        // ----------- Loops de Array Descriptions ----------------
        function loopDescription(j) {
            let DescriptionArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) {
                        DescriptionArr.push(element.project[0].oci[j].otProject[i].opDescription)
                    }
                }
                return DescriptionArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }

        let arrDescriptionArr = []
        function loopArrayDescription() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrDescriptionArr.push(loopDescription(j))
                }
            }
            return arrDescriptionArr.join('<hr>')
        }    


        if ( element.project[0].levelProject === "ganado") {
            colorLevel = white
            colorResult = green
            text = "Ganado"
        } else if ( element.project[0].levelProject === "paraCotizar") {
            colorLevel = yellow
            colorResult = grey
            text = "Para Cotizar"
        } else {
            colorLevel = white
            colorResult = red
            text = "A Riesgo"
        }

        if(element.project[0].visible) {
            return (`<tr style="border-bottom: 2px solid #dedede";>
                        <td class="text-center">${element.project[0].codeProject}</td>
                        <td class="text-center" data-column="nombre">${element.project[0].projectName}</td>
                        <td class="text-center"><a href="/api/clientes/${element.client[0]._id}"><img class="img-fluid rounded m-2" alt="Imagen Proyecto" src='${element.project[0].imageProject}' width="100px" height="80px"></a></td>
                        <td class="text-center" data-column="cliente"><img class="img-fluid rounded m-2" alt="Logo Cliente" src='${element.client[0].logo}' width="70px" height="55px"></td>
                        <td class="text-center" data-column="prio"><span class="badge rounded-pill bg-dark">${element.project[0].prioProject}</span></td>
                        <td class="text-center" data-column="nivel"><span class="badge rounded-pill bg-${colorResult} text-${colorLevel}">${text}</span></td>
                        <td class="text-center px-2">${element.project[0].projectDescription}</td>
                        <td class="text-center">
                            <table class="table-responsive mx-auto my-2" style="font-size: 10pt; width: 100%;">
                                <tbody>
                                    <tr>
                                        <td data-column="oci">${loopArrayOci()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="text-center">
                            <table class="table-responsive mx-auto my-2" style="font-size: 10pt; width: 100%;">
                                <tbody>
                                    <tr>
                                        <td data-column="ot">${loopArrayOt()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="text-center">
                            <table class="table-responsive mx-auto my-2" style="font-size: 10pt; width: 100%;">
                                <tbody>
                                    <tr>
                                        <td>${loopArrayOp()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="text-center">
                            <table class="table-responsive mx-auto my-2" style="font-size: 10pt; width: 100%;">
                                <tbody>
                                    <tr>
                                        <td>${loopArrayDescription()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="text-center" data-column="fecha">${element.timestamp}</td>
                        <td class="text-center">
                            <div class="d-block align-items-center">
                                <a href="/api/clientes/${element.client[0]._id}" class="btn btn-secondary btn-sm me-1" data-toggle="tooltip" data-placement="top" title="Ver proyecto"><i class="fa-solid fa-eye"></i></a>
                                <a href="/api/proyectos/selectProject/${element.project[0]._id}" class="btn btn-primary btn-sm mx-1" title="Editar datos de OCI"><i class="fa-solid fa-pencil"></i></a>
                                <a href="/api/proyectos/delete/${element.project[0]._id}" class="btn btn-danger btn-sm mx-1" title="Eliminar proyectos"><i class="fa-solid fa-trash"></i></a>
                            </div>
                        </td>
                    </tr>`)
        }

    }).join(" ");

    document.getElementById('mostrarProyectos').innerHTML = html
    
        let arrayCantProyectos = []
        for (let i=0; i<arrayProyectos.length; i++){
            if(arrayProyectos[i].project[0].visible) {
                arrayCantProyectos.push(i)
            }
        }

        const totalProyectos = parseInt(arrayCantProyectos.length)
        const projectosEliminados = parseInt(arrayProyectos.length-arrayCantProyectos.length)
        let textTotalProyectos
        let textProyectosEliminados

        totalProyectos>1 ? textTotalProyectos = `Mostrando ${totalProyectos} Proyectos en total`
                            : 
                           textTotalProyectos = `Mostrando ${totalProyectos} Proyecto en total`

        projectosEliminados>1 ? textProyectosEliminados = `(${projectosEliminados}) Proyectos, fueron eliminados`
                                : 
                                textProyectosEliminados = `(${projectosEliminados}) Proyecto, fue eliminado`                  
        
        const htmlProjectsList = 
            ( `<caption id="capProjectsList">
                ${textTotalProyectos}
                <br>
                ${textProyectosEliminados}
            </caption>`)

        document.getElementById('capProjectsList').innerHTML = htmlProjectsList
}

//---------------  Render Project table for User -------------------------
const renderProjectsForUser = (arrayProjects) => {
    let arrayProyectos = arrayProjects
        
    const html = arrayProyectos.map((element) => {
        let green = 'success'
        let red = 'danger'
        let text = "Cotizado"
        let grey = 'secondary'
        let yellow = 'warning'
        let white = 'white'
        let colorResult = grey
        let colorLevel

        // ----------- Loops de Array OCI ----------------
        function loopOci(j) {
            let ociArr = []
            let otVisibleLength = 0
            for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                if (element.project[0].oci[j].otProject[i].visible) {
                    otVisibleLength++
                }
            }
            
            if (otVisibleLength > 0 ) {
                if (otVisibleLength % 2 === 0) {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-1) {
                            if (element.project[0].oci[j].ociStatus) {
                                ociArr.push(element.project[0].oci[j].ociNumber)
                            } else {
                                ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            }
                        } else {
                            ociArr.push('&#8203;')
                        }
                    }

                } else {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-0.5) {
                            if (element.project[0].oci[j].ociStatus) {
                                ociArr.push(element.project[0].oci[j].ociNumber)
                            } else {
                                ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            }
                        } else {
                            ociArr.push('&#8203;')
                        }
                    }
                }
                return ociArr.join('<br>')

            } else {
                return (`${element.project[0].oci[j].ociNumber} <i class="fa-solid fa-circle-exclamation" title="Sin Datos" style="color: #fd7e14;"></i>`)
            }
        }

        let arrOciArr = []
        function loopArrayOci() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOciArr.push(loopOci(j))
                }
            }
            return arrOciArr.join('<hr>')
        }

        // ----------- Loops de Array OTs ----------------
        function loopOt(j) {
            let otArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {

                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) {
                        if (element.project[0].oci[j].otProject[i].otStatus) {
                            otArr.push(element.project[0].oci[j].otProject[i].otNumber)
                        } else {
                            otArr.push(element.project[0].oci[j].otProject[i].otNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OT Inactiva" style="color: #ff0000;"></i>')
                        }
                    }
                }
                return otArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }
        
        let arrOtArr = []
        function loopArrayOt() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOtArr.push(loopOt(j))
                }
            }
            return arrOtArr.join('<hr>')
        }

        // ----------- Loops de Array OPs ----------------
        function loopOp(j) {
            let opArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) {
                        opArr.push(element.project[0].oci[j].otProject[i].opNumber)
                    }
                }
                return opArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }

        let arrOpArr = []
        function loopArrayOp() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOpArr.push(loopOp(j))
                }
            }
            return arrOpArr.join('<hr>')
        } 

        // ----------- Loops de Array Descriptions ----------------
        function loopDescription(j) {
            let DescriptionArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) {
                        DescriptionArr.push(element.project[0].oci[j].otProject[i].opDescription)
                    }
                }
                return DescriptionArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }

        let arrDescriptionArr = []
        function loopArrayDescription() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrDescriptionArr.push(loopDescription(j))
                }
            }
            return arrDescriptionArr.join('<hr>')
        }


        if ( element.project[0].levelProject === "ganado") {
            colorLevel = white
            colorResult = green
            text = "Ganado"
        } else if ( element.project[0].levelProject === "paraCotizar") {
            colorLevel = yellow
            colorResult = grey
            text = "Para Cotizar"
        } else {
            colorLevel = white
            colorResult = red
            text = "A Riesgo"
        }
        
        if(element.project[0].visible) {
            return (`<tr style="border-bottom: 2px solid #dedede";>
                        <td class="text-center">${element.project[0].codeProject}</td>
                        <td class="text-center" data-column="nombre">${element.project[0].projectName}</td>
                        <td class="text-center"><a href="/api/clientes/${element.client[0]._id}"><img class="img-fluid rounded m-2" alt="Imagen Proyecto" src='${element.project[0].imageProject}' width="100px" height="80px"></a></td>
                        <td class="text-center" data-column="cliente"><img class="img-fluid rounded m-2" alt="Logo Cliente" src='${element.client[0].logo}' width="70px" height="55px"></td>
                        <td class="text-center" data-column="prio"><span class="badge rounded-pill bg-dark">${element.project[0].prioProject}</span></td>
                        <td class="text-center" data-column="nivel"><span class="badge rounded-pill bg-${colorResult} text-${colorLevel}">${text}</span></td>
                        <td class="text-center">${element.project[0].projectDescription}</td>
                        
                        <td class="text-center">
                            <table class="table-responsive mx-auto my-2" style="font-size: 10pt; width: 100%;">
                                <tbody>
                                    <tr>
                                        <td data-column="oci">${loopArrayOci()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="text-center">
                            <table class="table-responsive mx-auto my-2" style="font-size: 10pt; width: 100%;">
                                <tbody>
                                    <tr>
                                        <td data-column="ot">${loopArrayOt()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="text-center">
                            <table class="table-responsive mx-auto my-2" style="font-size: 10pt; width: 100%;">
                                <tbody>
                                    <tr>
                                        <td>${loopArrayOp()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="text-center">
                            <table class="table-responsive mx-auto my-2" style="font-size: 10pt; width: 100%;">
                                <tbody>
                                    <tr>
                                        <td>${loopArrayDescription()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                        <td class="text-center" data-column="fecha">${element.timestamp}</td>
                        <td class="text-center">
                            <div class="d-block align-items-center">
                                <a href="/api/clientes/${element.client[0]._id}" class="btn btn-secondary btn-sm me-1" data-toggle="tooltip" data-placement="top" title="Ver proyecto"><i class="fa-solid fa-eye"></i></a>
                                <a href="/api/proyectos/selectProject/${element.project[0]._id}" class="btn btn-primary btn-sm mx-1" title="Editar datos de OCI"><i class="fa-solid fa-pencil"></i></a>
                                <a href="/api/proyectos/delete/${element.project[0]._id}" class="btn btn-danger btn-sm ms-1 disabled" title="Solo el Admin puede modificar esto"><i class="fa-solid fa-circle-info"></i></a>
                            </div>
                        </td>
                    </tr>`)
        }

    }).join(" ");

    document.getElementById('mostrarProyectos').innerHTML = html

    let arrayCantProyectos = []
        for (let i=0; i<arrayProyectos.length; i++){
            if(arrayProyectos[i].project[0].visible) {
                arrayCantProyectos.push(i)
            }
        }

        const totalProyectos = parseInt(arrayCantProyectos.length)
        const projectosEliminados = parseInt(arrayProyectos.length-arrayCantProyectos.length)
        let textTotalProyectos
        let textProyectosEliminados

        totalProyectos>1 ? textTotalProyectos = `Mostrando ${totalProyectos} Proyectos en total`
                            : 
                           textTotalProyectos = `Mostrando ${totalProyectos} Proyecto en total`

        projectosEliminados>1 ? textProyectosEliminados = `(${projectosEliminados}) Proyectos, fueron eliminados`
                                : 
                                textProyectosEliminados = `(${projectosEliminados}) Proyecto, fue eliminado`                  
        
        const htmlProjectsList = 
            ( `<caption id="capProjectsList">
                ${textTotalProyectos}
                <br>
                ${textProyectosEliminados}
            </caption>`)

        document.getElementById('capProjectsList').innerHTML = htmlProjectsList
}