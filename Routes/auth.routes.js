const { Router } = require('express')
const authRouter = Router()

const passport = require('passport')
const { countVisits } = require('../middlewares/countVisits/countVisits.middleware')
const { checkAuthentication } = require('../middlewares/chekAuthentication')
const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const { sessionPostLogin } = require('../controllers/session.controllers.js')

const { generateToken } = require('../utils/generateToken')

const GetUsers = require('../controllers/usuarios.controller.js')
const getUsers = GetUsers.UsersController
const users = new getUsers()

const serverMongoDB = require('../usuarios/userMongoDB')
const constructor = serverMongoDB.ServerMongoDB
const server = new constructor()


//_______________________________ login _____________________________________ //
authRouter.get('/login', (req, res) => { // lleva la vista del formulario de login
    const flag = false
    const fail = false
    res.render('login', { flag, fail })
})

authRouter.post('/login', sessionPostLogin, countVisits, users.login)

//----------------------------------------------------------------
authRouter.get('/clientes', checkAuthentication, authUserMiddleware, users.clientes)


authRouter.get('/index', checkAuthentication, authUserMiddleware, users.index)

//_________________________________ github _______________________________ //
authRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}))

authRouter.get('/githubcallback', checkAuthentication, authUserMiddleware, passport.authenticate('github', {

        failureRedirect: '/api/auth/login'
        }), async (req, res) => {
            const username = req.user.username
            //let username = res.locals.username
            let userInfo = res.locals.userInfo

            const visits = req.session.visits
            const user = await server.getUserByUsername(username)
            //const cart = await carts.getCartByUserId(user._id)
            const { flag, fail } = true
            
            req.session.admin = true

            const cookie = req.session.cookie
            const time = cookie.expires
            const expires = new Date(time)
           
            if (username != null) {
                const fail = false
                res.render('index', {
                    username,
                    userInfo,
                    visits,
                    flag,
                    fail,
                    expires
                })
            }
            if (username == null) {
                res.redirect('/api/login')
            }
})

//_________________________________ register ____________________________ //
authRouter.get('/register', (req, res) => {   // devuelve la vista de registro
    const flag = false
    const fail = false
    res.render('register', { flag, fail })
})

authRouter.post('/register', users.registerNewUser)

//____________________________ logout __________________________________ //
authRouter.post('/logout', checkAuthentication, authUserMiddleware, users.userLogout)

module.exports = { 
    authRouter 
}