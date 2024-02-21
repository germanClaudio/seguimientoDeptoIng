// Manejador de eventos de tablas General y Seguimiento -------------------

const arrBtnHidde = []
for (let i = 0; i<25; i++) { //ver limite maximo de OCI por Proyecto
    if (document.getElementById(`tablaGeneral${i}`)) {
        arrBtnHidde.push(i)
    }
}

function hiddeTableGeneral(k) {
    const tablaGeneral = document.getElementById(`tablaGeneral${k}`)
    const tablaSeguimiento = document.getElementById(`tablaSeguimiento${k}`)
    const btnHiddeTableGeneral = document.getElementById(`btnHiddeTableGeneral${k}`)
    const posBtnHiddeTableGeneral = document.getElementById(`posBtnHiddeTableGeneral${k}`)

    if (tablaGeneral.style.display === 'none') {
        tablaGeneral.style.display = ''
        tablaGeneral.classList.add("col-3")
        tablaSeguimiento.classList.add("col-3")
        btnHiddeTableGeneral.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'

        posBtnHiddeTableGeneral.classList.remove("col-1")
        posBtnHiddeTableGeneral.classList.add("col-3")
        btnHiddeTableGeneral.title = 'Ocultar General'

    } else {
        tablaGeneral.style.display = 'none'
        tablaGeneral.classList.remove("col-3")
        tablaSeguimiento.classList.add("col-3")
        btnHiddeTableGeneral.innerHTML = '<i class="fa-solid fa-eye"></i>'
        posBtnHiddeTableGeneral.classList.remove("col-3")
        posBtnHiddeTableGeneral.classList.add("col-1")
        btnHiddeTableGeneral.title = 'Mostrar General'
    }
}

function hiddeTableSeguimiento(k) {
    const tablaSeguimiento = document.getElementById(`tablaSeguimiento${k}`)
    const btnHiddeTableSeguimiento = document.getElementById(`btnHiddeTableSeguimiento${k}`)
    const posBtnHiddeTableSeguimiento = document.getElementById(`posBtnHiddeTableSeguimiento${k}`)

    if (tablaSeguimiento.style.display === 'none') {
        tablaSeguimiento.style.display = ''
        btnHiddeTableSeguimiento.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
        posBtnHiddeTableSeguimiento.classList.remove("col-1")
        posBtnHiddeTableSeguimiento.classList.add("col-3")
        btnHiddeTableSeguimiento.title = 'Ocultar Int/Ext'
    } else {
        tablaSeguimiento.style.display = 'none'
        btnHiddeTableSeguimiento.innerHTML = '<i class="fa-solid fa-eye"></i>'
        posBtnHiddeTableSeguimiento.classList.remove("col-3")
        posBtnHiddeTableSeguimiento.classList.add("col-1")
        btnHiddeTableSeguimiento.title = 'Mostrar Int/Ext'
    }
}

function extractNumbers(str) {
    const numbers = str.match(/\d{1,2}/g) // Extract 1 or 2 digit numbers from the string
    
    if (numbers) {
        if (numbers.length === 2) {
            // If two numbers are found, check if both are numbers
            if (!isNaN(parseInt(numbers[0])) && !isNaN(parseInt(numbers[1]))) {
                return numbers; // Return both numbers as an array
            }
        } else if (numbers.length === 1) {
            // If only one number is found, check if it's a number
            if (!isNaN(parseInt(numbers[0]))) {
                return numbers[0]; // Return the single number
            }
        }
    }
    return null; // Return null if no valid numbers are found
}


if(arrBtnHidde !=[]) {
    let allButtonsHiddeTableGeneral = document.querySelectorAll('button[name="btnHiddeTableGeneral"]')
    let allButtonsHiddeTableSeguimiento = document.querySelectorAll('button[name="btnHiddeTableSeguimiento"]')
    
    allButtonsHiddeTableGeneral.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            event.preventDefault()
            let kValue = event.target.id
            hiddeTableGeneral(extractNumbers(kValue))
    	})
    })

    allButtonsHiddeTableSeguimiento.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            event.preventDefault()
            let kValue = event.target.id
            hiddeTableSeguimiento(extractNumbers(kValue))
    	})
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const projectNameHidden = document.getElementById('projectNameHidden').value
    const projectNameTitle = document.getElementById('projectNameTitle')
    projectNameTitle.innerHTML = `Proyecto <strong>${projectNameHidden}</strong>`
})


// ---- Manejador de eventos para Carouseles --------------------
document.addEventListener('DOMContentLoaded', function (event) {
    let initIndex = event.eventPhase

    const arrayCarousel = []
    for (let i = 0; i<25; i++) {
        if (document.getElementById(`carouselExampleControls${i}`)) {
            arrayCarousel.push(i)
        }
    }

    if(arrayCarousel !=[]) {
        for (let i=0; i<arrayCarousel.length; i++) {
            let myCarousel = document.getElementById(`carouselExampleControls${arrayCarousel[i]}`)
            
            if (myCarousel) {
                if (initIndex === 2) {
                    myCarousel.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
                } else {
                    myCarousel.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
                }
            }

            // Detectar cuando el slide cambia
            myCarousel.addEventListener('slid.bs.carousel', function (event) {
                let slideCount = event.relatedTarget.parentElement.children.length
                let currentIndex = event.to

                // Si el slide actual es el último, deshabilita el botón "Next"
                if (currentIndex === slideCount - 1) {
                    myCarousel.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
                } else {
                    myCarousel.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
                }
                // Si el slide actual es el primero, deshabilita el botón "Prev"
                if (currentIndex === 0) {
                    myCarousel.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
                } else {
                    myCarousel.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
                }
            })
        }
    }
})

// ---------------- Event Add New Ot Row to OCI --------------------
const btnAddNewRow = document.getElementById("btnAddNewRow")
const buttonOne = document.getElementById('buttonOne')

buttonOne.addEventListener('click', () => {
    let ariaExpanded = buttonOne.getAttribute('aria-expanded')

    ariaExpanded==='true' ?
        btnAddNewRow.removeAttribute('disabled')
    :
        btnAddNewRow.disabled = true
})

//-------------------------- Add New OT Row --------------------------------
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

    let otNumberValue = parseInt(document.getElementById('otNumber').value)
    let opNumberValue = parseInt(document.getElementById('opNumber').value)
    const internoDisenoValue = document.getElementById('internoDiseno').value
    const internoSimulacion = document.getElementById('internoSimulacion').value
    const externoDiseno = document.getElementById('externoDiseno').value

    const originalDiv = (
            `<div class="col-1">
                <label for="otNumber${i}" id="labelOtNumber${i}">OT#</label>
                <input type="number" name="otNumber${i}" id="otNumber${i}" class="form-control mt-3" min="0" max="9999"
                placeholder="Número OT" value="${otNumberValue + i}">
            </div>
            <div class="col-1">
                <label for="opNumber${i}" id="labelOpNumber${i}">OP#</label>
                <input type="number" name="opNumber${i}" id="opNumber${i}" class="form-control mt-3" min="0" max="9999"
                placeholder="Número OP" value="${opNumberValue + i * 10}">
            </div>
            <div class="col-2">
                <label for="opDescription${i}" id="labelOpDescription${i}">Descripción OP</label>
                <input type="text" name="opDescription${i}" id="opDescription${i}" class="form-control mt-3"
                placeholder="Descripción OP">
            </div>
            <div class="col-1">
                <label for="otStatus${i}" id="labelOtStatus${i}">Status OT</label><br>
                <div class="form-check form-switch d-inline-block mt-2">
                    <input class="form-check-input mt-3" type="checkbox" id="otStatus${i}" aria-checked="true" name="otStatus${i}" style="cursor: pointer;" checked>
                    <label class="form-check-label mt-2" for="otStatus${i}">Activa</label>
                </div>
            </div>
            <div class="col-2">
                <label for="internoDiseno${i}" id="labelInternoDiseno${i}">Diseño seguido por</label>
                <input type="text" name="internoDiseno${i}" id="internoDiseno${i}" class="form-control mt-3"
                placeholder="Diseño" value="${internoDisenoValue}">    
            </div>
            <div class="col-2">
                <label for="internoSimulacion${i}" id="labelInternoSimulacion${i}">Simulación seguida por</label>
                <input type="text" name="internoSimulacion${i}" id="internoSimulacion${i}" class="form-control mt-3"
                placeholder="Simulación" value="${internoSimulacion}">    
            </div>
            <div class="col-2">
                <label for="externoDiseno${i}" id="labelExternoDiseno${i}">Proveedor externo</label>
                <input type="text" name="externoDiseno${i}" id="externoDiseno${i}" class="form-control mt-3"
                placeholder="Proveedor" value="${externoDiseno}">    
            </div>
            <div class="col-1 my-auto">
                <div class="d-flex">
                    <button name="btnRemoveRow" type="button" id="btnRemoveRow${i}" class="btn btn-danger rounded-circle m-2 boton"><i class="fa-solid fa-trash"></i></button>
                </div>    
            </div>`
    )

    if (i === 1) {
        originalDiv

    } else if (i !== 1 && i < 10) { //cantidad maxima de OT en conjunto a agregar 10
        originalDiv
        btnRemoveItem = document.getElementById(`btnRemoveRow${i - 1}`)
        btnRemoveItem.style.display = 'none'

    } else {
        btnRemoveItem = document.getElementById(`btnRemoveRow${i - 1}`)
        btnRemoveItem.style.display = 'none'
        btnAddNewRow.disabled = true
    }

    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', "row my-3")
    newDiv.id = `otItemRow${i}`

    if(i === 1) {
        newDiv.innerHTML = `<hr class="my-3">` + originalDiv + `<hr class="my-3">`
    } else if(i === 10) {
        newDiv.innerHTML = originalDiv
    } else {
        newDiv.innerHTML = originalDiv + `<hr class="my-3">`
    }
    parentDiv.appendChild(newDiv)
    const otQty = document.getElementById("otQuantity")
    otQty.value = i+1

    const buttons = document.querySelectorAll('button[name="btnRemoveRow"]')
    buttons.forEach((button) => {
        button.addEventListener("click", removeRow)
    })
})

