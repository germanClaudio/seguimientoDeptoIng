const btnAddNewRow = document.getElementById("btnAddNewRow")
const buttonOne = document.getElementById('buttonOne')

buttonOne.addEventListener('click', () => {
    let ariaExpanded = buttonOne.getAttribute('aria-expanded')

    ariaExpanded==='true' ?
        btnAddNewRow.removeAttribute('disabled')
    :
        btnAddNewRow.setAttribute('disabled', true)
})
    
//-------------------------- Add New OCI Row --------------------------------
btnAddNewRow.addEventListener('click', () => {

    const parentDiv = document.getElementById('div_body')
    let i = parentDiv.childElementCount
    const lastChild = parentDiv.children[i - 1]
    const lastChildId = lastChild.id

    if (lastChildId < i || i == 1) {
        i = parentDiv.childElementCount
    } else {
        const numberId1 = parseInt(lastChildId.slice(-1))
        const numberId2 = parseInt(lastChildId.slice(-2))
        let numberIdLastChild

        numberId1 >= 0 && numberId2 ? numberIdLastChild = numberId2 : numberIdLastChild = numberId1;

        i = numberIdLastChild + 1
    }
    
    const ociNumberValue = parseInt(document.getElementById('ociNumber').value)

    const originalDiv = (
            `<div class="col-2">
                <label for="ociNumber${i}" id="labelOciNumber${i}">Número de OCI</label>
                <input type="number" name="ociNumber${i}" id="ociNumber${i}" class="form-control" min="0" max="9999"
                placeholder="Número OCI" value="${ociNumberValue+i}">
            </div>
            <div class="col-3">
                <label for="ociDescription${i}" id="labelOciDescription${i}">Descripción OCI</label>
                <input type="text" name="ociDescription${i}" id="ociDescription${i}" class="form-control"
                placeholder="Descripción OCI">
            </div>
            <div class="col-2">
                <label for="ociStatus${i}" id="labelOciStatus${i}">Status OCI</label><br>
                <div class="d-inline-block me-1">Inactiva</div>
                <div class="form-check form-switch d-inline-block mt-2">
                    <input class="form-check-input" type="checkbox" id="ociStatus${i}" aria-checked="true" name="ociStatus${i}" style="cursor: pointer;" checked>
                    <label class="form-check-label" for="ociStatus${i}">Activa</label>
                </div>
            </div>
            <div class="col">
                <label for="ociImage${i}" id="labelociImage${i}">Imagen OCI</label>
                <input type="text" name="ociImage${i}" id="ociImage${i}" class="form-control"
                placeholder="Imagen OCI">
            </div>
            <div class="col-1 my-auto">
                <div class="d-flex">
                    <button type="button" id="btnRemoveRow${i}" title="Eliminar línea de OCI" class="btn btn-danger rounded-circle m2 boton"><i class="fa-solid fa-trash"></i></button>
                </div>    
            </div>`
        )

    if (i == 1) {
        originalDiv

    } else if (i !== 1 && i < 4) { //cantidad maxima de OCI en conjunto a agregar 5
        originalDiv
        btnRemoveItem = document.getElementById(`btnRemoveRow${i - 1}`)
        btnRemoveItem.style.display = 'none'

    } else {
        btnRemoveItem = document.getElementById(`btnRemoveRow${i - 1}`)
        btnRemoveItem.style.display = 'none'
        btnAddNewRow.setAttribute('disabled', true)
    }

    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', "row my-3")
    newDiv.id = `ociItemRow${i}`
    newDiv.innerHTML = originalDiv
    parentDiv.appendChild(newDiv)
    const ociQty = document.getElementById("ociQuantity")
    ociQty.setAttribute('value', i + 1)

    const buttons = document.querySelectorAll('button')
    buttons.forEach((button) => {
        button.addEventListener("click", removeRow)
    })
})

//-------------------------- Remove OCI Row ----------------------------------
function removeRow(e) {

    const parentDiv = document.getElementById('div_body')
    let i = parentDiv.childElementCount

    if (e.target.id) {
        let btnRemoveRow = e.target.id
        const numberId1 = parseInt(btnRemoveRow.slice(-1))
        const numberId2 = parseInt(btnRemoveRow.slice(-2))
        let numberIdToDelete

        numberId1 >= 0 && numberId2 ? numberIdToDelete = numberId2 : numberIdToDelete = numberId1;

        function checkString(string) {
            return /^[0-9]*$/.test(string);
        }

        if (checkString(numberIdToDelete)) {
            const rowToDelete = document.getElementById(`ociItemRow${numberIdToDelete}`)
            rowToDelete.remove()
            const ociQty = document.getElementById("ociQuantity")
            ociQty.setAttribute('value', (i - 1))

            if (numberIdToDelete === 1) {
                btnAddNewRow.removeAttribute('disabled')

            } else if (numberIdToDelete !== 1 && numberIdToDelete < 4) {
                btnRemoveItem = document.getElementById(`btnRemoveRow${numberIdToDelete - 1}`)
                btnRemoveItem.style.display = 'inline'

            } else {
                btnRemoveItem = document.getElementById(`btnRemoveRow${numberIdToDelete - 1}`)
                btnRemoveItem.style.display = 'inline'
                btnAddNewRow.removeAttribute('disabled')
            }
        }
    }
}

