const { Router } = require('express')
const routerProyectos = Router()
const { authMiddleware } = require('../middlewares/auth.middleware.js')
const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware, authProductMiddleware} = require('../middlewares/authUser.middleware.js')

const GetProjects = require('../controllers/proyectos.controller.js')
const getProjects = GetProjects.ProjectsController
const projects = new getProjects()

// -------------------  Seleccionar todos los Proyectos ------------------
routerProyectos.get('/', checkAuthentication, authUserMiddleware, projects.getAllProjects)

// -------------------  Seleccionar Proyecto por Cliente Id ------------------ 
routerProyectos.get('/:id', checkAuthentication, authProductMiddleware, projects.getProjectsByClientId)

// -------------------  Ver detalles del Proyecto por Id del proyecto ------------------ 
routerProyectos.get('/selectProject/:id', checkAuthentication, authProductMiddleware, projects.selectProjectById)

// -------------------  Ver proyectos del Cliente ------------------ 
// routerProyectos.get('/projects/:id', checkAuthentication, authProductMiddleware, projects.getClientProjectsById)

// -------------------  Crear Nuevo Proyecto ------------------------ 
routerProyectos.post('/', checkAuthentication, authProductMiddleware, projects.createNewProject)

// -------------------  Agregar OT a OCI --------------------------- 
routerProyectos.post('/otInfoR14', checkAuthentication, authProductMiddleware, projects.addInfoR14ToOtProject)

// -------------------  Agregar informacion R14 a OT ---------------- 
routerProyectos.post('/oci', checkAuthentication, authProductMiddleware, projects.addOtToOciProject)

// -------------------  Actualizar Proyecto por Id ------------------ 
// routerProyectos.post('/update/:id', checkAuthentication, authProductMiddleware, projects.updateClient)

// -------------------  Eliminar Proyecto por Id (Status = Inactivo) ------------------ 
// routerProyectos.get('/delete/:id', checkAuthentication, authProductMiddleware, projects.deleteClientById)

// -------------------  Eliminar todos los Proyectos (Status = Inactivo) ------------------ 
// routerProyectos.get('/all/delete', checkAuthentication, authProductMiddleware, projects.deleteAllClients)

module.exports = routerProyectos