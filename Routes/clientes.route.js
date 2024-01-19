const { Router } = require('express')
const routerClientes = Router()
const { authMiddleware } = require('../middlewares/auth.middleware.js')
const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware, authProductMiddleware} = require('../middlewares/authUser.middleware.js')

const GetClients = require('../controllers/clientes.controller.js')
const getClients = GetClients.ClientsController
const clients = new getClients()

// -------------------  Seleccionar todos los Clientes ------------------
routerClientes.get('/', checkAuthentication, authUserMiddleware, clients.getAllClients)

// -------------------  Seleccionar Cliente por Id ------------------ 
routerClientes.get('/:id', checkAuthentication, authProductMiddleware, clients.getClientById)

// -------------------  Ver detalles del Cliente por Id ------------------ 
routerClientes.get('/select/:id', checkAuthentication, authProductMiddleware, clients.selectClientById)

// -------------------  Ver proyectos del Cliente ------------------ 
routerClientes.get('/projects/:id', checkAuthentication, authProductMiddleware, clients.getClientProjectsById)

// -------------------  Crear Nuevo Cliente ------------------------ 
routerClientes.post('/', checkAuthentication, authProductMiddleware, clients.createNewClient)

// -------------------  Actualizar Cliente por Id ------------------ 
routerClientes.post('/update/:id', checkAuthentication, authProductMiddleware, clients.updateClient)

// -------------------  Eliminar Cliente por Id (Status = Inactivo) ------------------ 
routerClientes.get('/delete/:id', checkAuthentication, authProductMiddleware, clients.deleteClientById)

// -------------------  Buscar cliente ------------------------------------ 
// routerClientes.get('/buscar/cliente', checkAuthentication, authProductMiddleware, clients.getClientBySearching)

// -------------------  Eliminar todos los Clientes (Status = Inactivo) ------------------ 
routerClientes.get('/all/delete', checkAuthentication, authProductMiddleware, clients.deleteAllClients)

module.exports = routerClientes