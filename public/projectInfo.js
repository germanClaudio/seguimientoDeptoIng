// Manejador de eventos de tablas -------------------
document.addEventListener('DOMContentLoaded', function () {
    const btnHiddeTableGeneral0 = document.getElementById('btnHiddeTableGeneral0')
    const posBtnHiddeTableGeneral0 = document.getElementById('posBtnHiddeTableGeneral0')
    const btnHiddeTableSeguimiento0 = document.getElementById('btnHiddeTableSeguimiento0')
    const posBtnHiddeTableSeguimiento0 = document.getElementById('posBtnHiddeTableSeguimiento0')

    const btnHiddeTableGeneral1 = document.getElementById('btnHiddeTableGeneral1')
    const posBtnHiddeTableGeneral1 = document.getElementById('posBtnHiddeTableGeneral1')
    const btnHiddeTableSeguimiento1 = document.getElementById('btnHiddeTableSeguimiento1')
    const posBtnHiddeTableSeguimiento1 = document.getElementById('posBtnHiddeTableSeguimiento1')

    const btnHiddeTableGeneral2 = document.getElementById('btnHiddeTableGeneral2')
    const posBtnHiddeTableGeneral2 = document.getElementById('posBtnHiddeTableGeneral2')
    const btnHiddeTableSeguimiento2 = document.getElementById('btnHiddeTableSeguimiento2')
    const posBtnHiddeTableSeguimiento2 = document.getElementById('posBtnHiddeTableSeguimiento2')

    const btnHiddeTableGeneral3 = document.getElementById('btnHiddeTableGeneral3')
    const posBtnHiddeTableGeneral3 = document.getElementById('posBtnHiddeTableGeneral3')
    const btnHiddeTableSeguimiento3 = document.getElementById('btnHiddeTableSeguimiento3')
    const posBtnHiddeTableSeguimiento3 = document.getElementById('posBtnHiddeTableSeguimiento3')

    const btnHiddeTableGeneral4 = document.getElementById('btnHiddeTableGeneral4')
    const posBtnHiddeTableGeneral4 = document.getElementById('posBtnHiddeTableGeneral4')
    const btnHiddeTableSeguimiento4 = document.getElementById('btnHiddeTableSeguimiento4')
    const posBtnHiddeTableSeguimiento4 = document.getElementById('posBtnHiddeTableSeguimiento4')

    const tablaGeneral0 = document.getElementById('tablaGeneral0')
    const tablaSeguimiento0 = document.getElementById('tablaSeguimiento0')

    const tablaGeneral1 = document.getElementById('tablaGeneral1')
    const tablaSeguimiento1 = document.getElementById('tablaSeguimiento1')

    const tablaGeneral2 = document.getElementById('tablaGeneral2')
    const tablaSeguimiento2 = document.getElementById('tablaSeguimiento2')

    const tablaGeneral3 = document.getElementById('tablaGeneral3')
    const tablaSeguimiento3 = document.getElementById('tablaSeguimiento3')

    const tablaGeneral4 = document.getElementById('tablaGeneral4')
    const tablaSeguimiento4 = document.getElementById('tablaSeguimiento4')

    // Manejador de eventos para ocultar la tablas Generales
    if (tablaGeneral0) {
        btnHiddeTableGeneral0.addEventListener('click', function () {
            if (tablaGeneral0.style.display === 'none') {
                tablaGeneral0.style.display = ''
                tablaGeneral0.classList.add("col-3")
                tablaSeguimiento0.classList.add("col-3")
                btnHiddeTableGeneral0.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'

                posBtnHiddeTableGeneral0.classList.remove("col-1")
                posBtnHiddeTableGeneral0.classList.add("col-3")
                btnHiddeTableGeneral0.setAttribute('title', 'Ocultar General')

            } else {
                tablaGeneral0.style.display = 'none'
                tablaGeneral0.classList.remove("col-3")
                tablaSeguimiento0.classList.add("col-3")
                btnHiddeTableGeneral0.innerHTML = '<i class="fa-solid fa-eye"></i>'
                posBtnHiddeTableGeneral0.classList.remove("col-3")
                posBtnHiddeTableGeneral0.classList.add("col-1")
                btnHiddeTableGeneral0.setAttribute('title', 'Mostrar General')
            }
        })
    }

    if (tablaGeneral1) {
        btnHiddeTableGeneral1.addEventListener('click', function () {
            if (tablaGeneral1.style.display === 'none') {
                tablaGeneral1.style.display = ''
                tablaGeneral1.classList.add("col-3")
                tablaSeguimiento1.classList.add("col-3")
                btnHiddeTableGeneral1.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
                posBtnHiddeTableGeneral1.classList.remove("col-1")
                posBtnHiddeTableGeneral1.classList.add("col-3")
                btnHiddeTableGeneral1.setAttribute('title', 'Ocultar General')

            } else {
                tablaGeneral1.style.display = 'none'
                tablaGeneral1.classList.remove("col-3")
                tablaSeguimiento1.classList.add("col-3")
                btnHiddeTableGeneral1.innerHTML = '<i class="fa-solid fa-eye"></i>'
                posBtnHiddeTableGeneral1.classList.remove("col-3")
                posBtnHiddeTableGeneral1.classList.add("col-1")
                btnHiddeTableGeneral1.setAttribute('title', 'Mostrar General')
            }
        })
    }

    if (tablaGeneral2) {
        btnHiddeTableGeneral2.addEventListener('click', function () {
            if (tablaGeneral2.style.display === 'none') {
                tablaGeneral2.style.display = ''
                tablaGeneral2.classList.add("col-3")
                tablaSeguimiento2.classList.add("col-3")
                btnHiddeTableGeneral2.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
                posBtnHiddeTableGeneral2.classList.remove("col-1")
                posBtnHiddeTableGeneral2.classList.add("col-3")
                btnHiddeTableGeneral2.setAttribute('title', 'Ocultar General')

            } else {
                tablaGeneral2.style.display = 'none'
                tablaGeneral2.classList.remove("col-3")
                tablaSeguimiento2.classList.add("col-3")
                btnHiddeTableGeneral2.innerHTML = '<i class="fa-solid fa-eye"></i>'
                posBtnHiddeTableGeneral2.classList.remove("col-3")
                posBtnHiddeTableGeneral2.classList.add("col-1")
                btnHiddeTableGeneral2.setAttribute('title', 'Mostrar General')
            }
        })
    }

    if (tablaGeneral3) {
        btnHiddeTableGeneral3.addEventListener('click', function () {
            if (tablaGeneral3.style.display === 'none') {
                tablaGeneral3.style.display = ''
                tablaGeneral3.classList.add("col-3")
                tablaSeguimiento3.classList.add("col-3")
                btnHiddeTableGeneral3.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
                posBtnHiddeTableGeneral3.classList.remove("col-1")
                posBtnHiddeTableGeneral3.classList.add("col-3")
                btnHiddeTableGeneral3.setAttribute('title', 'Ocultar General')

            } else {
                tablaGeneral3.style.display = 'none'
                tablaGeneral3.classList.remove("col-3")
                tablaSeguimiento3.classList.add("col-3")
                btnHiddeTableGeneral3.innerHTML = '<i class="fa-solid fa-eye"></i>'
                posBtnHiddeTableGeneral3.classList.remove("col-3")
                posBtnHiddeTableGeneral3.classList.add("col-1")
                btnHiddeTableGeneral3.setAttribute('title', 'Mostrar General')
            }
        })
    }

    if (tablaGeneral4) {
        btnHiddeTableGeneral4.addEventListener('click', function () {
            if (tablaGeneral4.style.display === 'none') {
                tablaGeneral4.style.display = ''
                tablaGeneral4.classList.add("col-3")
                tablaSeguimiento4.classList.add("col-3")
                btnHiddeTableGeneral4.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
                posBtnHiddeTableGeneral4.classList.remove("col-1")
                posBtnHiddeTableGeneral4.classList.add("col-3")
                btnHiddeTableGeneral4.setAttribute('title', 'Ocultar General')

            } else {
                tablaGeneral4.style.display = 'none'
                tablaGeneral4.classList.remove("col-3")
                tablaSeguimiento4.classList.add("col-3")
                btnHiddeTableGeneral4.innerHTML = '<i class="fa-solid fa-eye"></i>'
                posBtnHiddeTableGeneral4.classList.remove("col-3")
                posBtnHiddeTableGeneral4.classList.add("col-1")
                btnHiddeTableGeneral4.setAttribute('title', 'Mostrar General')
            }
        })
    }

    // Manejador de eventos para ocultar la tablas Seguimientos
    if (tablaSeguimiento0) {
        btnHiddeTableSeguimiento0.addEventListener('click', function () {
            if (tablaSeguimiento0.style.display === 'none') {
                tablaSeguimiento0.style.display = ''
                btnHiddeTableSeguimiento0.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
                posBtnHiddeTableSeguimiento0.classList.remove("col-1")
                posBtnHiddeTableSeguimiento0.classList.add("col-3")
                btnHiddeTableSeguimiento0.setAttribute('title', 'Ocultar Int/Ext')
            } else {
                tablaSeguimiento0.style.display = 'none'
                btnHiddeTableSeguimiento0.innerHTML = '<i class="fa-solid fa-eye"></i>'
                posBtnHiddeTableSeguimiento0.classList.remove("col-3")
                posBtnHiddeTableSeguimiento0.classList.add("col-1")
                btnHiddeTableSeguimiento0.setAttribute('title', 'Mostrar Int/Ext')
            }
        })
    }

    if (tablaSeguimiento1) {
        btnHiddeTableSeguimiento1.addEventListener('click', function () {
            if (tablaSeguimiento1.style.display === 'none') {
                tablaSeguimiento1.style.display = ''
                btnHiddeTableSeguimiento1.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
                posBtnHiddeTableSeguimiento1.classList.remove("col-1")
                posBtnHiddeTableSeguimiento1.classList.add("col-3")
                btnHiddeTableSeguimiento1.setAttribute('title', 'Ocultar Int/Ext')
            } else {
                tablaSeguimiento1.style.display = 'none'
                btnHiddeTableSeguimiento1.innerHTML = '<i class="fa-solid fa-eye"></i>'
                posBtnHiddeTableSeguimiento1.classList.remove("col-3")
                posBtnHiddeTableSeguimiento1.classList.add("col-1")
                btnHiddeTableSeguimiento1.setAttribute('title', 'Mostrar Int/Ext')
            }
        })
    }

    if (tablaSeguimiento2) {
        btnHiddeTableSeguimiento2.addEventListener('click', function () {
            if (tablaSeguimiento2.style.display === 'none') {
                tablaSeguimiento2.style.display = ''
                btnHiddeTableSeguimiento2.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
                posBtnHiddeTableSeguimiento2.classList.remove("col-1")
                posBtnHiddeTableSeguimiento2.classList.add("col-3")
                btnHiddeTableSeguimiento2.setAttribute('title', 'Ocultar Int/Ext')
            } else {
                tablaSeguimiento2.style.display = 'none'
                btnHiddeTableSeguimiento2.innerHTML = '<i class="fa-solid fa-eye"></i>'
                posBtnHiddeTableSeguimiento2.classList.remove("col-3")
                posBtnHiddeTableSeguimiento2.classList.add("col-1")
                btnHiddeTableSeguimiento2.setAttribute('title', 'Mostrar Int/Ext')
            }
        })
    }

    if (tablaSeguimiento3) {
        btnHiddeTableSeguimiento3.addEventListener('click', function () {
            if (tablaSeguimiento3.style.display === 'none') {
                tablaSeguimiento3.style.display = ''
                btnHiddeTableSeguimiento3.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
                posBtnHiddeTableSeguimiento3.classList.remove("col-1")
                posBtnHiddeTableSeguimiento3.classList.add("col-3")
                btnHiddeTableSeguimiento3.setAttribute('title', 'Ocultar Int/Ext')
            } else {
                tablaSeguimiento3.style.display = 'none'
                btnHiddeTableSeguimiento3.innerHTML = '<i class="fa-solid fa-eye"></i>'
                posBtnHiddeTableSeguimiento3.classList.remove("col-3")
                posBtnHiddeTableSeguimiento3.classList.add("col-1")
                btnHiddeTableSeguimiento3.setAttribute('title', 'Mostrar Int/Ext')
            }
        })
    }

    if (tablaSeguimiento4) {
        btnHiddeTableSeguimiento4.addEventListener('click', function () {
            if (tablaSeguimiento4.style.display === 'none') {
                tablaSeguimiento4.style.display = ''
                btnHiddeTableSeguimiento4.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
                posBtnHiddeTableSeguimiento4.classList.remove("col-1")
                posBtnHiddeTableSeguimiento4.classList.add("col-3")
                btnHiddeTableSeguimiento4.setAttribute('title', 'Ocultar Int/Ext')
            } else {
                tablaSeguimiento4.style.display = 'none'
                btnHiddeTableSeguimiento4.innerHTML = '<i class="fa-solid fa-eye"></i>'
                posBtnHiddeTableSeguimiento4.classList.remove("col-3")
                posBtnHiddeTableSeguimiento4.classList.add("col-1")
                btnHiddeTableSeguimiento4.setAttribute('title', 'Mostrar Int/Ext')
            }
        })
    }

    const projectNameHidden = document.getElementById('projectNameHidden').value
    const projectNameTitle = document.getElementById('projectNameTitle')
    projectNameTitle.innerHTML = `Nombre Proyecto: ${projectNameHidden}`
})

