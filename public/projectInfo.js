document.addEventListener('DOMContentLoaded', function () {
    const btnHiddeTable1 = document.getElementById('btnHiddeTable1')
    const posBtnHiddeTable1 = document.getElementById('posBtnHiddeTable1')
    const btnHiddeTable2 = document.getElementById('btnHiddeTable2')
    const posBtnHiddeTable2 = document.getElementById('posBtnHiddeTable2')
    // const btnHiddeTable3 = document.getElementById('btnHiddeTable3')
    // const btnHiddeTable4 = document.getElementById('btnHiddeTable4')
    // const btnHiddeTable5 = document.getElementById('btnHiddeTable5')
    
    
    const tablaGeneral = document.getElementById('tablaGeneral')
    const tablaSeguimiento = document.getElementById('tablaSeguimiento')
    // const tabla3 = document.getElementById('tabla3')
    // const tabla4 = document.getElementById('tabla4')
    // const tabla5 = document.getElementById('tabla5')

    // Manejador de eventos para ocultar la tabla #1
    if(tablaGeneral){
        btnHiddeTable1.addEventListener('click', function () {
            if (tablaGeneral.style.display === 'none') {
                tablaGeneral.style.display = ''
                tablaGeneral.classList.add("col-3")
                tablaSeguimiento.classList.add("col-3")
                // tabla3.classList.add("col-2")
                // tabla4.classList.add("col-2")
                // tabla5.classList.add("col-2")
                btnHiddeTable1.setHTML('<i class="fa-solid fa-eye-slash"></i>')
                posBtnHiddeTable1.classList.remove("col-1")
                posBtnHiddeTable1.classList.add("col-3")
                btnHiddeTable1.title='Ocultar General'

            } else {
                tablaGeneral.style.display = 'none'
                tablaGeneral.classList.remove("col-3")
                tablaSeguimiento.classList.add("col-3")
                // tabla3.classList.add("col-2")
                // tabla4.classList.add("col-2")
                btnHiddeTable1.setHTML('<i class="fa-solid fa-eye"></i>')
                posBtnHiddeTable1.classList.remove("col-3")
                posBtnHiddeTable1.classList.add("col-1")
                btnHiddeTable1.title='Mostrar General'
            }
        })
    }

    // Manejador de eventos para ocultar la tabla #2
    if(tablaSeguimiento){
        btnHiddeTable2.addEventListener('click', function () {
            if (tablaSeguimiento.style.display === 'none') {
                tablaSeguimiento.style.display = ''
                btnHiddeTable2.setHTML('<i class="fa-solid fa-eye-slash"></i>')
                posBtnHiddeTable2.classList.remove("col-1")
                posBtnHiddeTable2.classList.add("col-3")
                btnHiddeTable2.title='Ocultar Int/Ext'
            } else {
                tablaSeguimiento.style.display = 'none'
                btnHiddeTable2.setHTML('<i class="fa-solid fa-eye"></i>')
                posBtnHiddeTable2.classList.remove("col-3")
                posBtnHiddeTable2.classList.add("col-1")
                btnHiddeTable2.title='Mostrar Int/Ext'
            }
        })
    }

    // Manejador de eventos para ocultar la tabla #3
    // btnHiddeTable3.addEventListener('click', function () {
    //     if (tabla3.style.display === 'none') {
    //         tabla3.style.display = ''
    //         btnHiddeTable3.setHTML('Ocultar')
    //     } else {
    //         tabla3.style.display = 'none'
    //         btnHiddeTable3.setHTML('Mostrar')
    //     }
    // })

    // Manejador de eventos para ocultar la tabla #4
    // btnHiddeTable4.addEventListener('click', function () {
    //     if (tabla4.style.display === 'none') {
    //         tabla4.style.display = ''
    //         btnHiddeTable4.setHTML('Ocultar')
    //     } else {
    //         tabla4.style.display = 'none'
    //         btnHiddeTable4.setHTML('Mostrar')
    //     }
    // })

     // Manejador de eventos para ocultar la tabla #5
    //  btnHiddeTable5.addEventListener('click', function () {
    //     if (tabla5.style.display === 'none') {
    //         tabla5.style.display = ''
    //         btnHiddeTable5.setHTML('Ocultar')
    //     } else {
    //         tabla5.style.display = 'none'
    //         btnHiddeTable5.setHTML('Mostrar')
    //     }
    // })
    const ociNumber = document.getElementsByName('ociNumber')
    for (let i = 0 ; i < ociNumber.length; i++) {
        if (ociNumber.length === 1) {
            const inputOciSelected = document.getElementById(`${ociNumber[i].id}`)
            const formAction = document.getElementById('formNewOt')
            let path = `/api/proyectos/oci/${inputOciSelected.id}`
            console.log('path: ',path)
            formAction.setAttribute('action', path)
        } else {

        }
    }

  })

  
  document.addEventListener('DOMContentLoaded', function (event) {
    let initIndex = event.eventPhase
    let myCarousel = document.getElementById('carouselExampleControls')

    if (myCarousel) {
        if (initIndex === 2) {
            document.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
        } else {
            document.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
        }
        
        // Detectar cuando el slide cambia
        myCarousel.addEventListener('slid.bs.carousel', function (event) {
            let slideCount = event.relatedTarget.parentElement.children.length
            let currentIndex = event.to
            
            // Si el slide actual es el último, deshabilita el botón "Next"
            if (currentIndex === slideCount - 1) {
                document.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
            } else {
                document.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
            }
            // Si el slide actual es el primero, deshabilita el botón "Prev"
            if (currentIndex === 0) {
                document.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
            } else {
                document.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            }
        })
    }
})