//-------------------------- Remove OT Row ----------------------------------
function removeRow(e) {

    const parentDiv = document.getElementById('div_body')
    let i = parentDiv.childElementCount

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
            const rowToDelete = document.getElementById(`otItemRow${numberIdToDelete}`)
            rowToDelete.remove()
            const otQty = document.getElementById("otQuantity")
            otQty.setAttribute('value', (i - 1))

            if (numberIdToDelete === 1) {
                btnAddNewRow.removeAttribute('disabled')

            } else if (numberIdToDelete !== 1 && numberIdToDelete < 10) {
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

const formulario = document.getElementById("formNewOt")
const radios = formulario.elements["ociNumber"]
const tituloForm = document.getElementById('tituloForm')
const projectNameHidden = document.getElementById('projectNameHidden').value
const projectNumberId = document.getElementById(`projectIdHidden`).value
const ociNumberK = document.getElementById('ociNumberK')
const ociNumberHidden = document.getElementById('ociNumberHidden')
const clientId = document.getElementById('clientIdHidden')

// ------------- function bucle do/while para encontrar ultima OT ----------
function lastOtNumberFn(i) {
    let n = 25
    let k = i || 25

    do {
        var lastOtNumber = document.getElementById(`lastOtNumber${k}_${n}`)
        var lastOpNumber = document.getElementById(`lastOpNumber${k}_${n}`)

        if (lastOtNumber && lastOpNumber) {
            var otNumberValue = document.getElementById('otNumber')
            var opNumberValue = document.getElementById('opNumber')

            let lastOtNumberValue = parseInt(document.getElementById(`lastOtNumber${k}_${n}`).innerHTML)
            let lastOpNumberValue = parseInt(document.getElementById(`lastOpNumber${k}_${n}`).innerHTML)

            otNumberValue.value = lastOtNumberValue + 1
            opNumberValue.value = lastOpNumberValue + 10
            break;
        }

        // Restar 1 a 'n' y ajustar 'k' si es necesario
        if (n > 0) {
            n--
        } else if (k > 0) {
            k--
            n = 24
        } else {
            break;
        }
    } while (true)
}

//-------------------- Boton agregar nuevas OT's a OCI ------------------------
// const btnAddOtForm = document.getElementById("btnAddOtForm")
// btnAddOtForm.addEventListener('click', () => {
//     if (document.getElementById(`ociNumberHidden`)) {
//         let ociSeleccionada = document.getElementById(`ociNumberHidden`).value
//         tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${ociSeleccionada}</strong> / Proyecto: ${projectNameHidden}`
//         lastOtNumberFn()
//     }
// })

function radioSelected(radioSelectedValue, elementoId) {
    const radioSelected = document.getElementById(`${radioSelectedValue}`)
    radioSelected.checked = true
    tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${radioSelectedValue}</strong> / Proyecto: ${projectNameHidden}`
    ociNumberK.value = extractNumbers(elementoId)
    ociNumberHidden.value = radioSelectedValue
    lastOtNumberFn(extractNumbers(elementoId))
    formulario.scrollIntoView({ behavior: 'smooth' })
}

var arrayBtnAddOtFormSelected = []
for (let i=0; i<radios.length; i++) {
    var btnAddOtFormSelected = document.getElementById(`btnAddOtFormSelected${i}`)
    if(btnAddOtFormSelected) {
        arrayBtnAddOtFormSelected.push(btnAddOtFormSelected)
    }
}

arrayBtnAddOtFormSelected.forEach(function(elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault()
        const radioSelectedValue = event.target.name   //elemento.name
        radioSelected(radioSelectedValue, elemento.id)
        lastOtNumberFn(elemento.id)
    })
})

for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function (event) {
        ociSeleccionada = event.target.value
        tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${ociSeleccionada}</strong> / Proyecto: ${projectNameHidden}`
        ociNumberK.value = i
        ociNumberHidden.value = ociSeleccionada
        lastOtNumberFn(i)
    })
}


