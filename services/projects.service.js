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

    // Update Level Project by id
    async updateLevelProject(id, project, levelProject, userInfo) {
        return this.proyectos.updateLevelProject(
            id,
            project,
            levelProject,
            userInfo)
    }

    // Update Status OCI by id Project
    async updateStatusOci(id, project, statusOci, ociKNumber, userInfo) {
        return this.proyectos.updateStatusOci(
            id,
            project,
            statusOci,
            ociKNumber,
            userInfo)
    }

    // Update Status OT by Ot Number
    async updateStatusOt(id, project, statusOt, otKNumber, userInfo) {
        return this.proyectos.updateStatusOt(
            id,
            project,
            statusOt,
            otKNumber,
            userInfo)
    }

    // add New Oci To Project
    async addNewOciToProject(id, project, ociKNumber, userInfo) {
        return this.proyectos.addNewOciToProject(
            id,
            project,
            ociKNumber,
            userInfo
        )
    }

    // Update Project by id
    async updateProject(
            id,
            project,
            statusProject,
            projectName,
            projectDescription,
            prioProject,
            levelProject,
            codeProject,
            imageProject,
            userInfo
    ) {
        return this.proyectos.updateProject(
            id,
            project,
            statusProject,
            projectName,
            projectDescription,
            prioProject,
            levelProject,
            codeProject,
            imageProject,
            userInfo
        )
    }

    // Update Oci by Project id
    async updateOci(
            id,
            proyecto,
            statusOci,
            ociDescription,
            ociNumber,
            ociKNumber,
            ociImage,
            userInfo) {

        return this.proyectos.updateOci(
            id,
            proyecto,
            statusOci,
            ociDescription,
            ociNumber,
            ociKNumber,
            ociImage,
            userInfo)
    }

    // remove one OCI from project by Id
    async deleteOci(id, project, ociKNumber, user) {
        return this.proyectos.deleteOci(id, project, ociKNumber, user)
    }

    // remove one project by Id
    async deleteProjectById(id, project, user) {
        return this.proyectos.deleteProjectById(id, project, user)
    }
}

module.exports = ProjectService
