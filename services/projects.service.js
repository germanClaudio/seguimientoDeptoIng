const ProyectosDaoFactory = require('../daos/proyectos/ProyectosDaoFactory.js')
const proyectosDao = ProyectosDaoFactory.getDao()

class ProjectService {
    constructor() {
        this.proyectos = proyectosDao
    }

    // returns all projects
    async getAllProjects() {
        return this.proyectos.getAllProjects()
    }

    // returns all projects from one Client
    async getProjectsByClientId(data) {
        return this.proyectos.getProjectsByClientId(data)
    }

    // returns one project from a ProjectId
    async selectProjectByProjectId(idProject) {
        return this.proyectos.selectProjectByProjectId(idProject)
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