//------- Change OT status ----------------
function messageChangeOtStatus(
    statusOt, 
    otNumber, 
    idProjectSelected, 
    ociKNumber, 
    otKNumber
) {
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
        Swal.fire({
            title: `Cambio status de OT#${otNumber}`,
            position: 'center',
            html: `El status de la OT#<strong>${otNumber}</strong> se modificará a
                    <span class="badge rounded-pill bg-${ statusOt==='Activo' ? 'danger' : 'primary' } text-white">
                    ${ statusOt==='Activo' ? 'Inactivo' : 'Activo' }
                    </span> y ${ statusOt==='Activo' ? 'no' : '' } podrá ingresar o modificar datos en esta OT.
                    <form id="formChangeStatusOt${idProjectSelected}" action="/api/proyectos/updateStatusOt/${idProjectSelected}" method="post" style="display: none;">
                        <fieldset>
                            <input type="hidden" name="ociKNumberHidden" value="${ociKNumber}">
                            <input type="hidden" name="otKNumberHidden" value="${otKNumber}">
                            <input type="hidden" name="statusOtHidden" value="${statusOt}">
                        </fieldset>
                    </form>
                    `,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formChangeStatusOt${idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El status de la OT#<strong>${otNumber}</strong>, se modificó con éxito!`
                })
            } else {
                Swal.fire(
                    `Status de OT#${otNumber} no modificado!`,
                    `El status de la OT#<strong>${otNumber}</strong>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
}

//---- Update OT Data ----------------
function messageUpdateOt(
    statusOt,
    otNumber,
    idProjectSelected,
    ociKNumber,
    otKNumber,
    otDescription,
    otDesign,
    otSimulation,
    otSupplier
) {
    
    let numberKOci = parseInt(ociKNumber)
    let numnerKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
    let checked = 'checked'
    statusOt=='Activo' ? checked : checked = ''

    let bgColorStatus
    statusOt=='Activo' ? bgColorStatus='background-color: #55dd5560;'
                        : 
                        bgColorStatus='background-color: #dd555560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    var html = `<form id="formUpdateOt${idProjectSelected}" action="/api/proyectos/updateOt/${idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="numberOt" class="form-label d-flex justify-content-start ms-1">Número OT</label>
                                <input type="number" name="numberOt" class="form-control"
                                    placeholder="Número OT" value="${numberOt}" required>
                            </div>
                            
                            <div class="col-5" style="${bgColorStatus}">
                                <label for="statusOt" class="form-label d-flex justify-content-start ms-1">Status OT</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactiva</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusOtForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusOtForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusOt">Activa</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row mb-3 mx-1 px-1">
                            <div class="col">
                                <label for="descriptionOt" class="form-label d-flex justify-content-start ms-1">Descripción OT</label>
                                <input type="text" name="descriptionOt" class="form-control"
                                    placeholder="Descripción OT" value="${otDescription}" required>
                            </div>                            
                        </div>

                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="designOt" class="form-label d-flex justify-content-start ms-1">Diseño seguido por
                                    <button type="button" id="searchDesignUserModal" class="btn btn-light rounded-circle ms-1">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </label>
                                <input type="text" id="designOt" name="designOt" class="form-control"
                                    placeholder="Diseño seguido por" value="${otDesign}" required>
                            </div>
                            <div class="col-4">
                                <label for="simulationOt" class="form-label d-flex justify-content-start ms-1">Simulación seguida por
                                    <button type="button" id="searchSimulationUserModal" class="btn btn-light rounded-circle ms-1">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </label>
                                <input type="text" id="simulationOt" name="simulationOt" class="form-control"
                                    placeholder="Simulacion seguida por" value="${otSimulation}" required>
                            </div>
                            <div class="col-4">
                                <label for="supplierOt" class="form-label d-flex justify-content-start ms-1">Proveedor externo</label>
                                <input type="text" id="supplierOt" name="supplierOt" class="form-control"
                                    placeholder="Descripción OT" value="${otSupplier}" required>
                            </div>                      
                        </div> 

                            <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                            <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numnerKOt}" value="${numnerKOt}">
                    </fieldset>
                </form>`

    if(idProjectSelected && numberOt) {
        Swal.fire({
            title: `Actualizar OT# ${numberOt}`,
            position: 'center',
            html: html,
            width: 950,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formUpdateOt${idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `La OT# <b>${numberOt}</b>, se modificó con éxito!`
                })

            } else {
                Swal.fire(
                    'OT no modificada!',
                    `La OT# <b>${numberOt}</b>, no se modificó!`,
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
            text: `La OT# ${numberOt} no se actualizó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }

    // //--------------------------------- to be done
    //-----Btns Buscar en BBDD el Usuario Seguidor de Diseño --------------
    const searchDesignUserModal = document.getElementById('searchDesignUserModal')
    searchDesignUserModal.addEventListener('click', (event) => {
    event.preventDefault()

    function cargarUsuarioDiseno() {
        fetch('../../../api/usuarios/searchUsers/simulacion')
            .then(response => response.json())
            .then(users => {
            const arrayUsauriosDiseno = []
            const arrayUsersAll = []

            for(let i=0; i<users.usersAll.length; i++) {

                if(users.usersAll[i].status && users.usersAll[i].permiso ==='diseno') {
                    arrayUsauriosDiseno.push(`
                                    <label>
                                        <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-info text-dark my-2">
                                            <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                            ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                        </span>
                                    </label>`)

                } else if (users.usersAll[i].status && users.usersAll[i].permiso !=='diseno') {
                    arrayUsersAll.push(`
                                <label>
                                    <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-light text-dark my-2">
                                        <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                        ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                    </span>
                                </label>`)
                }
            }
            
            const html = `
                    <hr>
                        <label>Usuarios Diseño</label>
                        <div name='container' class="container">
                            ${arrayUsauriosDiseno.join(' ')}
                        </div>
                    <hr>
                        <label>Usuarios</label>
                        <div name='container' class="container">
                            ${arrayUsersAll.join(' ')}
                        </div>
                    <hr>`

                    Swal.fire({
                        title: 'Usuarios',
                        html: html,
                        width: 450,
                        background: "#eee",
                        allowOutsideClick: false,
                        showCloseButton: true,
                        showCancelButton: true,
                        cancelButtonText: 'Volver <i class="fa-solid fa-back"></i>',
                        confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>'    
                    
                    }).then((secondResult) => {
                        const radiosToSelect = document.getElementsByName('radioUsuarios')

                        for(let i=0; i<radiosToSelect.length; i++) {
                            const radioSelected = document.getElementById(i)
                            
                            if (radioSelected.checked) {
                                var usuariosSeleccionado = radioSelected.value
                            }
                        }
                        
                        if (secondResult.isConfirmed) {
                            //const inputUserSelected = document.getElementById('designOt')
                            //inputUserSelected.value = usuariosSeleccionado
                            
                        } else if (secondResult.dismiss === Swal.DismissReason.cancel) {
                            event.preventDefault()
                            return messageUpdateOt()
                        }

                        else {
                            Swal.fire(
                                'Usuario no seleccionado!',
                                `No ha seleccionado ningún usuario!`,
                                'warning'
                            )
                            return false
                        }
                    })
        })
        .catch(error => {
        console.error('Error:', error)
        })
        }
        cargarUsuarioDiseno()
    })

    //-----Btns Buscar en BBDD el Usuario Seguidor de Simulacion --------------
    const searchSimulationUserModal = document.getElementById('searchSimulationUserModal')
    searchSimulationUserModal.addEventListener('click', (event) => {
    event.preventDefault()

    function cargarUsuarioSimulacion() {
        fetch('../../../api/usuarios/searchUsers/all')
            .then(response => response.json())
            .then(users => {
            const arrayUsauriosSimulacion = []
            const arrayUsersAll = []

            for(let i=0; i<users.usersAll.length; i++) {

                if(users.usersAll[i].status && users.usersAll[i].permiso ==='simulacion') {
                    arrayUsauriosSimulacion.push(`
                                    <label>
                                        <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-warning text-dark my-2">
                                            <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                            ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                        </span>
                                    </label>`)

                } else if (users.usersAll[i].status && users.usersAll[i].permiso !=='simulacion') {
                    arrayUsersAll.push(`
                                <label>
                                    <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-light text-dark my-2">
                                        <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                        ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                    </span>
                                </label>`)
                }
            }
            
            const html = `
                    <hr>
                        <label>Usuarios Simulación</label>
                        <div name='container' class="container">
                            ${arrayUsauriosSimulacion.join(' ')}
                        </div>
                    <hr>
                        <label>Usuarios</label>
                        <div name='container' class="container">
                            ${arrayUsersAll.join(' ')}
                        </div>
                    <hr>`

                    Swal.fire({
                        title: 'Usuarios',
                        html: html,
                        width: 450,
                        background: "#eee",
                        allowOutsideClick: false,
                        showCloseButton: true,
                        confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>'    
                    }).then((result) => {
                        const radiosToSelect = document.getElementsByName('radioUsuarios')

                        for(let i=0; i<radiosToSelect.length; i++) {
                            const radioSelected = document.getElementById(i)
                            
                            if (radioSelected.checked) {
                                var usuariosSeleccionado = radioSelected.value
                            }
                        }
                        
                        if (result.isConfirmed) {
                            const inputUserSelected = document.getElementById('internoSimulacion')
                            inputUserSelected.value = usuariosSeleccionado
                        
                        } else {
                            Swal.fire(
                                'Usuario no seleccionado!',
                                `No ha seleccionado ningún usuario!`,
                                'warning'
                            )
                            return false
                        }
                    })
        })
        .catch(error => {
        console.error('Error:', error)
        })
        }
        cargarUsuarioSimulacion()
    })
    //-------------------------------- to be done
}

//---- Delete OT ----------------
function messageDeleteOt(
    statusOt,
    otNumber,
    idProjectSelected,
    ociKNumber,
    otKNumber,
    otDescription
    ) {
        
    const descriptionOt = otDescription.slice(13)

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    const htmlForm = `
        <div class="container m-auto">
            La OT#<strong>${otNumber}</strong>, Descripcion: "${descriptionOt}",
            Status: <span class="badge rounded-pill bg-${ statusOt==='Activo' ? 'primary' : 'danger' } text-white">
                        ${ statusOt==='Activo' ? 'Activo' : 'Inactivo' }
                    </span>
            y su toda su información interna se eliminará completamente.
            <br>
            <hr>
            Está seguro que desea continuar?
            <form id="formDeleteOt${idProjectSelected}" action="/api/proyectos/deleteOt/${idProjectSelected}" method="post">
                <fieldset>
                    <input type="hidden" name="ociKNumberHidden" value="${ociKNumber}">
                    <input type="hidden" name="otKNumberHidden" value="${otKNumber}">
                </fieldset>
            </form>
        </div>    
                    `
    
    if(idProjectSelected && otNumber) {
        Swal.fire({
            title: `Eliminar OT# ${otNumber}`,
            position: 'center',
            html: htmlForm,
            icon: 'question',
            width: 650,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: 'Eliminar <i class="fa-regular fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formDeleteOt${idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `La OT#<strong>${otNumber}</strong>, se eliminó correctamente!`
                })
            } else {
                Swal.fire(
                    `OT# ${otNumber}`,
                    `La OT#<b>${otNumber}</b>, no se eliminó!`,
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
            text: `La OT#<strong>${otNumber}</strong>, no se eliminó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

//---- Update Masive OT Data ----------------
function messageUpdateMasiveOt(arrayRowsSelected) {
    
    let numberKOci = parseInt(ociKNumber)
    let numnerKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
    let checked = 'checked'
    statusOt=='Activo' ? checked : checked = ''

    let bgColorStatus
    statusOt=='Activo' ? bgColorStatus='background-color: #55dd5560;'
                        : 
                         bgColorStatus='background-color: #dd555560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    var html = `<form id="formUpdateMasiveOt${idProjectSelected}" action="/api/proyectos/updateMasiveOt/${idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="numberOt" class="form-label d-flex justify-content-start ms-1">Número OT</label>
                                <input type="number" name="numberOt" class="form-control"
                                    placeholder="Número OT" value="${numberOt}" required>
                            </div>
                            
                            <div class="col-5" style="${bgColorStatus}">
                                <label for="statusOt" class="form-label d-flex justify-content-start ms-1">Status OT</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactiva</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusOtForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusOtForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusOt">Activa</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row mb-3 mx-1 px-1">
                            <div class="col">
                                <label for="descriptionOt" class="form-label d-flex justify-content-start ms-1">Descripción OT</label>
                                <input type="text" name="descriptionOt" class="form-control"
                                    placeholder="Descripción OT" value="${otDescription}" required>
                            </div>                            
                        </div>

                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="designOt" class="form-label d-flex justify-content-start ms-1">Diseño seguido por
                                    <button type="button" id="searchDesignUserModal" class="btn btn-light rounded-circle ms-1">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </label>
                                <input type="text" id="designOt" name="designOt" class="form-control"
                                    placeholder="Diseño seguido por" value="${otDesign}" required>
                            </div>
                            <div class="col-4">
                                <label for="simulationOt" class="form-label d-flex justify-content-start ms-1">Simulación seguida por
                                    <button type="button" id="searchSimulationUserModal" class="btn btn-light rounded-circle ms-1">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </label>
                                <input type="text" id="simulationOt" name="simulationOt" class="form-control"
                                    placeholder="Simulacion seguida por" value="${otSimulation}" required>
                            </div>
                            <div class="col-4">
                                <label for="supplierOt" class="form-label d-flex justify-content-start ms-1">Proveedor externo</label>
                                <input type="text" id="supplierOt" name="supplierOt" class="form-control"
                                    placeholder="Descripción OT" value="${otSupplier}" required>
                            </div>                      
                        </div> 

                            <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                            <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numnerKOt}" value="${numnerKOt}">
                    </fieldset>
                </form>`

    if(idProjectSelected && numberOt) {
        Swal.fire({
            title: `Actualizar OT# ${numberOt}`,
            position: 'center',
            html: html,
            width: 950,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formUpdateOt${idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `La OT# <b>${numberOt}</b>, se modificó con éxito!`
                })

            } else {
                Swal.fire(
                    'OT no modificada!',
                    `La OT# <b>${numberOt}</b>, no se modificó!`,
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
            text: `La OT# ${numberOt} no se actualizó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

let checkSelect = document.querySelectorAll('input[name="checkSelect"]')
let maxOtQuantity
checkSelect ? maxOtQuantity = parseInt(checkSelect.length) : maxOtQuantity=0
let ociTotalQty = parseInt(document.getElementById('ociTotalQty').innerText)

var arrayBtnChangeStatusOt = [],
    arrayBtnUpdateOt = [],
    arrayBtnDeleteOt = [],
    arrayCheckBoxSelect = [],
    arrayBtnCheckSelectionAll = [],
    arrayBtnCheckSelecMasive = []

    for (let m=0; m<ociTotalQty; m++) {
        let btnCheckSelectionAll = document.getElementById(`btnCheckSelectionAll${m}`)
        if (btnCheckSelectionAll) {
            arrayBtnCheckSelectionAll.push(btnCheckSelectionAll)
        }

        let btnCheckSelecMasive = document.getElementById(`btnCheckSelecMasive${m}`)
        if (btnCheckSelecMasive) {
            btnCheckSelecMasive.setAttribute('disabled', true)
            arrayBtnCheckSelecMasive.push(btnCheckSelecMasive)
        }

        for (let n=0; n<maxOtQuantity; n++) {
            let btnChangeStatusOt = document.getElementById(`btnStatusOt${m}_${n}`)
            if (btnChangeStatusOt) {
                arrayBtnChangeStatusOt.push(btnChangeStatusOt)
            }

            let btnUpdateOt = document.getElementById(`btnUpdateOt${m}_${n}`)
            if (btnUpdateOt) {
                arrayBtnUpdateOt.push(btnUpdateOt)
            }

            let btnDeleteOt = document.getElementById(`btnDeleteOt${m}_${n}`)
            if(btnDeleteOt) {
                arrayBtnDeleteOt.push(btnDeleteOt)
            }

            let checkBoxSelect = document.getElementById(`checkSelect${m}_${n}`)
            if (checkBoxSelect) {
                arrayCheckBoxSelect.push(checkBoxSelect)
            }
        }
    }
    
function cleanString(cadena) {
    // Eliminar espacios en blanco al principio y al final
    let cadenaSinEspaciosInit = cadena.trim()
    // Eliminar etiquetas HTML
    let cadenaSinEtiquetas = cadenaSinEspaciosInit.replace(/<[^>]*>/g, '')
    // Eliminar espacios en blanco al principio y al final
    let cadenaSinEspaciosEnd = cadenaSinEtiquetas.trim()
    return cadenaSinEspaciosEnd
  }

function updateBtnCheckSelecMasive(idOci) {     
    let btnMasive = document.getElementById(`btnCheckSelecMasive${idOci}`)
    let btnSelectAll = document.getElementById(`btnCheckSelectionAll${idOci}`)
    const cantidadSeleccionados = parseInt(document.querySelectorAll(`#tablaGeneral${idOci} input[name="checkSelect"]:checked`).length)
    const cantidadTotalXTabla = parseInt(document.querySelectorAll(`#tablaGeneral${idOci} input[name="checkSelect"]:not(:disabled)`).length)
    
    if (cantidadSeleccionados > 0) {
        if (cantidadSeleccionados === cantidadTotalXTabla) {
            btnSelectAll.innerHTML = 'Des-Seleccionar todos <i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            btnSelectAll.title = 'Des-Seleccionar todas las OT'
            btnSelectAll.classList.remove("btn-primary")
            btnSelectAll.classList.add("btn-danger")

        }
        btnMasive.innerHTML = `<i class="fa-solid fa-list-check"></i> Mod. multiple (${cantidadSeleccionados}/${cantidadTotalXTabla})`
        btnMasive.disabled = false
    
    } else {
        btnMasive.innerHTML = `<i class="fa-solid fa-list-check"></i> Mod. multiple (0)`
        btnMasive.disabled = true
    }
}  

arrayBtnCheckSelecMasive.forEach(function(elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault()
        const idOci = elemento.id.slice(19)
        var arrayRowsSelected = []
        for (let z=0; z<99; z++) {
            let selected = document.getElementById(`checkSelect${idOci}_${z}`)

            if (selected && selected.checked) {
                const statusOt = cleanString(document.getElementById(`lastOtStatus${idOci}_${z}`).textContent)
                const otNumber = parseInt(document.getElementById(`lastOtNumber${idOci}_${z}`).textContent)
                const otDescription = document.getElementById(`lastOpDescription${idOci}_${z}`).textContent
                const otDesign =  document.getElementById(`otDesign${idOci}_${z}`).textContent
                const otSimulation =  document.getElementById(`otSimulation${idOci}_${z}`).textContent
                const otSupplier =  document.getElementById(`otSupplier${idOci}_${z}`).textContent
                const idProjectSelected = document.getElementById('projectIdHidden').value
                
                arrayRowsSelected.push({
                    selected, 
                    statusOt, 
                    otNumber, 
                    otDescription, 
                    otDesign, 
                    otSimulation, 
                    otSupplier, 
                    idProjectSelected
                })
            }
        }
                
        messageUpdateMasiveOt(arrayRowsSelected)
        
    })
})


