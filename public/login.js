const passwordInput = document.getElementById('password')
const showPasswordBtn = document.getElementById('show-password-btn')

showPasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
    passwordInput.setAttribute('type', type)
    showPasswordBtn.innerHTML = type === 'password' ? '<i class="fa fa-eye" aria-hidden="true"></i>' : '<i class="fa fa-eye-slash" aria-hidden="true"></i>'
})

function welcomeMessage(uName) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: `Bienvenido ${uName}`
      })
}

const btnUpdate = document.getElementById('btnFormLogin')
btnUpdate.addEventListener('click', ()=> {
    //event.preventDefault()
    const uName = document.getElementById('username').value
    if(uName) {
        welcomeMessage(uName)
    }
    
})

document.getElementById('username').value = ""
document.getElementById('password').value = ""