// --------------- Create New Project ------------------------
function messageNewProject(projectName, ociQuantity) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
    if(projectName) {
        let html=''
        parseInt(ociQuantity) > 1 ? 
        html = `Se creará el proyecto ${projectName}, con ${ociQuantity} OCI's !` :
        html = `Se creará el proyecto ${projectName}, con ${ociQuantity} OCI !`

        Swal.fire({
            title: `Ingreso de Proyecto ${projectName}`,
            position: 'center',
            text: html,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('formNewProject').submit()
                Toast.fire({
                    icon: 'success',
                    title: `El proyecto ${projectName}, se creó con éxito!`
                })
            } else {
                Swal.fire(
                    'Proyecto no creado!',
                    `El proyecto ${projectName}, no se creó correctamente!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El proyecto no se creó correctamente!`,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: false,
        })
    }
}

const btnCreateNewProject = document.getElementById('btnNewProject')
btnCreateNewProject.addEventListener('click', (event) => {
    event.preventDefault()
    const projectName = document.getElementById('projectName').value
    const ociQuantity = document.getElementById('ociQuantity').value
    
    messageNewProject(projectName, ociQuantity)
})

//---- Change Project Status ----------------
function messageChangeProjectStatus(projectName, statusProject, k) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
    if(projectName) {
        Swal.fire({
            title: 'Cambio status del Proyecto!',
            position: 'center',
            html: `El status del proyecto <b>${projectName}</b> se modificará a
                    <span class="badge rounded-pill bg-${ statusProject=='true' ? 'danger' : 'primary' } text-white">
                    ${ statusProject=='true' ? 'Inactivo' : 'Activo' }
                    </span> y ${ statusProject=='true' ? 'no' : '' } podrá ingresar o modificar datos en este proyecto!`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Continuar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formChangeStatusProject${k}_0`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El status del proyecto <b>${projectName}</b>, se modificó con éxito!`
                })
            } else {
                Swal.fire(
                    'Status de proyecto no modificado!',
                    `El status del proyecto <b>${projectName}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El status del proyecto no se modificó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
        
}

const projectQuantity = parseInt(document.getElementById('projectQuantity').innerText)

var arrayBtnChangeStatusProject = []
let j=0
for (let k=0; k<projectQuantity; k++) {
    var btnChangeStatusProject = document.getElementById(`btnChangeStatusProyect${k}_${j}`)
    if(btnChangeStatusProject) {
        arrayBtnChangeStatusProject.push(btnChangeStatusProject)
    }
    
    arrayBtnChangeStatusProject[k].addEventListener('click', (event) => {
        event.preventDefault()
        const projectName = document.getElementById(`projectNameHidden${k}_${j}`).value
        const statusProject = document.getElementById(`statusProjectHidden${k}_${j}`).value
        messageChangeProjectStatus(projectName, statusProject, k)
    })
}

//---- Change Project Level ----------------
function messageChangeProjectLevel(projectName, levelProject, k, idProject) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        width: 550,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
    if(projectName) {

        if(levelProject=='ganado') {
                          
            var html = `<form id="formChangeLevelProject${k}_0" action="/api/proyectos/updateLevelProject/${idProject}" method="post">
                            <fieldset>
                                El nivel del proyecto <b>${projectName}</b> se modificará a
                                <div class="container mt-2 mx-auto">
                                    <div class="row justify-content-center">
                                        <select id="levelProjectSelection" name="levelProject" class="form-select w-25 my-2 px-auto" required>
                                            <option selected disabled value="ganado">Ganado</option>
                                            <option value="paraCotizar">Para Cotizar</option>
                                            <option value="aRiesgo">A riesgo</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                        `

        } else if (levelProject=='paraCotizar') {
            
            var html = `<form id="formChangeLevelProject${k}_0" action="/api/proyectos/updateLevelProject/${idProject}" method="post">
                            <fieldset>
                                El nivel del proyecto <b>${projectName}</b> se modificará a
                                <div class="container mt-2 mx-auto">
                                    <div class="row justify-content-center">
                                        <select id="levelProjectSelection" name="levelProject" class="form-select w-25 my-2 px-auto" required>
                                            <option selected disabled value="paraCotizar">Para Cotizar</option>
                                            <option value="ganado">Ganado</option>
                                            <option value="aRiesgo">A riesgo</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                        `

        } else {
            
            var html = `<form id="formChangeLevelProject${k}_0" action="/api/proyectos/updateLevelProject/${idProject}" method="post">
                            <fieldset>
                                El nivel del proyecto <b>${projectName}</b> se modificará a
                                <div class="container mt-2 mx-auto">
                                    <div class="row justify-content-center">
                                        <select id="levelProjectSelection" name="levelProject" class="form-select w-25 my-2 px-auto" required>
                                            <option selected disabled value="aRiesgo">A riesgo</option>
                                            <option value="ganado">Ganado</option>
                                            <option value="paraCotizar">Para Cotizar</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                        `
        }

        
        Swal.fire({
            title: 'Cambio nivel del Proyecto!',
            position: 'center',
            width: 600,
            html: html,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Continuar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {

                const levelProjectSelected = document.getElementById('levelProjectSelection').value
                console.log(levelProjectSelected)
                
                if(levelProjectSelected =='ganado') {
                    var levelProjectBadge = 'Ganado'
                    var levelProjectColor = 'success text-white'
                    var levelProjectMessage = 'podrá ingresar o modificar todos los datos de este proyecto!'
                } else if (levelProjectSelected =='paraCotizar') {
                    var levelProjectBadge = 'Para Cotizar'
                    var levelProjectColor = 'secondary text-warning'
                    var levelProjectMessage = 'solo podrá ingresar o modificar datos de S0 y proceso 3D en este proyecto!'
                } else {
                    var levelProjectBadge = 'A Riesgo'
                    var levelProjectColor = 'danger text-white'
                    var levelProjectMessage = 'solo podrá ingresar o modificar datos hasta S3 en este proyecto!'
                }

                document.getElementById(`formChangeLevelProject${k}_0`).submit()
                
                Toast.fire({
                    icon: 'success',
                    title: `El nivel del proyecto <b>${projectName}</b>, se modificó a
                    <span class="badge rounded-pill bg-${levelProjectColor}">${levelProjectBadge}</span> con éxito!
                    Y ${levelProjectMessage}                    `
                })

            } else {
                Swal.fire(
                    'Nivel de proyecto no modificado!',
                    `El nivel del proyecto <b>${projectName}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El nivel del proyecto no se modificó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

var arrayBtnChangeLevelProject = []
let x=0
for (let k=0; k<projectQuantity; k++) {
    var btnChangeLevelProject = document.getElementById(`btnChangeLevelProyect${k}_${x}`)
    if(btnChangeLevelProject) {
        arrayBtnChangeLevelProject.push(btnChangeLevelProject)
    }
    
    arrayBtnChangeLevelProject[k].addEventListener('click', (event) => {
        event.preventDefault()
        const projectName = document.getElementById(`projectNameHidden${k}_${x}`).value
        const levelProject = document.getElementById(`levelProjectHidden${k}_${x}`).value
        const idProject = document.getElementById(`projectIdHidden${k}_${x}`).value
        messageChangeProjectLevel(projectName, levelProject, k, idProject)
    })
}


//------- Change OCI status ----------------
function messageChangeOciStatus(statusOci, ociNumber, elementoId) {
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
        Swal.fire({
            title: `Cambio status de OCI# ${ociNumber}`,
            position: 'center',
            html: `El status de la OCI# <b>${ociNumber}</b> se modificará a
                    <span class="badge rounded-pill bg-${ statusOci=='true' ? 'danger' : 'primary' } text-white">
                    ${ statusOci=='true' ? 'Inactiva' : 'Activa' }
                    </span> y ${ statusOci=='true' ? 'no' : '' } podrá ingresar o modificar datos en esta OCI !`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formChangeStatusOci${elementoId}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El status de la OCI# <b>${ociNumber}</b>, se modificó con éxito!`
                })
            } else {
                Swal.fire(
                    'Status de OCI no modificado!',
                    `El status de la OCI# <b>${ociNumber}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
}

//---- Update OCI Data ----------------
function messageUpdateOci(
    projectId,
    statusOci,
    imageOci,
    ociDescription,
    ociNumber,
    k
) {
    
    let descriptionOci = ociDescription.slice(13)
    let numberOci = parseInt(ociNumber)
    let checked = 'checked'
    statusOci=='true' ? checked : checked = ''

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    var html = `<form id="formUpdateOci${k}" action="/api/proyectos/updateOci/${projectId}" method="post">
                    <fieldset>
                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-6">
                                <label for="numberOci" class="form-label d-flex justify-content-start ms-1">Número OCI</label>
                                <input type="number" name="numberOci" class="form-control"
                                    placeholder="Número OCI" value="${numberOci}" required>
                            </div>
                            
                            <div class="col-6" style="background-color: #ddd;">
                                <label for="statusOci" class="form-label d-flex justify-content-start ms-1">Status OCI</label><br>
                                <div>
                                    <p class="d-inline-block me-1">Inactiva</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusOciForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusOciForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusOci">Activa</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row mb-3 mx-1 px-1">
                            <div class="col-10">
                                <label for="descriptionOci" class="form-label d-flex justify-content-start ms-1">Descripción OCI</label>
                                <input type="text" name="descriptionOci" class="form-control"
                                    placeholder="Descripción OCI" value="${descriptionOci}" required>
                            </div>                            
                        </div> 

                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-12">
                                <label for="imageOci" class="form-label d-flex justify-content-start ms-1">URL Imagen OCI</label>
                                <input type="text" name="imageOci" class="form-control mb-2"
                                    placeholder="Imagen OCI url" value="${imageOci}" required>
                                <div class="badge sm-badge bg-warning text-dark mt-2 ms-1">
                                    <a href="${imageOci}" target="blank" class="alert-link">${imageOci}</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row justify-content-evenly mb-3 px-1 mx-auto">
                            <div class="col-12 my-1 mx-auto px-1">
                                <img src="${imageOci}" class="img-fluid rounded px-1"
                                    alt="Imagen OCI" width="115px">
                            </div>
                        </div>
                        <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${k}" value="${k}">
                    </fieldset>
                </form>`


    if(projectId && numberOci) {
        Swal.fire({
            title: `Actualizar OCI# ${numberOci}`,
            position: 'center',
            html: html,
            width: 700,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formUpdateOci${k}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `La OCI# <b>${numberOci}</b>, se modificó con éxito!`
                })
            } else {
                Swal.fire(
                    'OCI no modificada!',
                    `La OCI# <b>${numberOci}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `La OCI# ${numberOci} no se actualizó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
    
}

const maxOciQuantity = parseInt(document.getElementsByName('ociQuantityHidden').length)
var arrayBtnChangeStatusOci = []
var arrayBtnUpdateOci = []
for (let m=0; m<maxOciQuantity; m++) {
    for (let n=0; n<maxOciQuantity; n++) {
        var btnChangeStatusOci = document.getElementById(`${m}_${n}`)
        
        if (btnChangeStatusOci) {
            arrayBtnChangeStatusOci.push(btnChangeStatusOci)
        }

        var btnUpdateOci = document.getElementById(`btnUpdateOci${m}_${n}`)

        if(btnUpdateOci) {
            arrayBtnUpdateOci.push(btnUpdateOci)
        }
    }
}

arrayBtnChangeStatusOci.forEach(function(elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault()
        const statusOci = document.getElementById(`statusOciHidden${elemento.id}`).value
        const ociNumber = document.getElementById(`ociNumberHidden${elemento.id}`).value
        
        messageChangeOciStatus(
            statusOci, 
            ociNumber, 
            elemento.id
        )
    })
})