arrayBtnChangeStatusOt.forEach(function(elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault()
        const idOtOci = (event.target.id).slice(11)
        const arrayOciOtSelected = (event.target.id).slice(11).split('_')
        
        const statusOt = document.getElementById(`lastOtStatus${idOtOci}`).textContent
        const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOci}`).textContent)
        const idProjectSelected = document.getElementById('projectIdHidden').value
        const ociKNumber = parseInt(arrayOciOtSelected[0])
        const otKNumber = parseInt(arrayOciOtSelected[1])
        
        messageChangeOtStatus(
            cleanString(statusOt),
            otNumber,
            idProjectSelected,
            ociKNumber,
            otKNumber
        )
    })
})

arrayBtnUpdateOt.forEach(function(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        const idOtOci = (event.target.id).slice(11)
        const arrayOciOtSelected = (event.target.id).slice(11).split('_')
        
        const statusOt = document.getElementById(`lastOtStatus${idOtOci}`).textContent
        const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOci}`).textContent)
        const idProjectSelected = document.getElementById('projectIdHidden').value
        const ociKNumber = parseInt(arrayOciOtSelected[0])
        const otKNumber = parseInt(arrayOciOtSelected[1])       
        const otDescription = document.getElementById(`lastOpDescription${idOtOci}`).textContent
        const otDesign =  document.getElementById(`otDesign${idOtOci}`).textContent
        const otSimulation =  document.getElementById(`otSimulation${idOtOci}`).textContent
        const otSupplier =  document.getElementById(`otSupplier${idOtOci}`).textContent
        
        messageUpdateOt(
            cleanString(statusOt),
            otNumber,
            idProjectSelected,
            ociKNumber,
            otKNumber,
            cleanString(otDescription),
            cleanString(otDesign),
            cleanString(otSimulation),
            cleanString(otSupplier)
        )
    })
})

arrayBtnDeleteOt.forEach(function(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        const idOtOci = (event.target.id).slice(11)
        const arrayOciOtSelected = (event.target.id).slice(11).split('_')
        
        const statusOt = document.getElementById(`lastOtStatus${idOtOci}`).textContent
        const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOci}`).textContent)
        const idProjectSelected = document.getElementById('projectIdHidden').value
        const ociKNumber = parseInt(arrayOciOtSelected[0])
        const otKNumber = parseInt(arrayOciOtSelected[1])       
        const otDescription = document.getElementById(`lastOpDescription${idOtOci}`).textContent
        
        messageDeleteOt(
            cleanString(statusOt),
            otNumber,
            idProjectSelected,
            ociKNumber,
            otKNumber,
            otDescription
        )
    })
})

arrayCheckBoxSelect.forEach(function(element) {
    element.checked = ''
    element.addEventListener('change', (event) => {
        event.preventDefault()
        const idOtOci = (event.target.id).slice(11)
        if (document.getElementsByName(`rowSelected${idOtOci}`)) {
            var rowSelectCheck = Array.from(document.getElementsByName(`rowSelected${idOtOci}`))
        }

        let idOci = extractNumbers(element.id)[0]
        //let idOt = extractNumbers(element.id)[1]
        
        updateBtnCheckSelecMasive(idOci)

        for (let q=0; q<12; q++) {
            if (rowSelectCheck[q] && rowSelectCheck[q].style.cssText == "height: 7vh;") {
                rowSelectCheck[q].setAttribute('style', "height: 7vh; background-color: #c4f0fd;")
                
            } else {
                rowSelectCheck[q].setAttribute('style', "height: 7vh;")
            }
        }
    })
})

let seleccionados = false
let seleccionarFilas = false
arrayBtnCheckSelectionAll.forEach(function(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        const idOci = parseInt((element.id).slice(20))
        let checkboxes = Array.from(document.querySelectorAll(`#tablaGeneral${idOci} tbody input[type="checkbox"]`))
        
        var arrQueryRows=[]
        for(let q=0; q<99; q++) {
            let rowsSelectCheck = document.getElementsByName(`rowSelected${idOci}_${q}`)
            if(rowsSelectCheck.length > 0) {
                arrQueryRows.push(rowsSelectCheck)
            }
        }

        // funcion selecciona todas las filas
        function seleccionarTodasFilas() {
            arrQueryRows.forEach(nodeList => {
                Array.from(nodeList).forEach(element => {
                    !seleccionarFilas ? element.style = "height: 7vh; background-color: rgb(196, 240, 253);" : element.style = "height: 7vh;"                    
               })
            })
            seleccionarFilas = !seleccionarFilas
        }
        seleccionarTodasFilas()
        
        // funcion selecciona todos los checkbox
        function seleccionarTodos() {
            checkboxes.forEach(function(checkbox) {
                if (!checkbox.disabled) {
                    !seleccionados ? checkbox.checked = true : checkbox.checked = false
                }
            })
            seleccionados = !seleccionados
        }
        seleccionarTodos()

        element.classList[1] == 'btn-primary' ? 
            (element.classList.remove("btn-primary"),
            element.classList.add("btn-danger"))
            :
            (element.classList.remove("btn-danger"),
            element.classList.add("btn-primary"))

        element.title == 'Seleccionar todas las OT' ?
            element.title = 'Des-Seleccionar todas las OT'
            :
            element.title = 'Seleccionar todas las OT'

        element.innerHTML == 'Des-Seleccionar todos <i class="fa-solid fa-xmark" aria-hidden="true"></i>' ?
            element.innerHTML = 'Seleccionar todos <i class="fa-solid fa-check-double" aria-hidden="true"></i>' 
            :
            element.innerHTML = 'Des-Seleccionar todos <i class="fa-solid fa-xmark" aria-hidden="true"></i>'

        updateBtnCheckSelecMasive(idOci)
    })
})




