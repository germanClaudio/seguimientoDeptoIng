const { Router } = require('express')
const routerUsers = Router()
//const crypto = require('crypto')
//const { countVisits } = require('../middlewares/countVisits/countVisits.middleware')
const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const GetUsers = require('../controllers/usuarios.controller.js')
const getUsers = GetUsers.UsersController
const users = new getUsers()

//---------------- Get All Users in DB ------------------
routerUsers.get('/', checkAuthentication, authUserMiddleware, users.getAllUsers)

//---------------- Get User by Id  ----------------------
routerUsers.get('/:id', checkAuthentication, authUserMiddleware, users.getUserById)

//---------------- Create a New User  -------------------
routerUsers.post('/newUser', checkAuthentication, authUserMiddleware, users.createNewUser)

//---------------- Update a User  -----------------------
routerUsers.post('/update/:id', checkAuthentication, authUserMiddleware, users.updateUser)

//---------------- Delete a User  -----------------------
routerUsers.get('/delete/:id', checkAuthentication, authUserMiddleware, users.deleteUserById)

//---------------- Search a User sort by permission -----------------------
routerUsers.get('/searchUsers/:all', checkAuthentication, authUserMiddleware, users.searchUsers)

//---------------- Not authorizate session --------------
routerUsers.get("/auth-bloq", users.authBloq)

//---------------- Authorizate session --------------
routerUsers.get("/auth-nobloq", users.authNoBloq)

module.exports = routerUsers