arrayBtnUpdateOci.forEach(function(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        const projectId = document.getElementById(`projectIdHidden${element.id.slice(12)}`).value
        const statusOci = document.getElementById(`statusOciHidden${element.id.slice(12)}`).value
        const imageOci = document.getElementById(`imageOci${element.id.slice(12)}`).src
        const ociDescription = document.getElementById(`ociDescription${element.id.slice(12)}`).innerText
        const ociNumber = document.getElementById(`ociNumberHidden${element.id.slice(12)}`).value
        const ociKNumber = document.getElementById(`ociKNumberHidden${element.id.slice(12)}`).value
    
        messageUpdateOci(
            projectId,
            statusOci,
            imageOci,
            ociDescription,
            ociNumber,
            ociKNumber
        )
    })
})
    

// --------------- Adding New OCI to an existing Project ------------------------
function addNewOciToProject(i, projectName, lastOciNumber, projectIdHidden) {
   
    var arrayBloque = []

        arrayBloque.push(`
            <div id="ociItemRow0" class="row my-1 mx-3">
                <div class="col-2 my-1 align-self-middle">
                    <input type="number" name="ociNumber0" id="ociNumber0" class="form-control" min="0" max="9999"
                    placeholder="Número OCI" value="${lastOciNumber+1}" required>
                </div>
                <div class="col-3 my-1 align-self-middle">
                    <input type="text" name="ociDescription0" id="ociDescription0" class="form-control"
                    placeholder="Descripcion OCI" required>
                </div>
                <div class="col-2 mt-3 align-self-middle">
                    <div class="form-check form-switch d-inline-block">
                        <input class="form-check-input" type="checkbox" name="ociStatus0" id="ociStatus0" aria-checked="true" style="cursor: pointer;" checked>
                        <label class="form-check-label" for="ociStatus">Activa</label>
                    </div>
                </div>    
                <div class="col my-1">
                    <input type="text" name="ociImage0" id="ociImage0" class="form-control"
                    placeholder="Imagen OCI">
                </div>    
                <div class="col-1 my-1 align-self-middle">
                </div>
            </div>
        `)
    
    const html = `
            <form id="formNewOciValues" action="/api/proyectos/addNewOciToProject/${projectIdHidden}" method="post" style="font-size: 10pt">
                <fieldset id="ociNewItemRow">
                    <div class="row my-auto mx-3">
                        <div class="col-2 my-auto align-self-middle">
                            <label for="ociNumber"><strong>OCI#</strong></label>
                        </div>
                        <div class="col-3 my-auto align-self-middle">
                            <label for="ociDescription"><strong>OCI Description</strong></label>
                        </div>
                        <div class="col-2 my-auto align-self-middle">
                            <label for="ociStatus"><strong>OCI Status</strong></label>
                        </div>
                        <div class="col my-auto align-self-middle">
                            <label for="ociImage"><strong>Imagen OCI</strong></label>
                        </div>
                        <div class="col-1 my-auto align-self-middle">
                            <button type="button" id="btnAddNewOciRow0" title="Agregar nueva línea de OCI"
                                class="btn btn-primary rounded-circle mx-1 my-auto">
                                    <i class="fa-solid fa-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque}
                    <input type="hidden" id="ociQuantityModal" name="ociQuantityModal" value="${arrayBloque.length}">
                </fieldset>
            </form>`


    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
    Swal.fire({
        title: `Agregar Nueva OCI a proyecto ${projectName}`,
        html: html,
        width: 900,
        background: "#efefef",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    }).then((result) => {
        if (result.isConfirmed) {
            const formNewOci = document.getElementById('formNewOciValues')
            formNewOci.submit()
            let ociQuantityModal = document.getElementById('ociQuantityModal').value
            
            if (ociQuantityModal===1) {
                Toast.fire({
                    icon: 'success',
                    title: `OCI agregada con éxito!`
                })
            } else {
                Toast.fire({
                    icon: 'success',
                    title: `OCI's agregadas con éxito!`
                })
            }
        } else {
            Swal.fire(
                'Nueva OCI no agregada!',
                `La información no fue agregada al proyecto!`,
                'warning'
            )
            return false
        }
    })


//-------------------------- Add New OCI Row Modal Form--------------------------------
const btnAddNewOciRow = document.getElementById("btnAddNewOciRow0")

btnAddNewOciRow.addEventListener('click', () => {
    const parentDiv = document.getElementById('ociNewItemRow')
    let i = parseInt(document.getElementById('ociQuantityModal').value)
    const ociNumberValue = parseInt(document.getElementById(`ociNumber${i-1}`).value)

    const originalDiv = (
        `   <div class="col-2 my-1 align-self-middle">
                <input type="number" name="ociNumber${i}" id="ociNumber${i}" class="form-control"
                min="0" max="9999" placeholder="Número OCI" value="${ociNumberValue+1}" required>
            </div>
            <div class="col-3 my-1 align-self-middle">
                <input type="text" name="ociDescription${i}" id="ociDescription${i}"
                class="form-control" placeholder="Descripción OCI" required>
            </div>
            <div class="col-2 mt-1 align-self-middle">
                <div class="form-check form-switch d-inline-block mt-2">
                    <input class="form-check-input" type="checkbox" id="ociStatus${i}"
                    aria-checked="true" name="ociStatus${i}" style="cursor: pointer;" checked>
                    <label class="form-check-label" for="ociStatus${i}">Activa</label>
                </div>
            </div>
            <div class="col my-1 my-1 align-self-middle">
                <input type="text" name="ociImage" id="ociImage${i}" class="form-control"
                name="ociImage${i}" placeholder="Imagen OCI">
            </div>
            <div class="col-1 my-1 align-self-middle">
                <button type="button" name="btnRemoveNewOciRow" id="btnRemoveNewOciRow${i}"
                    title="Eliminar línea de OCI" class="btn btn-danger rounded-circle m2 boton">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `
    )

    if (i == 1) {
        originalDiv
        btnAddNewOciRow.title = 'Agregar una línea de OCI'

    } else if (i !== 1 && i < 4) { //cantidad maxima de OCI en conjunto a agregar 5
        originalDiv
        btnRemoveNewItem = document.getElementById(`btnRemoveNewOciRow${i-1}`)
        btnRemoveNewItem.style.display = 'none'
        btnAddNewOciRow.title = 'Agregar una línea de OCI'
        btnRemoveNewItem.title= 'Eliminar línea de OCI'
    } else {
        btnRemoveNewItem = document.getElementById(`btnRemoveNewOciRow${i-1}`)
        btnRemoveNewItem.style.display = 'none'
        btnAddNewOciRow.setAttribute('disabled', true)
        btnRemoveNewItem.title = 'Eliminar línea de OCI'
    }

    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', "row my-1 mx-3")
    newDiv.id = `ociItemRow${i}`
    newDiv.innerHTML = originalDiv
    parentDiv.appendChild(newDiv)
    const ociQty = document.getElementById("ociQuantityModal")
    ociQty.setAttribute('value', i + 1)

    const buttons = document.querySelectorAll('button[name="btnRemoveNewOciRow"]')
    buttons.forEach((button) => {
        button.addEventListener("click", removeNewOciRow)
    })
})

//-------------------------- Remove OCI Row from Modal Form ----------------------------------
function removeNewOciRow(e) {
    
    let i = document.getElementById('ociQuantityModal').value
    
    if (e.target.id && i > 1) {
        let btnRemoveRow = e.target.id
        const numberId1 = parseInt(btnRemoveRow.slice(-1))
        const numberId2 = parseInt(btnRemoveRow.slice(-2))
        let numberIdToDelete
        
        numberId1 >= 0 && numberId2 ? numberIdToDelete = numberId2 : numberIdToDelete = numberId1;
        
        function checkString(string) {
        return /^[0-9]*$/.test(string);
        }

        if (checkString(numberIdToDelete)) {
            const rowToDelete = document.getElementById(`ociItemRow${numberIdToDelete}`)
            rowToDelete.remove()
            const ociQty = document.getElementById("ociQuantityModal")
            ociQty.setAttribute('value', (i - 1))

            if (numberIdToDelete === 1) {
                btnAddNewOciRow.removeAttribute('disabled')
                btnAddNewOciRow.title = 'Agregar una línea de OCI'

            } else if (numberIdToDelete !== 1 && numberIdToDelete < 4) {
                btnRemoveNewItem = document.getElementById(`btnRemoveNewOciRow${numberIdToDelete - 1}`)
                btnRemoveNewItem.style.display = 'inline'
                btnRemoveNewItem.title = 'Eliminar línea de OCI'
                btnAddNewOciRow.title = 'Agregar una línea de OCI'

            } else {
                btnRemoveNewItem = document.getElementById(`btnRemoveNewOciRow${numberIdToDelete - 1}`)
                btnRemoveNewItem.style.display = 'inline'
                btnRemoveNewItem.title = 'Eliminar línea de OCI'
                btnAddNewOciRow.removeAttribute('disabled')
            }
        }
    }
}
// --------------------------------------
}

