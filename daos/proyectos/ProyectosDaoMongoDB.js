const ContenedorMongoDB = require('../../contenedores/proyectos/containerMongoDB.js')

const Proyectos = require('../../models/proyectos.models.js')
const Clientes = require('../../models/clientes.models.js')
const logger = require('../../utils/winston.js')
let now = require('../../utils/formatDate.js')

class ProyectosDaoMongoDB extends ContenedorMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        await this.connection
    }

    // get all Projects form DB ----------------
    async getAllProjects() {
        try {
            const projects = await Proyectos.find()
            // .sort(
            //     {
            //         //'client.name': 1, 
            //         'project.0.prioProject': 1,
            //         'timestamp': 1
            //     }
            // )

            if (projects === undefined || projects === null) {
                return new Error('No hay proyectos cargados en ningún cliente!')
            } else {
                return projects
            }
        } catch (error) {
            logger.error("Error MongoDB getClients: ", error)
            return new Error('No hay proyectos en la DB!')
        }
    }

    // Search all Clients by Client Name o Code ----------------
    async searchClientsAll(name) {
        const query = name.clientName
        try {
            const clients = await Clientes.find({ $or: [{ clientName: query }, { clientCode: query }] }).exec()

            if (clients === undefined || clients === null) {
                return null
            } else {
                return clients
            }
        } catch (error) {
            logger.error("Error MongoDB searched Clientes: ", error)
            return new Error('No hay clientes en la DB!')
        }
    }

    // Get all projects from a Client by Id ----------------
    async getProjectsByClientId(id) {
        if (id) {
            try {
                const projects = await Proyectos.find({
                    'client.0._id': id
                })

                return projects

            } catch (error) {
                logger.error("Error MongoDB getProjectsByClientId: ", error)
            }
        } else {
            try {
                const projects = await Proyectos.find()
                return projects
            } catch (error) {
                logger.error("Error MongoDB getOneClientById: ", error)
            }
        }
    }

    // Select all projects by Main project Id ----------------
    async selectProjectsByMainProjectId(id) {
        if (id) {
            try {
                const project = await Proyectos.find({
                    '_id': id
                })
                console.log('project...',project)
                return project

            } catch (error) {
                logger.error("Error MongoDB getProjectsByClientId: ", error)
            }
        } else {
            try {
                const projects = await Proyectos.find()
                return projects
            } catch (error) {
                logger.error("Error MongoDB getOneProjectById: ", error)
            }
        }
    }

    // Select one project by project Id ----------------
    async selectProjectByProjectId(id) {
        if (id) {
            try {
                const project = await Proyectos.find({
                    'project.0._id': id
                })
                return project

            } catch (error) {
                logger.error("Error MongoDB getProjectsByProjectId: ", error)
            }
        } else {
            try {
                const projects = await Proyectos.find()
                return projects
            } catch (error) {
                logger.error("Error MongoDB getOneProjectById: ", error)
            }
        }
    }

    async createNewProject(project) {
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findOne({ projectName: `${project.name}` })
                if (itemMongoDB) {
                    logger.error("Proyecto con Nombre existente!! ")
                    return new Error(`Proyecto ya existe con este nombre: ${project.name}!`)
                } else {
                    const newProject = new Proyectos(project)
                    await newProject.save()
                    logger.info('Project created')
                    return newProject
                }
            } catch (error) {
                logger.error("Error MongoDB createProject: ", error)
            }
        } else {
            return new Error(`No se pudo crear el Proyecto!`)
        }
    }

    // Select one OCI by Oci Number ----------------
    async selectOciByOciNumber(numberOci) {
        const numberOciParsed = parseInt(numberOci)
        if (numberOciParsed) {
            try {
                const project = await Proyectos.find({
                    [`project.0.oci.${numberOciParsed}.ociNumber`]: numberOciParsed
                })
                return project

            } catch (error) {
                logger.error("Error MongoDB selectOciByOciNumber: ", error)
            }

        } else {
            try {
                const projects = await Proyectos.find()
                return projects
            } catch (error) {
                logger.error("Error MongoDB selectOciByOciNumber: ", error)
            }
        }
    }

    // Add Ot's to Oci Number ----------------
    async addOtToOciProject(idProjectTarget, numberOci, ociNumberK, infoOt, userInfo) {
        
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })

                if (itemMongoDB) {
                    const ociKNumber = parseInt(ociNumberK) || 0

                    if(itemMongoDB[0].oci[ociKNumber].otProject != []) {
                        var otAddedToOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $push: {
                                    [`project.0.oci.${ociKNumber}.otProject`]: infoOt,
                                    [`project.0.oci.${ociKNumber}.modificator`]: userInfo,
                                    [`project.0.oci.${ociKNumber}.modifiedOn`]: now
    
                                }
                            },
                            { new: true }
                        )
                        logger.info('Ot agregada a OCI ', otAddedToOci)
    
                        if (otAddedToOci.acknowledged) {
                            const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                            return itemUpdated
                        } else {
                            return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                        }
                        
                    } else {
                        var otAddedToOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $push: {
                                    [`project.0.oci.${ociKNumber}.otProject`]: infoOt,
                                    [`project.0.oci.${ociKNumber}.creator`]: userInfo,
                                    [`project.0.oci.${ociKNumber}.timestamp`]: now
    
                                }
                            },
                            { new: true }
                        )
                        logger.info('Ot agregada a OCI ', otAddedToOci)
    
                        if (otAddedToOci.acknowledged) {
                            const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                            return itemUpdated
                        } else {
                            return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                        }
                    }

                } else {
                    logger.error(`No se encontró la OCI: ${numberOci}`)
                    return new Error(`No se encontró la OCI: ${numberOci}`)
                }

            } catch (error) {
                logger.error("Error MongoDB adding OT to a OCI: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la OT a la OCI del Proyecto!`)
        }
    }

    // Add Info R14 to Ot's ----------------
    async addInfoR14ToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })

                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = []
                    let arrayStructureTree = []

                    // Se crean los array de estructura de arbol y datos a agregar ---
                    for (let i = 0; i < quantityOt; i++) {
                        let estructuraACrear = {
                            [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation`]:
                            {
                                otInfoR14: []
                            }
                        }
                        arrayStructureTree.push(estructuraACrear)

                        let updateQuery = {
                            [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoR14`]:
                            {
                                procesoR14: infoAddedToOt[i].procesoR14,
                                aprobadoR14: infoAddedToOt[i].aprobadoR14,
                                creator: infoAddedToOt[i].creator
                            }
                        }
                        arrayQuantity.push(updateQuery)
                    }
                    // console.log('1-Dao-arrayStructureTree--- ', arrayStructureTree)
                    // console.log('2-Dao-arrayQuantity--- ', arrayQuantity)

                    // Se agregan las estructuras al arbol de MongoDB ---
                    let arrayTreeCreation = []
                    for (let i = 0; i < quantityOt; i++) {
                        const treeInfoOtAddedToOt = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: arrayStructureTree[i] //estructuraACrear
                            },
                            { upsert: true }
                        )
                        arrayTreeCreation.push(treeInfoOtAddedToOt)
                    }
                    // console.log('3-Dao-Estructura arbol creada: ', arrayTreeCreation)

                    // Se cuentan las estructuras del arbol agregadas ---
                    var countTreeCreation = 0
                    for (let i = 0; i < quantityOt; i++) {
                        if (arrayTreeCreation[i].modifiedCount===1) {
                            countTreeCreation++
                        }
                    }
                    // console.log('3.1-Dao-countTree: ', countTreeCreation)
                    
                    // Si la cant. de estructuras agregadas es = a la cantidad de OT => continua ---
                    if (countTreeCreation === quantityOt) {
                        for (let i = 0; i < quantityOt; i++) {
                            var infoR14OtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $push: arrayQuantity[i]
                                },
                                { new: true }
                            )
                        }
                    // console.log('4-Dao-Ot agregada: ', infoR14OtAddedToOt)

                        // Se cuentan las de datos agregados ---
                        var countInfoAdded = 0
                        for (let i = 0; i < quantityOt; i++) {
                            if (infoR14OtAddedToOt.modifiedCount===1) {
                                countInfoAdded++
                            }
                        }
                        // console.log('4.1-Dao-count: ', countInfoAdded)

                        // Si la cant. de datos agregados es = a la cantidad de OT => continua ---
                        if (countInfoAdded === quantityOt) {
                            const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                            return itemUpdated

                        } else {
                            return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                        }

                    } else {
                        return new Error(`No se creo la estructura del arbol correctamente!`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.log("Error MongoDB adding info R14 to OT: ", error)
                logger.error("Error MongoDB adding info R14 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info a la OT del Proyecto!`)
        }
    }




    // Update Status Project by Project Id
    async updateStatusProject(id, project, statusProject, userInfo) {
        //console.log('Project...', project)
        //console.log('userInfo...', userInfo)
        
        let booleanStatus
        statusProject=='true' ? booleanStatus=true : booleanStatus=false
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                console.log('itemMongoDB...', itemMongoDB)
                if (itemMongoDB) {
                    
                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                'project.0.statusProject': !booleanStatus,
                                modificator: userInfo,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )
                    console.log('Status proyecto modificado: ', updatedProject)

                    if(updatedProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        console.log('itemUpdated...', itemUpdated)
                        return itemUpdated
                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }
                    
                } else {
                    return new Error(`Proyecto no existe con este id: ${id}!`)
                }

            } catch (error) {
                logger.error("Error MongoDB updatingProject: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el status del Proyecto!`)
        }
    }

    // Update Level Project by Project Id
    async updateLevelProject(id, project, levelProject, userInfo) {
        //console.log('Project...', project)
        //console.log('userInfo...', userInfo)
        
        let booleanLevel
        levelProject=='true' ? booleanLevel=true : booleanLevel=false
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                //console.log('itemMongoDB...', itemMongoDB)
                console.log('now...dao. ', now)
                if (itemMongoDB) {
                    
                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                'project.0.levelProject': !booleanLevel,
                                modificator: userInfo,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )
                    //console.log('Status proyecto modificado: ', updatedProject)

                    if(updatedProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        //console.log('itemUpdated...', itemUpdated)
                        return itemUpdated
                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }
                    
                } else {
                    return new Error(`Proyecto no existe con este id: ${id}!`)
                }

            } catch (error) {
                logger.error("Error MongoDB updatingProject: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el nivel del Proyecto!`)
        }
    }

    // Update Status Oci by Project Id
    async updateStatusOci(id, project, statusOci, ociKNumber, userInfo) {
        //console.log('Project...', project)
        //console.log('userInfo...', userInfo)
        //console.log('statusOci...', typeof statusOci)
        //console.log('ociKNumber...', ociKNumber)
        let booleanStatus
        statusOci=='true' ? booleanStatus=true : booleanStatus=false
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                // console.log('itemMongoDB...', itemMongoDB)
                if (itemMongoDB) {
                    const ociNumberK = parseInt(ociKNumber) || 0

                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${ociNumberK}.ociStatus`]: !booleanStatus,
                                [`project.0.oci.${ociNumberK}.modificator`]: userInfo,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: now
                            }
                        },
                        { new: true }
                    )
                    //console.log('Status OCI modificado: ', updatedProject)

                    if(updatedProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        // console.log('itemUpdated...', itemUpdated)
                        return itemUpdated
                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }
                    
                } else {
                    return new Error(`Proyecto no existe con este id: ${id}!`)
                }

            } catch (error) {
                logger.error("Error MongoDB updatingProject: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el status del Proyecto!`)
        }
    }

    async updateClient(id, client) {
        const itemMongoDB = await Clientes.findById({ _id: id })
        if (itemMongoDB) {
            try {
                const newValues = {
                    clientName: client.clientName,
                    clientCode: client.clientCode,
                    logoClient: client.logoClient,
                    status: client.status,
                    timestamp: now,
                    creator: client.creator
                }

                const clientUpdated = await Clientes.findOneAndUpdate(
                    { _id: id },
                    newValues,
                    { new: true })
                logger.info('Cliente actualizado ', clientUpdated)

                return clientUpdated

            } catch (error) {
                logger.error("Error MongoDB updateClient: ", error)
                return new Error(`No se pudo actualizar el Cliente!`)
            }
        } else {
            logger.info('El Cliente no existe! ', itemMongoDB)
            return new Error(`No se pudo actualizar el Cliente!`)
        }
    }

    async deleteClientById(id) {
        const itemMongoDB = await Clientes.findById({ _id: `${id}` })

        if (itemMongoDB) {
            try {
                const newValues = {
                    clientName: itemMongoDB.clientName,
                    logoClient: itemMongoDB.logoClient,
                    timestamp: now,
                    creator: itemMongoDB.creator,
                    status: 'Inactivo' //Borrado logico del cliente Status=Inactivo
                }
                const client = await Clientes.findOneAndUpdate(
                    { _id: id }, newValues, { new: true })
                return client
            } catch (error) {
                logger.error("Error MongoDB deleteClient: ", error)
            }
        } else {
            logger.info('El Cliente no existe! ', itemMongoDB)
        }
    }

    // async deleteAllProducts() {
    //     const newStockQuantity = 0  //Borrado logico de todos los productos New Stock = 0  -----
    //     const products = await Productos.find()
    //     if ( products === [] || products === undefined || products === null) {
    //         return new Error ('No hay productos en la DB!')
    //     } else {    
    //         try {
    //             const productsStockUpdated = await Productos.updateMany({}, { $set: { stock: newStockQuantity } }, { new: true })

    //             return productsStockUpdated
    //         } catch (error) {
    //             logger.error("Error MongoDB deleteAllProduct: ", error)
    //         }
    //     }
    // }

    async getByNameOrCode(client) {
        if (client) {
            try {
                const nameClient = await Clientes.findOne({ clientName: `${client}` }).exec();
                const codeClient = await Clientes.findOne({ ClientCode: `${client}` }).exec();

                if (nameClient || codeClient) {
                    return nameClient
                } else {
                    return false
                }
            } catch (error) {
                logger.error("Error MongoDB getByNameOrCode: ", error)
            }
        } else {
            return new Error(`No se pudo concretar la busqueda en la DB!`)
        }
    }

    async disconnet() {
        await this.disconnection
    }

}

module.exports = ProyectosDaoMongoDB