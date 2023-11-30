const socket = io.connect()

function sortTable(columnName) {
       
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const column = tbody.querySelector(`[data-column="${columnName}"]`);
    const order = column.getAttribute('data-order');
  
    rows.sort((a, b) => {
        const aValue = a.querySelector(`[data-column="${columnName}"]`).textContent;
        const bValue = b.querySelector(`[data-column="${columnName}"]`).textContent;
    
        if (order === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
    });
    
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    
      rows.forEach(row => tbody.appendChild(row));
    
      const btnClicked = document.getElementById(`${columnName}`)
      if(columnName === 'nombre' || columnName === 'nivel') {
          var iconDesc = (`<i class="fa-solid fa-sort-alpha-desc" aria-hidden="true"></i>`)
          var iconAsc = (`<i class="fa-solid fa-sort-alpha-asc" aria-hidden="true"></i>`)
      } else {
          var iconDesc = (`<i class="fa-solid fa-sort-amount-desc" aria-hidden="true"></i>`)
          var iconAsc = (`<i class="fa-solid fa-sort-amount-asc" aria-hidden="true"></i>`)
      }
      
      if (order === 'asc') {
        column.setAttribute('data-order', 'desc');  
        btnClicked.innerHTML = iconDesc
    } else {
        column.setAttribute('data-order', 'asc');
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
        // let black = 'dark'
        // let blue = 'primary'
        // let result = 'S/P'
        let colorResult = grey
        let colorLevel
        
        // ----------- Loops de Array OCI ----------------
        let ociArr = []
        function loopOcis() {
            for (let i=0; i < element.project[0].oci.length; i++) {
                ociArr.push(element.project[0].oci[i].ociNumber)
            }
            return ociArr.join('<hr>')
        }

        // ----------- Loops de Array OTs ----------------
        function loopOt(j) {
            let otArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    otArr.push(element.project[0].oci[j].otProject[i].otNumber)
                }
                return otArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light">S/D</span>')
            }
        }

        let arrOtArr = []
        function loopArrayOt() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                arrOtArr.push(loopOt(j))
            }
            return arrOtArr.join('<hr>')
        }    

        // ----------- Loops de Array OPs ----------------
        function loopOp(j) {
            let opArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    opArr.push(element.project[0].oci[j].otProject[i].opNumber)
                }
                return opArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light">S/D</span>')
            }
        }

        let arrOpArr = []
        function loopArrayOp() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                arrOpArr.push(loopOp(j))
            }
            return arrOpArr.join('<hr>')
        }    

    // ----------- Loops de Array Descriptions ----------------
        function loopDescription(j) {
            let DescriptionArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    DescriptionArr.push(element.project[0].oci[j].otProject[i].opDescription)
                }
                return DescriptionArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light">S/D</span>')
            }
        }

        let arrDescriptionArr = []
        function loopArrayDescription() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                arrDescriptionArr.push(loopDescription(j))
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
        
        return (`<tr>
                    <td class="text-center">${element.project[0].codeProject}</td>
                    <td class="text-center" data-column="nombre">${element.project[0].projectName}</td>
                    <td class="text-center" data-column="oci">${loopOcis()}</td>
                    <td class="text-center"><img class="img-fluid rounded m-2" alt="Imagen Proyecto" src='${element.project[0].imageProject}' width="100px" height="80px"></td>
                    <td class="text-center" data-column="cliente"><img class="img-fluid rounded m-2" alt="Logo Cliente" src='${element.client[0].logo}' width="70px" height="55px"></td>
                    <td class="text-center" data-column="prio"><span class="badge rounded-pill bg-dark">${element.project[0].prioProject}</span></td>
                    <td class="text-center" data-column="nivel"><span class="badge rounded-pill bg-${colorResult} text-${colorLevel}">${text}</span></td>
                    <td class="text-center">${element.project[0].projectDescription}</td>
                    <td class="text-center" data-column="ot">${loopArrayOt()}</td>
                    <td class="text-center">${loopArrayOp()}</td>
                    <td class="text-center">${loopArrayDescription()}</td>
                    <td class="text-center" data-column="fecha">${element.timestamp}</td>
                    <td class="text-center">
                        <div class="d-block align-items-center">
                            <a href="#" class="btn btn-secondary btn-sm me-1 disabled" data-toggle="tooltip" data-placement="top" title="To Be Done"><i class="fa-solid fa-eye"></i></a>
                            <a href="/api/proyectos/selectProject/${element.project[0]._id}" class="btn btn-primary btn-sm mx-1"><i class="fa-solid fa-pencil"></i></a>
                            <a href="/api/proyectos/delete/${element.project[0]._id}" class="btn btn-danger btn-sm mx-1"><i class="fa-solid fa-trash"></i></a>
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
const renderProjectsForUser = (arrayProjects) => {
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
        
        // ----------- Loops de Array OCI ----------------
        let ociArr = []
        function loopOcis() {
            for (let i=0; i < element.project[0].oci.length; i++) {
                ociArr.push(element.project[0].oci[i].ociNumber)
            }
            return ociArr.join('<hr>')
        }

        // ----------- Loops de Array OTs ----------------
        function loopOt(j) {
            let otArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    otArr.push(element.project[0].oci[j].otProject[i].otNumber)
                }
                return otArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light">S/D</span>')
            }
        }

        let arrOtArr = []
        function loopArrayOt() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                arrOtArr.push(loopOt(j))
            }
            return arrOtArr.join('<hr>')
        }    

        // ----------- Loops de Array OPs ----------------
        function loopOp(j) {
            let opArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    opArr.push(element.project[0].oci[j].otProject[i].opNumber)
                }
                return opArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light">S/D</span>')
            }
        }

        let arrOpArr = []
        function loopArrayOp() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                arrOpArr.push(loopOp(j))
            }
            return arrOpArr.join('<hr>')
        }    

    // ----------- Loops de Array Descriptions ----------------
        function loopDescription(j) {
            let DescriptionArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    DescriptionArr.push(element.project[0].oci[j].otProject[i].opDescription)
                }
                return DescriptionArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light">S/D</span>')
            }
        }

        let arrDescriptionArr = []
        function loopArrayDescription() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                arrDescriptionArr.push(loopDescription(j))
            }
            return arrDescriptionArr.join('<hr>')
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
                    <td class="text-center" data-column="nombre">${element.project[0].projectName}</td>
                    <td class="text-center" data-column="oci">${loopOcis()}</td>
                    <td class="text-center"><img class="img-fluid rounded m-2" alt="Imagen Proyecto" src='${element.project[0].imageProject}' width="100px" height="80px"></td>
                    <td class="text-center" data-column="cliente"><img class="img-fluid rounded m-2" alt="Logo Cliente" src='${element.client[0].logo}' width="70px" height="55px"></td>
                    <td class="text-center" data-column="prio"><span class="badge rounded-pill bg-dark">${element.project[0].prioProject}</span></td>
                    <td class="text-center" data-column="nivel"><span class="badge rounded-pill bg-${colorResult} text-${colorLevel}">${text}</span></td>
                    <td class="text-center">${element.project[0].projectDescription}</td>
                    <td class="text-center" data-column="ot">${loopArrayOt()}</td>
                    <td class="text-center">${loopArrayOp()}</td>
                    <td class="text-center">${loopArrayDescription()}</td>
                    <td class="text-center" data-column="fecha">${element.timestamp}</td>
                    <td class="text-center">
                        <div class="d-block align-items-center">
                            <a href="#" class="btn btn-secondary btn-sm me-1 disabled" data-toggle="tooltip" data-placement="top" title="To Be Done"><i class="fa-solid fa-eye"></i></a>
                            <button class="btn btn-dark btn-sm me-1 disabled" title="Solo el Admin puede modificar esto"><i class="fa-solid fa-circle-info"></i></button>
                        </div>
                    </td>
                </tr>`)
    }).join(" ");

    document.getElementById('mostrarProyectos').innerHTML = html

        const htmlProjectsList = 
            ( `<caption id="capProjectsList">Cantidad Total de Proyectos ${arrayProyectos.length}</caption>`)

        document.getElementById('capProjectsList').innerHTML = htmlProjectsList
}