const arrayProjectList = []
for (let i = 0; i<projectQuantity; i++) {  //ver limite maximo de proyectos por Cliente
    if (document.getElementById(`accordionPanelsStayOpen${i}`)) {
        arrayProjectList.push(i)
    }
}

if (arrayProjectList !=[]) {
    let allButtonsNewOci = document.querySelectorAll('button[name="btnAddNewOciToProject"]')
    
    allButtonsNewOci.forEach(function(btn) {
		btn.addEventListener("click", (event) => {
            event.preventDefault()
            let kValue = event.target.value
            const projectName = document.getElementById(`projectNameHidden${btn.value}_0`).value
            
            let arrayLastOciNumber=[]
            let arrayProjectId=[]
            for(let n=0; n<maxOciQuantity; n++) { 
                if(document.getElementById(`ociNumberHidden${btn.value}_${n}`)) {
                    arrayLastOciNumber.push(parseInt(document.getElementById(`ociNumberHidden${btn.value}_${n}`).value))
                    arrayProjectId.push(document.getElementById(`projectIdHidden${btn.value}_${n}`).value)
                }
            }

            let lastOciIndex = parseInt(arrayLastOciNumber.length-1)
            let projectIdHidden = arrayProjectId[0]
            
            addNewOciToProject(
                kValue, 
                projectName, 
                arrayLastOciNumber[lastOciIndex], 
                projectIdHidden
            )
    	})
    })
}

