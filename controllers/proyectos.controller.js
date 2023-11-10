const ProyectosService = require("../services/projects.service.js")
const ClientesService = require("../services/clients.service.js")
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

        const cliente = await this.clients.getClientByProjectId(id)
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

        const flagStatusProject = req.body.statusProject == 'on' ? true : false

        const ociQuantity = parseInt(req.body.ociQuantity)

        const flagOciStatus = req.body.ociStatus == 'on' ? true : false
        const flagOciStatus1 = req.body.ociStatus1 == 'on' ? true : false
        const flagOciStatus2 = req.body.ociStatus2 == 'on' ? true : false
        const flagOciStatus3 = req.body.ociStatus3 == 'on' ? true : false
        const flagOciStatus4 = req.body.ociStatus4 == 'on' ? true : false


        switch (ociQuantity) {
            case 4: {
                var ociProject = [
                    {
                        ociNumber: parseInt(req.body.ociNumber),
                        ociDescription: req.body.ociDescription,
                        ociStatus: flagOciStatus
                    }, {
                        ociNumber: parseInt(req.body.ociNumber1),
                        ociDescription: req.body.ociDescription1,
                        ociStatus: flagOciStatus1
                    }, {
                        ociNumber: parseInt(req.body.ociNumber2),
                        ociDescription: req.body.ociDescription2,
                        ociStatus: flagOciStatus2
                    }, {
                        ociNumber: parseInt(req.body.ociNumber3),
                        ociDescription: req.body.ociDescription3,
                        ociStatus: flagOciStatus3
                    }, {
                        ociNumber: parseInt(req.body.ociNumber4),
                        ociDescription: req.body.ociDescription4,
                        ociStatus: flagOciStatus4
                    }]
                break;
            }
            case 3: {
                var ociProject = [
                    {
                        ociNumber: parseInt(req.body.ociNumber),
                        ociDescription: req.body.ociDescription,
                        ociStatus: flagOciStatus
                    }, {
                        ociNumber: req.body.ociNumber1,
                        ociDescription: req.body.ociDescription1,
                        ociStatus: flagOciStatus1
                    }, {
                        ociNumber: req.body.ociNumber2,
                        ociDescription: req.body.ociDescription2,
                        ociStatus: flagOciStatus2
                    }, {
                        ociNumber: req.body.ociNumber3,
                        ociDescription: req.body.ociDescription3,
                        ociStatus: flagOciStatus3
                    }]
                break;
            }
            case 2: {
                var ociProject = [
                    {
                        ociNumber: parseInt(req.body.ociNumber),
                        ociDescription: req.body.ociDescription,
                        ociStatus: flagOciStatus
                    }, {
                        ociNumber: req.body.ociNumber1,
                        ociDescription: req.body.ociDescription1,
                        ociStatus: flagOciStatus1
                    }, {
                        ociNumber: req.body.ociNumber2,
                        ociDescription: req.body.ociDescription2,
                        ociStatus: flagOciStatus2
                    }]
                emptyArray = emptyArray.concat(ociProjectPlus)
                break;
            }
            case 1: {
                var ociProject = [
                    {
                        ociNumber: parseInt(req.body.ociNumber),
                        ociDescription: req.body.ociDescription,
                        ociStatus: flagOciStatus
                    }, {
                        ociNumber: req.body.ociNumber1,
                        ociDescription: req.body.ociDescription1,
                        ociStatus: flagOciStatus1
                    }]
                break;
            }
            default: {
                var ociProject = [
                    {
                        ociNumber: parseInt(req.body.ociNumber),
                        ociDescription: req.body.ociDescription,
                        ociStatus: flagOciStatus
                    }]
                break;
            }
        }

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

        await this.projects.addProjectToClient(newProject) //const newProyecto = 
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
        const { id } = req.params
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)

        const numberOci = req.body.ociNumber
        const ociNumberK = req.body.ociNumberK
        const projectId = id || req.body.projectIdHidden
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

        const now = formatDate(new Date())

        switch (otQuantity) {
            case 10: {
                var otAddedToOci = [{
                    otNumber: parseInt(req.body.otNumber1),
                    opNumber: req.body.opNumber1,
                    opDescription: req.body.opDescription1,
                    otStatus: req.body.otStatus1 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno1,
                    otSimulation: req.body.internoSimulacion1,
                    otSupplier: req.body.externoDiseno1,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber2),
                    opNumber: req.body.opNumber2,
                    opDescription: req.body.opDescription2,
                    otStatus: req.body.otStatus2 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno2,
                    otSimulation: req.body.internoSimulacion2,
                    otSupplier: req.body.externoDiseno2,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber3),
                    opNumber: req.body.opNumber3,
                    opDescription: req.body.opDescription3,
                    otStatus: req.body.otStatus3 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno3,
                    otSimulation: req.body.internoSimulacion3,
                    otSupplier: req.body.externoDiseno3,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber4),
                    opNumber: req.body.opNumber4,
                    opDescription: req.body.opDescription4,
                    otStatus: req.body.otStatus4 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno4,
                    otSimulation: req.body.internoSimulacion4,
                    otSupplier: req.body.externoDiseno4,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber5),
                    opNumber: req.body.opNumber5,
                    opDescription: req.body.opDescription5,
                    otStatus: req.body.otStatus5 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno5,
                    otSimulation: req.body.internoSimulacion5,
                    otSupplier: req.body.externoDiseno5,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber6),
                    opNumber: req.body.opNumber6,
                    opDescription: req.body.opDescription6,
                    otStatus: req.body.otStatus6 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno6,
                    otSimulation: req.body.internoSimulacion6,
                    otSupplier: req.body.externoDiseno6,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber7),
                    opNumber: req.body.opNumber7,
                    opDescription: req.body.opDescription7,
                    otStatus: req.body.otStatus7 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno7,
                    otSimulation: req.body.internoSimulacion7,
                    otSupplier: req.body.externoDiseno7,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber8),
                    opNumber: req.body.opNumber8,
                    opDescription: req.body.opDescription8,
                    otStatus: req.body.otStatus8 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno8,
                    otSimulation: req.body.internoSimulacion8,
                    otSupplier: req.body.externoDiseno8,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber9),
                    opNumber: req.body.opNumber9,
                    opDescription: req.body.opDescription9,
                    otStatus: req.body.otStatus9 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno9,
                    otSimulation: req.body.internoSimulacion9,
                    otSupplier: req.body.externoDiseno9,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber),
                    opNumber: req.body.opNumber,
                    opDescription: req.body.opDescription,
                    otStatus: req.body.otStatus == 'on' ? true : false,
                    otDesign: req.body.internoDiseno,
                    otSimulation: req.body.internoSimulacion,
                    otSupplier: req.body.externoDiseno,
                    timestamp: now,
                    creator: user

                }]
                break;
            }
            case 9: {
                var otAddedToOci = [{
                    otNumber: parseInt(req.body.otNumber1),
                    opNumber: req.body.opNumber1,
                    opDescription: req.body.otDescription1,
                    otStatus: req.body.otStatus1 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno1,
                    otSimulation: req.body.internoSimulacion1,
                    otSupplier: req.body.externoDiseno1,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber2),
                    opNumber: req.body.opNumber2,
                    opDescription: req.body.opDescription2,
                    otStatus: req.body.otStatus2 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno2,
                    otSimulation: req.body.internoSimulacion2,
                    otSupplier: req.body.externoDiseno2,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber3),
                    opNumber: req.body.opNumber3,
                    opDescription: req.body.opDescription3,
                    otStatus: req.body.otStatus3 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno3,
                    otSimulation: req.body.internoSimulacion3,
                    otSupplier: req.body.externoDiseno3,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber4),
                    opNumber: req.body.opNumber4,
                    opDescription: req.body.opDescription4,
                    otStatus: req.body.otStatus4 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno4,
                    otSimulation: req.body.internoSimulacion4,
                    otSupplier: req.body.externoDiseno4,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber5),
                    opNumber: req.body.opNumber5,
                    opDescription: req.body.opDescription5,
                    otStatus: req.body.otStatus5 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno5,
                    otSimulation: req.body.internoSimulacion5,
                    otSupplier: req.body.externoDiseno5,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber6),
                    opNumber: req.body.opNumber6,
                    opDescription: req.body.opDescription6,
                    otStatus: req.body.otStatus6 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno6,
                    otSimulation: req.body.internoSimulacion6,
                    otSupplier: req.body.externoDiseno6,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber7),
                    opNumber: req.body.opNumber7,
                    opDescription: req.body.opDescription7,
                    otStatus: req.body.otStatus7 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno7,
                    otSimulation: req.body.internoSimulacion7,
                    otSupplier: req.body.externoDiseno7,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber8),
                    opNumber: req.body.opNumber8,
                    opDescription: req.body.opDescription8,
                    otStatus: req.body.otStatus8 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno8,
                    otSimulation: req.body.internoSimulacion8,
                    otSupplier: req.body.externoDiseno8,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber),
                    opNumber: req.body.opNumber,
                    opDescription: req.body.opDescription,
                    otStatus: req.body.otStatus == 'on' ? true : false,
                    otDesign: req.body.internoDiseno,
                    otSimulation: req.body.internoSimulacion,
                    otSupplier: req.body.externoDiseno,
                    timestamp: now,
                    creator: user

                }]
                break;
            }
            case 8: {
                var otAddedToOci = [{
                    otNumber: parseInt(req.body.otNumber1),
                    opNumber: req.body.opNumber1,
                    opDescription: req.body.opDescription1,
                    otStatus: req.body.otStatus1 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno1,
                    otSimulation: req.body.internoSimulacion1,
                    otSupplier: req.body.externoDiseno1,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber2),
                    opNumber: req.body.opNumber2,
                    opDescription: req.body.opDescription2,
                    otStatus: req.body.otStatus2 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno2,
                    otSimulation: req.body.internoSimulacion2,
                    otSupplier: req.body.externoDiseno2,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber3),
                    opNumber: req.body.opNumber3,
                    opDescription: req.body.opDescription3,
                    otStatus: req.body.otStatus3 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno3,
                    otSimulation: req.body.internoSimulacion3,
                    otSupplier: req.body.externoDiseno3,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber4),
                    opNumber: req.body.opNumber4,
                    opDescription: req.body.opDescription4,
                    otStatus: req.body.otStatus4 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno4,
                    otSimulation: req.body.internoSimulacion4,
                    otSupplier: req.body.externoDiseno4,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber5),
                    opNumber: req.body.opNumber5,
                    opDescription: req.body.opDescription5,
                    otStatus: req.body.otStatus5 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno5,
                    otSimulation: req.body.internoSimulacion5,
                    otSupplier: req.body.externoDiseno5,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber6),
                    opNumber: req.body.opNumber6,
                    opDescription: req.body.opDescription6,
                    otStatus: req.body.otStatus6 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno6,
                    otSimulation: req.body.internoSimulacion6,
                    otSupplier: req.body.externoDiseno6,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber7),
                    opNumber: req.body.opNumber7,
                    opDescription: req.body.opDescription7,
                    otStatus: req.body.otStatus7 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno7,
                    otSimulation: req.body.internoSimulacion7,
                    otSupplier: req.body.externoDiseno7,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber),
                    opNumber: req.body.opNumber,
                    opDescription: req.body.opDescription,
                    otStatus: req.body.otStatus == 'on' ? true : false,
                    otDesign: req.body.internoDiseno,
                    otSimulation: req.body.internoSimulacion,
                    otSupplier: req.body.externoDiseno,
                    timestamp: now,
                    creator: user

                }]
                break;
            }
            case 7: {
                var otAddedToOci = [{
                    otNumber: parseInt(req.body.otNumber1),
                    opNumber: req.body.opNumber1,
                    opDescription: req.body.opDescription1,
                    otStatus: req.body.otStatus1 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno1,
                    otSimulation: req.body.internoSimulacion1,
                    otSupplier: req.body.externoDiseno1,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber2),
                    opNumber: req.body.opNumber2,
                    opDescription: req.body.opDescription2,
                    otStatus: req.body.otStatus2 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno2,
                    otSimulation: req.body.internoSimulacion2,
                    otSupplier: req.body.externoDiseno2,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber3),
                    opNumber: req.body.opNumber3,
                    opDescription: req.body.opDescription3,
                    otStatus: req.body.otStatus3 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno3,
                    otSimulation: req.body.internoSimulacion3,
                    otSupplier: req.body.externoDiseno3,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber4),
                    opNumber: req.body.opNumber4,
                    opDescription: req.body.opDescription4,
                    otStatus: req.body.otStatus4 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno4,
                    otSimulation: req.body.internoSimulacion4,
                    otSupplier: req.body.externoDiseno4,
                    timestamp: now,
                    creator: user
                }, {
                    otNumber: parseInt(req.body.otNumber5),
                    opNumber: req.body.opNumber5,
                    opDescription: req.body.opDescription5,
                    otStatus: req.body.otStatus5 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno5,
                    otSimulation: req.body.internoSimulacion5,
                    otSupplier: req.body.externoDiseno5,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber6),
                    opNumber: req.body.opNumber6,
                    opDescription: req.body.opDescription6,
                    otStatus: req.body.otStatus6 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno6,
                    otSimulation: req.body.internoSimulacion6,
                    otSupplier: req.body.externoDiseno6,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber),
                    opNumber: req.body.opNumber,
                    opDescription: req.body.opDescription,
                    otStatus: req.body.otStatus == 'on' ? true : false,
                    otDesign: req.body.internoDiseno,
                    otSimulation: req.body.internoSimulacion,
                    otSupplier: req.body.externoDiseno,
                    timestamp: now,
                    creator: user

                }]
                break;
            }
            case 6: {
                var otAddedToOci = [{
                    otNumber: parseInt(req.body.otNumber1),
                    opNumber: req.body.opNumber1,
                    opDescription: req.body.opDescription1,
                    otStatus: req.body.otStatus1 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno1,
                    otSimulation: req.body.internoSimulacion1,
                    otSupplier: req.body.externoDiseno1,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber2),
                    opNumber: req.body.opNumber2,
                    opDescription: req.body.opDescription2,
                    otStatus: req.body.otStatus2 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno2,
                    otSimulation: req.body.internoSimulacion2,
                    otSupplier: req.body.externoDiseno2,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber3),
                    opNumber: req.body.opNumber3,
                    opDescription: req.body.opDescription3,
                    otStatus: req.body.otStatus3 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno3,
                    otSimulation: req.body.internoSimulacion3,
                    otSupplier: req.body.externoDiseno3,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber4),
                    opNumber: req.body.opNumber4,
                    opDescription: req.body.opDescription4,
                    otStatus: req.body.otStatus4 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno4,
                    otSimulation: req.body.internoSimulacion4,
                    otSupplier: req.body.externoDiseno4,
                    timestamp: now,
                    creator: user
                }, {
                    otNumber: parseInt(req.body.otNumber5),
                    opNumber: req.body.opNumber5,
                    opDescription: req.body.opDescription5,
                    otStatus: req.body.otStatus5 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno5,
                    otSimulation: req.body.internoSimulacion5,
                    otSupplier: req.body.externoDiseno5,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber),
                    opNumber: req.body.opNumber,
                    opDescription: req.body.opDescription,
                    otStatus: req.body.otStatus == 'on' ? true : false,
                    otDesign: req.body.internoDiseno,
                    otSimulation: req.body.internoSimulacion,
                    otSupplier: req.body.externoDiseno,
                    timestamp: now,
                    creator: user

                }]
                break;
            }
            case 5: {
                var otAddedToOci = [{
                    otNumber: parseInt(req.body.otNumber1),
                    opNumber: req.body.opNumber1,
                    opDescription: req.body.opDescription1,
                    otStatus: req.body.otStatus1 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno1,
                    otSimulation: req.body.internoSimulacion1,
                    otSupplier: req.body.externoDiseno1,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber2),
                    opNumber: req.body.opNumber2,
                    opDescription: req.body.opDescription2,
                    otStatus: req.body.otStatus2 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno2,
                    otSimulation: req.body.internoSimulacion2,
                    otSupplier: req.body.externoDiseno2,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber3),
                    opNumber: req.body.opNumber3,
                    opDescription: req.body.opDescription3,
                    otStatus: req.body.otStatus3 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno3,
                    otSimulation: req.body.internoSimulacion3,
                    otSupplier: req.body.externoDiseno3,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber4),
                    opNumber: req.body.opNumber4,
                    opDescription: req.body.opDescription4,
                    otStatus: req.body.otStatus4 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno4,
                    otSimulation: req.body.internoSimulacion4,
                    otSupplier: req.body.externoDiseno4,
                    timestamp: now,
                    creator: user
                }, {
                    otNumber: parseInt(req.body.otNumber),
                    opNumber: req.body.opNumber,
                    opDescription: req.body.opDescription,
                    otStatus: req.body.otStatus == 'on' ? true : false,
                    otDesign: req.body.internoDiseno,
                    otSimulation: req.body.internoSimulacion,
                    otSupplier: req.body.externoDiseno,
                    timestamp: now,
                    creator: user

                }]
                break;
            }
            case 4: {
                var otAddedToOci = [{
                    otNumber: parseInt(req.body.otNumber1),
                    opNumber: req.body.opNumber1,
                    opDescription: req.body.opDescription1,
                    otStatus: req.body.otStatus1 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno1,
                    otSimulation: req.body.internoSimulacion1,
                    otSupplier: req.body.externoDiseno1,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber2),
                    opNumber: req.body.opNumber2,
                    opDescription: req.body.opDescription2,
                    otStatus: req.body.otStatus2 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno2,
                    otSimulation: req.body.internoSimulacion2,
                    otSupplier: req.body.externoDiseno2,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber3),
                    opNumber: req.body.opNumber3,
                    opDescription: req.body.opDescription3,
                    otStatus: req.body.otStatus3 == 'on' ? true : false,
                    otDesign: req.body.internoDiseno3,
                    otSimulation: req.body.internoSimulacion3,
                    otSupplier: req.body.externoDiseno3,
                    timestamp: now,
                    creator: user

                }, {
                    otNumber: parseInt(req.body.otNumber),
                    opNumber: req.body.opNumber,
                    opDescription: req.body.opDescription,
                    otStatus: req.body.otStatus == 'on' ? true : false,
                    otDesign: req.body.internoDiseno,
                    otSimulation: req.body.internoSimulacion,
                    otSupplier: req.body.externoDiseno,
                    timestamp: now,
                    creator: user
                }]
                break;
            }
            case 3: {
                var otAddedToOci = [
                    {
                        otNumber: parseInt(req.body.otNumber),
                        opNumber: req.body.opNumber,
                        opDescription: req.body.opDescription,
                        otStatus: req.body.otStatus == 'on' ? true : false,
                        otDesign: req.body.internoDiseno,
                        otSimulation: req.body.internoSimulacion,
                        otSupplier: req.body.externoDiseno,
                        timestamp: now,
                        creator: user

                    }, {
                        otNumber: parseInt(req.body.otNumber1),
                        opNumber: req.body.opNumber1,
                        opDescription: req.body.opDescription1,
                        otStatus: req.body.otStatus1 == 'on' ? true : false,
                        otDesign: req.body.internoDiseno1,
                        otSimulation: req.body.internoSimulacion1,
                        otSupplier: req.body.externoDiseno1,
                        timestamp: now,
                        creator: user

                    }, {
                        otNumber: parseInt(req.body.otNumber2),
                        opNumber: req.body.opNumber2,
                        opDescription: req.body.opDescription2,
                        otStatus: req.body.otStatus2 == 'on' ? true : false,
                        otDesign: req.body.internoDiseno2,
                        otSimulation: req.body.internoSimulacion2,
                        otSupplier: req.body.externoDiseno2,
                        timestamp: now,
                        creator: user

                    }]
                break;
            }
            case 2: {
                var otAddedToOci = [
                    {
                        otNumber: parseInt(req.body.otNumber),
                        opNumber: req.body.opNumber,
                        opDescription: req.body.opDescription,
                        otStatus: req.body.otStatus == 'on' ? true : false,
                        otDesign: req.body.internoDiseno,
                        otSimulation: req.body.internoSimulacion,
                        otSupplier: req.body.externoDiseno,
                        timestamp: now,
                        creator: user

                    }, {
                        otNumber: parseInt(req.body.otNumber1),
                        opNumber: req.body.opNumber1,
                        opDescription: req.body.opDescription1,
                        otStatus: req.body.otStatus1 == 'on' ? true : false,
                        otDesign: req.body.internoDiseno1,
                        otSimulation: req.body.internoSimulacion1,
                        otSupplier: req.body.externoDiseno1,
                        timestamp: now,
                        creator: user

                    }]
                break;
            }
            default: {
                var otAddedToOci = [{
                    otNumber: parseInt(req.body.otNumber),
                    opNumber: req.body.opNumber,
                    opDescription: req.body.opDescription,
                    otStatus: req.body.otStatus == 'on' ? true : false,
                    otDesign: req.body.internoDiseno,
                    otSimulation: req.body.internoSimulacion,
                    otSupplier: req.body.externoDiseno,
                    timestamp: now,
                    creator: user

                }]
                break;
            }
        }

        const proyecto = await this.projects.addOtToOciProject(
            projectId,
            numberOci,
            ociNumberK,
            otAddedToOci
        )

        try {
            if (!proyecto) return res.status(404).json({ msg: 'OCI no encontrada' })
            res.render('projectsList', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente
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
        //console.log('reqBody: ', req.body)
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        //console.log('Cliente: ', cliente)
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

        const now = formatDate(new Date())

        //------------------------------------
        let arrayOtNumber=[], arrayOtStatus=[], arrayProcesoR14=[], arrayAprobadoR14=[]
        for (const key in req.body) {
            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            } else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            } else if (key.startsWith('procesoR14')) {
                arrayProcesoR14.push(req.body[key])
            } else if (key.startsWith('aprobadoR14')) {
                arrayAprobadoR14.push(req.body[key])
            } 
        }
        // console.log('arrayOtNumber: ', arrayOtNumber,
        //             'arrayOtStatus: ', arrayOtStatus,
        //             'arrayProcesoR14: ', arrayProcesoR14,
        //             'arrayAprobadoR14: ', arrayAprobadoR14
        // )
        //-----------------------------------

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                procesoR14: arrayProcesoR14[i] || "noAplica",
                aprobadoR14: arrayAprobadoR14[i] || "noAplica",
                timestamp: now,
                creator: user,
                modificator: [],
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }

        // if it doesn't work properly, use the switch method ------------
        // switch (otQuantity) {
        //     case 5: {
        //         var infoAddedToOt = [{
        //             otNumber: parseInt(req.body.otNumberHidden0),
        //             procesoR14: req.body.procesoR140 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR140 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }, {
        //             otNumber: parseInt(req.body.otNumberHidden1),
        //             procesoR14: req.body.procesoR141 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR141 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }, {
        //             otNumber: parseInt(req.body.otNumberHidden2),
        //             procesoR14: req.body.procesoR142 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR142 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }, {
        //             otNumber: parseInt(req.body.otNumberHidden3),
        //             procesoR14: req.body.procesoR143 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR143 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }, {
        //             otNumber: parseInt(req.body.otNumberHidden4),
        //             procesoR14: req.body.procesoR144 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR144 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }]
        //         break;
        //     }
        //     case 4: {
        //         var infoAddedToOt = [{
        //             otNumber: parseInt(req.body.otNumberHidden0),
        //             procesoR14: req.body.procesoR140 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR140 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }, {
        //             otNumber: parseInt(req.body.otNumberHidden1),
        //             procesoR14: req.body.procesoR141 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR141 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }, {
        //             otNumber: parseInt(req.body.otNumberHidden2),
        //             procesoR14: req.body.procesoR142 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR142 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }, {
        //             otNumber: parseInt(req.body.otNumberHidden3),
        //             procesoR14: req.body.procesoR143 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR143 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }]
        //         break;
        //     }
        //     case 3: {
        //         var infoAddedToOt = [{
        //             otNumber: parseInt(req.body.otNumberHidden0),
        //             procesoR14: req.body.procesoR140 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR140 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }, {
        //             otNumber: parseInt(req.body.otNumberHidden1),
        //             procesoR14: req.body.procesoR141 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR141 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }, {
        //             otNumber: parseInt(req.body.otNumberHidden2),
        //             procesoR14: req.body.procesoR142 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR142 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }]
        //         break;
        //     }
        //     case 2: {
        //         var infoAddedToOt = [{
        //             otNumber: parseInt(req.body.otNumberHidden0),
        //             procesoR14: req.body.procesoR140 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR140 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }, {
        //             otNumber: parseInt(req.body.otNumberHidden1),
        //             procesoR14: req.body.procesoR141 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR141 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",

        //         }]
        //         break;
        //     }
        //     default: {
        //         var infoAddedToOt = [{
        //             otNumber: parseInt(req.body.otNumberHidden0),
        //             procesoR14: req.body.procesoR140 || "noAplica",
        //             aprobadoR14: req.body.aprobadoR140 || "noAplica",
        //             timestamp: now,
        //             creator: user,
        //             modificator: [],
        //             modifiedOn: "",
        //         }]
        //         break;
        //     }
        // }
        console.log('1- Controller_infoAddedToOt....', infoAddedToOt)
        
        const proyecto = await this.projects.addInfoR14ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )

        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectsList', {
                username,
                userInfo,
                expires,
                cliente,
                proyecto
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'ControllerError - Adding OT to OCI Proyect',
                error: error
            })
        }
    }

    // updateProject = async (req, res) => {
    //     const id = req.params.id
    //     req.body.category ? req.body.category : req.body.categoryHidden

    //     const producto = req.body

    //     let username = res.locals.username
    //     let userInfo = res.locals.userInfo

    //     const cookie = req.session.cookie
    //     const time = cookie.expires
    //     const expires = new Date(time)


    //     try {
    //         const productUpdated = await this.products.updateProduct(id, producto)
    //         res.render('addNewProducts', { productUpdated, username, userInfo, expires })
    //     } catch (error) {
    //         res.status(500).json({
    //             status: false,
    //             error: error
    //         })
    //     }
    // }

    // deleteProductById = async (req, res) => {
    //     const { id } = req.params

    //     let username = res.locals.username
    //     let userInfo = res.locals.userInfo

    //     const cookie = req.session.cookie
    //     const time = cookie.expires
    //     const expires = new Date(time)

    //     const usuarios = await this.users.getUserByUsername(username)
    //     const userId = usuarios._id // User Id
    //     let cart = await this.carts.getCartByUserId(userId)

    //     try {
    //         const productDeleted = await this.products.deleteProductById(req.params.id)
    //         res.render('addNewProducts', { productDeleted, username, userInfo, cart, expires })
    //     } catch (error) {
    //         res.status(500).json({
    //             status: false,
    //             error: error
    //         })
    //     }
    // }

    // deleteAllProducts = async (req, res) => {
    //     let username = res.locals.username
    //     let userInfo = res.locals.userInfo

    //     const cookie = req.session.cookie
    //     const time = cookie.expires
    //     const expires = new Date(time)

    //     const usuarios = await this.users.getUserByUsername(username)
    //     const userId = usuarios._id // User Id
    //     let cart = await this.carts.getCartByUserId(userId)

    //     try {
    //         const productsDeleted = await this.products.deleteAllProducts()
    //         res.render('addNewProducts', { productsDeleted, username, userInfo, cart, expires })

    //     } catch (error) {
    //         res.status(500).json({
    //             status: false,
    //             error: error
    //         })
    //     }
    // }
}

module.exports = { ProjectsController }