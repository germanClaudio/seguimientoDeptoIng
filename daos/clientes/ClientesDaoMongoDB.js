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
                // logger.info('Clientes encontrados...>')
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

    async updateClient(id, client, userModificator) {
        
        if (client) {
            try {
                const itemMongoDB = await Clientes.findById({_id: id})
                let logoCliente = ''
                client.logo === '' ? logoCliente = itemMongoDB.logo : logoCliente = client.logo  
                
                if(itemMongoDB) {
                    var updatedClient = await Clientes.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                name: client.name,
                                status: client.status,
                                logo: logoCliente,
                                code: client.code,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedClient.acknowledged) {
                        const itemUpdated = await Clientes.findById({ _id: id })
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }

                } else {
                    return new Error(`Cliente no existe con este id: ${itemUpdated._id}`)
                }
                                    
            } catch (error) {
                logger.error("Error MongoDB updateClient: ",error)
                return new Error (`No se pudo actualizar el Cliente!`)
            }

        } else {
            logger.info('El Cliente no existe! ', itemMongoDB)
            return new Error (`No se pudo actualizar el Cliente!`)
        }
    }

    async updateClientProjectsQty(id, clienteSelected, userModificator) {
        if (id && clienteSelected) {
            try {
                const itemMongoDB = await Clientes.findById({_id: id})
            
                if (itemMongoDB) {
                    var updatedClientProjectsQty = await Clientes.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                project: parseInt(itemMongoDB.project + 1),
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedClientProjectsQty.acknowledged) {
                        const itemUpdated = await Clientes.findById({ _id: id })
                        return itemUpdated
                    }
                    
                } else {
                    logger.info('El Cliente no existe! ', itemMongoDB)
                    return new Error (`No se pudo actualizar el Cliente!`)
                }

            } catch (error) {
                logger.error("Error MongoDB updateClient: ",error)
                return new Error (`No se pudo actualizar el Cliente!`)
            }    
        }
    }

    async reduceClientProjectQty(id, clienteSelected, user){
        if (id && clienteSelected) {
            try {
                const itemMongoDB = await Clientes.findById({_id: id})
                
                if(itemMongoDB) {
                    var updatedClientProjectsQty = await Clientes.updateOne(
                        { _id: id }, 
                        {
                            $set: {
                                project: parseInt(itemMongoDB.project - 1),
                                modificator: user,
                                modifiedOn: now
                            }
                        },
                        { new: true })

                    if(updatedClientProjectsQty.acknowledged) {
                        const itemUpdated = await Clientes.findById({ _id: id })
                        return itemUpdated
                    }

                } else {
                    logger.info('Qty. proyectos de Cliente no actualizado ')
                    return new Error (`No se pudo actualizar el Cliente!`)
                }
                
            } catch (error) {
                logger.error("Error MongoDB reducing client project qty.: ",error)
                return new Error (`No se pudo actualizar la cantidad de proyectos del Cliente!`)
            }

        } else {
            logger.info('El Cliente no existe!')
            return new Error (`No se pudo actualizar la cantidad de proyectos del Cliente!`)
        }
    }

    async deleteClientById(id, modificator) {
        if(id) {
            try {
                const itemMongoDB = await Clientes.findById({_id: `${id}`})
                
                if(itemMongoDB) {
                    let inactive = Boolean(false)
                    var clientDeleted = await Clientes.updateOne(
                        { _id: id }, 
                        {
                            $set: {
                                visible: inactive,
                                status: inactive,
                                modificator: modificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )

                    if(clientDeleted.acknowledged) {
                        const itemUpdated = await Clientes.findById({ _id: id })
                        return itemUpdated

                    } else {
                        return new Error(`No se eliminó el item: ${userMongoDB._id}`)
                    }

                } else {
                    logger.info('El Cliente no existe! ', itemMongoDB)
                }
            } catch (error) {
                logger.error("Error MongoDB deleteClient: ",error)
            }

        }
    }

    // async getClientBySearching(client) {
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

    async getClientBySearching(query) {
        var filter

        if (query.query === '') {
            if (query.status === 'todos') {
                if (query.proyectos === 'all') {
                    filter = 'nullAllAll'
                } else if (query.proyectos === 'with') {
                    filter = 'nullAllWith'
                } else {
                    filter = 'nullAllWithout'
                }

            } else if (query.status === 'activos') {
                if (query.proyectos === 'all') {
                    filter = 'nullActiveAll'
                } else if (query.proyectos === 'with') {
                    filter = 'nullActiveWith'
                } else {
                    filter = 'nullActiveWithout'
                }

            } else if (query.status === 'inactivos') {
                if (query.proyectos === 'all') {
                    filter = 'nullInactiveAll'
                } else if (query.proyectos === 'with') {
                    filter = 'nullInactiveWith'
                } else {
                    filter = 'nullInactiveWithout'
                }
            }

        } else {
            if (query.status === 'todos') {
                if (query.proyectos === 'all') {
                    filter = 'notNullAllAll'
                } else if (query.proyectos === 'with') {
                    filter = 'notNullAllWith'
                } else {
                    filter = 'notNullAllWithout'
                }

            } else if (query.status === 'activos') {
                if (query.proyectos === 'all') {
                    filter = 'notNullActiveAll'
                } else if (query.proyectos === 'with') {
                    filter = 'notNullActiveWith'
                } else {
                    filter = 'notNullActiveWithout'
                }

            } else if (query.status === 'inactivos') {
                if (query.proyectos === 'all') {
                    filter = 'notNullInactiveAll'
                } else if (query.proyectos === 'with') {
                    filter = 'notNullInactiveWith'
                } else {
                    filter = 'notNullInactiveWithout'
                }
            }
        }
        
        try {
            switch (filter) {
                case 'nullAllAll': {
                    var resultados = ['vacio'] // []
                break;
                }
                case 'nullAllWith': {
                    var resultados = await Clientes.find({
                        'project': { $gt: 0 } // Proyectos mayores que 0
                    })
                break;
                }
                case 'nullAllWithout': {
                    var resultados = await Clientes.find({
                        'project': { $eq: 0 }
                    })
                break;    
                }
                case 'nullActiveAll': {
                    var resultados = await Clientes.find({
                        'status': true,
                    })
                    break;
                }
                case 'nullActiveWith': {
                    var resultados = await Clientes.find({
                        'status': true,
                        'project': { $gt: 0 }
                    })
                    break;
                }
                case 'nullActiveWithout': {
                    var resultados = await Clientes.find({
                        'status': true,
                        'project': { $eq: 0 } 
                        
                    })
                    break;
                }
                case 'nullInactiveAll': {
                    var resultados = await Clientes.find({
                        'status': false
                    })
                    break;
                }
                case 'nullInactiveWith': {
                    var resultados = await Clientes.find({
                        'status': false,
                        'projects': { $gt: 0 }
                    })
                    break;
                }
                case 'nullInactiveWithout': {
                    var resultados = await Clientes.find({
                        'status': false,
                        'projects': { $eq: 0 }
                    })
                    break;
                }
                //--------------- input w/text ----------
                case 'notNullAllAll': {
                    var resultados = await Clientes.find({
                        $or: [
                            { 'name': { $regex: `${query.query}`, $options: 'i' } }, 
                            { 'code': { $regex: `${query.query}`, $options: 'i' } }
                        ]
                    })
                    break;
                }
                case 'notNullAllWith': {
                    var resultados = await Clientes.find({
                        $or: [
                            { 'name': { $regex: `${query.query}`, $options: 'i' } }, 
                            { 'code': { $regex: `${query.query}`, $options: 'i' } }
                        ],
                        $and: [
                            { 'project': { $gt: 0 } }
                        ]
                    })
                    break;
                }
                case 'notNullAllWithout': {
                    var resultados = await Clientes.find({
                        $or: [
                            { 'name': { $regex: `${query.query}`, $options: 'i' } }, 
                            { 'code': { $regex: `${query.query}`, $options: 'i' } }
                        ],
                        $and: [
                            { 'project': { $eq: 0 } }
                        ]
                    })
                    break;
                }
                case 'notNullActiveAll': {
                    var resultados = await Clientes.find({
                        $or: [
                            { 'name': { $regex: `${query.query}`, $options: 'i' } }, 
                            { 'code': { $regex: `${query.query}`, $options: 'i' } }
                        ],
                        $and: [
                            { 'status': true }
                        ]
                    })
                    break;
                }
                case 'notNullActiveWith': {
                    var resultados = await Clientes.find({
                        $or: [
                            { 'name': { $regex: `${query.query}`, $options: 'i' } }, 
                            { 'code': { $regex: `${query.query}`, $options: 'i' } }
                        ],
                        $and: [
                            { 'status': true },
                            { 'project': { $gt: 0 } }
                        ]
                    })
                    break;
                }
                case 'notNullActiveWithout': {
                    var resultados = await Clientes.find({
                        $or: [
                            { 'name': { $regex: `${query.query}`, $options: 'i' } }, 
                            { 'code': { $regex: `${query.query}`, $options: 'i' } }
                        ],
                        $and: [
                            { 'status': true },
                            { 'project': { $eq: 0 } }
                        ]
                    })
                    break;
                }
                case 'notNullInactiveAll': {
                    var resultados = await Clientes.find({
                        $or: [
                            { 'name': { $regex: `${query.query}`, $options: 'i' } }, 
                            { 'code': { $regex: `${query.query}`, $options: 'i' } }
                        ]
                    })
                    break;
                }
                case 'notNullInactiveWith': {
                    var resultados = await Clientes.find({
                        $or: [
                            { 'name': { $regex: `${query.query}`, $options: 'i' } }, 
                            { 'code': { $regex: `${query.query}`, $options: 'i' } }
                        ],
                        $and: [
                            { 'status': false },
                            { 'project': { $gt: 0 } }
                        ]
                    })
                    break;
                }
                case 'notNullInactiveWithout': {
                    var resultados = await Clientes.find({
                        $or: [
                            { 'name': { $regex: `${query.query}`, $options: 'i' } }, 
                            { 'code': { $regex: `${query.query}`, $options: 'i' } }
                        ],
                        $and: [
                            { 'status': false },
                            { 'project': { $eq: 0 } }
                        ]
                    })
                    break;
                }
            }
                
            if(resultados) {
                return resultados
            } else {
                return false
            }

        } catch (error) {
            logger.error("Error MongoDB getClientBySearching: ",error)
        }
    }

    async disconnet() {
        await this.disconnection
    }
    
}

module.exports = ClientesDaoMongoDB