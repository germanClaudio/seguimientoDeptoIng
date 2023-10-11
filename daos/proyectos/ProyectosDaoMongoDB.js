const ContenedorMongoDB = require('../../contenedores/proyectos/containerMongoDB.js')

const Proyectos = require('../../models/proyectos.models.js') 
const Clientes = require('../../models/clientes.models.js')
const logger = require('../../utils/winston.js')
const now = require('../../utils/formatDate.js')

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
            const projects = await Proyectos.find().sort( { 'client.name': 1, 'timestamp': 1 } )
           
            if ( projects === undefined || projects === null) {
                return new Error ('No hay proyectos cargados en ningún cliente!')
            } else {
                return projects
            }    
        } catch (error) {
            logger.error("Error MongoDB getClients: ",error)
            return new Error ('No hay proyectos en la DB!')
        }
    }

    // Search all Clients by Client Name o Code ----------------
    async searchClientsAll(name) {
        const query = name.clientName
        try {
            const clients = await Clientes.find( {$or:[ { clientName: query }, { clientCode: query } ] } ).exec()
            
            if ( clients === undefined || clients === null) {
                return null
            } else {
                return clients
            }    
        } catch (error) {
            logger.error("Error MongoDB searched Clientes: ", error)
            return new Error ('No hay clientes en la DB!')
        }
    }

    // Get all projects from a Client by Id ----------------
    async getProjectsByClientId(id) {
        if(id){
            try {
                const projects = await Proyectos.find({
                    'client.0._id': id 
                  })
                
                return projects
               
            } catch (error) {
                logger.error("Error MongoDB getProjectsByClientId: ",error)
            }
        } else {
            try {
                const projects = await Proyectos.find()
                return projects
            } catch (error) {
                logger.error("Error MongoDB getOneClientById: ",error)
            }
        }
    }

    // Select one project by project Id ----------------
    async selectProjectByProjectId(id) {
        if(id){
            try {
                const project = await Proyectos.find({
                    'project.0._id': id 
                  })
                return project
               
            } catch (error) {
                logger.error("Error MongoDB getProjectsByClientId: ",error)
            }
        } else {
            try {
                const projects = await Proyectos.find()
                return projects
            } catch (error) {
                logger.error("Error MongoDB getOneClientById: ",error)
            }
        }
    }

    async createNewProject(project){
        if(project) {
            try {
                const itemMongoDB = await Proyectos.findOne({projectName: `${project.name}`})
                if (itemMongoDB) {
                    logger.error("Proyecto con Nombre existente!! ")
                    return new Error (`Proyecto ya existe con este nombre: ${project.name}!`)
                } else {
                    const newProject = new Proyectos(project)
                    await newProject.save()
                    logger.info('Project created')
                    return newProject
                }
            } catch (error) {
                logger.error("Error MongoDB createProject: ",error)
            }
        } else {
            return new Error (`No se pudo crear el Proyecto!`)
        }
    }

    async addOtToOciProject(idOci, infoOt){
        if(idOci) {
            try {
                const itemMongoDB = await Proyectos.findById({_id: idOci})
                conosle.log(...itemMongoDB)
                if (itemMongoDB) {
                    const newValues = {
                        otNumber: infoOt.otNumber,
                        opNumber: infoOt.opNumber,
                        otDescription: infoOt.otDescription,
                        otStatus: infoOt.otStatus,
                        timestamp: now,
                        creator: infoOt.creator
                    }
    
                    const otAddedToOci = await Clientes.findOneAndUpdate(
                        { _id: idOci }, newValues , { new: true })
                    logger.info('Ot agregada a OCI ', otAddedToOci)
                    
                    return otAddedToOci
                } else {
                    logger.error(`No se encontró la OCI con id: ${idOci}`)
                    return new Error (`No se encontró la OCI con id: ${idOci}`)
                }
            } catch (error) {
                logger.error("Error MongoDB adding OT to a OCI: ",error)
            }
        } else {
            return new Error (`No se pudo agregar la OT a la OCI del Proyecto!`)
        }
    }


    async updateClient(id, client){
        const itemMongoDB = await Clientes.findById({_id: id})
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
                    { _id: id }, newValues , { new: true })
                logger.info('Cliente actualizado ', clientUpdated)
                
                return clientUpdated
               
            } catch (error) {
                logger.error("Error MongoDB updateClient: ",error)
                return new Error (`No se pudo actualizar el Cliente!`)
            }
        } else {
            logger.info('El Cliente no existe! ', itemMongoDB)
            return new Error (`No se pudo actualizar el Cliente!`)
        }
    }

    async deleteClientById(id) {
        const itemMongoDB = await Clientes.findById({_id: `${id}`})

        if(itemMongoDB) {
            try {
                const newValues = {
                    clientName: itemMongoDB.clientName,
                    logoClient: itemMongoDB.logoClient,
                    timestamp: now,
                    creator: itemMongoDB.creator,
                    status: 'Inactivo' //Borrado logico del cliente Status=Inactivo
                }
                const client = await Clientes.findOneAndUpdate(
                    { _id: id }, newValues , { new: true })
                    return client
            } catch (error) {
                logger.error("Error MongoDB deleteClient: ",error)
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
        if(client) {
            try {
                const nameClient = await Clientes.findOne({ clientName: `${client}`}).exec();
                const codeClient = await Clientes.findOne({ ClientCode: `${client}`}).exec();
    
                if(nameClient || codeClient) {
                    return nameClient
                } else {
                    return false
                }
            } catch (error) {
                logger.error("Error MongoDB getByNameOrCode: ",error)
            }
        } else {
            return new Error (`No se pudo concretar la busqueda en la DB!`)
        }
    }

    async disconnet() {
        await this.disconnection
    }
    
}

module.exports = ProyectosDaoMongoDB