// ---------------- Event Add New Ot Row to OCI --------------------
const btnAddNewRow = document.getElementById("btnAddNewRow")

//-------------------------- Add New OCI Row --------------------------------
btnAddNewRow.addEventListener('click', () => {

    const parentDiv = document.getElementById('div_body')
    let i = parentDiv.childElementCount
    const lastChild = parentDiv.children[i-1]
    const lastChildId = lastChild.id

        if(lastChildId < i || i==1) {
            i = parentDiv.childElementCount
        } else {
            const numberId1 = parseInt(lastChildId.slice(-1))
            const numberId2 = parseInt(lastChildId.slice(-2))
            let numberIdLastChild
        
            numberId1>=0 && numberId2 ? numberIdLastChild = numberId2 : numberIdLastChild = numberId1;

            i = numberIdLastChild+1
        }    
        const originalDiv = (
            `<div class="col-1">
                <label for="otNumber${i}" id="labelOtNumber${i}">OT#${i}</label>
                <input type="number" name="otNumber${i}" id="otNumber${i}" class="form-control" min="0" max="9999"
                placeholder="Número OT">
            </div>
            <div class="col-1">
                <label for="opNumber${i}" id="labelOpNumber${i}">OP# ${i}</label>
                <input type="number" name="opNumber${i}" id="opNumber${i}" class="form-control" min="0" max="9999"
                placeholder="Número OP">
            </div>
            <div class="col-2">
                <label for="otDescription${i}" id="labelOtDescription${i}">Descripción OP ${i}</label>
                <input type="text" name="otDescription${i}" id="otDescription${i}" class="form-control"
                placeholder="Descripción OP">
            </div>
            <div class="col-1">
                <label for="otStatus${i}" id="labelOtStatus${i}">Status OT</label><br>
                <div class="form-check form-switch d-inline-block">
                    <input class="form-check-input" type="checkbox" id="otStatus${i}" aria-checked="true" name="otStatus${i}" style="cursor: pointer;" checked>
                    <label class="form-check-label" for="otStatus${i}">Activa</label>
                </div>
            </div>
            <div class="col-2">
                <label for="internoDiseno${i}" id="labelInternoDiseno${i}">Diseño seguido por ${i}</label>
                <input type="text" name="internoDiseno${i}" id="internoDiseno${i}" class="form-control"
                placeholder="Diseño">    
            </div>
            <div class="col-2">
                <label for="internoSimulacion${i}" id="labelInternoSimulacion${i}">Simulación seguida por ${i}</label>
                <input type="text" name="internoSimulacion${i}" id="internoSimulacion${i}" class="form-control"
                placeholder="Simulación">    
            </div>
            <div class="col-2">
            <label for="externoDiseno${i}" id="labelExternoDiseno${i}">Proveedor externo ${i}</label>
                <input type="text" name="externoDiseno${i}" id="externoDiseno${i}" class="form-control"
                placeholder="Proveedor">    
            </div>
            <div class="col-1 my-auto">
                <div class="d-flex">
                    <button type="button" id="btnRemoveRow${i}" class="btn btn-danger rounded-circle m2 boton"><i class="fa-solid fa-trash"></i></button>
                </div>    
            </div>`)
               
    if (i == 1) {
        originalDiv
        
    } else if (i < 10 ) { //cantidad maxima de OT en conjunto a agregar 10
        originalDiv
        btnRemoveItem = document.getElementById(`btnRemoveRow${i-1}`)
        btnRemoveItem.style.display = 'none'
        
    } else {
        btnRemoveItem = document.getElementById(`btnRemoveRow${i-1}`)
        btnRemoveItem.style.display = 'none'     
        btnAddNewRow.setAttribute('disabled', true)
    }

        const newDiv = document.createElement('div')
        newDiv.setAttribute('class', "row my-3")
        newDiv.id = `otItemRow${i}`
        newDiv.innerHTML = originalDiv
        parentDiv.appendChild(newDiv)
        const otQty = document.getElementById("otQuantity")
        otQty.setAttribute('value', i+1)

            const buttons = document.querySelectorAll('button')
            buttons.forEach((button) => {
                button.addEventListener("click", removeRow)
            })
})
    
