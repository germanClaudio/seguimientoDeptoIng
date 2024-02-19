const { Router } = require('express')
const routerProyectos = Router()
const { authMiddleware } = require('../middlewares/auth.middleware.js')
const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware, authProductMiddleware} = require('../middlewares/authUser.middleware.js')

const GetProjects = require('../controllers/proyectos.controller.js')
const getProjects = GetProjects.ProjectsController
const projects = new getProjects()

// -------------------  Seleccionar todos los Proyectos ------------------
routerProyectos.get('/', checkAuthentication, projects.getAllProjects)

// -------------------  Seleccionar Proyecto por Cliente Id ------------------ 
routerProyectos.get('/:id', checkAuthentication, projects.getProjectsByClientId)

// -------------------  Ver detalles del Proyecto por Id del proyecto ------------------ 
routerProyectos.get('/selectProject/:id', checkAuthentication, projects.selectProjectById)

// -------------------  Ver listado de OCI completo ------------------ 
// routerProyectos.get('/oci-list', checkAuthentication, projects.getAllOciList)

// -------------------  Crear Nuevo Proyecto ------------------------ 
routerProyectos.post('/', checkAuthentication, authUserMiddleware, projects.createNewProject)

// -------------------  Agregar informacion R14 a OT --------------------------- 
routerProyectos.post('/otInfoR14', checkAuthentication, projects.addInfoR14ToOtProject)

// -------------------  Agregar OT a OCI ---------------- 
routerProyectos.post('/oci', checkAuthentication, projects.addOtToOciProject)

// -------------------  Actualizar Estado del Proyecto por Id ------------------ 
routerProyectos.post('/updateStatusProject/:id', checkAuthentication, authUserMiddleware, projects.updateStatusProject)

// -------------------  Actualizar Nivel del Proyecto por Id ------------------ 
routerProyectos.post('/updateLevelProject/:id', checkAuthentication, authUserMiddleware, projects.updateLevelProject)

// -------------------  Actualizar Estado de OCI por Id Proyecto ------------------ 
routerProyectos.post('/updateStatusOci/:id', checkAuthentication, authUserMiddleware, projects.updateStatusOci)

// -------------------  Actualizar Estado de OT por Id Proyecto ------------------ 
routerProyectos.post('/updateStatusOt/:id', checkAuthentication, projects.updateStatusOt)

// -------------------  Agregar Nueva OCI a Proyecto por Id Proyecto ------------------ 
routerProyectos.post('/addNewOciToProject/:id', checkAuthentication, authUserMiddleware, projects.addNewOciToProject)

// -------------------  Actualizar Proyecto por Id ------------------ 
routerProyectos.post('/updateProject/:id', checkAuthentication, authUserMiddleware, projects.updateProject)

// -------------------  Actualizar OCI por Id de Proyecto ------------------ 
routerProyectos.post('/updateOci/:id', checkAuthentication, projects.updateOci)

// -------------------  Eliminar OCI por Id de Proyecto ------------------ 
routerProyectos.post('/deleteOci/:id', checkAuthentication, authUserMiddleware, projects.deleteOci)

// -------------------  Eliminar OT por Id de Proyecto ------------------ 
routerProyectos.post('/deleteOt/:id', checkAuthentication, authUserMiddleware, projects.deleteOt)

// -------------------  Eliminar Proyecto por Id (Visible = false) ------------------ 
routerProyectos.post('/deleteProject/:id', checkAuthentication, authUserMiddleware, projects.deleteProjectById)

// -------------------  Eliminar todos los Proyectos (Status = Inactivo) ------------------ 
// routerProyectos.get('/all/delete', checkAuthentication, authProductMiddleware, projects.deleteAllClients)

module.exports = routerProyectos