// Manejador de eventos para Carouseles --------------------
document.addEventListener('DOMContentLoaded', function (event) {
    let initIndex = event.eventPhase

    let myCarousel0 = document.getElementById('carouselExampleControls0')
    let myCarousel1 = document.getElementById('carouselExampleControls1')
    let myCarousel2 = document.getElementById('carouselExampleControls2')
    let myCarousel3 = document.getElementById('carouselExampleControls3')
    let myCarousel4 = document.getElementById('carouselExampleControls4')

    if (myCarousel0) {
        if (initIndex === 2) {
            myCarousel0.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
        } else {
            myCarousel0.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
        }

        // Detectar cuando el slide cambia
        myCarousel0.addEventListener('slid.bs.carousel', function (event) {
            let slideCount = event.relatedTarget.parentElement.children.length
            let currentIndex = event.to

            // Si el slide actual es el último, deshabilita el botón "Next"
            if (currentIndex === slideCount - 1) {
                myCarousel0.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
            } else {
                myCarousel0.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
            }
            // Si el slide actual es el primero, deshabilita el botón "Prev"
            if (currentIndex === 0) {
                myCarousel0.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
            } else {
                myCarousel0.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            }
        })
    }
    if (myCarousel1) {
        if (initIndex === 2) {
            myCarousel1.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
        } else {
            myCarousel1.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
        }

        // Detectar cuando el slide cambia
        myCarousel1.addEventListener('slid.bs.carousel', function (event) {
            let slideCount = event.relatedTarget.parentElement.children.length
            let currentIndex = event.to

            // Si el slide actual es el último, deshabilita el botón "Next"
            if (currentIndex === slideCount - 1) {
                myCarousel1.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
            } else {
                myCarousel1.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
            }
            // Si el slide actual es el primero, deshabilita el botón "Prev"
            if (currentIndex === 0) {
                myCarousel1.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
            } else {
                myCarousel1.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            }
        })
    }
    if (myCarousel2) {
        if (initIndex === 2) {
            myCarousel2.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
        } else {
            myCarousel2.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
        }

        // Detectar cuando el slide cambia
        myCarousel2.addEventListener('slid.bs.carousel', function (event) {
            let slideCount = event.relatedTarget.parentElement.children.length
            let currentIndex = event.to

            // Si el slide actual es el último, deshabilita el botón "Next"
            if (currentIndex === slideCount - 1) {
                myCarousel2.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
            } else {
                myCarousel2.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
            }
            // Si el slide actual es el primero, deshabilita el botón "Prev"
            if (currentIndex === 0) {
                myCarousel2.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
            } else {
                myCarousel2.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            }
        })
    }
    if (myCarousel3) {
        if (initIndex === 2) {
            myCarousel3.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
        } else {
            myCarousel3.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
        }

        // Detectar cuando el slide cambia
        myCarousel3.addEventListener('slid.bs.carousel', function (event) {
            let slideCount = event.relatedTarget.parentElement.children.length
            let currentIndex = event.to

            // Si el slide actual es el último, deshabilita el botón "Next"
            if (currentIndex === slideCount - 1) {
                myCarousel3.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
            } else {
                myCarousel3.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
            }
            // Si el slide actual es el primero, deshabilita el botón "Prev"
            if (currentIndex === 0) {
                myCarousel3.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
            } else {
                myCarousel3.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            }
        })
    }
    if (myCarousel4) {
        if (initIndex === 2) {
            myCarousel4.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
        } else {
            myCarousel4.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
        }

        // Detectar cuando el slide cambia
        myCarousel4.addEventListener('slid.bs.carousel', function (event) {
            let slideCount = event.relatedTarget.parentElement.children.length
            let currentIndex = event.to

            // Si el slide actual es el último, deshabilita el botón "Next"
            if (currentIndex === slideCount - 1) {
                myCarousel4.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
            } else {
                myCarousel4.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
            }
            // Si el slide actual es el primero, deshabilita el botón "Prev"
            if (currentIndex === 0) {
                myCarousel4.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
            } else {
                myCarousel4.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            }
        })
    }
})

