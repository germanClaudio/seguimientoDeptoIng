const btnAddNewRow = document.getElementById("btnAddNewRow")

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
    
    const originalDiv = (
        `<div class="col-3">
                <label for="ociNumber${i}" id="labelOciNumber${i}">Número de OCI ${i}</label>
                <input type="number" name="ociNumber${i}" id="ociNumber${i}" class="form-control" min="0" max="9999"
                placeholder="Número OCI">
            </div>
            <div class="col-3">
                <label for="ociDescription${i}" id="labelOciDescription${i}">Descripción OCI ${i}</label>
                <input type="text" name="ociDescription${i}" id="ociDescription${i}" class="form-control"
                placeholder="Descripción OCI">
            </div>
            <div class="col-3">
                <label for="ociStatus${i}" id="labelOciStatus${i}">Status OCI</label><br>
                <div class="d-inline-block me-1">Inactiva</div>
                <div class="form-check form-switch d-inline-block mt-2">
                    <input class="form-check-input" type="checkbox" id="ociStatus${i}" aria-checked="true" name="ociStatus${i}" style="cursor: pointer;" checked>
                    <label class="form-check-label" for="ociStatus${i}">Activa</label>
                </div>
            </div>
            <div class="col-3 my-auto">
                <div class="d-flex">
                    <button type="button" id="btnRemoveRow${i}" class="btn btn-danger rounded-circle m2 boton"><i class="fa-solid fa-trash"></i></button>
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

function messageNewProject(projectName) {
    Swal.fire({
        position: 'center',
        timer: 3500,
        text: `El proyecto ${projectName} se creó exitosamente!`,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
    })
}

const btnCreate = document.getElementById('btnNewProject')
btnCreate.addEventListener('click', (event) => {
    event.preventDefault()
    const projectName = document.getElementById('projectName').value
    messageNewProject(projectName)
})