//---- Update Project Data ----------------
function messageUpdateProject(
    projectId, 
    projectName, 
    statusProject, 
    imgProject, 
    descriptionProject,
    prioProject,
    codeProject,
    levelProject,
    k
    ) {
                
        let projectDescription = descriptionProject.slice(13)
        let projectPrio = parseInt(prioProject.slice(5))
        let checked = 'checked'
        statusProject=='true' ? checked : checked = ''
        
        let projectLevel
        if (levelProject==='ganado') {
            projectLevel = `<option selected disabled value="ganado">Ganado</option>
                            <option value="paraCotizar">Para Cotizar</option>
                            <option value="aRiesgo">A Riesgo</option>`

        } else if (levelProject==='paraCotizar') {
            projectLevel = `<option selected disabled value="paraCotizar">Para Cotizar</option>
                            <option value="ganado">Ganado</option>
                            <option value="aRiesgo">A Riesgo</option>`

        } else {
            projectLevel = `<option selected disabled value="aRiesgo">A Riesgo</option>
                            <option value="ganado">Ganado</option>
                            <option value="paraCotizar">Para Cotizar</option>`
        }
        
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    var html = `<form id="formUpdateProject${k}" action="/api/proyectos/updateProject/${projectId}" method="post">
                    <fieldset>
                        <div class="row justify-content-evenly mb-2 mx-1 px-1">
                            <div class="col-6">
                                <label for="projectName" class="form-label d-flex justify-content-start ms-1">Nombre Proyecto</label>
                                <input type="text" name="projectName" class="form-control"
                                    placeholder="Nombre Proyecto" value="${projectName}" required>
                            </div>
                            
                            <div class="col-6" style="background-color: #ddd;">
                                <label for="statusProject" class="form-label d-flex justify-content-start ms-1">Status Proyecto</label><br>
                                <div>
                                    <p class="d-inline-block me-1">Inactivo</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusProjectForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusProjectForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusProject">Activo</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row justify-content-evenly mb-2 mx-1 px-1">
                            <div class="col-8">
                                <label for="projectDescription" class="form-label d-flex justify-content-start ms-1">Descripción Proyecto</label>
                                <input type="text" name="projectDescription" class="form-control"
                                    placeholder="Descripción Proyecto" value="${projectDescription}" required>
                            </div>
                            
                            <div class="col-4">
                                <label for="prioProject" class="form-label d-flex justify-content-start ms-1">Prioridad Proyecto</label>
                                <input type="number" name="prioProject" class="form-control"
                                    placeholder="Prioridad Proyecto" value="${projectPrio}">
                            </div>
                        </div> 

                        <div class="row justify-content-between mb-4 mx-1 px-1">    
                            <div class="col-4">
                                <label for="levelProject" class="form-label d-flex justify-content-start ms-1">Nivel</label>
                                <select name="levelProject" class="form-select" required>
                                    ${projectLevel}
                                </select>
                            </div>
                            
                            <div class="col-4">
                                <label for="codeProject" class="form-label d-flex justify-content-start ms-1">Codigo Proyecto</label>
                                <input type="text" name="codeProject" class="form-control"
                                    placeholder="Codigo Proyecto" value="${codeProject}" required>
                            </div>
                        </div>
                        
                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-12 mb-2">
                                <input type="text" id="file-input" name="imageProject" class="form-control"
                                    placeholder="Imagen proyecto url" value="${imgProject}" accept="image/*" required>
                                <div id="drop-area" class="mb-2 mx-auto">
                                    Arrastra y suelta una imagen aquí
                                </div>                                
                            </div>
                        </div>
                        
                        <div class="row justify-content-evenly mb-2 px-1 mx-auto">
                            <div class="col-12 my-1 mx-auto px-1">
                                <label for="imageProject" class="form-label d-flex justify-content-start ms-1">Imagen actual del Proyecto</label>
                                <img src="${imgProject}" class="img-fluid rounded px-1"
                                    alt="Imagen Proyecto" width="115px">
                            </div>
                        </div>
                    </fieldset>
                </form>`
    
    // <div class="badge sm-badge bg-warning text-dark mt-2 ms-1 p-2">
    //     <a href="${imgProject}" target="blank" class="alert-link">${imgProject}</a>
    // </div>

    if(projectName) {
        Swal.fire({
            title: `Actualizar Proyecto ${projectName}`,
            position: 'center',
            html: html,
            width: 700,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formUpdateProject${k}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El proyecto <b>${projectName}</b>, se modificó con éxito!`
                })
            } else {
                Swal.fire(
                    'Proyecto no modificado!',
                    `El proyecto <b>${projectName}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El proyecto no se actualizó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }

    const dropArea = document.getElementById('drop-area')
    const fileInput = document.getElementById('file-input')
    // const formUpdateProject = document.getElementById(`formUpdateProject${k}`) 
    
    dropArea.style.width = "300px"
    dropArea.style.height = "200px"
    dropArea.style.border = "2px dashed #ccc"
    dropArea.style.margin = "0 auto 0 50px"
    dropArea.style.borderRadius = "5px"
    dropArea.style.textAlign = "center"
    dropArea.style.lineHeight = "200px"
    dropArea.style.fontFamily = "Arial, sans-serif"

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.style.border = '2px dashed #77a'
        dropArea.style.backgroundColor = '#7777aa10'
      })
  
      dropArea.addEventListener('dragleave', () => {
        dropArea.style.border = '2px dashed #ccc'
        dropArea.style.backgroundColor = '#fff'
      })

      dropArea.addEventListener('drop', (e) => {
        e.preventDefault()
        dropArea.style.border = '3px dashed #2a2'
        dropArea.style.backgroundColor = '#22aa2210'
        const file = e.dataTransfer.files[0]
        fileInput.files = e.dataTransfer.files
        let pathToImage = '../../../src/images/'
        fileInput.value = pathToImage + file.name
        handleFileUpload(file)
      })

      dropArea.addEventListener('click', () => {
        fileInput.click()
      })

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0]
        let pathToImage = '../../../src/images/'
        fileInput.value = pathToImage + file.name
        handleFileUpload(file)
      })

      function handleFileUpload(file) {
        if (file) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            dropArea.innerHTML = `<img src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
            
            // formUpdateProject.style.display = 'block'
          }
        }
      }
}


var arrayBtnUpdateProject = []
let l=0
for (let k=0; k<projectQuantity; k++) {
    var btnUpdateProject = document.getElementById(`btnUpdateProject${k}_${l}`)
    if(btnUpdateProject) {
        arrayBtnUpdateProject.push(btnUpdateProject)
    }

    arrayBtnUpdateProject[k].addEventListener('click', (event) => {
        event.preventDefault()
        const projectName = document.getElementById(`projectNameHidden${k}_${x}`).value
        const levelProject = document.getElementById(`levelProjectHidden${k}_${x}`).value
        const idProject = document.getElementById(`projectIdHidden${k}_${x}`).value
        const statusProject = document.getElementById(`statusProjectHidden${k}_${x}`).value
        const imgProject = document.getElementById(`imageProject${k}`).src
        const descriptionProject = document.getElementById(`projectDescription${k}`).innerText
        const prioProject = document.getElementById(`prioProject${k}`).innerText
        const codeProject = document.getElementById(`codeProject${k}`).innerText
        
        messageUpdateProject(
            idProject,
            projectName,
            statusProject,
            imgProject,
            descriptionProject,
            prioProject,
            codeProject,
            levelProject,
            k
        )
    })
}

//---- Delete Project ----------------
function messageDeleteProject(projectName, id, k) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    const htmlForm = `
            El proyecto <b>${projectName}</b> y su información interna
            se eliminará completamente.<br>
            Está seguro que desea continuar?
            <form id="formDeleteProject${k}_0" action="/api/proyectos/deleteProject/${id}" method="post">
                <fieldset>
                    <input type="hidden" name="projectNameHidden" value="${projectName}">
                    <input type="hidden" name="projectIdHidden" value="${id}">
                </fieldset>
            </form>
                    `
    
    if(projectName) {
        Swal.fire({
            title: 'Eliminar Proyecto!',
            position: 'center',
            html: htmlForm,
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: 'Eliminar <i class="fa-regular fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formDeleteProject${k}_0`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El proyecto <b>${projectName}</b>, se eliminó correctamente!`
                })
            } else {
                Swal.fire(
                    'Proyecto no eliminado!',
                    `El proyecto <b>${projectName}</b>, no se eliminó!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El proyecto no se eliminó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

var arrayBtnDeleteProject = []
let p=0
for (let k=0; k<projectQuantity; k++) {
    var btnDeleteProject = document.getElementById(`btnDeleteProject${k}_${p}`)
    if(btnDeleteProject) {
        arrayBtnDeleteProject.push(btnDeleteProject)
    }
    
    arrayBtnDeleteProject[k].addEventListener('click', (event) => {
        event.preventDefault()
        const projectName = document.getElementById(`projectNameHidden${k}_${p}`).value
        const idProject = document.getElementById(`projectIdHidden${k}_${p}`).value
        messageDeleteProject(projectName, idProject, k)
    })
}