//-----Btns Buscar en BBDD el Usuario Seguidor de Diseño --------------
const searchDesignUser = document.getElementById('searchDesignUser')
searchDesignUser.addEventListener('click', (event) => {
    event.preventDefault()

    function cargarUsuarioDiseno() {
        fetch('../../../api/usuarios/searchUsers/simulacion')
          .then(response => response.json())
          .then(users => {
            const arrayUsauriosDiseno = []
            const arrayUsersAll = []

            for(let i=0; i<users.usersAll.length; i++) {

                if(users.usersAll[i].status && users.usersAll[i].permiso ==='diseno') {
                    arrayUsauriosDiseno.push(`
                                    <label>
                                        <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-info text-dark my-2">
                                            <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                            ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                        </span>
                                    </label>`)

                } else if (users.usersAll[i].status && users.usersAll[i].permiso !=='diseno') {
                    arrayUsersAll.push(`
                                <label>
                                    <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-light text-dark my-2">
                                        <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                        ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                    </span>
                                </label>`)
                }
            }
            
            const html = `
                    <hr>
                        <label>Usuarios Diseño</label>
                        <div name='container' class="container">
                            ${arrayUsauriosDiseno.join(' ')}
                        </div>
                    <hr>
                        <label>Usuarios</label>
                        <div name='container' class="container">
                            ${arrayUsersAll.join(' ')}
                        </div>
                    <hr>`

                    Swal.fire({
                        title: 'Usuarios',
                        html: html,
                        width: 450,
                        background: "#eee",
                        allowOutsideClick: false,
                        showCloseButton: true,
                        confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>'    
                    }).then((result) => {
                        const radiosToSelect = document.getElementsByName('radioUsuarios')

                        for(let i=0; i<radiosToSelect.length; i++) {
                            const radioSelected = document.getElementById(i)
                            
                            if (radioSelected.checked) {
                                var usuariosSeleccionado = radioSelected.value
                            }
                        }
                        
                        if (result.isConfirmed) {
                            const inputUserSelected = document.getElementById('internoDiseno')
                            inputUserSelected.value = usuariosSeleccionado
                        
                        } else {
                            Swal.fire(
                                'Usuario no seleccionado!',
                                `No ha seleccionado ningún usuario!`,
                                'warning'
                            )
                            return false
                        }
                    })
        })
        .catch(error => {
        console.error('Error:', error)
        })
      }
      cargarUsuarioDiseno()
})

//-----Btns Buscar en BBDD el Usuario Seguidor de Simulacion --------------
const searchSimulationUser = document.getElementById('searchSimulationUser')
searchSimulationUser.addEventListener('click', (event) => {
    event.preventDefault()

    function cargarUsuarioSimulacion() {
        fetch('../../../api/usuarios/searchUsers/all')
          .then(response => response.json())
          .then(users => {
            const arrayUsauriosSimulacion = []
            const arrayUsersAll = []

            for(let i=0; i<users.usersAll.length; i++) {

                if(users.usersAll[i].status && users.usersAll[i].permiso ==='simulacion') {
                    arrayUsauriosSimulacion.push(`
                                    <label>
                                        <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-warning text-dark my-2">
                                            <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                            ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                        </span>
                                    </label>`)

                } else if (users.usersAll[i].status && users.usersAll[i].permiso !=='simulacion') {
                    arrayUsersAll.push(`
                                <label>
                                    <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-light text-dark my-2">
                                        <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                        ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                    </span>
                                </label>`)
                }
            }
            
            const html = `
                    <hr>
                        <label>Usuarios Simulación</label>
                        <div name='container' class="container">
                            ${arrayUsauriosSimulacion.join(' ')}
                        </div>
                    <hr>
                        <label>Usuarios</label>
                        <div name='container' class="container">
                            ${arrayUsersAll.join(' ')}
                        </div>
                    <hr>`

                    Swal.fire({
                        title: 'Usuarios',
                        html: html,
                        width: 450,
                        background: "#eee",
                        allowOutsideClick: false,
                        showCloseButton: true,
                        confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>'    
                    }).then((result) => {
                        const radiosToSelect = document.getElementsByName('radioUsuarios')

                        for(let i=0; i<radiosToSelect.length; i++) {
                            const radioSelected = document.getElementById(i)
                            
                            if (radioSelected.checked) {
                                var usuariosSeleccionado = radioSelected.value
                            }
                        }
                        
                        if (result.isConfirmed) {
                            const inputUserSelected = document.getElementById('internoSimulacion')
                            inputUserSelected.value = usuariosSeleccionado
                        
                        } else {
                            Swal.fire(
                                'Usuario no seleccionado!',
                                `No ha seleccionado ningún usuario!`,
                                'warning'
                            )
                            return false
                        }
                    })
        })
        .catch(error => {
        console.error('Error:', error)
        })
      }
      cargarUsuarioSimulacion()
})

function messageNewOt(ociNumber, otArray) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    if (otArray.length > 1) {
        Swal.fire({
            title: 'Ingreso de datos!',
            position: 'center',
            text: `Se agregarán las OT's ${otArray.join(" - ")}, a la OCI# ${ociNumber}`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('formNewOt').submit()
                Toast.fire({
                    icon: 'success',
                    title: `OT's ${otArray.join(" - ")}, agregadas con éxito!`
                })
            } else {
                Swal.fire(
                    'OTs no agregadas!',
                    `Las OT's ${otArray.join(" - ")}, no fueron agregadas a la OCI# ${ociNumber}`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Ingreso de datos!',
            position: 'center',
            text: `Se agregará la OT ${otArray}, a la OCI# ${ociNumber}`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('formNewOt').submit()
                Toast.fire({
                    icon: 'success',
                    title: `OT ${otArray.join(" - ")}, agregada con éxito!`
                })
            } else {
                Swal.fire(
                    'OT no agregada!',
                    `La OT ${otArray}, no fue agregada a la OCI# ${ociNumber}`,
                    'warning'
                )
                return false
            }
        })
    }
}

const btnCreateNewOt = document.getElementById('btnNewOt')
btnCreateNewOt.addEventListener('click', (event) => {
    event.preventDefault()
    let ociNumberHiddenValue = parseInt(document.getElementById('ociNumberHidden').value)
    
    if (ociNumberHiddenValue) {
        const otQuantity = parseInt(document.getElementById('otQuantity').value)
        let otArray = [document.getElementById(`otNumber`).value]
    
        if (otQuantity > 1) {
            for (let j = 1; j < otQuantity; j++) {
                let otNumberSelected = document.getElementById(`otNumber${j}`).value
                otArray.push(otNumberSelected)
            }
        }
        messageNewOt(ociNumberHiddenValue, otArray)

    } else {
        console.log('Hubo un error al seleccionar la OCI!!') //Hacer sweetAlert2
    }
})

//---------- Obtiene la lista de OT ------------
function getOtList(i) {
    const parentDiv = document.getElementById(`tablaGeneral${i}`)
    let tableBody = parentDiv.lastElementChild
    const lastChild = parseInt(tableBody.childElementCount)

    let k = i
    let arrayOtNumber = [], arrayOpNumber = [], arrayOtStatus = []
    for (let n=0; n < lastChild; n++) {
        const otNumber = document.getElementById(`lastOtNumber${k}_${n}`).innerText
        const opNumber = document.getElementById(`lastOpNumber${k}_${n}`).innerText
        const otStatus = document.getElementById(`lastOtStatus${k}_${n}`).innerText
        arrayOtNumber.push(otNumber)
        arrayOpNumber.push(opNumber)
        arrayOtStatus.push(otStatus)
    }
    return {
        arrayOtNumber,
        arrayOpNumber,
        arrayOtStatus,
        lastChild
    }
}

//---------- Obtiene los valores de la lista de OT ------------
function getOtListValues(i, idTabla) {
    const parentDiv = document.getElementById(`${idTabla}`)
    let tableBody = parentDiv.lastElementChild
    const lastChild = parseInt(tableBody.childElementCount)

    let k = i
    let arrayProcesoR14 = [], arrayAprobadoR14 = [], arrayConjuntos = []

    for (let n=0; n < lastChild; n++) {
        //------------R14--------------
        const otProcesoR14 = document.getElementById(`resProcesoR14${k}_${n}`).innerText
        const otAprobadoR14 = document.getElementById(`resAprobadoR14${k}_${n}`).innerText
        //---------Proceso 3d----------
        
        arrayConjuntos.push( { [`${n}`] : [otProcesoR14, otAprobadoR14] } )
        arrayProcesoR14.push(otProcesoR14)
        arrayAprobadoR14.push(otAprobadoR14)
    }
    console.log('arrayConjuntosR14', arrayConjuntos)
    return {
        arrayProcesoR14,
        arrayAprobadoR14
    }
}

