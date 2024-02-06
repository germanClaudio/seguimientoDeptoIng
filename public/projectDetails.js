const btnAddNewRow = document.getElementById("btnAddNewRow")
const buttonOne = document.getElementById('buttonOne')

buttonOne.addEventListener('click', () => {
    let ariaExpanded = buttonOne.getAttribute('aria-expanded')

    ariaExpanded==='true' ?
        btnAddNewRow.removeAttribute('disabled')
    :
        btnAddNewRow.setAttribute('disabled', true)
})

function extractNumbers(str) {
    const numbers = str.match(/\d{1,2}/g); // Extract 1 or 2 digit numbers from the string
    
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
    return null // Return null if no valid numbers are found
}
    
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
        console.log('i line 50: ', i)
    }
    
    const ociNumberValue = parseInt(document.getElementById('ociNumber').value)

    const originalDiv = (
            `<div class="col-2">
                <label for="ociNumber${i}" id="labelOciNumber${i}">Número de OCI</label>
                <input type="number" name="ociNumber${i}" id="ociNumber${i}" class="form-control" min="0" max="9999"
                placeholder="Número OCI" value="${ociNumberValue+i}" required>
            </div>
            <div class="col-3">
                <label for="ociDescription${i}" id="labelOciDescription${i}">Descripción OCI</label>
                <textarea type="text" name="ociDescription${i}" id="ociDescription${i}" rows="3"
                    maxlength="100" class="form-control" placeholder="Descripción OCI" required>
                </textarea>
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
                <label for="newOciImage${i}" id="labelNewOciImage${i}">Seleccione una imagen para la OCI</label>
                <input type="text" id="fileInputNewOciText${i}" name="imageOciFileName${i}" 
                    style="display: none;">
                <input type="file" id="fileInputNewOci${i}" name="imageNewOci${i}" value=""
                    accept="image/*" style="display: none;" required>
                <div id="drop-area-oci${i}" class="mb-1 mx-auto">
                    Arrastra y suelta una imagen aquí
                </div>
                <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                        id="btnRemoveOciImage${i}" name="btnRemoveOciImage" style="display: none;">
                        <i class="fa-solid fa-xmark"></i>
                </button>
                <div id="alertOci${i}" class="alert alert-warning align-items-center" role="alert"
                    style="display: none; font-size: 0.75rem; height: 1.15rem;">
                    <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                </div>
                <div id="alertOciSize${i}" class="alert alert-warning align-items-center mx-auto" role="alert"
                    style="display: none; font-size: 0.75rem; height: 1.15rem;">
                    <strong class="me-2">Atención!</strong> El tamaño de la imagen debe ser menor a 3Mb.
                </div>

            </div>
            <div class="col-1 my-auto">
                <div class="d-flex">
                    <button type="button" id="btnRemoveRow${i}" name="btnRemoveRow" title="Eliminar línea de OCI"
                        class="btn btn-danger rounded-circle m-2" autocomplete="off">
                            <i class="fa-solid fa-trash"></i>
                    </button>
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

    const buttons = document.querySelectorAll('button[name="btnRemoveRow"]') //  Buttons to delete Oci Rows
    buttons.forEach((button) => {
        button.addEventListener("click", removeRow)
    })
 
    var arrayDropAreas = []
    var arrayBtnRemoveOciImage = []
    var arrayAlertOci = []
    var arrayAlertSizeOci = []
    var arrayImageOciFileName = []
    var arrayFileInputNewOci = []
    const totalOciQty = parseInt(document.getElementById("ociQuantity").value)
    
    for (let m=0; m<totalOciQty; m++) {
        var dropAreasOciFile = document.getElementById(`drop-area-oci${m}`)
        var btnRemoveOciImageFile = document.getElementById(`btnRemoveOciImage${m}`)
        var alertOciFile = document.getElementById(`alertOci${m}`)
        var alertOciSizeFile = document.getElementById(`alertOciSize${m}`)
        var fileInputNewOciTextFile = document.getElementById(`fileInputNewOciText${m}`)
        var fileInputNewOciFile = document.getElementById(`fileInputNewOci${m}`)
        
        if (dropAreasOciFile) {
            arrayDropAreas.push(dropAreasOciFile)
        }
        if (btnRemoveOciImageFile) {
            arrayBtnRemoveOciImage.push(btnRemoveOciImageFile)
        }
        if (alertOciFile) {
            arrayAlertOci.push(alertOciFile)
        }
        if (alertOciSizeFile) {
            arrayAlertSizeOci.push(alertOciSizeFile)
        }
        if (fileInputNewOciTextFile) {
            arrayImageOciFileName.push(fileInputNewOciTextFile)
        }
        if (fileInputNewOciFile) {
            arrayFileInputNewOci.push(fileInputNewOciFile)
        }
    }
    
    arrayDropAreas.forEach(function(elemento) {
        elemento.style.width = "250px"
        elemento.style.height = "160px"
        elemento.style.border = "2px dashed #ccc"
        elemento.style.margin = "0 auto 0 25px"
        elemento.style.borderRadius = "5px"
        elemento.style.textAlign = "center"
        elemento.style.lineHeight = "150px"
        elemento.style.cursor = "pointer"

        elemento.addEventListener('dragover', (e) => {
            e.preventDefault()
            elemento.style.border = '2px dashed #77d'
            elemento.style.backgroundColor = '#7777dd10'
        })

        elemento.addEventListener('dragleave', (e) => {
            e.preventDefault()
            const number = parseInt(extractNumbers(e.target.id)-1)
            elemento.style.border = '2px dashed #ccc'
            elemento.style.backgroundColor = '#fff'
            arrayBtnRemoveOciImage[number].style.display = 'none'
        })

        function alertNotImageNewOci(number) {
            arrayAlertOci[number].style.display = 'flex'
            arrayAlertSizeOci[number].style.display = 'none'
            arrayBtnRemoveOciImage[number].style.display = 'none'
            arrayImageOciFileName[number].value = ''
            elemento.style.border = "2px dashed #ccc"
            elemento.style.textAlign = "center"
            elemento.style.backgroundColor = '#fff'
            elemento.style.display = 'block'
            elemento.innerHTML = 'Arrastra y suelta una imagen aquí'
        }

        function alertSizeImageNewOci(number) {
            arrayAlertSizeOci[number].style.display = 'flex'
            arrayAlertOci[number].style.display = 'none'
            arrayBtnRemoveOciImage[number].style.display = 'none'
            arrayImageOciFileName[number].value = ''
            elemento.style.border = "2px dashed #ccc"
            elemento.style.textAlign = "center"
            elemento.style.backgroundColor = '#fff'
            elemento.style.display = 'block'
            elemento.innerHTML = 'Arrastra y suelta una imagen aquí'
        }
    
        elemento.addEventListener('drop', (e) => {
            e.preventDefault()
            elemento.style.border = '3px dashed #2d2'
            elemento.style.backgroundColor = '#22dd2210'
            const file = e.dataTransfer.files[0]
            const fileSize = file.size
            const fileSizeInMb = fileSize / (1024 * 1024)
            const number = parseInt(extractNumbers(elemento.id)-1)
            
            if (file && file.type.startsWith('image/')) {
                if (fileSizeInMb < 3) {
                    arrayFileInputNewOci[number].files = e.dataTransfer.files
                    let pathToImage = '../../../src/images/upload/ociImages/'
                    arrayImageOciFileName[number].value = pathToImage + file.name
                    arrayBtnRemoveOciImage[number].style.display = 'flex'
                    arrayAlertOci[number].style.display = 'none'
                    arrayAlertSizeOci[number].style.display = 'none'
                    handleFileUploadNewOci(file, number)
                } else {
                    alertSizeImageNewOci(number)
                }
            } else {
                alertNotImageNewOci(number)
            }     
        })

        elemento.addEventListener('click', (e) => {
            const number = parseInt(extractNumbers(elemento.id)-1)
            arrayFileInputNewOci[number].click()
        })

    })


    arrayFileInputNewOci.forEach(function(elemento) {

        function alertNotImageNewOci(number) {
            arrayAlertOci[number].style.display = 'flex'
            arrayAlertSizeOci[number].style.display = 'none'
            arrayBtnRemoveOciImage[number].style.display = 'none'
            arrayImageOciFileName[number].value = ''
            arrayDropAreas[number].style.border = "2px dashed #ccc"
            arrayDropAreas[number].style.textAlign = "center"
            arrayDropAreas[number].style.backgroundColor = '#fff'
            arrayDropAreas[number].style.display = 'block'
            arrayDropAreas[number].innerHTML = 'Arrastra y suelta una imagen aquí'
        }

        function alertSizeImageNewOci(number) {
            arrayAlertSizeOci[number].style.display = 'flex'
            arrayAlertOci[number].style.display = 'none'
            arrayBtnRemoveOciImage[number].style.display = 'none'
            arrayImageOciFileName[number].value = ''
            arrayDropAreas[number].style.border = "2px dashed #ccc"
            arrayDropAreas[number].style.textAlign = "center"
            arrayDropAreas[number].style.backgroundColor = '#fff'
            arrayDropAreas[number].style.display = 'block'
            arrayDropAreas[number].innerHTML = 'Arrastra y suelta una imagen aquí'
        }

            elemento.addEventListener('change', (e) => {
                e.preventDefault()
                const file = elemento.files[0]
                const fileSize = file.size
                const fileSizeInMb = fileSize / (1024 * 1024)
                const number = parseInt(extractNumbers(elemento.id)-1)
                
                    if (file && file.type.startsWith('image/')) {
                        if (fileSizeInMb < 3) {
                            let pathToImage = '../../../src/images/upload/projectImages/'
                            arrayImageOciFileName[number].value = pathToImage + file.name
                            arrayBtnRemoveOciImage[number].style.display = 'flex'
                            arrayAlertOci[number].style.display = 'none'
                            arrayAlertSizeOci[number].style.display = 'none'
                            handleFileUploadNewOci(file, number)

                        } else {
                            alertSizeImageNewOci(number)
                        }

                    } else {
                        alertNotImageNewOci(number)
                    }     
        })
    })
    
    function handleFileUploadNewOci(file, number) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                arrayDropAreas[number].innerHTML = 
                    `<img class="p-2 mb-5" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                arrayAlertOci[number].style.display = 'none'
                arrayAlertSizeOci[number].style.display = 'none'
            }

        } else {
            alertNotImageNewOci(number)
        }
    }

    function removeOciImage(number) {            
        arrayImageOciFileName[number].value = ''
        arrayDropAreas[number].style.border = "2px dashed #ccc"
        arrayDropAreas[number].style.textAlign = "center"
        arrayDropAreas[number].style.backgroundColor = '#fff'
        arrayDropAreas[number].style.display = 'block'
        arrayDropAreas[number].innerHTML = 'Arrastra y suelta una imagen aquí'
        arrayBtnRemoveOciImage[number].style.display = 'none'
        arrayAlertOci[number].style.display = 'none'
        arrayAlertSizeOci[number].style.display = 'none'
    }

    arrayBtnRemoveOciImage.forEach(function(elemento) {
        elemento.addEventListener("click", (e) => {
            const number = parseInt(extractNumbers(elemento.id)-1)
            removeOciImage(number)
        })
        
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
// ----------- Project Image behavior ---------------
    const dropAreaProject = document.getElementById('drop-areaProject')
    const fileInputProject = document.getElementById('fileInputProject')
    const fileImputTextProject = document.getElementById('fileInputTextProject')
    const removeImageButtonProject = document.getElementById('removeImageProject')
    const alertProject = document.getElementById('alertProject')
    const alertProjectSize = document.getElementById('alertProjectSize')

    dropAreaProject.style.width = "300px"
    dropAreaProject.style.height = "200px"
    dropAreaProject.style.border = "2px dashed #ccc"
    dropAreaProject.style.margin = "0 auto 0 50px"
    dropAreaProject.style.borderRadius = "5px"
    dropAreaProject.style.textAlign = "center"
    dropAreaProject.style.lineHeight = "200px"
    dropAreaProject.style.cursor = "pointer"

    dropAreaProject.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropAreaProject.style.border = '2px dashed #77d'
        dropAreaProject.style.backgroundColor = '#7777dd10'
    })
  
    dropAreaProject.addEventListener('dragleave', (e) => {
        e.preventDefault()
        dropAreaProject.style.border = '2px dashed #ccc'
        dropAreaProject.style.backgroundColor = '#868686'
        removeImageButtonProject.style.display = 'none'
    })

    function alertNotImageProject() {
        alertProject.style.display = 'flex'
        alertProjectSize.style.display = 'none'
        removeImageButtonProject.style.display = 'none'
        dropAreaProject.style.border = "2px dashed #ccc"
        dropAreaProject.style.textAlign = "center"
        dropAreaProject.style.backgroundColor = '#868686'
        dropAreaProject.style.display = 'block'
        dropAreaProject.innerHTML = 'Arrastra y suelta una imagen aquí'
    }

    function alertWrongImageProject() {
        alertProjectSize.style.display = 'flex'
        alertProject.style.display = 'none'
        removeImageButtonProject.style.display = 'none'
        dropAreaProject.style.border = "2px dashed #ccc"
        dropAreaProject.style.textAlign = "center"
        dropAreaProject.style.backgroundColor = '#868686'
        dropAreaProject.style.display = 'block'
        dropAreaProject.innerHTML = 'Arrastra y suelta una imagen aquí'
    }

    dropAreaProject.addEventListener('drop', (e) => {
        e.preventDefault()
        dropAreaProject.style.border = '3px dashed #2d2'
        dropAreaProject.style.backgroundColor = '#22dd2210'
        const file = e.dataTransfer.files[0]
        const fileSize = file.size
        const fileSizeInMb = fileSize / (1024 * 1024)

        if (file && file.type.startsWith('image/')) {
            if (fileSizeInMb < 3) {
                fileInputProject.files = e.dataTransfer.files
                let pathToImage = '../../../src/images/upload/projectImages/'
                fileImputTextProject.value = pathToImage + file.name
                removeImageButtonProject.style.display = 'flex'
                alertProject.style.display = 'none'
                alertProjectSize.style.display = 'none'
                handleFileUploadProject(file)

            } else {
                alertWrongImageProject()
            }

        } else {
            alertNotImageProject()
        }
    })

    dropAreaProject.addEventListener('click', () => {
        fileInputProject.click()
    })

    fileInputProject.addEventListener('change', (e) => {
        e.preventDefault()
        const file = fileInputProject.files[0]
        const fileSize = file.size
        const fileSizeInMb = fileSize / (1024 * 1024)
        
        if (file && file.type.startsWith('image/')) {
            if (fileSizeInMb < 3) {
                let pathToImage = '../../../src/images/upload/projectImages/'
                fileImputTextProject.value = pathToImage + file.name
                removeImageButtonProject.style.display = 'flex'
                alertProject.style.display = 'none'
                alertProjectSize.style.display = 'none'
                handleFileUploadProject(file)

            } else {
                alertWrongImageProject()
            }

        } else {
            alertNotImageProject()
        }     
    })

    function handleFileUploadProject(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropAreaProject.innerHTML = 
                    `<img class="p-2 mb-5" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                alertProject.style.display = 'none'
                alertProjectSize.style.display = 'none'
            }

        } else {
            alertNotImageProject()
        }
    }

    removeImageButtonProject.addEventListener('click', ()=> {
        fileImputTextProject.value = ''
        dropAreaProject.style.border = "2px dashed #ccc"
        dropAreaProject.style.textAlign = "center"
        dropAreaProject.style.backgroundColor = '#868686'
        dropAreaProject.style.display = 'block'
        dropAreaProject.innerHTML = 'Arrastra y suelta una imagen aquí'
        removeImageButtonProject.style.display = 'none'
        alertProject.style.display = 'none'
        alertProjectSize.style.display = 'none'
    })


    // ----------- Oci Image behavior ---------------
    const dropAreaOci = document.getElementById('drop-area-oci')
    const fileInputNewOci = document.getElementById('fileInputNewOci')
    const fileInputNewOciText = document.getElementById('fileInputNewOciText')
    const btnRemoveOciImage = document.getElementById('btnRemoveOciImage')
    const alertOci = document.getElementById('alertOci')
    const alertOciSize = document.getElementById(`alertOciSize`)

    dropAreaOci.style.width = "250px"
    dropAreaOci.style.height = "160px"
    dropAreaOci.style.border = "2px dashed #ccc"
    dropAreaOci.style.margin = "0 auto 0 25px"
    dropAreaOci.style.borderRadius = "5px"
    dropAreaOci.style.textAlign = "center"
    dropAreaOci.style.lineHeight = "150px"
    dropAreaOci.style.cursor = "pointer"

    dropAreaOci.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropAreaOci.style.border = '2px dashed #77d'
        dropAreaOci.style.backgroundColor = '#7777dd10'
    })
  
    dropAreaOci.addEventListener('dragleave', (e) => {
        e.preventDefault()
        dropAreaOci.style.border = '2px dashed #ccc'
        dropAreaOci.style.backgroundColor = '#fff'
        btnRemoveOciImage.style.display = 'none'
    })

    function alertNotImageNewOciAlone() {
        alertOci.style.display = 'flex'
        alertOciSize.style.display = 'none'
        btnRemoveOciImage.style.display = 'none'
        fileInputNewOciText.value = ''
        dropAreaOci.style.border = "2px dashed #ccc"
        dropAreaOci.style.textAlign = "center"
        dropAreaOci.style.backgroundColor = '#fff'
        dropAreaOci.style.display = 'block'
        dropAreaOci.innerHTML = 'Arrastra y suelta una imagen aquí'
    }

    function alertWrongSizeImageNewOciAlone() {
        console.log('o pasa por aca la kgta!')
        alertOciSize.style.display = 'flex'
        alertOci.style.display = 'none'
        btnRemoveOciImage.style.display = 'none'
        fileInputNewOciText.value = ''
        dropAreaOci.style.border = "2px dashed #ccc"
        dropAreaOci.style.textAlign = "center"
        dropAreaOci.style.backgroundColor = '#fff'
        dropAreaOci.style.display = 'block'
        dropAreaOci.innerHTML = 'Arrastra y suelta una imagen aquí'
    }

    dropAreaOci.addEventListener('drop', (e) => {
        e.preventDefault()
        dropAreaOci.style.border = '3px dashed #2d2'
        dropAreaOci.style.backgroundColor = '#22dd2210'
        const file = e.dataTransfer.files[0]
        const fileSize = file.size
        const fileSizeInMb = fileSize / (1024 * 1024)

        if (file && file.type.startsWith('image/')) {
            if (fileSizeInMb < 3) {
                fileInputNewOci.files = e.dataTransfer.files
                let pathToImage = '../../../src/images/upload/projectImages/'
                fileInputNewOciText.value = pathToImage + file.name
                btnRemoveOciImage.style.display = 'flex'
                alertOci.style.display = 'none'
                alertOciSize.style.display = 'none'
                handleFileUploadNewOci(file)

            } else {
                alertWrongSizeImageNewOciAlone()
            }

        } else {
            alertNotImageNewOciAlone()
        }     
    })

    dropAreaOci.addEventListener('click', () => {
        fileInputNewOci.click()
    })

    fileInputNewOci.addEventListener('change', (e) => {
        e.preventDefault()
        const file = fileInputNewOci.files[0]
        const fileSize = file.size
        const fileSizeInMb = fileSize / (1024 * 1024)
        
        if (file && file.type.startsWith('image/')) {
            if (fileSizeInMb < 3) {
                let pathToImage = '../../../src/images/upload/projectImages/'
                fileInputNewOciText.value = pathToImage + file.name
                btnRemoveOciImage.style.display = 'flex'
                alertOci.style.display = 'none'
                alertOciSize.style.display = 'none'
                handleFileUploadNewOci(file)

            } else {
                alertWrongSizeImageNewOciAlone()
            }

        } else {
            alertNotImageNewOciAlone()
        }     
    })

    function handleFileUploadNewOci(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropAreaOci.innerHTML = 
                    `<img class="p-2 mb-5" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                alertOci.style.display = 'none'
                alertOciSize.style.display = 'none'
            }

        } else {
            alertNotImageNewOciAlone()
        }
    }

    btnRemoveOciImage.addEventListener('click', ()=> {
        fileInputNewOciText.value = ''
        dropAreaOci.style.border = "2px dashed #ccc"
        dropAreaOci.style.textAlign = "center"
        dropAreaOci.style.backgroundColor = '#fff'
        dropAreaOci.style.display = 'block'
        dropAreaOci.innerHTML = 'Arrastra y suelta una imagen aquí'
        btnRemoveOciImage.style.display = 'none'
        alertOci.style.display = 'none'
        alertOciSize.style.display = 'none'
    })

    function messageNewProject(projectName, 
        ociQuantity, 
        levelProject,
        codeProject,
        projectDescription,
        ociNumber,
        ociDescription
    ) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
    if (projectName, levelProject, codeProject, projectDescription, ociNumber, ociDescription) {
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
    
    const projectName = document.getElementById('projectName').value
    const ociQuantity = parseInt(document.getElementById('ociQuantity').value)
    const levelProject = document.getElementById('levelProject').value
    const codeProject = document.getElementById('codeProject').value
    const projectDescription = document.getElementById('projectDescription').value

    const ociNumber = document.getElementById('ociNumber').value
    const ociDescription = document.getElementById('ociDescription').value

    // Obtener todos los campos del formulario
    var formFields = document.querySelectorAll('#formNewProject input, #formNewProject textarea, #formNewProject select')
    var isEmpty = false

    // Verificar si algún campo está vacío
    formFields.forEach(function(field) {
        if (field.hasAttribute('required') && field.value.trim() === '') {
            isEmpty = true
            field.style.border = '1px solid red'
            field.classList.remove('is-valid')
            field.classList.add('is-invalid')
        } else {
            field.style.border = '1px solid green'
            field.classList.remove('is-invalid')
            field.classList.add('is-valid')
        }
    })

    if (isEmpty) {
        event.preventDefault()
        document.getElementById('mensajeError').style.display = 'flex'
        document.getElementById('mensajeError').innerHTML = `<i class="fa-solid fa-triangle-exclamation me-3"></i> Por favor, completa todos los campos obligatorios`

    } else {
        document.getElementById('mensajeError').innerHTML = ''
        document.getElementById('mensajeError').style.display = 'none'
        
        messageNewProject(
            projectName, 
            ociQuantity, 
            levelProject,
            codeProject,
            projectDescription,
            ociNumber,
            ociDescription
        )
    }
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

    let bgColorStatus
    statusOci=='true' ? bgColorStatus='background-color: #55dd5560;'
                        : 
                        bgColorStatus='background-color: #dd555560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    var html = `<form id="formUpdateOci${k}" enctype="multipart/form-data" action="/api/proyectos/updateOci/${projectId}" method="post">
                    <fieldset>
                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-6">
                                <label for="numberOci" class="form-label d-flex justify-content-start ms-1">Número OCI</label>
                                <input type="number" name="numberOci" class="form-control"
                                    placeholder="Número OCI" value="${numberOci}" required>
                            </div>
                            
                            <div class="col-6" style="${bgColorStatus}">
                                <label for="statusOci" class="form-label d-flex justify-content-start ms-1">Status OCI</label>
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
                            <div class="col">
                                <label for="descriptionOci" class="form-label d-flex justify-content-start ms-1">Descripción OCI</label>
                                <input type="text" name="descriptionOci" class="form-control"
                                    placeholder="Descripción OCI" value="${descriptionOci}" required>
                            </div>                            
                        </div> 

                        <div class="row justify-content-start align-items-center mb-1 mx-1 px-1">
                            <div class="col mb-1">
                                <label for="imageOci" class="form-label d-flex justify-content-start ms-1">Seleccione una imagen para la OCI</label>
                                    
                                <input type="text" id="fileInputTextUpdate" name="imageOciFileName"
                                    value="${imageOci}" style="display: none;" required>
                                <input type="file" id="fileInputUpdate" name="imageOci"
                                    value="" accept="image/*" style="display: none;" required>
                            
                                <div id="drop-areaUpdate" class="mb-2 mx-auto">
                                    Arrastra y suelta una imagen aquí
                                </div>
                                <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                                        id="removeImageUpdate" style="display: none;">
                                        <i class="fa-solid fa-xmark"></i>
                                </button>
                                
                                <div id="alertUpdate" class="alert alert-warning align-items-center" role="alert" style="display: none; font-size: 0.95rem; height: 1.15rem;"">
                                    <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                                </div>
                            </div>
                        </div>
                        
                        <div class="row justify-content-evenly mb-1 px-1 mx-auto">
                            <div class="col-12 my-1 mx-auto px-1">
                            <label class="form-label d-flex justify-content-start ms-1">Imagen actual de la OCI# ${numberOci}</label>
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

    const dropAreaUpdate = document.getElementById('drop-areaUpdate')
    const fileInputUpdate = document.getElementById('fileInputUpdate')
    const fileImputTextUpdate = document.getElementById('fileInputTextUpdate')
    const removeImageButtonUpdate = document.getElementById('removeImageUpdate')
    const alertUpdate = document.getElementById('alertUpdate')

    dropAreaUpdate.style.width = "300px"
    dropAreaUpdate.style.height = "200px"
    dropAreaUpdate.style.border = "2px dashed #ccc"
    dropAreaUpdate.style.margin = "0 auto 0 50px"
    dropAreaUpdate.style.borderRadius = "5px"
    dropAreaUpdate.style.textAlign = "center"
    dropAreaUpdate.style.lineHeight = "200px"
    dropAreaUpdate.style.cursor = "pointer"

    dropAreaUpdate.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropAreaUpdate.style.border = '2px dashed #77a'
        dropAreaUpdate.style.backgroundColor = '#7777aa10'
    })
  
    dropAreaUpdate.addEventListener('dragleave', (e) => {
        e.preventDefault()
        dropAreaUpdate.style.border = '2px dashed #ccc'
        dropAreaUpdate.style.backgroundColor = '#fff'
        removeImageButtonUpdate.style.display = 'none'
    })

    function alertNotImageUpdate() {
        alertUpdate.style.display = 'flex'
        removeImageButtonUpdate.style.display = 'none'
        dropAreaUpdate.style.border = "2px dashed #ccc"
        dropAreaUpdate.style.textAlign = "center"
        dropAreaUpdate.style.backgroundColor = '#fff'
        dropAreaUpdate.style.display = 'block'
        dropAreaUpdate.innerHTML = 'Arrastra y suelta una imagen aquí'
    }
    
    dropAreaUpdate.addEventListener('drop', (e) => {
        e.preventDefault()
        dropAreaUpdate.style.border = '3px dashed #2a2'
        dropAreaUpdate.style.backgroundColor = '#22aa2210'
        const file = e.dataTransfer.files[0]

        if (file && file.type.startsWith('image/')) {
            fileInputUpdate.files = e.dataTransfer.files
            let pathToImage = '../../../src/images/upload/projectImages/'
            fileImputTextUpdate.value = pathToImage + file.name
            removeImageButtonUpdate.style.display = 'flex'
            alertUpdate.style.display = 'none'
            handleFileUploadUpdate(file)
        } else {
            alertNotImageUpdate()
        }     
    })

    dropAreaUpdate.addEventListener('click', () => {
        fileInputUpdate.click()
    })

    fileInputUpdate.addEventListener('change', (e) => {
        e.preventDefault()
        const file = fileInputUpdate.files[0]
        
        if (file && file.type.startsWith('image/')) { 
            let pathToImage = '../../../src/images/upload/projectImages/'
            fileImputTextUpdate.value = pathToImage + file.name
            removeImageButtonUpdate.style.display = 'flex'
            alertUpdate.style.display = 'none'
            handleFileUploadUpdate(file)
        } else {
            alertNotImageUpdate()
        }     
    })

    function handleFileUploadUpdate(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropAreaUpdate.innerHTML = 
                    `<img class="p-2" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                dropAreaUpdate.style.display = 'block'
                alertUpdate.style.display = 'none'
            }

        } else {
            alertNotImageUpdate()
        }
    }

    removeImageButtonUpdate.addEventListener('click', ()=> {
        fileImputTextUpdate.value = ''
        dropAreaUpdate.style.border = "2px dashed #ccc"
        dropAreaUpdate.style.textAlign = "center"
        dropAreaUpdate.style.backgroundColor = '#fff'
        dropAreaUpdate.style.display = 'block'
        dropAreaUpdate.innerHTML = 'Arrastra y suelta una imagen aquí'
        removeImageButtonUpdate.style.display = 'none'
        alertUpdate.style.display = 'none'
    })
}

//---- Delete Oci ----------------
function messageDeleteOci(
    projectId,
    ociNumber,
    ociKNumber,
    ociDescription,
    imageOci
    ) {
        
    const descriptionOci = ociDescription.slice(13)
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    const htmlForm = `
        <div class="container m-auto">
            La OCI#<strong>${ociNumber}</strong> - Descripcion: "${descriptionOci}"
            y toda su información interna, se eliminará completamente.
            <br>
            <div id="imagePreview" class="p-1 my-1 mx-auto w-50">
                <img class="p-1 m-1" src="${imageOci}" style="max-width: 75%; max-height: 75%;">
            </div>
            
            Está seguro que desea continuar?
            <form id="formDeleteOci${projectId}" action="/api/proyectos/deleteOci/${projectId}" method="post">
                <fieldset>
                    <input type="hidden" name="ociKNumberHidden" value="${ociKNumber}">
                </fieldset>
            </form>
        </div>    
                    `
    
    if(projectId && ociNumber) {
        Swal.fire({
            title: `Eliminar OCI# ${ociNumber}`,
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
                document.getElementById(`formDeleteOci${projectId}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `La OCI#<strong>${ociNumber}</strong>, se eliminó correctamente!`
                })
            } else {
                Swal.fire(
                    `OCI# ${ociNumber}`,
                    `La OCI#<b>${ociNumber}</b>, no se eliminó!`,
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
            text: `La OCI#<strong>${ociNumber}</strong>, no se eliminó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

let maxOciQuantity
document.getElementById('totalOciQtyHidden') ?
    maxOciQuantity = parseInt(document.getElementById('totalOciQtyHidden').value)
    :
    maxOciQuantity=0

var arrayBtnChangeStatusOci = []
var arrayBtnUpdateOci = []
var arrayBtnDeleteOci = []

for (let m=0; m<maxOciQuantity; m++) {
    for (let n=0; n<maxOciQuantity; n++) {
        let btnChangeStatusOci = document.getElementById(`${m}_${n}`)
        
        if (btnChangeStatusOci) {
            arrayBtnChangeStatusOci.push(btnChangeStatusOci)
        }

        let btnUpdateOci = document.getElementById(`btnUpdateOci${m}_${n}`)

        if(btnUpdateOci) {
            arrayBtnUpdateOci.push(btnUpdateOci)
        }

        let btnDeleteOci = document.getElementById(`btnDeleteOci${m}_${n}`)

        if(btnDeleteOci) {
            arrayBtnDeleteOci.push(btnDeleteOci)
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

arrayBtnDeleteOci.forEach(function(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        const projectId = document.getElementById(`projectIdHidden${element.id.slice(12)}`).value
        const ociNumber = document.getElementById(`ociNumberHidden${element.id.slice(12)}`).value
        const ociKNumber = document.getElementById(`ociKNumberHidden${element.id.slice(12)}`).value
        const ociDescription = document.getElementById(`ociDescription${element.id.slice(12)}`).innerText
        const imageOci = document.getElementById(`imageOci${element.id.slice(12)}`).src
        
        messageDeleteOci(
            projectId,
            ociNumber,
            ociKNumber,
            ociDescription,
            imageOci
        )
    })
})
    

// --------------- Adding New OCI to an existing Project ------------------------
function addNewOciToProject(projectName, lastOciNumber, projectIdHidden) {
   
        var arrayBloque = []
        arrayBloque.push(`
            <div id="ociItemRow0" class="row m-1">
                <div class="col-2 my-1 align-self-middle">
                    <input type="number" name="ociNumber0" id="ociNumber0" class="form-control" min="0" max="9999"
                    placeholder="Número OCI" value="${lastOciNumber+1}" required>
                </div>
                <div class="col-3 my-1 align-self-middle">
                    <textarea name="ociDescription0" id="ociDescription0" class="form-control" rows="3"
                        maxlength="100" placeholder="Descripcion OCI" required>
                    </textarea>
                </div>
                <div class="col-2 mt-3 align-self-middle">
                    <div class="form-check form-switch d-inline-block">
                        <input class="form-check-input" type="checkbox" name="ociStatus0" id="ociStatus0"
                            aria-checked="true" style="cursor: pointer;" checked>
                        <label class="form-check-label" for="ociStatus">Activa</label>
                    </div>
                </div>    
                <div class="col align-self-middle">
                    <input type="text" id="fileInputNewOciTextModal0" name="imageOciFileNameModal0" 
                        style="display: none;">
                    <input type="file" id="fileInputNewOciModal0" name="imageNewOciModal0" value=""
                        accept="image/*" style="display: none;" required>
                    <div id="drop-area-ociModal0" class="mb-1 mx-auto">
                        Arrastra y suelta una imagen aquí
                    </div>
                    <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                            id="btnRemoveOciImageModal0" name="btnRemoveOciImageModal0" style="display: none;">
                            <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div id="alertOciModal0" class="alert alert-warning align-items-center" role="alert"
                        style="display: none; font-size: 0.65rem; height: 1rem;">
                        <strong class="me-1">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                    </div>
                </div>
            
                <div class="col-1 my-1 align-self-middle">
                </div>
            </div>
        `)
    
    const html = `
            <form id="formNewOciValues" enctype="multipart/form-data" action="/api/proyectos/addNewOciToProject/${projectIdHidden}" method="post" style="font-size: 10pt">
                <fieldset id="ociNewItemRow">
                    <div class="row my-auto mx-1">
                        <div class="col-2 my-auto align-self-middle">
                            <label for="ociNumber"><strong>OCI#</strong></label>
                        </div>
                        <div class="col-3 my-auto align-self-middle">
                            <label for="ociDescription"><strong>Descripcion OCI</strong></label>
                        </div>
                        <div class="col-2 my-auto align-self-middle">
                            <label for="ociStatus"><strong>OCI Status</strong></label>
                        </div>
                        <div class="col my-auto align-self-middle">
                            <label for="ociImage"><strong>Imagen OCI</strong></label>
                            <label for="newOciImage">(Seleccione una imagen para cada OCI)</label>
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
        width: 1100,
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

    //----------------------------
    let dropAreasOciFileModal0 = document.getElementById(`drop-area-ociModal0`)
    let btnRemoveOciImageFileModal0 = document.getElementById(`btnRemoveOciImageModal0`)
    let alertOciFileModal0 = document.getElementById(`alertOciModal0`)
    let fileInputNewOciTextFileModal0 = document.getElementById(`fileInputNewOciTextModal0`)
    let fileInputNewOciFileModal0 = document.getElementById(`fileInputNewOciModal0`)


    dropAreasOciFileModal0.style.width = "250px"
    dropAreasOciFileModal0.style.height = "160px"
    dropAreasOciFileModal0.style.border = "2px dashed #ccc"
    dropAreasOciFileModal0.style.margin = "0 auto 0 25px"
    dropAreasOciFileModal0.style.borderRadius = "5px"
    dropAreasOciFileModal0.style.textAlign = "center"
    dropAreasOciFileModal0.style.lineHeight = "150px"
    dropAreasOciFileModal0.style.cursor = "pointer"

    dropAreasOciFileModal0.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropAreasOciFileModal0.style.border = '2px dashed #77d'
        dropAreasOciFileModal0.style.backgroundColor = '#7777dd10'
    })

    dropAreasOciFileModal0.addEventListener('dragleave', (e) => {
        e.preventDefault()
        dropAreasOciFileModal0.style.border = '2px dashed #ccc'
        dropAreasOciFileModal0.style.backgroundColor = '#efefef'
        btnRemoveOciImageFileModal0.style.display = 'none'
    })

    function alertNotImageNewOciModal0() {
        alertOciFileModal0.style.display = 'flex'
        btnRemoveOciImageFileModal0.style.display = 'none'
        fileInputNewOciTextFileModal0.value = ''
        dropAreasOciFileModal0.style.border = "2px dashed #ccc"
        dropAreasOciFileModal0.style.textAlign = "center"
        dropAreasOciFileModal0.style.backgroundColor = '#efefef'
        dropAreasOciFileModal0.style.display = 'block'
        dropAreasOciFileModal0.innerHTML = 'Arrastra y suelta una imagen aquí'
    }

    dropAreasOciFileModal0.addEventListener('drop', (e) => {
        e.preventDefault()
        dropAreasOciFileModal0.style.border = '3px dashed #2d2'
        dropAreasOciFileModal0.style.backgroundColor = '#22dd2210'
        const file = e.dataTransfer.files[0]
                    
        if (file && file.type.startsWith('image/')) {
            fileInputNewOciFileModal0.files = e.dataTransfer.files
            let pathToImage = '../../../src/images/upload/ociImages/'
            fileInputNewOciTextFileModal0.value = pathToImage + file.name
            btnRemoveOciImageFileModal0.style.display = 'flex'
            alertOciFileModal0.style.display = 'none'
            handleFileUploadNewOciModal0(file)
        } else {
            alertNotImageNewOciModal0()
        }     
    })

    dropAreasOciFileModal0.addEventListener('click', (e) => {
        fileInputNewOciFileModal0.click()
    })

    fileInputNewOciFileModal0.addEventListener('change', (e) => {
        e.preventDefault()
        const file = fileInputNewOciFileModal0.files[0]
        
            if (file && file.type.startsWith('image/')) { 
                let pathToImage = '../../../src/images/upload/projectImages/'
                fileInputNewOciTextFileModal0.value = pathToImage + file.name
                btnRemoveOciImageFileModal0.style.display = 'flex'
                alertOciFileModal0.style.display = 'none'
                handleFileUploadNewOciModal0(file)
            } else {
                alertNotImageNewOciModal0()
            }     
    })

    function handleFileUploadNewOciModal0(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropAreasOciFileModal0.innerHTML = 
                    `<img class="p-2 mb-5" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                alertOciFileModal0.style.display = 'none'
            }

        } else {
            alertNotImageNewOciModal0()
        }
    }

    function removeOciImageModal0() {            
        fileInputNewOciTextFileModal0.value = ''
        dropAreasOciFileModal0.style.border = "2px dashed #ccc"
        dropAreasOciFileModal0.style.textAlign = "center"
        dropAreasOciFileModal0.style.backgroundColor = '#efefef'
        dropAreasOciFileModal0.style.display = 'block'
        dropAreasOciFileModal0.innerHTML = 'Arrastra y suelta una imagen aquí'
        btnRemoveOciImageFileModal0.style.display = 'none'
        alertOciFileModal0.style.display = 'none'
    }

    btnRemoveOciImageFileModal0.addEventListener("click", (e) => {
        e.preventDefault()
        removeOciImageModal0()
        e.stopPropagation()
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
                    <textarea type="text" name="ociDescription${i}" id="ociDescription${i}" rows="3"
                        maxlength="100" class="form-control" placeholder="Descripción OCI" required>
                    </textarea>
                </div>
                <div class="col-2 mt-1 align-self-middle">
                    <div class="form-check form-switch d-inline-block mt-2">
                        <input class="form-check-input" type="checkbox" id="ociStatus${i}"
                        aria-checked="true" name="ociStatus${i}" style="cursor: pointer;" checked>
                        <label class="form-check-label" for="ociStatus${i}">Activa</label>
                    </div>
                </div>
                <div class="col align-self-middle">
                    <input type="text" id="fileInputNewOciTextModal${i}" name="imageOciFileNameModal${i}" 
                        style="display: none;">
                    <input type="file" id="fileInputNewOciModal${i}" name="imageNewOciModal${i}" value=""
                        accept="image/*" style="display: none;" required>
                    <div id="drop-area-ociModal${i}" class="mb-1 mx-auto">
                        Arrastra y suelta una imagen aquí
                    </div>
                    <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                            id="btnRemoveOciImageModal${i}" name="btnRemoveOciImageModal" style="display: none;">
                            <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div id="alertOciModal${i}" class="alert alert-warning align-items-center" role="alert"
                        style="display: none; font-size: 0.85rem; height: 1.15rem;">
                        <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                    </div>
                </div>

                <div class="col-1 my-auto align-self-middle">
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

        //------------------------------------------------------------
        var arrayDropAreasModal = []
        var arrayBtnRemoveOciImageModal = []
        var arrayAlertOciModal = []
        var arrayImageOciFileNameModal = []
        var arrayFileInputNewOciModal = []
        
        for (let m=0; m<ociQty.value; m++) {
            var dropAreasOciFileModal = document.getElementById(`drop-area-ociModal${m}`)
            var btnRemoveOciImageFileModal = document.getElementById(`btnRemoveOciImageModal${m}`)
            var alertOciFileModal = document.getElementById(`alertOciModal${m}`)
            var fileInputNewOciTextFileModal = document.getElementById(`fileInputNewOciTextModal${m}`)
            var fileInputNewOciFileModal = document.getElementById(`fileInputNewOciModal${m}`)
            
            if (dropAreasOciFileModal) {
                arrayDropAreasModal.push(dropAreasOciFileModal)
            }
            if (btnRemoveOciImageFileModal) {
                arrayBtnRemoveOciImageModal.push(btnRemoveOciImageFileModal)
            }
            if (alertOciFileModal) {
                arrayAlertOciModal.push(alertOciFileModal)
            }
            if (fileInputNewOciTextFileModal) {
                arrayImageOciFileNameModal.push(fileInputNewOciTextFileModal)
            }
            if (fileInputNewOciFileModal) {
                arrayFileInputNewOciModal.push(fileInputNewOciFileModal)
            }
        }

        arrayDropAreasModal.forEach(function(elemento) {
            elemento.style.width = "250px"
            elemento.style.height = "160px"
            elemento.style.border = "2px dashed #ccc"
            elemento.style.margin = "0 auto 0 25px"
            elemento.style.borderRadius = "5px"
            elemento.style.textAlign = "center"
            elemento.style.lineHeight = "150px"
            elemento.style.cursor = "pointer"

            elemento.addEventListener('dragover', (e) => {
                e.preventDefault()
                elemento.style.border = '2px dashed #77d'
                elemento.style.backgroundColor = '#7777dd10'
            })

            elemento.addEventListener('dragleave', (e) => {
                e.preventDefault()
                const number = parseInt(extractNumbers(e.target.id))
                elemento.style.border = '2px dashed #ccc'
                elemento.style.backgroundColor = '#efefef'
                arrayBtnRemoveOciImageModal[number].style.display = 'none'
            })

            function alertNotImageNewOciModal(number) {
                arrayAlertOciModal[number].style.display = 'flex'
                arrayBtnRemoveOciImageModal[number].style.display = 'none'
                arrayImageOciFileNameModal[number].value = ''
                elemento.style.border = "2px dashed #ccc"
                elemento.style.textAlign = "center"
                elemento.style.backgroundColor = '#efefef'
                elemento.style.display = 'block'
                elemento.innerHTML = 'Arrastra y suelta una imagen aquí'
            }
        
            elemento.addEventListener('drop', (e) => {
                e.preventDefault()
                elemento.style.border = '3px dashed #2d2'
                elemento.style.backgroundColor = '#22dd2210'
                const file = e.dataTransfer.files[0]
                const number = parseInt(extractNumbers(elemento.id))
                
                if (file && file.type.startsWith('image/')) {
                    arrayFileInputNewOciModal[number].files = e.dataTransfer.files
                    let pathToImage = '../../../src/images/upload/ociImages/'
                    arrayImageOciFileNameModal[number].value = pathToImage + file.name
                    arrayBtnRemoveOciImageModal[number].style.display = 'flex'
                    arrayAlertOciModal[number].style.display = 'none'
                    handleFileUploadNewOciModal(file, number)
                } else {
                    alertNotImageNewOciModal(number)
                }     
            })

            elemento.addEventListener('click', (e) => {
                const number = parseInt(extractNumbers(elemento.id))
                arrayFileInputNewOciModal[number].click()
            })

        })

        arrayFileInputNewOciModal.forEach(function(elemento) {
            elemento.addEventListener('change', (e) => {
                e.preventDefault()
                const file = elemento.files[0]
                const number = parseInt(extractNumbers(elemento.id))

                    if (file && file.type.startsWith('image/')) { 
                        let pathToImage = '../../../src/images/upload/projectImages/'
                        arrayImageOciFileNameModal[number].value = pathToImage + file.name
                        arrayBtnRemoveOciImageModal[number].style.display = 'flex'
                        arrayAlertOciModal[number].style.display = 'none'
                        handleFileUploadNewOciModal(file, number)
                    } else {
                        alertNotImageNewOciModal(number)
                    }     
            })
        })
        
        function handleFileUploadNewOciModal(file, number) {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    arrayDropAreasModal[number].innerHTML = 
                        `<img class="p-2 mb-5" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                    arrayAlertOciModal[number].style.display = 'none'
                }

            } else {
                alertNotImageNewOciModal(number)
            }
        }

        function removeOciImageModal(number) {            
            arrayImageOciFileNameModal[number].value = ''
            arrayDropAreasModal[number].style.border = "2px dashed #ccc"
            arrayDropAreasModal[number].style.textAlign = "center"
            arrayDropAreasModal[number].style.backgroundColor = '#efefef'
            arrayDropAreasModal[number].style.display = 'block'
            arrayDropAreasModal[number].innerHTML = 'Arrastra y suelta una imagen aquí'
            arrayBtnRemoveOciImageModal[number].style.display = 'none'
            arrayAlertOciModal[number].style.display = 'none'
        }

        arrayBtnRemoveOciImageModal.forEach(function(elemento) {
            elemento.addEventListener("click", (e) => {
                e.preventDefault()
                const number = parseInt(extractNumbers(elemento.id))
                removeOciImageModal(number)
                e.stopPropagation()
            })
            
        })
        //------------------------------------------------------------
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
                            
                const btnValue = extractNumbers(event.target.id)
                const projectName = document.getElementById(`projectNameHidden${btnValue}_0`).value
                const projectIdHidden = document.getElementById(`projectIdHidden${btnValue}_0`).value //arrayProjectId[0]
                
                let arrayLastOciNumber=[]
                for(let n=0; n<maxOciQuantity; n++) { 
                    if(document.getElementById(`ociNumberHidden${btnValue}_${n}`)) {
                        arrayLastOciNumber.push(parseInt(document.getElementById(`ociNumberHidden${btnValue}_${n}`).value))
                    }
                }

                let lastOciIndex = parseInt(arrayLastOciNumber.length-1)
                addNewOciToProject(
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
        let bgColorStatus
        statusProject=='true' ? checked : checked = ''
        statusProject=='true' ? bgColorStatus='background-color: #55dd5560;'
                                : 
                                bgColorStatus='background-color: #dd555560;'
        
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

    var html = `<form id="formUpdateProject${k}" enctype="multipart/form-data" action="/api/proyectos/updateProject/${projectId}" method="post">
                    <fieldset>
                        <div class="row justify-content-evenly mb-2 mx-1 px-1">
                            <div class="col-6">
                                <label for="projectName" class="form-label d-flex justify-content-start ms-1">Nombre Proyecto</label>
                                <input type="text" name="projectName" class="form-control"
                                    placeholder="Nombre Proyecto" value="${projectName}" required>
                            </div>
                            
                            <div class="col-6" style="${bgColorStatus}">
                                <label for="statusProject" class="form-label d-flex justify-content-start ms-1">Status Proyecto</label>
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
                        
                        <div class="row justify-content-start align-items-center mb-1 mx-1 px-1">
                            <div class="col mb-1">
                                <label for="imageProject" class="form-label d-flex justify-content-start ms-1">Seleccione una imagen para el Proyecto</label>
                                
                                <input type="text" id="fileInputText" name="imageProjectFileName"
                                    value="${imgProject}" style="display: none;" required>
                                <input type="file" id="fileInput" name="imageProject"
                                    value="" accept="image/*" style="display: none;" required>
                            
                                <div id="drop-area" class="mb-2 mx-auto">
                                    Arrastra y suelta una imagen aquí
                                </div>
                                <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                                        id="removeImage" style="display: none;">
                                        <i class="fa-solid fa-xmark"></i>
                                </button>
                                
                                <div id="alert" class="alert alert-warning align-items-center" role="alert"
                                    style="display: none; font-size: 0.95rem; height: 1.15rem;">
                                    <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                                </div>
                            </div>
                        </div>
                        
                        <div class="row justify-content-evenly mb-1 px-1 mx-auto">
                            <div class="col-12 my-1 mx-auto px-1">
                                <label class="form-label d-flex justify-content-start ms-1">Imagen actual del Proyecto</label>
                                <img src="${imgProject}" class="img-fluid rounded px-1"
                                    alt="Imagen Proyecto" width="115px">
                            </div>
                        </div>
                    </fieldset>
                </form>`
                
    
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
    const fileInput = document.getElementById('fileInput')
    const fileImputText = document.getElementById('fileInputText')
    const removeImageButton = document.getElementById('removeImage')
    const alert = document.getElementById('alert')
    
    dropArea.style.width = "300px"
    dropArea.style.height = "200px"
    dropArea.style.border = "2px dashed #ccc"
    dropArea.style.margin = "0 auto 0 50px"
    dropArea.style.borderRadius = "5px"
    dropArea.style.textAlign = "center"
    dropArea.style.lineHeight = "200px"
    dropArea.style.cursor = "pointer"

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropArea.style.border = '2px dashed #77a'
        dropArea.style.backgroundColor = '#7777aa10'
    })
  
    dropArea.addEventListener('dragleave', (e) => {
        e.preventDefault()
        dropArea.style.border = '2px dashed #ccc'
        dropArea.style.backgroundColor = '#fff'
        removeImageButton.style.display = 'none'
    })

    function alertNotImage() {
        alert.style.display = 'flex'
        removeImageButton.style.display = 'none'
        dropArea.style.border = "2px dashed #ccc"
        dropArea.style.textAlign = "center"
        dropArea.style.backgroundColor = '#fff'
        dropArea.style.display = 'block'
        dropArea.innerHTML = 'Arrastra y suelta una imagen aquí'
    }

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault()
        dropArea.style.border = '3px dashed #2a2'
        dropArea.style.backgroundColor = '#22aa2210'
        const file = e.dataTransfer.files[0]

        if (file && file.type.startsWith('image/')) {
            fileInput.files = e.dataTransfer.files
            let pathToImage = '../../../src/images/upload/projectImages/'
            fileImputText.value = pathToImage + file.name
            removeImageButton.style.display = 'flex'
            alert.style.display = 'none'
            handleFileUpload(file)
        } else {
            alertNotImage()
        }     
    })

    dropArea.addEventListener('click', () => {
        fileInput.click()
    })

    fileInput.addEventListener('change', (e) => {
        e.preventDefault()
        const file = fileInput.files[0]
        
        if (file && file.type.startsWith('image/')) { 
            let pathToImage = '../../../src/images/upload/projectImages/'
            fileImputText.value = pathToImage + file.name
            removeImageButton.style.display = 'flex'
            alert.style.display = 'none'
            handleFileUpload(file)
        } else {
            alertNotImage()
        }     
    })

    function handleFileUpload(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropArea.innerHTML = 
                    `<img class="p-2" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                dropArea.style.display = 'block'
                alert.style.display = 'none'
            }

        } else {
            alertNotImage()
        }
    }

    removeImageButton.addEventListener('click', ()=> {
        fileImputText.value = ''
        dropArea.style.border = "2px dashed #ccc"
        dropArea.style.textAlign = "center"
        dropArea.style.backgroundColor = '#fff'
        dropArea.style.display = 'block'
        dropArea.innerHTML = 'Arrastra y suelta una imagen aquí'
        removeImageButton.style.display = 'none'
        alert.style.display = 'none'
    })
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
        const projectName = document.getElementById(`projectNameHidden${k}_${l}`).value
        const levelProject = document.getElementById(`levelProjectHidden${k}_${l}`).value
        const idProject = document.getElementById(`projectIdHidden${k}_${l}`).value
        const statusProject = document.getElementById(`statusProjectHidden${k}_${l}`).value
        const descriptionProject = document.getElementById(`projectDescription${k}`).innerText
        const prioProject = document.getElementById(`prioProject${k}`).innerText
        const codeProject = document.getElementById(`codeProject${k}`).innerText
        const imgProject = document.getElementById(`imageProject${k}`).src
        
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

//---------- ToolTip btn-spot OT -----------
let btnOtNumberSpot = Array.from(document.querySelectorAll('button[name="otNumberSpot"]'))

btnOtNumberSpot.forEach(function(btnSpot) {
    btnSpot.addEventListener("mouseover", (event) => {
        let btnSpotOtNumber = document.getElementById(`${btnSpot.id}`)
        
        tippy(btnSpotOtNumber, {
            content: `OT: ${btnSpotOtNumber.id}<br>
                      Op: ${btnSpotOtNumber.getAttribute("valueop")}<br>
                      Descripcion: ${btnSpotOtNumber.getAttribute("valuedes")}<br>
                      Diseño: ${btnSpotOtNumber.getAttribute("valuedesig")}<br>
                      Simulacion: ${btnSpotOtNumber.getAttribute("valuesim")}<br>
                      Proveedor: ${btnSpotOtNumber.getAttribute("valuesup")}`,
            allowHTML: true,
            arrow: true,
            animation: 'scale',
            theme: 'material',
            // followCursor: true,
            interactive: true,
        })
    })
})
