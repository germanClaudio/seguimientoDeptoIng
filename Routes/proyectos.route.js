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

// -------------------  Agregar informacion R14 a OT --------------------------- 
routerProyectos.post('/otInfoR14', checkAuthentication, authProductMiddleware, projects.addInfoR14ToOtProject)

// -------------------  Agregar OT a OCI ---------------- 
routerProyectos.post('/oci', checkAuthentication, authProductMiddleware, projects.addOtToOciProject)

// -------------------  Actualizar Estado del Proyecto por Id ------------------ 
routerProyectos.post('/updateStatusProject/:id', checkAuthentication, authProductMiddleware, projects.updateStatusProject)

// -------------------  Actualizar Nivel del Proyecto por Id ------------------ 
routerProyectos.post('/updateLevelProject/:id', checkAuthentication, authProductMiddleware, projects.updateLevelProject)

// -------------------  Actualizar Estado de OCI por Id Proyecto ------------------ 
routerProyectos.post('/updateStatusOci/:id', checkAuthentication, authProductMiddleware, projects.updateStatusOci)

// -------------------  Agregar Nueva OCI a Proyecto por Id Proyecto ------------------ 
routerProyectos.post('/addNewOciToProject/:id', checkAuthentication, authProductMiddleware, projects.addNewOciToProject)

// -------------------  Actualizar Proyecto por Id ------------------ 
routerProyectos.post('/updateProject/:id', checkAuthentication, authProductMiddleware, projects.updateProject)

// -------------------  Actualizar OCI por Id de Proyecto ------------------ 
routerProyectos.post('/updateOci/:id', checkAuthentication, authProductMiddleware, projects.updateOci)

// -------------------  Eliminar OCI por Id de Proyecto ------------------ 
routerProyectos.post('/deleteOci/:id', checkAuthentication, authProductMiddleware, projects.deleteOci)

// -------------------  Eliminar Proyecto por Id (Visible = false) ------------------ 
/routerProyectos.post('/deleteProject/:id', checkAuthentication, authProductMiddleware, projects.deleteProjectById)

// -------------------  Eliminar todos los Proyectos (Status = Inactivo) ------------------ 
// routerProyectos.get('/all/delete', checkAuthentication, authProductMiddleware, projects.deleteAllClients)

module.exports = routerProyectos