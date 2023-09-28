const ProyectosDaoFactory = require('../daos/proyectos/ProyectosDaoFactory.js')
const proyectosDao = ProyectosDaoFactory.getDao()

class ProjectService {
    constructor() {
        this.proyectos = proyectosDao
    }

    // returns all projects
    async getAllProjects(data) {
        return this.proyectos.getAllProjects(data)
    }

    // returns all projects from one Client
    async getProjectsByClientId(data) {
        return this.proyectos.getProjectsByClientId(data)
    }

    // // reduce quantity of Projects from one Client
    // async reduceStockProduct(data) {
    //     return this.proyectos.reduceStockProduct(data)
    // }

    // add new project to a Client
    async addProjectToClient(payload) {
        return this.proyectos.createNewProject(payload)
    }
    
    // // remove one project from Client
    //  async removeItemFromCart(payload) {
    //     return this.proyectos.removeItemFromCart(payload)
    // }

    // // remove one project from Client
    // async deleteProjectFromClient(id) {
    //     return this.proyectos.deleteItemFromCart()
    // }
}

module.exports = ProjectService
