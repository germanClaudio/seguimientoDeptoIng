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

    // returns all projects from a Main ProjectId
    async selectProjectsByMainProjectId(idProject) {
        return this.proyectos.selectProjectsByMainProjectId(idProject)
    }

    // add new project to a Client
    async addProjectToClient(payload) {
        return this.proyectos.createNewProject(payload)
    }
    
    // add new Ot to OCI - Project
    async addOtToOciProject(projectId, numberOci, ociNumberK, otAddedToOci) {
        return this.proyectos.addOtToOciProject(
            projectId,
            numberOci,
            ociNumberK, 
            otAddedToOci
        )
    }

    // add Info R14 to Ot - Project
    async addInfoR14ToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoR14ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

    // Select OCI - Project
    async selectOciByOciNumber(numberOci) {
        return this.proyectos.selectOciByOciNumber(numberOci)
    }

    // Update Status Project by id
    async updateStatusProject(id, project, statusProject, userInfo) {
        return this.proyectos.updateStatusProject(
            id,
            project,
            statusProject,
            userInfo)
    }

    // // remove one project from Client
    // async deleteProjectFromClient(id) {
    //     return this.proyectos.deleteItemFromCart()
    // }
}

module.exports = ProjectService