function addDatoToR14(i, idTabla) {
    let res = getOtList(i)
    let getValues = getOtListValues(i, idTabla)

    var arrayBloque = []
    for (let y=0; y < res.lastChild; y++) {
        let color = ''
        let disabled = 'required'
        if (res.arrayOtStatus[y]==='Activo') {
            color = 'success'
        } else {
            color = 'danger'
            disabled = 'disabled'
        }

        let valorProcesoR14 = ''

        const optionOk = (`
            <option value="noOk">No OK</option>
            <option value="pendiente">Pendiente</option>
            <option value="noAplica">N/A</option>
        `)

        const optionNoOk = (`
            <option value="ok">OK</option>
            <option value="pendiente">Pendiente</option>
            <option value="noAplica">N/A</option>
        `)

        const optionPendiente = (`
            <option value="ok">OK</option>
            <option value="noOk">No OK</option>
            <option value="noAplica">N/A</option>
        `)

        const optionNoAplica = (`
            <option value="ok">OK</option>
            <option value="noOk">No OK</option>
            <option value="pendiente">Pendiente</option>
        `)

        const optionDefault = (`
            <option value="ok">OK</option>
            <option value="noOk">No OK</option>
            <option value="pendiente">Pendiente</option>
            <option value="noAplica">N/A</option>
        `)

        let optionDefinedProcesoR14 = ''

        switch (getValues.arrayProcesoR14[y]) {
            case 'OK': {
                valorProcesoR14 = 'ok'
                optionDefinedProcesoR14 = optionOk
            break;
            }
            case 'No OK': {
                valorProcesoR14 = 'noOk'
                optionDefinedProcesoR14 = optionNoOk
            break;
            }
            case 'Pendiente': {
                valorProcesoR14 = 'pendiente'
                optionDefinedProcesoR14 = optionPendiente
            break;
            }
            case 'N/A': {
                valorProcesoR14 = 'noAplica'
                optionDefinedProcesoR14 = optionNoAplica
            break;
            }
            default: {
                valorProcesoR14 = 'SinDato'
                optionDefinedProcesoR14 = optionDefault
            break;
            }
        }

        let valorAprobadoR14 = ''
        let optionDefinedAprobadoR14 = ''

        switch (getValues.arrayAprobadoR14[y]) {
            case 'OK': {
                valorAprobadoR14 = 'ok'
                optionDefinedAprobadoR14 = optionOk
            break;
            }
            case 'No OK': {
                valorAprobadoR14 = 'noOk'
                optionDefinedAprobadoR14 = optionNoOk
            break;
            }
            case 'Pendiente': {
                valorAprobadoR14 = 'pendiente'
                optionDefinedAprobadoR14 = optionPendiente
            break;
            }
            case 'N/A': {
                valorAprobadoR14 = 'noAplica'
                optionDefinedAprobadoR14 = optionNoAplica
            break;
            }
            default: {
                valorProcesoR14 = 'SinDato'
                optionDefinedAprobadoR14 = optionDefault
            break;
            }
        }


        arrayBloque.push(`
        <div class="row my-1 mx-auto">
            <div class="col-2 my-auto align-self-middle">
                <span id="${res.arrayOtStatus[y]}" class="badge rounded-pill bg-${color} text-white">${res.arrayOtStatus[y]}</span>
                <input type="hidden" name="otStatusHidden${y}" value="${res.arrayOtStatus[y]}">
            </div>
            <div class="col-2 my-auto align-self-middle">
                <span id="${res.arrayOtNumber[y]}" class="badge rounded-pill bg-dark text-white">${res.arrayOtNumber[y]}</span>
                <input type="hidden" name="otNumberHidden${y}" value="${res.arrayOtNumber[y]}">
            </div>
            <div class="col-2 my-auto align-self-middle">
                <span class="badge rounded-pill bg-secondary text-white">${res.arrayOpNumber[y]}</span>
            </div>
            <div class="col my-auto">
                <select id="procesoR14${res.arrayOtNumber[y]}" name="procesoR14${y}" class="form-select" ${disabled}>
                    <option selected disabled value="${valorProcesoR14}">${getValues.arrayProcesoR14[y]}</option>
                    ${optionDefinedProcesoR14}
                </select>
            </div>
            <div class="col my-auto">
                <select id="aprobadoR14${res.arrayOtNumber[y]}" name="aprobadoR14${y}" class="form-select" ${disabled}>
                    <option selected disabled value="${valorAprobadoR14}">${getValues.arrayAprobadoR14[y]}</option>
                    ${optionDefinedAprobadoR14}
                </select>
            </div>
        </div>    
        `)
    }

    const html = `
            <form id="formR14Values" action="/api/proyectos/otInfoR14" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto">
                        <div class="col-2 my-auto align-self-middle">
                            <label for="otStatus"><strong>OT Status</strong></label>
                        </div>
                        <div class="col-2 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT#</strong></label>
                        </div>
                        <div class="col-2 my-auto align-self-middle">
                            <label for="opNumber"><strong>OP#</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="procesoR14"><strong>Proceso</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="aprobado"><strong>Aprobado PM</strong></label>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque.join("<br>")}
                    <hr>
                    <input type="hidden" name="projectIdHidden" value="${projectNumberId}">
                    <input type="hidden" name="clientIdHidden" value="${clientId.value}">
                    <input type="hidden" name="ociNumberK" value="${i}"> 
                    <input type="hidden" name="otQuantity" value="${arrayBloque.length}">
                </fieldset>
            </form>
    `

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
    Swal.fire({
        title: 'R-14',
        html: html,
        width: 650,
        //background: "#aaaaaa",
        allowOutsideClick: false,
        //showConfirmButton: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
        // showLoaderOnConfirm: true,
        // preConfirm: () => {
        //     var arrayInputs = []
        //     for (let y=0; y < res.lastChild; y++) {
        //         arrayInputs.push(
        //             document.getElementById(`${res.arrayOtNumber[y]}`).innerText,
        //             document.getElementById(`procesoR14${res.arrayOtNumber[y]}`).value,
        //             document.getElementById(`aprobadoR14${res.arrayOtNumber[y]}`).value
        //         )
        //     }
        //     return arrayInputs
        // }        
    }).then((result) => {
        if (result.isConfirmed) {
            const formR14Values = document.getElementById('formR14Values')
            formR14Values.submit()
            Toast.fire({
                icon: 'success',
                title: `Información de OT ${res.arrayOtNumber.join(" - ")} agregada con éxito!`
            })
        } else {
            Swal.fire(
                'Info R14 no agregada!',
                `La información no fue agregada a las OTs# ${res.arrayOtNumber.join(" - ")}!`,
                'warning'
            )
            return false
        }
    })
}

function addDatoToProceso3d(i) {
    let res = getOtList(i)
    let getValues = getOtListValues(i)

    var arrayBloque = []
    for (let y=0; y < res.lastChild; y++) {
        let color = ''
        let disabled = 'required'
        if (res.arrayOtStatus[y]==='Activo') {
            color = 'success'
        } else {
            color = 'danger'
            disabled = 'disabled'
        }

        let valorProceso3d = ''

        const optionOk = (`
            <option value="noOk">No OK</option>
            <option value="pendiente">Pendiente</option>
            <option value="noAplica">N/A</option>
        `)

        const optionNoOk = (`
            <option value="ok">OK</option>
            <option value="pendiente">Pendiente</option>
            <option value="noAplica">N/A</option>
        `)

        const optionPendiente = (`
            <option value="ok">OK</option>
            <option value="noOk">No OK</option>
            <option value="noAplica">N/A</option>
        `)

        const optionNoAplica = (`
            <option value="ok">OK</option>
            <option value="noOk">No OK</option>
            <option value="pendiente">Pendiente</option>
        `)

        const optionDefault = (`
            <option value="ok">OK</option>
            <option value="noOk">No OK</option>
            <option value="pendiente">Pendiente</option>
            <option value="noAplica">N/A</option>
        `)

        let optionDefinedProceso3d = ''

        // switch (getValues.arrayProceso3d[y]) {
        //     case 'OK': {
        //         valorProceso3d = 'ok'
        //         optionDefinedProceso3d = optionOk
        //     break;
        //     }
        //     case 'No OK': {
        //         valorProcesoR14 = 'noOk'
        //         optionDefinedProcesoR14 = optionNoOk
        //     break;
        //     }
        //     case 'Pendiente': {
        //         valorProcesoR14 = 'pendiente'
        //         optionDefinedProcesoR14 = optionPendiente
        //     break;
        //     }
        //     case 'N/A': {
        //         valorProcesoR14 = 'noAplica'
        //         optionDefinedProcesoR14 = optionNoAplica
        //     break;
        //     }
        //     default: {
        //         valorProcesoR14 = 'SinDato'
        //         optionDefinedProcesoR14 = optionDefault
        //     break;
        //     }
        // }



        arrayBloque.push(`
        <div class="row my-1 mx-auto">
            <div class="col-2 my-auto align-self-middle">
                <span id="${res.arrayOtStatus[y]}" class="badge rounded-pill bg-${color} text-white">${res.arrayOtStatus[y]}</span>
                <input type="hidden" name="otStatusHidden${y}" value="${res.arrayOtStatus[y]}">
            </div>
            <div class="col-2 my-auto align-self-middle">
                <span class="badge rounded-pill bg-dark text-white">${res.arrayOtNumber[y]}</span>
            </div>
            <div class="col-2 my-auto align-self-middle">
                <span class="badge rounded-pill bg-secondary text-white">${res.arrayOpNumber[y]}</span>
            </div>
            <div class="col my-auto">
                <select id="proceso" name="proceso" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <input type="number" id="hsProceso" name="hsProceso" class="form-control" min="0" max="9999" required>
            </div>
        </div>    
        `)
    }

    const html = `
            <form id="formProceso3dValues" action="/api/proyectos/oci" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto">
                        <div class="col-2 my-auto align-self-middle">
                            <label for="otStatus"><strong>OT Status</strong></label>
                        </div>
                        <div class="col-2 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT#</strong></label>
                        </div>
                        <div class="col-2 my-auto align-self-middle">
                            <label for="opNumber"><strong>OP#</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="proceso"><strong>Proceso 3D</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="hsProceso"><strong>Hs. Proceso 3D</strong></label>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque.join("<br>")}
                    <hr>
                    <input type="hidden" name="projectIdHidden" value="${projectNumberId}">
                    <input type="hidden" name="clientIdHidden" value="${clientId.value}">
                    <input type="hidden" name="ociNumberK" value="${i}"> 
                    <input type="hidden" name="otQuantity" value="${arrayBloque.length}">
                </fieldset>
            </form>
    `

    Swal.fire({
        title: 'Proceso 3D',
        html: html,
        //background: "#aaaaaa",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    }).then((result) => {
        if (result.isConfirmed) {
            // Haz algo con los valores seleccionados, por ejemplo, muestra una alerta
            Swal.fire(`Seleccionaste: `)
        }
    })
}

