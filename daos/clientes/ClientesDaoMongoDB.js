const ContenedorMongoDB = require('../../contenedores/clientes/containerMongoDB.js')

const Clientes = require('../../models/clientes.models.js')
const logger = require('../../utils/winston.js')
const now = require('../../utils/formatDate.js')

class ClientesDaoMongoDB extends ContenedorMongoDB {
    constructor(cnxStr) {
        super(cnxStr)   
    }

    async init() {
         await this.connection
    }
    
    async getAllClients() {
        try {
            const clients = await Clientes.find()
            
            if ( clients === undefined || clients === null) {
                return new Error ('No hay clientes en la DB!')
            } else {
                logger.info('Clientes encontrados...>')
                return clients
            }    
        } catch (error) {
            logger.error("Error MongoDB getClients: ",error)
            return new Error ('No hay clientes en la DB!')
        }
    }

    async searchClientsAll(name) {
        const query = name.name
        try {
            const clients = await Clientes.find( {$or:[ { name: query }, { code: query } ] } ).exec()
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

    async getClientById(id) {
        
        if(id){
            
            try {
                const client = await Clientes.findById({_id: id })
                logger.info('Cliente encontrado: ',client)
                return client

            } catch (error) {
                logger.error("Error MongoDB getClientById-Dao: ",error)
            }

        } else {
            try {
                const clients = await Clientes.find()
                return clients

            } catch (error) {
                logger.error("Error MongoDB getClientById-Dao: ",error)
            }
        }
    }

    async selectClientById(id) {

        if(id){
            try {
                const client = await Clientes.findById({_id: id })
                logger.info('Cliente encontrado: ',client)
                return client
                
            } catch (error) {
                logger.error("Error MongoDB selectClientById-Dao: ",error)
            }
            
        } else {
            try {
                const clients = await Clientes.find()
                return clients
                
            } catch (error) {
                logger.error("Error MongoDB selectClientById: ",error)
            }
        }
    }

    async getClientProjectsById(id) {
        if(id){
            try {
                const client = await Clientes.findById({
                    _id: id  //client.0._id
                })
                logger.info('Cliente encontrado: ',client)
                return client
            } catch (error) {
                logger.error("Error MongoDB getClientProjectsById: ",error)
            }
        } else {
            try {
                const clients = await Clientes.find()
                return clients
            } catch (error) {
                logger.error("Error MongoDB getClientProjectsById: ",error)
            }
        }
    }

    async getClientByProjectId(id) {
        if(id){
            try {
                const client = await Clientes.findById({_id: id })
                logger.info('Cliente encontrado: ',client)
                return client
            } catch (error) {
                logger.error("Error MongoDB getClientByProjectId: ",error)
            }
        } else {
            try {
                const clients = await Clientes.find()
                return clients
            } catch (error) {
                logger.error("Error MongoDB getClientByProjectId: ",error)
            }
        }
    }

    async createNewClient(client){
        if(client) {
            try {
                const itemMongoDB = await Clientes.findOne({name: `${client.name}`})
                if (itemMongoDB) {
                    logger.error("Cliente con Nombre existente!! ")
                    return new Error (`Cliente ya existe con este nombre: ${client.name}!`)
                } else {
                    const newClient = new Clientes(client)
                    await newClient.save()
                    logger.info('Client ', newClient, ' created')
                    return newClient
                }
            } catch (error) {
                logger.error("Error MongoDB createClient: ",error)
            }
        } else {
            return new Error (`No se pudo crear el Cliente!`)
        }
    }

    async updateClient(id, client, user) {
        const itemMongoDB = await Clientes.findById({_id: id})
            if (itemMongoDB) {
                try {
                    const newValues = {
                        name: client.name,
                        code: client.code,
                        logo: client.logo,
                        status: client.status,
                        project: client.project,
                        creator: client.creator,
                        timestamp: client.timestamp,
                        modificator: user,
                        modifiedOn: now
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

    async updateClientProjectsQty(id, clienteSelected, user){
        const clientMongoDB = await Clientes.findById({_id: id})
        
        if (clientMongoDB) {
            try {
                 const newValues = {
                    name: clienteSelected.name,
                    code: clienteSelected.code,
                    logo: clienteSelected.logo,
                    status: clienteSelected.status,
                    project: clienteSelected.project + 1,
                    creator: clienteSelected.creator,
                    timestamp: clienteSelected.timestamp,
                    modificator: user,
                    modifiedOn: now
                }

                const clientUpdated = await Clientes.findOneAndUpdate(
                    { _id: id }, newValues , { new: true })
                logger.info('Qty. proyectos de Cliente actualizado ', clientUpdated)
                
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
           let inactive = Boolean(false)
            try {
                const newValues = {
                    name: itemMongoDB.name,
                    logo: itemMongoDB.logo,
                    code: itemMongoDB.code,
                    timestamp: now,
                    project: itemMongoDB.project,
                    status: inactive,
                    creator: itemMongoDB.creator,
                }
                
                const client = await Clientes.findOneAndUpdate(
                    { _id: id }, 
                    newValues, 
                    { new: true }
                )
                    return client

            } catch (error) {
                logger.error("Error MongoDB deleteClient: ",error)
            }

        } else {
            logger.info('El Cliente no existe! ', itemMongoDB)
        }
    }

    // async getClientByNameOrCode(client) {
    //     if(client) {
    //         try {
    //             const nameClient = await Clientes.findOne({ name: `${client}`}).exec();
    //             const codeClient = await Clientes.findOne({ code: `${client}`}).exec();
    
    //             if(nameClient || codeClient) {
    //                 return nameClient
    //             } else {
    //                 return false
    //             }
    //         } catch (error) {
    //             logger.error("Error MongoDB getByNameOrCode: ",error)
    //         }
    //     } else {
    //         return new Error (`No se pudo concretar la busqueda en la DB!`)
    //     }
    // }

    async disconnet() {
        await this.disconnection
    }
    
}

module.exports = ClientesDaoMongoDB