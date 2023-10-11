const ProyectosService = require("../services/projects.service.js")
const ClientesService = require("../services/clients.service.js")
const CartsService = require("../services/carts.service.js")
const UserService = require("../services/users.service.js")

function formatDate(date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()

    return day + "-" + month + "-" + year + "_" + hours + "." + min + "." + sec
}

class ProjectsController {
    constructor() {
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.carts = new CartsService()
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
            res.render('projectsList', { proyectos, cliente, username, userInfo, expires })

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
        console.log('proyectosControler - Cliente -getProjectsByClientId ', id)
        const proyectos = await this.projects.getProjectsByClientId(id)
        console.log('proyectosControler-getProjectsByClientId ', proyectos)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', { proyectos, username, userInfo, expires, cliente })
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
        console.log('Select proyectos controler..... ', proyectosCargados)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', { proyectosCargados, username, userInfo, expires, cliente })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getProductById',
                error: error
            })
        }
    }

    selectProjectById = async (req, res) => {
        const { id } = req.params

        const cliente = await this.clients.getClientByProjectId(id)
        //console.log('cliente:', cliente)
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

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
                msg: 'controllerError - getProductById',
                error: error
            })
        }
    }

    createNewProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const clienteSeleccionado = await this.clients.selectClientById(clientId)

        const userId = req.body.idHidden
        const user = await this.users.getUserById(userId)
        
        const flagOciStatus = req.body.ociStatus == 'on' ? true : false
        const flagStatusProject = req.body.statusProject == 'on' ? true : false
        
        let ociProject = [{
            ociNumber: req.body.ociNumber,
            ociDescription: req.body.ociDescription,
            ociStatus: flagOciStatus
        }]
        
        const ociQuantity = parseInt(req.body.ociQuantity)
        let emptyArray = []
        
        const flagOciStatus1 = req.body.ociStatus1 == 'on' ? true : false
        const flagOciStatus2 = req.body.ociStatus2 == 'on' ? true : false
        const flagOciStatus3 = req.body.ociStatus3 == 'on' ? true : false
        const flagOciStatus4 = req.body.ociStatus4 == 'on' ? true : false
        //const flagOciStatus5 = req.body.ociStatus5 == 'on' ? true : false
       
        if (ociQuantity === 4) {
            const ociProjectPlus = [{
                ociNumber: parseInt(req.body.ociNumber1),
                ociDescription: req.body.ociDescription1,
                ociStatus: flagOciStatus1
            },{
                ociNumber: parseInt(req.body.ociNumber2),
                ociDescription: req.body.ociDescription2,
                ociStatus: flagOciStatus2
            },{
                ociNumber: parseInt(req.body.ociNumber3),
                ociDescription: req.body.ociDescription3,
                ociStatus: flagOciStatus3
            },{
                ociNumber: parseInt(req.body.ociNumber4),
                ociDescription: req.body.ociDescription4,
                ociStatus: flagOciStatus4
            }]
            emptyArray = emptyArray.concat(ociProjectPlus)

        } else if (ociQuantity === 3) {
            const ociProjectPlus = [{
                ociNumber: req.body.ociNumber1,
                ociDescription: req.body.ociDescription1,
                ociStatus: flagOciStatus1
            },{
                ociNumber: req.body.ociNumber2,
                ociDescription: req.body.ociDescription2,
                ociStatus: flagOciStatus2
            },{
                ociNumber: req.body.ociNumber3,
                ociDescription: req.body.ociDescription3,
                ociStatus: flagOciStatus3
            }]
            emptyArray = emptyArray.concat(ociProjectPlus)

        } else if (ociQuantity === 2) {
            const ociProjectPlus = [{
                ociNumber: req.body.ociNumber1,
                ociDescription: req.body.ociDescription1,
                ociStatus: flagOciStatus1
            },{
                ociNumber: req.body.ociNumber2,
                ociDescription: req.body.ociDescription2,
                ociStatus: flagOciStatus2
            }]
            emptyArray = emptyArray.concat(ociProjectPlus)

        } else {
            const ociProjectPlus = []
            emptyArray = ociProjectPlus
        }

        ociProject = ociProject.concat(emptyArray)
        
        function dividirArrayEnSubarrays(ociProject, longitudSubarray) {
            const subarrays = []
            for (let i = 0; i < ociProject.length; i += longitudSubarray) {
              subarrays.push(ociProject.slice(i, i + longitudSubarray))
            }
            return subarrays
          }

          const longitudDeseada = 1 // longitud que desees
          const subarrays = dividirArrayEnSubarrays(ociProject, longitudDeseada)
          
          const arraysSeparados = subarrays.reduce((acc, currentArray) => {
            return acc.concat(currentArray)
          }, [])

        const project = {
            projectName: req.body.projectName,
            statusProject: flagStatusProject,
            levelProject: req.body.levelProject,
            codeProject: req.body.codeProject,
            projectDescription: req.body.projectDescription,
            prioProject: req.body.prioProject,
            imageProject: req.body.imageProject,
            oci: arraysSeparados
        }

        const newProject = {
            creator: user,
            client: clienteSeleccionado,
            project: project,
            timestamp: formatDate(new Date()),
            modificator: [],
            modifiedOn: ''
        }

        const newProyecto = await this.projects.addProjectToClient(newProject)
        const proyectos = await this.projects.getProjectsByClientId(clientId)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

       const cliente = await this.clients.updateClientProjectQty(clientId, clienteSeleccionado)
       
       try {
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
                msg: 'controllerError - createNewProyects',
                error: error
            })
        }
    }

    addOtToOciProject = async (req, res) => {
        const idOci = req.params.id
        console.log('idOci: ',idOci)

        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const userId = userInfo.id
        const user = await this.users.getUserById(userId)

        const otAddedToOci = {
            otNumber: req.body.otNumber,
            opNumber: req.body.opNumber,
            otDescription: req.body.otDescription,
            otStatus: req.body.otStatus,
            timestamp: now,
            creator: user
        }

        const proyecto = await this.projects.addOtToOciProject(idOci, otAddedToOci)
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'OCI no encontrada' })
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
                msg: 'controllerError - Adding OT to OCI',
                error: error
            })
        }
    }



    updateProject = async (req, res) => {
        const id = req.params.id
        req.body.category ? req.body.category : req.body.categoryHidden

        const producto = req.body

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)


        try {
            const productUpdated = await this.products.updateProduct(id, producto)
            res.render('addNewProducts', { productUpdated, username, userInfo, expires })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    deleteProductById = async (req, res) => {
        const { id } = req.params

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const usuarios = await this.users.getUserByUsername(username)
        const userId = usuarios._id // User Id
        let cart = await this.carts.getCartByUserId(userId)

        try {
            const productDeleted = await this.products.deleteProductById(req.params.id)
            res.render('addNewProducts', { productDeleted, username, userInfo, cart, expires })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    deleteAllProducts = async (req, res) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const usuarios = await this.users.getUserByUsername(username)
        const userId = usuarios._id // User Id
        let cart = await this.carts.getCartByUserId(userId)

        try {
            const productsDeleted = await this.products.deleteAllProducts()
            res.render('addNewProducts', { productsDeleted, username, userInfo, cart, expires })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }
}

module.exports = { ProjectsController }