function addDatoToDiseno(i) {
    let resultado = getOtList(i)

    var arrayBloque = []
    for (let y=0; y < resultado.lastChild; y++) {
        arrayBloque.push(`
        <div class="row my-1 mx-auto justify-content-center">
            <div class="col-1 my-auto align-self-middle">
                <span class="badge rounded-pill bg-dark text-white">${resultado.arrayOtNumber[y]}</span>
            </div>
            <div class="col-1 my-auto align-self-middle">
                <span class="badge rounded-pill bg-secondary text-white">${resultado.arrayOpNumber[y]}</span>
            </div>
            <div class="col my-auto">
                <input type="number" id="avDiseno" name="avDiseno" class="form-control" min="0" max="100" required>
            </div>
            <div class="col my-auto">
                <input type="number" id="primerRev50" name="primerRev50" class="form-control" min="-1" max="100" required>
            </div>
            <div class="col my-auto">
                <input type="number" id="segundaRev80" name="segundaRev80" class="form-control" min="0" max="100" required>
            </div>
            <div class="col my-auto">
                <select id="envCliente" name="envCliente" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="si">SI</option>
                    <option value="no">NO</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="revCliente" name="revCliente" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="si">SI</option>
                    <option value="no">NO</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="ldmProv" name="ldmProv" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="si">SI</option>
                    <option value="no">NO</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <input type="number" id="rev100" name="rev100" class="form-control" min="0" max="100" required>
            </div>
            <div class="col my-auto">
                <select id="aprobCliente" name="aprobCliente" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="si">SI</option>
                    <option value="no">NO</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
        </div>    
        `)
    }

    const html = `
            <form id="formDisenoValues" action="/api/proyectos/oci" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto justify-content-center">
                        <div class="col-1 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT#</strong></label>
                        </div>
                        <div class="col-1 my-auto align-self-middle">
                            <label for="opNumber"><strong>OP#</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="avDiseno"><strong>Av. Diseño</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="primerRev50"><strong>1° Rev 50%</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="segundaRev80"><strong>2° Rev 80%</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="envCliente"><strong>Env. Cliente</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="revCliente"><strong>Rev. Cliente</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="ldmProv"><strong>LDM Prov.</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="rev100"><strong>Rev. 100%</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="aprobCliente"><strong>Aprob. Cliente</strong></label>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque}
                </fieldset>
            </form>
    `

    Swal.fire({
        title: 'Diseño',
        html: html,
        width: 1425,
        //background: "#aaaaaa",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    }).then((result) => {
        if (result.isConfirmed) {
            // Haz algo con los valores seleccionados, por ejemplo, muestra una alerta
            Swal.fire(`Seleccionaste: `)
        }
    })
}

function addDatoToInfo80(i) {
    let resultado = getOtList(i)

    var arrayBloque = []
    for (let y=0; y < resultado.lastChild; y++) {
        arrayBloque.push(`
        <div class="row my-1 mx-auto justify-content-center">
            <div class="col-1 my-auto align-self-middle">
                <span class="badge rounded-pill bg-dark text-white">${resultado.arrayOtNumber[y]}</span>
            </div>
            <div class="col-1 my-auto align-self-middle">
                <span class="badge rounded-pill bg-secondary text-white">${resultado.arrayOpNumber[y]}</span>
            </div>
            <div class="col my-auto">
                <select id="ldmAvanCG" name="ldmAvanCG" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="ldmAvanT" name="ldmAvanT" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
                </div>
            <div class="col my-auto">
                <select id="ldm80" name="ldm80" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>    
            </div>
            <div class="col my-auto">
                <select id="infoModelo" name="infoModelo" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
        </div>    
        `)
    }

    const html = `
            <form id="formInfo80Values" action="/api/proyectos/oci" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto justify-content-center">
                        <div class="col-1 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT#</strong></label>
                        </div>
                        <div class="col-1 my-auto align-self-middle">
                            <label for="opNumber"><strong>OP#</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="ldmAvanCG"><strong>LDM Avan. (Cil/Guia)</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="ldmAvanT"><strong>LDM Avan. (Tacos D2)</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="ldm80"><strong>LDM 80%</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="infoModelo"><strong>Info Modelo</strong></label>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque}
                </fieldset>
            </form>
    `

    Swal.fire({
        title: 'Info 80%',
        html: html,
        width: 700,
        //background: "#aaaaaa",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    }).then((result) => {
        if (result.isConfirmed) {
            // Haz algo con los valores seleccionados, por ejemplo, muestra una alerta
            Swal.fire(`Seleccionaste: `)
        }
    })
}

function addDatoToInfo100(i) {
    let resultado = getOtList(i)

    var arrayBloque = []
    for (let y=0; y < resultado.lastChild; y++) {
        arrayBloque.push(`
        <div class="row my-1 mx-auto">
            <div class="col-2 my-auto align-self-middle">
                <span class="badge rounded-pill bg-dark text-white">${resultado.arrayOtNumber[y]}</span>
            </div>
            <div class="col-2 my-auto align-self-middle">
                <span class="badge rounded-pill bg-secondary text-white">${resultado.arrayOpNumber[y]}</span>
            </div>
            <div class="col my-auto">
                <select id="ldm100" name="ldm100" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="info100" name="info100" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
        </div>    
        `)
    }

    const html = `
            <form id="formInfo100Values" action="/api/proyectos/oci" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto">
                        <div class="col-2 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT#</strong></label>
                        </div>
                        <div class="col-2 my-auto align-self-middle">
                            <label for="opNumber"><strong>OP#</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="ldm100"><strong>LDM 100%</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="info100"><strong>Info 100%</strong></label>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque}
                </fieldset>
            </form>
    `

    Swal.fire({
        title: 'Info 100%',
        html: html,
        width: 500,
        //background: "#aaaaaa",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    }).then((result) => {
        if (result.isConfirmed) {
            // Haz algo con los valores seleccionados, por ejemplo, muestra una alerta
            Swal.fire(`Seleccionaste: `)
        }
    })
}

function addDatoToS0(i) {
    let resultado = getOtList(i)

    var arrayBloque = []
    for (let y=0; y < resultado.lastChild; y++) {
        arrayBloque.push(`
        <div class="row my-1 mx-auto">
            <div class="col-2 my-auto align-self-middle">
                <span class="badge rounded-pill bg-dark text-white">${resultado.arrayOtNumber[y]}</span>
            </div>
            <div class="col-2 my-auto align-self-middle">
                <span class="badge rounded-pill bg-secondary text-white">${resultado.arrayOpNumber[y]}</span>
            </div>
            <div class="col my-auto">
                <select id="sim0" name="sim0" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="docuS0" name="docuS0" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
        </div>    
        `)
    }

    const html = `
            <form id="formS0Values" action="/api/proyectos/oci" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto">
                        <div class="col-2 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT#</strong></label>
                        </div>
                        <div class="col-2 my-auto align-self-middle">
                            <label for="opNumber"><strong>OP#</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="sim0"><strong>Simulación</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="docuS0"><strong>Documentación</strong></label>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque}
                </fieldset>
            </form>
    `

    Swal.fire({
        title: 'Simulación - S0',
        html: html,
        width: 500,
        //background: "#aaaaaa",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    }).then((result) => {
        if (result.isConfirmed) {
            // Haz algo con los valores seleccionados, por ejemplo, muestra una alerta
            Swal.fire(`Seleccionaste: `)
        }
    })
}

