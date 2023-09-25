const passwordInput = document.getElementById('password')
const showPasswordBtn = document.getElementById('show-password-btn')

showPasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
    passwordInput.setAttribute('type', type)
    showPasswordBtn.innerHTML = type === 'password' ? '<i class="fa fa-eye" aria-hidden="true"></i>' : '<i class="fa fa-eye-slash" aria-hidden="true"></i>'
})

document.getElementById('username').value = ""
document.getElementById('password').value = ""