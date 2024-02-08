const ProyectosService = require("../services/projects.service.js")
const ClientesService = require("../services/clients.service.js")
const UserService = require("../services/users.service.js")

const multer = require('multer')
// const path = require('path')

let now = require('../utils/formatDate.js')
let imageNotFound = "../../../src/images/upload/LogoClientImages/noImageFound.png"


class ProjectsController {
    constructor() {
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.users = new UserService()
    }

    getAllProjects = async (req, res) => {
        const proyectos = await this.projects.getAllProjects()

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        let cliente = await this.clients.getClientById()

        try {
            if (proyectos.error) return res.status(400).json({ msg: 'No hay proyectos cargados' })
            res.render('projectsList', {
                proyectos,
                cliente,
                username,
                userInfo,
                expires
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getAllProjects',
                error: error
            })
        }
    }

    getProjectsByClientId = async (req, res) => {
        const { id } = req.params
        const cliente = await this.clients.getClientById(id)
        //console.log('proyectosControler - Cliente -getProjectsByClientId ', id)
        const proyectos = await this.projects.getProjectsByClientId(id)
        //console.log('proyectosControler-getProjectsByClientId ', proyectos)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                proyectos,
                username,
                userInfo,
                expires,
                cliente
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getProductById',
                error: error
            })
        }
    }

    selectProjectByClientId = async (req, res) => {
        const { id } = req.params
        const cliente = await this.clients.getClientById(id)

        const proyectosCargados = await this.projects.getProjectsByClientId(id)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                proyectosCargados,
                username,
                userInfo,
                expires,
                cliente
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - clientProjectsDetails',
                error: error
            })
        }
    }

    selectProjectById = async (req, res) => {
        const { id } = req.params

        const proyecto = await this.projects.selectProjectByProjectId(id)
        const idCliente = proyecto[0].client[0]._id
        const cliente = await this.clients.getClientByProjectId(idCliente)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0
        }

        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('projectSelectedDetail', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente,
                data
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getProductById',
                error: error
            })
        }
    }

    createNewProject = async (req, res) => {    
        //------ Storage Project Image in folder projectImages/ --------
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {  
                cb(null, './public/src/images/upload/projectImages/') // Path de acceso a carpeta donde se guardan las Imagenes
            },                                     
            filename: function(req, file, cb) {
                cb(null, file.originalname) //+ path.extname(file.originalname)) //originalname
            }
        })
        
        const uploadImageOci = multer({
            storage: storage
        }).any()
        
        uploadImageOci(req, res, async (err) => {
            // console.log('files: ', req.files)
            const clientId = req.body.clientIdHidden
            const clienteSeleccionado = await this.clients.selectClientById(clientId)

            const ociQuantity = parseInt(req.body.ociQuantity)
            
            const userId = req.body.idHidden
            const userCreator = await this.users.getUserById(userId)
            
            const user = [{
                name: userCreator.name,
                lastName: userCreator.lastName,
                username: userCreator.username,
                email: userCreator.email
            }]

            const modificator = [{
                name: "",
                lastName: "",
                username: "",
                email: ""
            }]

            let arrayOciNumber=[],
            arrayOciDescription=[],
            arrayOciStatus=[],
            arrayOciImages=[]

            for (const key in req.body) {
                if (key.startsWith('ociNumber')) {
                    arrayOciNumber.push(req.body[key])
                }
                else if (key.startsWith('ociDescription')) {
                    arrayOciDescription.push(req.body[key])
                }
                else if (key.startsWith('ociStatus')) {
                    arrayOciStatus.push(req.body[key])
                }
                else if (key.startsWith('imageOciFileName')) {
                    arrayOciImages.push(req.body[key])
                }
            }

            let arrayOciProjects = []
            for(let i=0; i<ociQuantity; i++) {
                var ociProject = {
                        ociNumber: arrayOciNumber[i],
                        ociDescription: arrayOciDescription[i],
                        ociStatus: arrayOciStatus[i] == 'on' ? true : false,
                        creator: user,
                        timestamp: now,
                        ociImage: arrayOciImages[i] || imageNotFound,
                        modificator: modificator,
                        modifiedOn: "",
                        visible: true
                }
                arrayOciProjects.push(ociProject)
            }
            
            const project = {
                projectName: req.body.projectName,
                statusProject: req.body.statusProject == 'on' ? true : false,
                levelProject: req.body.levelProject,
                codeProject: req.body.codeProject,
                projectDescription: req.body.projectDescription,
                prioProject: req.body.prioProject,
                imageProject: req.body.imageProject || imageNotFound,
                visible: true,
                creator: user,
                timestamp: now,
                modificator: modificator,
                modifiedOn: "",
                oci: arrayOciProjects
            }

            const newProject = {
                creator: user,
                client: clienteSeleccionado,
                project: project,
                timestamp: now,
                modificator: modificator,
                modifiedOn: "",
                visible: true
            }
      
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try {
                await this.projects.addProjectToClient(newProject)
                const proyectos = await this.projects.getProjectsByClientId(clientId)

                let username = res.locals.username
                let userInfo = res.locals.userInfo

                const cookie = req.session.cookie
                const time = cookie.expires
                const expires = new Date(time)

                const cliente = await this.clients.updateClientProjectsQty(
                    clientId, 
                    clienteSeleccionado, 
                    user
                )

                if (!proyectos) return res.status(404).json({ Msg: 'Proyecto no guardado' })
                res.render('clientProjectsDetails', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyectos
                })

            } catch (error) {
                res.status(500).json({
                    status: false,
                    error: error
                })
            }
        })
    }

    addOtToOciProject = async (req, res) => {
        const { id } = req.params
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const numberOci = parseInt(req.body.ociNumber)
        const ociNumberK = parseInt(req.body.ociNumberK)
        
        const projectId = id || req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        let arrayOtNumber=[],
            arrayOpNumber=[],
            arrayOpDescription=[],
            arrayOtStatus=[],
            arrayOtDesign=[],
            arrayOtSimulation=[],
            arrayOtSupplier=[]

        for (const key in req.body) {
            if (key.startsWith('otNumber')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('opNumber')) {
                arrayOpNumber.push(req.body[key])
            }
            else if (key.startsWith('opDescription')) {
                arrayOpDescription.push(req.body[key])
            }
            else if (key.startsWith('otStatus')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('internoDiseno')) {
                arrayOtDesign.push(req.body[key])
            }
            else if (key.startsWith('internoSimulacion')) {
                arrayOtSimulation.push(req.body[key])
            }
            else if (key.startsWith('externoDiseno')) {
                arrayOtSupplier.push(req.body[key])
            }
        }

        var arrayOtAddedToOci = []
        for(let i=0; i<otQuantity; i++) {
            var otAddedToOci = {
                otNumber: arrayOtNumber[i],
                opNumber: arrayOpNumber[i],
                opDescription: arrayOpDescription[i],
                otStatus: arrayOtStatus[i] == 'on' ? true : false,
                otDesign: arrayOtDesign[i],
                otSimulation: arrayOtSimulation[i],
                otSupplier: arrayOtSupplier[i],
                creator: user,
                timestamp: now,
                modificator: modificator,
                modifiedOn: ""
            }
            arrayOtAddedToOci.push(otAddedToOci)
        }

        await this.projects.addOtToOciProject(
            projectId,
            numberOci,
            ociNumberK,
            arrayOtAddedToOci
        )

        await this.clients.updateClient(
            clientId, 
            cliente, 
            user
        )

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0
        }

        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            console.log('proyectoController ',proyecto)
        try {
            if (!proyecto) return res.status(404).json({ msg: 'OCI no encontrada' })
            res.render('projectSelectedDetail', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente,
                data
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - Adding OT to OCI Proyect',
                error: error
            })
        }
    }

    addInfoR14ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arrayProcesoR14=[],
            arrayAprobadoR14=[]

        for (const key in req.body) {
            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('procesoR14')) {
                arrayProcesoR14.push(req.body[key])
            }
            else if (key.startsWith('aprobadoR14')) {
                arrayAprobadoR14.push(req.body[key])
            } 
        }

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                procesoR14: arrayProcesoR14[i] || "sinDato",
                aprobadoR14: arrayAprobadoR14[i] || "sinDato",
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }

        const proyecto = await this.projects.addInfoR14ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )

        // const data = { // Inicializar variables en servidor
        //     k: 0, 
        //     m: 0,
        //     j: 0
        // }

        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectsSelectedDetail', {  //projectsList
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                // data
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'ControllerError - Adding OT to OCI Proyect',
                error: error
            })
        }
    }

    updateStatusProject = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        const statusProjectHidden = req.body.statusProjectHidden

        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        await this.projects.updateStatusProject(
            id, 
            proyecto, 
            statusProjectHidden,
            userModificator
        )

        await this.clients.updateClient(
            clientId, 
            cliente, 
            userModificator
        )

        const proyectos = await this.projects.getProjectsByClientId(clientId)
        
        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    updateLevelProject = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        const levelProject = req.body.levelProject
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        await this.projects.updateLevelProject(
            id, 
            proyecto, 
            levelProject,
            userModificator
        )        

        await this.clients.updateClient(
            clientId, 
            cliente, 
            userModificator
        )

        const proyectos = await this.projects.getProjectsByClientId(clientId)
        
        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    updateStatusOci = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        const statusOciHidden = req.body.statusOciHidden
        const ociKNumber = parseInt(req.body.ociKNumberHidden)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        await this.projects.updateStatusOci(
            id, 
            proyecto,
            statusOciHidden,
            ociKNumber,
            userModificator
        )

        await this.clients.updateClient(
            clientId, 
            cliente, 
            userModificator
        )

        const proyectos = await this.projects.getProjectsByClientId(clientId)
        
        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    updateStatusOt = async (req, res) => {
        const id = req.params.id
        const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
        
        const clientId = mainProyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        const statusOtHidden = req.body.statusOtHidden
        const ociKNumberHidden = parseInt(req.body.ociKNumberHidden)
        const otKNumberHidden = parseInt(req.body.otKNumberHidden)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        await this.projects.updateStatusOt(
            id, 
            mainProyecto,
            statusOtHidden,
            ociKNumberHidden,
            otKNumberHidden,
            userModificator
        )

        await this.clients.updateClient(
            clientId, 
            cliente, 
            userModificator
        )

        const proyecto = await this.projects.selectProjectsByMainProjectId(id)
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('projectSelectedDetail', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    addNewOciToProject = async (req, res) => {
        //------ Storage OCI Image in folder projectImages/ --------
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {  
                cb(null, './public/src/images/upload/projectImages/') // Path de acceso a carpeta donde se guardan las Imagenes
            },                                      
            filename: function(req, file, cb) {
              cb(null, file.originalname ) //+ path.extname(file.originalname)) //originalname
            }
        })
                
        const upload = multer({
            storage: storage
        }).any()

        upload(req, res, async (err) => {
            
            const id = req.params.id
            const proyecto = await this.projects.selectProjectByProjectId(id)
            const projectId = proyecto[0]._id
        
            const clientId = proyecto[0].client[0]._id
            const cliente = await this.clients.selectClientById(clientId)
            
            const ociQuantity = parseInt(req.body.ociQuantityModal)
            
            let username = res.locals.username
            let userInfo = res.locals.userInfo
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)

            const cookie = req.session.cookie
            const time = cookie.expires
            const expires = new Date(time)

            const user = {
                name: userCreator.name,
                lastName: userCreator.lastName,
                username: userCreator.username,
                email: userCreator.email
            }

            const modificator = {
                        name: "",
                        lastName: "",
                        username: "",
                        email: ""
                    }

            let arrayOciNumber=[],
                arrayOciDescription=[],
                arrayOciStatus=[],
                arrayOciImages=[]
                    
            for (const key in req.body) {
                if (key.startsWith('ociNumber')) {
                    arrayOciNumber.push(req.body[key])
                }
                else if (key.startsWith('ociDescription')) {
                    arrayOciDescription.push(req.body[key])
                }
                else if (key.startsWith('ociStatus')) {
                    arrayOciStatus.push(req.body[key] === 'on' ? true : false)
                }
                else if (key.startsWith('imageOciFileNameModal')) {
                    const keyValue = req.body[key] === '' ?  imageNotFound : req.body[key]
                    arrayOciImages.push(keyValue)
                }
            }
            
            let arrayOciAddedToProject = []
            for (let i=0; i<ociQuantity; i++ ) {
                var infoOciAddedToProject = {
                    ociNumber: parseInt(arrayOciNumber[i]),
                    ociDescription: arrayOciDescription[i] || "sinDatos",
                    ociStatus: arrayOciStatus[i] || true,
                    ociImage: arrayOciImages[i],
                    timestamp: now,
                    creator: user,
                    modificator: modificator,
                    modifiedOn: "",
                }
                arrayOciAddedToProject.push(infoOciAddedToProject)
            } 
            
            try {
                await this.clients.updateClient(
                    clientId, 
                    cliente, 
                    user
                    )
                    
                await this.projects.addNewOciToProject(
                    projectId,
                    ociQuantity,
                    arrayOciAddedToProject
                    )
        
                const proyectos = await this.projects.getProjectsByClientId(clientId)
    
                if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
                res.render('clientProjectsDetails', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyectos
                })
    
            } catch (error) {
                res.status(500).json({
                    status: false,
                    error: error
                })
            }
        })
    }

    updateProject = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        //------ Storage Project Image in folder projectImages/ --------
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {  
                cb(null, './public/src/images/upload/projectImages/') // Path de acceso a carpeta donde se guardan las Imagenes
            },                                      
            filename: function(req, file, cb) {
              cb(null, file.originalname ) //+ path.extname(file.originalname)) //originalname
            }
        })
                
        const upload = multer({
            storage: storage
        }).single('imageProject')

        upload(req, res, async (err) => {
            const statusProject = req.body.statusProjectForm
            const projectName = req.body.projectName
            const projectDescription = req.body.projectDescription
            const prioProject = req.body.prioProject
            const levelProject = req.body.levelProject
            const codeProject = req.body.codeProject
            const imageProjectText = req.body.imageProjectFileName
                        
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try{
                await this.projects.updateProject(
                    id,
                    proyecto,
                    statusProject,
                    projectName,
                    projectDescription,
                    prioProject,
                    levelProject,
                    codeProject,
                    imageProjectText,
                    userModificator
                )
            } catch (error) {
                res.status(500).json({
                    status: false,
                    error: error
                })
            }
        })
        //------------------------------------

        await this.clients.updateClient(
            clientId, 
            cliente, 
            userModificator
        )

        const proyectos = await this.projects.getProjectsByClientId(clientId)
        
        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    updateOci = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        //------ Storage OCI Image in folder projectImages/ --------
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {  
                cb(null, './public/src/images/upload/projectImages/') // Path de acceso a carpeta donde se guardan las Imagenes
            },                                      
            filename: function(req, file, cb) {
              cb(null, file.originalname ) //+ path.extname(file.originalname)) //originalname
            }
        })
                
        const upload = multer({
            storage: storage
        }).single('imageOci')

        upload(req, res, async (err) => {
            const statusOci = req.body.statusOciForm
            const ociDescription = req.body.descriptionOci
            const ociNumber = req.body.numberOci
            const ociKNumber = req.body.ociKNumberHidden
            const ociImageText = req.body.imageOciFileName
                        
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try{
                await this.projects.updateOci(
                    id,
                    proyecto,
                    statusOci,
                    ociDescription,
                    ociNumber,
                    ociKNumber,
                    ociImageText,
                    userModificator
                )
            } catch (error) {
                res.status(500).json({
                    status: false,
                    error: error
                })
            }
        })
        //------------------------------------

        try {
            await this.clients.updateClient(
                clientId, 
                cliente, 
                userModificator
            )

            const proyectos = await this.projects.getProjectsByClientId(clientId)
        
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    deleteOci = async (req, res) => {
        
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const clienteSeleccionado = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const ociKNumber = req.body.ociKNumberHidden
        
        try {
            
            await this.projects.deleteOci(
                id, 
                proyecto,
                ociKNumber,
                userModificator
                )
                                
            const cliente = await this.clients.updateClient(
                clientId, 
                clienteSeleccionado, 
                userModificator
            )

            const proyectos = await this.projects.getProjectsByClientId(clientId)
                
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
                res.render('clientProjectsDetails', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyectos
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    deleteOt = async (req, res) => {
        const id = req.params.id
        const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
        
        const clientId = mainProyecto[0].client[0]._id
        const clienteSeleccionado = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const ociKNumber = req.body.ociKNumberHidden
        const otKNumber = req.body.otKNumberHidden
        
        try {
            await this.projects.deleteOt(
                id, 
                mainProyecto,
                ociKNumber,
                otKNumber,
                userModificator
                )
             
            const cliente = await this.clients.updateClient(
                clientId, 
                clienteSeleccionado, 
                userModificator
            )

            const proyecto = await this.projects.selectProjectsByMainProjectId(id)

            if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyecto
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    deleteProjectById = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const clienteSeleccionado = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        try {
            const proyectos = await this.projects.deleteProjectById(
                id, 
                proyecto, 
                userModificator
            )
            
            const cliente = await this.clients.reduceClientProjectQty(
                clientId, 
                clienteSeleccionado, 
                userModificator
            )
                
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }
}

module.exports = { ProjectsController }