// ---------------- Event Add New Ot Row to OCI --------------------
const btnAddNewRow = document.getElementById("btnAddNewRow")

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

    const otNumberValue = parseInt(document.getElementById('otNumber').value)
    const opNumberValue = parseInt(document.getElementById('opNumber').value)
    const internoDisenoValue = document.getElementById('internoDiseno').value
    const internoSimulacion = document.getElementById('internoSimulacion').value
    const externoDiseno = document.getElementById('externoDiseno').value

    const originalDiv = (
        `<div class="col-1">
                <label for="otNumber${i}" id="labelOtNumber${i}">OT#</label>
                <input type="number" name="otNumber${i}" id="otNumber${i}" class="form-control" min="0" max="9999"
                placeholder="Número OT" value="${otNumberValue+i}">
            </div>
            <div class="col-1">
                <label for="opNumber${i}" id="labelOpNumber${i}">OP#</label>
                <input type="number" name="opNumber${i}" id="opNumber${i}" class="form-control" min="0" max="9999"
                placeholder="Número OP" value="${opNumberValue+i*10}">
            </div>
            <div class="col-2">
                <label for="opDescription${i}" id="labelOpDescription${i}">Descripción OP</label>
                <input type="text" name="opDescription${i}" id="opDescription${i}" class="form-control"
                placeholder="Descripción OP">
            </div>
            <div class="col-1">
                <label for="otStatus${i}" id="labelOtStatus${i}">Status OT</label><br>
                <div class="form-check form-switch d-inline-block mt-2">
                    <input class="form-check-input" type="checkbox" id="otStatus${i}" aria-checked="true" name="otStatus${i}" style="cursor: pointer;" checked>
                    <label class="form-check-label" for="otStatus${i}">Activa</label>
                </div>
            </div>
            <div class="col-2">
                <label for="internoDiseno${i}" id="labelInternoDiseno${i}">Diseño seguido por</label>
                <input type="text" name="internoDiseno${i}" id="internoDiseno${i}" class="form-control"
                placeholder="Diseño" value="${internoDisenoValue}">    
            </div>
            <div class="col-2">
                <label for="internoSimulacion${i}" id="labelInternoSimulacion${i}">Simulación seguida por</label>
                <input type="text" name="internoSimulacion${i}" id="internoSimulacion${i}" class="form-control"
                placeholder="Simulación" value="${internoSimulacion}">    
            </div>
            <div class="col-2">
            <label for="externoDiseno${i}" id="labelExternoDiseno${i}">Proveedor externo</label>
                <input type="text" name="externoDiseno${i}" id="externoDiseno${i}" class="form-control"
                placeholder="Proveedor" value="${externoDiseno}">    
            </div>
            <div class="col-1 my-auto">
                <div class="d-flex">
                    <button type="button" id="btnRemoveRow${i}" class="btn btn-danger rounded-circle m2 boton"><i class="fa-solid fa-trash"></i></button>
                </div>    
            </div>`
    )

    if (i == 1) {
        originalDiv

    } else if (i !== 1 && i < 10) { //cantidad maxima de OT en conjunto a agregar 10
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
    newDiv.id = `otItemRow${i}`
    newDiv.innerHTML = originalDiv
    parentDiv.appendChild(newDiv)
    const otQty = document.getElementById("otQuantity")
    otQty.setAttribute('value', i + 1)

    const buttons = document.querySelectorAll('button')
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
const clientId = document.getElementById('clientIdHidden')

//-------------------- Boton agregar nuevas OT's a OCI ------------------------
const btnAddOtForm = document.getElementById("btnAddOtForm")
btnAddOtForm.addEventListener('click', () => {
    if (document.getElementById(`ociNumberHidden`)) {
        let ociSeleccionada = document.getElementById(`ociNumberHidden`).value
        tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${ociSeleccionada}</strong> / Proyecto: ${projectNameHidden}`
    }
})

function radioSelected(radioSelectedValue){
    const radioSelected = document.getElementById(`${radioSelectedValue}`)
    radioSelected.setAttribute('checked', true)
    tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${radioSelectedValue}</strong> / Proyecto: ${projectNameHidden}`
    formulario.scrollIntoView({ behavior: 'smooth' })
}

const btnAddOtFormSelected0 = document.getElementById(`btnAddOtFormSelected0`)
const btnAddOtFormSelected1 = document.getElementById('btnAddOtFormSelected1')
const btnAddOtFormSelected2 = document.getElementById('btnAddOtFormSelected2')
const btnAddOtFormSelected3 = document.getElementById('btnAddOtFormSelected3')
const btnAddOtFormSelected4 = document.getElementById('btnAddOtFormSelected4')

if (btnAddOtFormSelected0) {
    btnAddOtFormSelected0.addEventListener('click', ()=> {
        const radioSelectedValue = btnAddOtFormSelected0.name
        radioSelected(radioSelectedValue)
    })
}

if (btnAddOtFormSelected1) {
    btnAddOtFormSelected1.addEventListener('click', ()=> {
        const radioSelectedValue = btnAddOtFormSelected1.name
        radioSelected(radioSelectedValue)
    })
}

if (btnAddOtFormSelected2) {
    btnAddOtFormSelected2.addEventListener('click', ()=> {
        const radioSelectedValue = btnAddOtFormSelected2.name
        radioSelected(radioSelectedValue)
    })
}

if (btnAddOtFormSelected3) {
    btnAddOtFormSelected3.addEventListener('click', ()=> {
        const radioSelectedValue = btnAddOtFormSelected3.name
        radioSelected(radioSelectedValue)
    })
}
if (btnAddOtFormSelected4) {
    btnAddOtFormSelected4.addEventListener('click', ()=> {
        const radioSelectedValue = btnAddOtFormSelected4.name
        radioSelected(radioSelectedValue)
    })
}

for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function (event) {
        ociSeleccionada = event.target.value
        tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${ociSeleccionada}</strong> / Proyecto: ${projectNameHidden}`
        ociNumberK.setAttribute('value', i)
    })
}

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
            text: `Se agregaran las OT's ${otArray.join(" - ")} a la OCI# ${ociNumber}`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('formNewOt').submit()
                Toast.fire({
                    icon: 'success',
                    title: `OT's ${otArray.join(" - ")} agregadas!`
                  })
            } else {
                Swal.fire(
                    'OTs no agregadas!',
                    `Las OT's ${otArray.join(" - ")} no fueron agregadas a la OCI# ${ociNumber}`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Ingreso de datos!',
            position: 'center',
            text: `Se agregará la OT ${otArray} a la OCI# ${ociNumber}`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('formNewOt').submit()
                Toast.fire({
                    icon: 'success',
                    title: `OT ${otArray.join(" - ")} agregada!`
                  })
            } else {
                Swal.fire(
                    'OT no agregada!',
                    `La OT ${otArray} no fue agregada a la OCI# ${ociNumber}`,
                    'warning'
                )
                return false
            }
        })
    }
}

const btnCreate = document.getElementById('btnNewOt')
btnCreate.addEventListener('click', (event)=> {
    event.preventDefault()
    if (ociNumberK) {
        switch (ociNumberK) {
            case 4 : {
                var ociSeleccionada = parseInt(btnAddOtFormSelected4.name)
            }
            case 3 : {
                var ociSeleccionada = parseInt(btnAddOtFormSelected3.name)
            }
            case 2 : {
                var ociSeleccionada = parseInt(btnAddOtFormSelected2.name)
            }
            case 1 : {
                var ociSeleccionada = parseInt(btnAddOtFormSelected1.name)
            }
            default : {
                ociSeleccionada = document.getElementById(`ociNumberHidden`).value
            }
        }
    } else {
        ociSeleccionada = document.getElementById(`ociNumberHidden`).value
    }

    const otQuantity = parseInt(document.getElementById('otQuantity').value)
    let otArray = [document.getElementById(`otNumber`).value]
           
    if (otQuantity > 1) {
        for (let j = 1; j < otQuantity; j++) {
            let otNumberSelected = document.getElementById(`otNumber${j}`).value
            otArray.push(otNumberSelected)
        }
    } 
    messageNewOt(ociSeleccionada, otArray)
})