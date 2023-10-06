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
    btnHiddeTable1.addEventListener('click', function () {
        if (tablaGeneral.style.display === 'none') {
            tablaGeneral.style.display = ''
            tablaGeneral.classList.add("col-3")
            tablaSeguimiento.classList.add("col-3")
            // tabla3.classList.add("col-2")
            // tabla4.classList.add("col-2")
            // tabla5.classList.add("col-2")
            btnHiddeTable1.setHTML('<i class="fa-regular fa-eye-slash"></i>')
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

    // Manejador de eventos para ocultar la tabla #2
    btnHiddeTable2.addEventListener('click', function () {
        if (tablaSeguimiento.style.display === 'none') {
            tablaSeguimiento.style.display = ''
            btnHiddeTable2.setHTML('<i class="fa-regular fa-eye-slash"></i>')
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
  })

  
  document.addEventListener('DOMContentLoaded', function (event) {
    let initIndex = event.eventPhase
    let myCarousel = document.getElementById('carouselExampleControls')
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

      if (currentIndex === 0) {
        document.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
      } else {
        document.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
      }
    })
  })