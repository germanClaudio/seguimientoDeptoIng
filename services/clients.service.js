const ClientesDaoFactory = require('../daos/clientes/ClientesDaoFactory.js')
const clientesDao = ClientesDaoFactory.getDao()


class ClientService {
    constructor() {
        this.clientes = clientesDao
    }
    
    // returns all clients from DB
    async getAllClients() {
        return await this.clientes.getAllClients()
    }

    // returns all clients from DB according query
    async searchClientsAll() {
        return await this.clientes.searchClientsAll()
    }
    
    // returns one client by id
    async getClientById(id) {
        return await this.clientes.getClientById(id)
    }

    // returns all Projects from one client by id
    async getClientProjectsById(id) {
        return await this.clientes.getClientProjectsById(id)
    }

    // returns details one client by id
    async selectClientById(id) {
        return await this.clientes.selectClientById(id)
    }
    
    // add new client
    async addClient(client) {
        return await this.clientes.createNewClient(client)
    }
    
    // update one client
    async updateClient(id, cliente) {
        return await this.clientes.updateClient(id, cliente)
    }

    // update Project Qty. of one client
    async updateClientProjectQty(id, cliente) {
        return await this.clientes.updateClientProjectsQty(id, cliente)
    }
    
    // delete one client by Id
    async deleteClientById(id) {
        return await this.clientes.deleteClientById(id)
    }

    // delete all clients
    async deleteAllClients() {
        return await this.clientes.deleteAllClients()
    }
}

module.exports = ClientService