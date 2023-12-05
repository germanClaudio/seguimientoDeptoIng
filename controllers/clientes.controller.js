const ClientsService = require("../services/clients.service.js")
const UserService = require("../services/users.service.js")
const ProjectsService = require("../services/projects.service.js")

let now = require('../utils/formatDate.js')
const fs = require('fs');

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

        const newCliente = {
            creator: user,
            name: req.body.name,
            status: Boolean(true),
            code: req.body.code,
            project: 0,
            logo: req.body.inputFileUrl,
            timestamp: now,
            modificator: modificator,
            modifiedOn: '',
            visible: true
        }

        const cliente = await this.clients.addClient(newCliente)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
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
    }

    updateClient = async (req, res) => {
        const id = req.params.id
        const proyectosQty = await this.projects.getProjectsByClientId(id)
        const creador = await this.clients.getClientById(id)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
                
        const modificator = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const updatedCliente = {
            creator: creador.creator,
            name: req.body.name,
            status: req.body.status === 'true' ? Boolean(true): Boolean(false),
            code: req.body.code,
            project: proyectosQty.length,
            logo: req.body.logo,
            timestamp: creador.timestamp,
            modificator: modificator,
            modifiedOn: now
        }

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const clientUpdated = this.clients.updateClient(id, updatedCliente, modificator)
            res.render('addNewClients', {
                clientUpdated,
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

    updateClientProjectsQty = async (req, res) => {
        const id = req.params.id
        const proyectos = await this.projects.getProjectsByClientId(id)
        
        const clientToUpdateProjectQty = await this.clients.getClientById(id)
        const creador = await this.clients.getClientById(id)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const modifier = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const updatedClienteProjectsQty = {
            creator: creador.creator,
            name: clientToUpdateProjectQty.name,
            status: Boolean(true),
            code: clientToUpdateProjectQty.code,
            project: proyectos.length,
            logo: clientToUpdateProjectQty.logo,
            timestamp: creador.timestamp,
            modificator: modifier,
            modifiedOn: now
        }

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const cliente = await this.clients.updateClient(id, updatedClienteProjectsQty)
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

    deleteClientById = async (req, res) => {
        const clientId = req.params.id

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
            const clientDeleted = await this.clients.deleteClientById(clientId)
            res.render('addNewClients', {
                clientDeleted,
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
        // const proyectos = await this.projects.getProjectsByClientId(id)
        
        const clientToUpdateProjectQty = await this.clients.getClientById(id)
        // const creador = await this.clients.getClientById(id)

        // let username = res.locals.username
        let userInfo = res.locals.userInfo

        const modifier = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        // const updatedClienteProjectsQty = {
        //     creator: creador.creator,
        //     name: clientToUpdateProjectQty.name,
        //     status: Boolean(true),
        //     code: clientToUpdateProjectQty.code,
        //     project: proyectos.length,
        //     logo: clientToUpdateProjectQty.logo,
        //     timestamp: creador.timestamp,
        //     modificator: modifier,
        //     modifiedOn: now
        // }

        // const cookie = req.session.cookie
        // const time = cookie.expires
        //const expires = new Date(time)

        try {
            // const cliente = 
            await this.clients.reduceClientProjectsQty(
                id, 
                clientToUpdateProjectQty,
                modifier
            )
            // res.render('clientProjectsDetails', {
            //     cliente,
            //     username,
            //     userInfo,
            //     expires,
            //     proyectos
            // })

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