function addDatoToS1(i) {
    let resultado = getOtList(i)

    var arrayBloque = []
    for (let y=0; y < resultado.lastChild; y++) {
        arrayBloque.push(`
        <div class="row my-1 mx-auto">
            <div class="col-1 my-auto align-self-middle">
                <span class="badge rounded-pill bg-dark text-white">${resultado.arrayOtNumber[y]}</span>
            </div>
            <div class="col-1 my-auto align-self-middle">
                <span class="badge rounded-pill bg-secondary text-white">${resultado.arrayOpNumber[y]}</span>
            </div>
            <div class="col my-auto">
                <select id="sim1" name="sim1" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="video" name="video" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="informe" name="informe" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="ppt" name="ppt" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="s1pOp20" name="s1pOp20" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
        </div>    
        `)
    }

    const html = `
            <form id="formS1Values" action="/api/proyectos/oci" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto">
                        <div class="col-1 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT#</strong></label>
                        </div>
                        <div class="col-1 my-auto align-self-middle">
                            <label for="opNumber"><strong>OP#</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="sim1"><strong>Simulación</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="video">
                                <strong>Video <i class="fa-solid fa-video"></i>
                                </strong>
                            </label>
                        </div>
                        <div class="col my-auto">
                            <label for="informe"><strong>Informe</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="ppt"><strong>PPT</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="s1pOp20"><strong>S1 p/Op20</strong></label>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque}
                </fieldset>
            </form>
    `

    Swal.fire({
        title: 'Simulación - S1',
        html: html,
        width: 950,
        //background: "#aaaaaa",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    }).then((result) => {
        if (result.isConfirmed) {
            // Haz algo con los valores seleccionados, por ejemplo, muestra una alerta
            Swal.fire(`Seleccionaste: `)
        }
    })
}

function addDatoToS23(i) {
    let resultado = getOtList(i)

    var arrayBloque = []
    for (let y=0; y < resultado.lastChild; y++) {
        arrayBloque.push(`
        <div class="row my-1 mx-auto">
            <div class="col-1 my-auto align-self-middle">
                <span class="badge rounded-pill bg-dark text-white">${resultado.arrayOtNumber[y]}</span>
            </div>
            <div class="col-1 my-auto align-self-middle">
                <span class="badge rounded-pill bg-secondary text-white">${resultado.arrayOpNumber[y]}</span>
            </div>
            <div class="col my-auto">
                <select id="sim2" name="sim2" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="reporte" name="reporte" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="dfnProdismo" name="dfnProdismo" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col-1 my-auto">
            </div>
            <div class="col my-auto">
                <select id="sim3" name="sim3" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
        </div>    
        `)
    }

    const html = `
            <form id="formS23Values" action="/api/proyectos/oci" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto">
                        <div class="col-1 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT#</strong></label>
                        </div>
                        <div class="col-1 my-auto align-self-middle">
                            <label for="opNumber"><strong>OP#</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="sim2"><strong>Simulación S2</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="reporte"><strong>Reporte</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="dfnProdismo"><strong>DFN Prodismo</strong></label>
                        </div>
                        <div class="col-1 my-auto">
                        </div>
                        <div class="col my-auto">
                            <label for="sim3"><strong>Simulación S3</strong></label>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque}
                </fieldset>
            </form>
    `

    Swal.fire({
        title: 'Simulación - S2/3',
        html: html,
        width: 830,
        //background: "#aaaaaa",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    }).then((result) => {
        if (result.isConfirmed) {
            // Haz algo con los valores seleccionados, por ejemplo, muestra una alerta
            Swal.fire(`Seleccionaste: `)
        }
    })
}

function addDatoToS4(i) {
    let resultado = getOtList(i)

    var arrayBloque = []
    for (let y=0; y < resultado.lastChild; y++) {
        arrayBloque.push(`
        <div class="row my-1 mx-auto">
            <div class="col-1 my-auto align-self-middle">
                <span class="badge rounded-pill bg-dark text-white">${resultado.arrayOtNumber[y]}</span>
            </div>
            <div class="col-1 my-auto align-self-middle">
                <span class="badge rounded-pill bg-secondary text-white">${resultado.arrayOpNumber[y]}</span>
            </div>
            <div class="col my-auto">
                <select id="matEnsayo" name="matEnsayo" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="si">SI</option>
                    <option value="no">NO</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="masMenos10" name="masMenos10" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="mpAlternativo" name="mpAlternativo" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="reuSim" name="reuSim" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="si">SI</option>
                    <option value="no">NO</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="informe" name="informe" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="si">SI</option>
                    <option value="no">NO</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="gc1" name="gc1" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="si">SI</option>
                    <option value="no">NO</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="gc2" name="gc2" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="si">SI</option>
                    <option value="no">NO</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col-1 my-auto">
                <input type="number" id="hsSim" name="hsSim" class="form-control" min="0" max="9999" required>
            </div>
        </div>    
        `)
    }

    const html = `
            <form id="formS4Values" action="/api/proyectos/oci" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto">
                        <div class="col-1 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT#</strong></label>
                        </div>
                        <div class="col-1 my-auto align-self-middle">
                            <label for="opNumber"><strong>OP#</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="matEnsayo"><strong>Mat. Ensayado</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="masMenos10"><strong><i class="fa-solid fa-plus-minus"></i>10%</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="mpAlternativo"><strong><i class="fa-solid fa-shapes"></i> MP</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="reuSim"><strong>Reunión Simulación</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="informe"><strong>Informe</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="gc1"><strong>Geometría Copiado #1</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="gc2"><strong>Geometría Copiado #2</strong></label>
                        </div>
                        <div class="col-1 my-auto">
                            <label for="hsSim"><strong>Hs. Simulación</strong></label>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque}
                </fieldset>
            </form>
    `

    Swal.fire({
        title: 'Simulación - S4',
        html: html,
        width: 1425,
        //background: "#aaaaaa",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    }).then((result) => {
        if (result.isConfirmed) {
            // Haz algo con los valores seleccionados, por ejemplo, muestra una alerta
            Swal.fire(`Seleccionaste: `)
        }
    })
}

function addDatoToS5(i) {
    let resultado = getOtList(i)

    var arrayBloque = []
    for (let y=0; y < resultado.lastChild; y++) {
        arrayBloque.push(`
        <div class="row my-1 mx-auto">
            <div class="col-2 my-auto align-self-middle">
                <span class="badge rounded-pill bg-dark text-white">${resultado.arrayOtNumber[y]}</span>
            </div>
            <div class="col-2 my-auto align-self-middle">
                <span class="badge rounded-pill bg-secondary text-white">${resultado.arrayOpNumber[y]}</span>
            </div>
            <div class="col my-auto">
                <select id="grillado" name="grillado" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="si">SI</option>
                    <option value="no">NO</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="mpEnsayada" name="mpEnsayada" class="form-select" required>
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
        </div>    
        `)
    }

    const html = `
            <form id="formS5Values" action="/api/proyectos/oci" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto">
                        <div class="col-2 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT#</strong></label>
                        </div>
                        <div class="col-2 my-auto align-self-middle">
                            <label for="opNumber"><strong>OP#</strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="grillado"><strong>Grillado <i class="fa-solid fa-table-cells fa-lg"></i></strong></label>
                        </div>
                        <div class="col my-auto">
                            <label for="mpEnsayada"><strong>MP Ensayada</strong></label>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque}
                </fieldset>
            </form>
    `

    Swal.fire({
        title: 'Simulación - S5',
        html: html,
        width: 500,
        //background: "#aaaaaa",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    }).then((result) => {
        if (result.isConfirmed) {
            // Haz algo con los valores seleccionados, por ejemplo, muestra una alerta
            Swal.fire(`Seleccionaste: `)
        }
    })
}

const arrTables = []
for (let i = 0; i<25; i++) { //ver limite maximo de proyectos por Cliente
    if (document.getElementById(`tablaGeneral${i}`)) {
        arrTables.push(i)
    }
}

if(arrTables !=[]) {
    let allButtonsR14 = document.querySelectorAll('button[name="btnR14"]')
    let allButtonsProceso3d = document.querySelectorAll('button[name="btnProceso3d"]')
    let allButtonsDiseno = document.querySelectorAll('button[name="btnDiseno"]')
    let allButtonsInfo80 = document.querySelectorAll('button[name="btnInfo80"]')
    let allButtonsInfo100 = document.querySelectorAll('button[name="btnInfo100"]')
    let allButtonsS0 = document.querySelectorAll('button[name="btnS0"]')
    let allButtonsS1 = document.querySelectorAll('button[name="btnS1"]')
    let allButtonsS23 = document.querySelectorAll('button[name="btnS23"]')
    let allButtonsS4 = document.querySelectorAll('button[name="btnS4"]')
    let allButtonsS5 = document.querySelectorAll('button[name="btnS5"]')
    
    allButtonsR14.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            event.preventDefault()
            let kValue = event.target.value
            const nombreTabla = document.getElementById(`tablaR14${kValue}`)
            const idTabla = nombreTabla.id

            addDatoToR14(kValue, idTabla)
    	})
    })

    allButtonsProceso3d.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            let kValue = event.target.value
            addDatoToProceso3d(kValue)
    	})
    })

    allButtonsDiseno.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            let kValue = event.target.value
            addDatoToDiseno(kValue)
    	})
    })

    allButtonsInfo80.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            let kValue = event.target.value
            addDatoToInfo80(kValue)
    	})
    })

    allButtonsInfo100.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            let kValue = event.target.value
            addDatoToInfo100(kValue)
    	})
    })

    allButtonsS0.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            let kValue = event.target.value
            addDatoToS0(kValue)
    	})
    })

    allButtonsS1.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            let kValue = event.target.value
            addDatoToS1(kValue)
    	})
    })

    allButtonsS23.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            let kValue = event.target.value
            addDatoToS23(kValue)
    	})
    })

    allButtonsS4.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            let kValue = event.target.value
            addDatoToS4(kValue)
    	})
    })

    allButtonsS5.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            let kValue = event.target.value
            addDatoToS5(kValue)
    	})
    })
}

