const ClientsService = require("../services/clients.service.js")
const UserService = require("../services/users.service.js")
const ProjectsService = require("../services/projects.service.js")

const multer = require('multer')
// const path = require('path')

let now = require('../utils/formatDate.js')
let imageNotFound = "../../../src/images/upload/LogoClientImages/noImageFound.png"

class ClientsController {
    constructor() {
        this.clients = new ClientsService()
        this.users = new UserService()
        this.projects = new ProjectsService()
    }

    getAllClients = async (req, res) => {
        const clientes = await this.clients.getAllClients()

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if (clientes.error) return res.status(400).json({ msg: 'No hay clientes cargados' })
            res.render('addNewClients', {
                clientes,
                username,
                userInfo,
                expires
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getAllClients',
                error: error
            })
        }
    }

    getClientProjectsById = async (req, res) => {
        const { id } = req.params
        const proyectos = await this.projects.getProjectsByClientId(id)

        const cliente = await this.clients.getClientById(id)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if (!proyectos) return res.status(404).json({ msg: 'getProjectsByClientId no encontrado' })

            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                proyectos,
                cliente
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getClientById',
                error: error
            })
        }
    }

    getClientById = async (req, res) => {
        const { id } = req.params
        const cliente = await this.clients.getClientById(id)

        const proyectos = await this.projects.getProjectsByClientId(id)
        // console.log('getClientById__proyectos....... ',proyectos)
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if (!cliente) return res.status(404).json({ msg: 'Cliente no encontrado' })

            res.render('clientProjectsDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getClientById',
                error: error
            })
        }
    }

    selectClientById = async (req, res) => {
        const { id } = req.params
        const cliente = await this.clients.getClientById(id)

        const proyectos = await this.projects.getProjectsByClientId(id)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if (!cliente) return res.status(404).json({ msg: 'Cliente no encontrado' })
            res.render('clientDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getClientById',
                error: error
            })
        }
    }

    createNewClient = async (req, res) => {
        //------ Storage Client Logo Image in folder projectImages/ --------
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {  
                cb(null, './public/src/images/upload/LogoClientImages/') // Path de acceso a carpeta donde se guardan las Imagenes
            },                                      
            filename: function(req, file, cb) {
              cb(null, file.originalname ) //+ path.extname(file.originalname)) //originalname
            }
        })
                
        const upload = multer({
            storage: storage
        }).single('imageLogoClient')

        upload(req, res, async (err) => {
            let username = res.locals.username
            const userInfo = res.locals.userInfo
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

            const newCliente = {
                creator: user,
                name: req.body.name,
                status: req.body.statusClient === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                code: req.body.code,
                project: 0,
                logo: req.body.imageTextLogoClient || imageNotFound,
                timestamp: now,
                modificator: modificator,
                modifiedOn: '',
                visible: true
            }
            
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try {
                const cliente = await this.clients.addClient(newCliente)

                if (!cliente) return res.status(404).json({ Msg: 'Cliente no guardado' })
                res.render('addNewClients', {
                    cliente,
                    username,
                    userInfo,
                    expires
                })
            } catch (error) {
                res.status(500).json({
                    status: false,
                    msg: 'controllerError - createNewClient',
                    error: error
                })
            }
        })
    }

    updateClient = async (req, res) => {
        const id = req.params.id
        
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
       
        //------ Storage Logo Image in folder projectImages/ --------
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {  
                cb(null, './public/src/images/upload/LogoClientImages/') // Path de acceso a carpeta donde se guardan las Imagenes
            },                                      
            filename: function(req, file, cb) {
              cb(null, file.originalname ) //+ path.extname(file.originalname)) //originalname
            }
        })
                
        const upload = multer({
            storage: storage
        }).single('imageLogoUpdate')

        upload(req, res, async (err) => {
                        
            const updatedCliente = {
                name: req.body.name,
                status: req.body.statusClient === 'on' ? true : false,
                code: req.body.code,
                logo: req.body.imageTextLogoUpdate,
                modificator: userModificator,
                modifiedOn: now
            }
            
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try {
                const cliente = await this.clients.getClientById(id)
                
                if (cliente) {
                    const clientUpdated = this.clients.updateClient(
                        id, 
                        updatedCliente, 
                        userModificator
                    )
                    res.render('addNewClients', {
                        clientUpdated,
                        username,
                        userInfo,
                        expires
                    })
                                    
                } else {
                    return res.status(404).json({ Msg: `Cliente no existe con este Id: ${id}`})
                }  
                
    
            } catch (error) {
                res.status(500).json({
                    status: false,
                    error: error
                })
            }
        })       
    }

    updateClientProjectsQty = async (req, res) => {
        const id = req.params.id
        const proyectos = await this.projects.getProjectsByClientId(id)
        
        const clientToUpdateProjectQty = await this.clients.getClientById(id)
        
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const modifier = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const cliente = await this.clients.updateClientProjectsQty(id, clientToUpdateProjectQty, modifier)
            if (!cliente) return res.status(404).json({ Msg: 'Cantidad de proyectos de Cliente no actualizada' })
            res.render('clientProjectsDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    // getClientBySearching = async (req, res) => {
    //     let username = res.locals.username
    //     let userInfo = res.locals.userInfo
        
    //     const cookie = req.session.cookie
    //     const time = cookie.expires
    //     const expires = new Date(time)
        
    //     try {
    //         const { query } = req.query
    //         const clientes = await this.clients.getAllClients()
            
    //         // Validar que query tenga al menos 3 caracteres
    //         if (query.length < 3) {
    //             return res.status(400).json({ error: 'La consulta debe tener al menos 3 caracteres.' });
    //         }

    //         const resultados = await this.clients.getClientBySearching(query)
    //         console.log('resultados:', resultados)
    //         if (resultados.error) return res.status(400).json({ msg: 'No hay clientes cargados' })
    //         res.render('indexSearch', {
    //             // resultados,
    //             clientes,
    //             username,
    //             userInfo,
    //             expires
    //         })

    //     } catch (error) {
    //         console.error('Error al buscar clientes:', error)
    //         res.status(500).json({ error: 'Error interno del servidor.' })
    //     }
    // }

    deleteClientById = async (req, res) => {
        const clientId = req.params.id

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const modificator = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const cliente = await this.clients.deleteClientById(clientId, modificator)
            
            if (!cliente) return res.status(404).json({ Msg: 'Cliente no eliminado' })
            res.render('addNewClients', {
                cliente,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    reduceClientProjectQty = async (req, res) => {
        const id = req.params.id
        const proyectos = await this.projects.getProjectsByClientId(id)
        
        const clientToUpdateProjectQty = await this.clients.getClientById(id)
        
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const modifier = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const cliente = await this.clients.reduceClientProjectQty(id, clientToUpdateProjectQty, modifier)
            if (!cliente) return res.status(404).json({ Msg: 'Cantidad de proyectos de Cliente no actualizada' })
                res.render('clientProjectsDetails', {
                    cliente,
                    username,
                    userInfo,
                    expires,
                    proyectos
                })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    deleteAllClients = async (req, res) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const clientsDeleted = await this.clients.deleteAllClients()
            res.render('addNewClients', {
                clientsDeleted,
                username,
                userInfo,
                expires
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

}

module.exports = { ClientsController }