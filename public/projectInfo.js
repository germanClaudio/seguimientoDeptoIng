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

    let otNumberValue = parseInt(document.getElementById('otNumber').value)
    const opNumberValue = parseInt(document.getElementById('opNumber').value)
    const internoDisenoValue = document.getElementById('internoDiseno').value
    const internoSimulacion = document.getElementById('internoSimulacion').value
    const externoDiseno = document.getElementById('externoDiseno').value

    const originalDiv = (
        `<div class="col-1">
                <label for="otNumber${i}" id="labelOtNumber${i}">OT#</label>
                <input type="number" name="otNumber${i}" id="otNumber${i}" class="form-control" min="0" max="9999"
                placeholder="Número OT" value="${otNumberValue + i}">
            </div>
            <div class="col-1">
                <label for="opNumber${i}" id="labelOpNumber${i}">OP#</label>
                <input type="number" name="opNumber${i}" id="opNumber${i}" class="form-control" min="0" max="9999"
                placeholder="Número OP" value="${opNumberValue + i * 10}">
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
const ociNumberHidden = document.getElementById('ociNumberHidden')
const clientId = document.getElementById('clientIdHidden')

// ------------- function bucle do/while para encontrar ultima OT ----------
function lastOtNumberFn(i) {
    let n = 10
    let k = i || 5

    do {
        var lastOtNumber = document.getElementById(`lastOtNumber${k}_${n}`)
        var lastOpNumber = document.getElementById(`lastOpNumber${k}_${n}`)

        if (lastOtNumber && lastOpNumber) {
            var otNumberValue = document.getElementById('otNumber')
            var opNumberValue = document.getElementById('opNumber')

            let lastOtNumberValue = parseInt(document.getElementById(`lastOtNumber${k}_${n}`).innerHTML)
            let lastOpNumberValue = parseInt(document.getElementById(`lastOpNumber${k}_${n}`).innerHTML)

            otNumberValue.setAttribute('value', lastOtNumberValue + 1)
            opNumberValue.setAttribute('value', lastOpNumberValue + 10)
            break;
        }

        // Restar 1 a 'n' y ajustar 'k' si es necesario
        if (n > 0) {
            n--
        } else if (k > 0) {
            k--
            n = 9
        } else {
            break;
        }
    } while (true)
}

//-------------------- Boton agregar nuevas OT's a OCI ------------------------
const btnAddOtForm = document.getElementById("btnAddOtForm")
btnAddOtForm.addEventListener('click', () => {
    if (document.getElementById(`ociNumberHidden`)) {
        let ociSeleccionada = document.getElementById(`ociNumberHidden`).value
        tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${ociSeleccionada}</strong> / Proyecto: ${projectNameHidden}`
        lastOtNumberFn()
    }
})

function radioSelected(radioSelectedValue) {
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
    btnAddOtFormSelected0.addEventListener('click', () => {
        const radioSelectedValue = btnAddOtFormSelected0.name
        radioSelected(radioSelectedValue)
        lastOtNumberFn(0)
    })
}

if (btnAddOtFormSelected1) {
    btnAddOtFormSelected1.addEventListener('click', () => {
        const radioSelectedValue = btnAddOtFormSelected1.name
        radioSelected(radioSelectedValue)
        lastOtNumberFn(1)
    })
}

if (btnAddOtFormSelected2) {
    btnAddOtFormSelected2.addEventListener('click', () => {
        const radioSelectedValue = btnAddOtFormSelected2.name
        radioSelected(radioSelectedValue)
        lastOtNumberFn(2)
    })
}

if (btnAddOtFormSelected3) {
    btnAddOtFormSelected3.addEventListener('click', () => {
        const radioSelectedValue = btnAddOtFormSelected3.name
        radioSelected(radioSelectedValue)
        lastOtNumberFn(3)
    })
}
if (btnAddOtFormSelected4) {
    btnAddOtFormSelected4.addEventListener('click', () => {
        const radioSelectedValue = btnAddOtFormSelected4.name
        radioSelected(radioSelectedValue)
        lastOtNumberFn(4)
    })
}

for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function (event) {
        ociSeleccionada = event.target.value
        tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${ociSeleccionada}</strong> / Proyecto: ${projectNameHidden}`
        ociNumberK.setAttribute('value', i)
        ociNumberHidden.setAttribute('value', ociSeleccionada)
        lastOtNumberFn(i)
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

const btnCreate = document.getElementById('btnNewOt')
btnCreate.addEventListener('click', (event) => {
    event.preventDefault()
    let ociNumberKValue = parseInt(document.getElementById('ociNumberK').value)
    let ociNumberHiddenValue = parseInt(document.getElementById('ociNumberHidden').value)
    if (ociNumberKValue) {
        switch (ociNumberKValue) {
            case 4: {
                var ociSeleccionada = parseInt(btnAddOtFormSelected4.name) || ociNumberHiddenValue
            }
            case 3: {
                var ociSeleccionada = parseInt(btnAddOtFormSelected3.name) || ociNumberHiddenValue
            }
            case 2: {
                var ociSeleccionada = parseInt(btnAddOtFormSelected2.name) || ociNumberHiddenValue
            }
            case 1: {
                var ociSeleccionada = parseInt(btnAddOtFormSelected1.name) || ociNumberHiddenValue
            }
            case 0: {
                var ociSeleccionada = parseInt(btnAddOtFormSelected0.name) || ociNumberHiddenValue
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

function addDatoToR14(i) {
    let res = getOtList(i)

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
                    <option selected disabled value="">Seleccione...</option>
                    <option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>
                </select>
            </div>
            <div class="col my-auto">
                <select id="aprobadoR14${res.arrayOtNumber[y]}" name="aprobadoR14${y}" class="form-select" ${disabled}>
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
            <form id="formR14Values" action="/api/proyectos/otInfoR14" method="post" style="font-size: 10pt">
                <fieldset>
                    <div class="row my-1 mx-auto">
                        <div class="col-2 my-auto align-self-middle">
                            <label for="otNumber"><strong>OT Status</strong></label>
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
                        ${arrayBloque}
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
            // console.log('clientId....', clientId)
            const sarasa = document.getElementById('formR14Values')
            sarasa.submit()
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
                        ${arrayBloque}
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
for (let i = 0; i<5; i++) {
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
            addDatoToR14(kValue)
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