//-------------------------- Remove OCI Row ----------------------------------
function removeRow(e) {    

    const parentDiv = document.getElementById('div_body')
    let i = parentDiv.childElementCount

    if(e.target.id){
        let btnRemoveRow = e.target.id
        const numberId1 = parseInt(btnRemoveRow.slice(-1))
        const numberId2 = parseInt(btnRemoveRow.slice(-2))
        let numberIdToDelete

        numberId1 >= 0 && numberId2 ? numberIdToDelete = numberId2 : numberIdToDelete = numberId1;
        
        function checkString(string) {
            return /^[0-9]*$/.test(string);
        }
        
        if(checkString(numberIdToDelete)) {
            const rowToDelete = document.getElementById(`otItemRow${numberIdToDelete}`)
            rowToDelete.remove()
            const otQty = document.getElementById("otQuantity")
            otQty.setAttribute('value', (i-1))

            if(numberIdToDelete !== 1 && numberIdToDelete < 10) {
                btnRemoveItem = document.getElementById(`btnRemoveRow${numberIdToDelete-1}`)
                btnRemoveItem.style.display = 'inline'        
            } else {
                btnRemoveItem = document.getElementById(`btnRemoveRow${numberIdToDelete-1}`)
                btnRemoveItem.style.display = 'inline'
                btnAddNewRow.removeAttribute('disabled')   
            }
        }
    }
}

function messageNewOt(ociNumber) {
    Swal.fire({
        title: 'Está seguro de ingresar los datos?',
        position: 'center',
        timer: 3500,
        text: `Se agregaro/n la/s OT/s a la OCI# ${ociNumber} exitosamente!`,
        icon: 'success',
        showCancelButton: true,
        showConfirmButton: true,
  })
}

const btnCreate = document.getElementById('btnNewOt')
btnCreate.addEventListener('click', (event)=>{
    //event.preventDefault()
    const ociNumber = document.getElementsByName('ociNumber')
        
    const inputOciSelected = document.getElementById(`${ociNumber[0].id}`)
    const formAction = document.getElementById('formNewOt')
    let path = `/api/proyectos/oci/${inputOciSelected.id}`
    formAction.setAttribute('action', path)
    
    messageNewOt(ociNumber[0].value)
})