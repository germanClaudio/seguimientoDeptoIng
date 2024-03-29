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
                const project = await Proyectos.find({
                    'client.0._id': id
                })

                return project

            } catch (error) {
                logger.error("Error MongoDB getProjectsByClientId: ", error)
            }
        } else {
            try {
                const project = await Proyectos.find()
                return project
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
                // console.log('project...',project)
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

    // Create a New project ----------------------
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

    // Get all OCI from all projects -----------
    async getAllOciProjects() {
        try {
            const projects = await Proyectos.find() //{ $or: [{ clientName: query }, { clientCode: query }] }).exec()
            
            if (projects === undefined || projects === null) {
                return new Error('No hay proyectos cargados en ningún cliente!')
            } else {
                return projects
            }
        } catch (error) {
            logger.error("Error MongoDB getAllOciProjects: ", error)
            return new Error('No hay proyectos en la DB!')
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
    async addOtToOciProject(idProjectTarget, numberOci, ociNumberK, arrayOtAddedToOci) {
        //console.log('arrayOtAddedToOci: ', arrayOtAddedToOci)
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                if (itemMongoDB) {
                    const ociKNumber = parseInt(ociNumberK) || 0
                    
                    let infoOtToAddOci = {
                        [`project.0.oci.${ociKNumber}.otProject`]: arrayOtAddedToOci,
                    }

                    let infoOtModificator = {
                        [`project.0.oci.${ociKNumber}.modificator`]: arrayOtAddedToOci[0].modificator,
                        [`project.0.oci.${ociKNumber}.modifiedOn`]: ""
                    }

                    if(itemMongoDB.project[0].oci[ociKNumber].otProject != []) {

                        var otAddedToOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: infoOtModificator
                            },
                            { new: true }
                        )

                        var otAddedToOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $push: infoOtToAddOci
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

                        let infoOtToAddOci = {
                            [`project.0.oci.${ociKNumber}.otProject`]: arrayOtAddedToOci,
                            [`project.0.oci.${ociKNumber}.creator`]: arrayOtAddedToOci[0].creator,
                            [`project.0.oci.${ociKNumber}.timestamp`]: arrayOtAddedToOci[0].timestamp,
                        }

                        var otAddedToOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: infoOtModificator
                            },
                            { new: true }
                        )

                        var otAddedToOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $push: infoOtToAddOci
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
                                creator: infoAddedToOt[i].creator,
                                timestamp: now,
                                modificator: infoAddedToOt[i].modificator,
                                modifiedOn: ''
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
                    //  console.log('3.1-Dao-countTree: ', countTreeCreation)
                    
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

                        // Se cuentan las estructuras de datos agregados ---
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
                            // console.log('5.1-Dao-proyecto: ', itemUpdated.project[0].oci)
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

    // ***************** Add Info Proceso 3D to Ot's ----------------
    async addInfoProceso3dToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // Compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })

                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = []
                    let arrayStructureTree = []
                    let arrayTreeCreation = []
                    let countInfoAdded = 0
                    let countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const treeOtInformation = await Proyectos.find({
                            [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation`]: { $exists: true }
                        })
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    }
                        console.log('0-Dao-arrayStructureTreeExists---- ',arrayStructureTreeExists)

                    for (let i = 0; i < quantityOt; i++) {
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation`]:
                                {
                                    otInfoProceso: []
                                }
                            }
                            arrayStructureTree.push(estructuraACrear)

                            console.log('1-Dao-arrayStructureTree-- ', i,' - ', arrayStructureTree)
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                                const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                    { _id: itemMongoDB._id },
                                    {
                                        $set: arrayStructureTree[i] //estructuraACrear
                                    },
                                    { upsert: true }
                                )
                                arrayTreeCreation.push(treeInfoOtAddedToOt)
                                console.log('2-Dao-Estructura arbol creada: ', i,' - ', arrayTreeCreation)

                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoProceso`]:
                                {
                                    proceso3d: infoAddedToOt[i].proceso3d,
                                    horasProceso3d: infoAddedToOt[i].horasProceso3d,
                                    creator: infoAddedToOt[i].creator,
                                    timestamp: now,
                                    modificator: infoAddedToOt[i].modificator,
                                    modifiedOn: ''
                                }
                            }
                                arrayQuantity.push(updateQuery)

                                // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                if (arrayTreeCreation[i].modifiedCount===1) {
               
                                    var infoProceso3dOtAddedToOt = await Proyectos.updateOne(
                                        { _id: itemMongoDB._id },
                                        {
                                            $push: arrayQuantity[i]
                                        },
                                        { new: true }
                                    )
                                    countTreeCreation++
                                }
                                console.log('4-Dao-Ot agregada: ', i,' - ', infoProceso3dOtAddedToOt)

                        } else {

                            // Recupero el creador y la fecha inicial, ya que solo se modifica
                            let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                            let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                            
                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoProceso`]:
                                {
                                    proceso3d: infoAddedToOt[i].proceso3d,
                                    horasProceso3d: infoAddedToOt[i].horasProceso3d,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: now
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)

                                var infoProceso3dOtAddedToOt = await Proyectos.updateOne(
                                    { _id: itemMongoDB._id },
                                    {
                                        $push: arrayQuantity[i]
                                    },
                                    { new: true }
                                )
                                countInfoAdded++
                        }
                    }            

                    // Si el recuento de info agregada o creacion de arbol es mayor a 0
                        if (countInfoAdded > 0 || countTreeCreation > 0 ) {
                              
                            const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                            //console.log('5.1-Dao-proyecto: ', itemUpdated.project[0].oci)
                            return itemUpdated

                        } else {
                            return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                        }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                logger.error("Error MongoDB adding info Proceso 3D to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Proceso 3D a la OT del Proyecto!`)
        }
    }



    // Update Status Project by Project Id
    async updateStatusProject(id, project, statusProject, userModificator) {
                
        let booleanStatus
        statusProject=='true' ? booleanStatus=true : booleanStatus=false
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                //console.log('itemMongoDB...', itemMongoDB)
                if (itemMongoDB) {
                    
                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                'project.0.statusProject': !booleanStatus,
                                modificator: userModificator,
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
            return new Error(`No se pudo modificar el status del Proyecto!`)
        }
    }

    // Update Level Project by Project Id
    async updateLevelProject(id, project, levelProject, userModificator) {
        //console.log('Project...', project)
        //console.log('userInfo...', userInfo)
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                //console.log('itemMongoDB...', itemMongoDB)
                if (itemMongoDB) {
                    
                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                'project.0.levelProject': levelProject,
                                modificator: userModificator,
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
    async updateStatusOci(id, project, statusOci, ociKNumber, userModificator) {
        let booleanStatus
        statusOci=='true' ? booleanStatus=true : booleanStatus=false
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                
                if (itemMongoDB) {
                    const ociNumberK = parseInt(ociKNumber) || 0

                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${ociNumberK}.ociStatus`]: !booleanStatus,
                                [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: now
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                       
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

    // Update Status Ot by Project Id
    async updateStatusOt(id, project, statusOt, ociKNumber, otKNumber, userModificator) {
        let booleanStatus
        statusOt==='Activo' ? booleanStatus=true : booleanStatus=false
        
        if (id && project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                
                if (itemMongoDB) {
                    const ociNumberK = parseInt(ociKNumber)
                    const otNumberK = parseInt(otKNumber)

                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.otStatus`]: !booleanStatus,
                                [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: now, 
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modifiedOn`]: now
                            }
                        },
                        { new: true }
                    )
                    console.log('Status OCI modificado: ', updatedProject)

                    if(updatedProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        console.log('itemUpdated...', itemUpdated.project[0].oci[ociNumberK])
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

    // Add new Oci to Project
    async addNewOciToProject(idProjectTarget, ociQty, arrayOciAddedToProject) {
        const ociQuantity = parseInt(ociQty)
        
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                         
                if (itemMongoDB) {

                    let arrayQueryQuantity = []
                    for (let i = 0; i < ociQuantity; i++) {                            
                        let updateQuery = {
                                ociNumber: arrayOciAddedToProject[i].ociNumber,
                                ociDescription: arrayOciAddedToProject[i].ociDescription,
                                ociStatus: arrayOciAddedToProject[i].ociStatus,
                                creator: arrayOciAddedToProject[i].creator,
                                timestamp: now,
                                ociImage: arrayOciAddedToProject[i].ociImage,
                                modificator: arrayOciAddedToProject[i].modificator,
                                modifiedOn: '',
                                visible: true
                        }
                        arrayQueryQuantity.push(updateQuery)
                    }    

                    // Se agregan las estructuras al arbol de MongoDB ---
                    for (let n=0; n<ociQuantity; n++) {
                        var ociAddedToProyecto = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $push: {
                                    [`project.0.oci`]: arrayQueryQuantity[n]
                                }
                            },
                            { new: true }
                        )
                        logger.info('Oci agregada a Proyecto ', ociAddedToProyecto)
                    }

                    // Si se agrega correctamente las OCI => true ---
                    if (ociAddedToProyecto.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                    }

                } else {
                    logger.error(`No se encontró la OCI`)
                    return new Error(`No se encontró la OCI`)
                }

            } catch (error) {
                logger.error("Error MongoDB adding OCI to a Project: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la OCI al Proyecto!`)
        }
    }

    // Update Project Data by Project Id
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
        userModificator
    ) {
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                
                let booleanStatus
                statusProject == 'on' ? booleanStatus = true : booleanStatus = false
                imageProject ? imageProject : itemMongoDB.project[0].imageProject

                if (itemMongoDB) {
                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                'project.0.projectName': projectName,
                                'project.0.projectDescription': projectDescription,
                                'project.0.prioProject': prioProject,
                                'project.0.imageProject': imageProject,
                                'project.0.codeProject': codeProject,
                                'project.0.statusProject': booleanStatus,
                                'project.0.levelProject': levelProject,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        
                        return itemUpdated
                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }
                    
                } else {
                    return new Error(`Proyecto no existe con este id: ${itemUpdated._id}`)
                }

            } catch (error) {
                logger.error("Error MongoDB updatingProject: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el status del Proyecto!`)
        }
    }

    // Update Oci Data by Project Id
    async updateOci(
        id,
        project,
        statusOci,
        ociDescription,
        ociNumber,
        ociKNumber,
        ociImage,
        userModificator
    ) {

        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                
                let numberOciK = parseInt(ociKNumber)
                let numberOci = parseInt(ociNumber)
                let booleanStatus
                statusOci=='on' ? booleanStatus=true : booleanStatus=false
                ociImage ? ociImage : itemMongoDB.project[0].oci[numberOciK].ociImage

                if (itemMongoDB) {
                    
                    var updatedOci = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${numberOciK}.ociNumber`]: numberOci,
                                [`project.0.oci.${numberOciK}.ociDescription`]: ociDescription,
                                [`project.0.oci.${numberOciK}.ociStatus`]: booleanStatus,
                                [`project.0.oci.${numberOciK}.ociImage`]: ociImage,
                                [`project.0.oci.${numberOciK}.modificator`]: userModificator,
                                [`project.0.oci.${numberOciK}.modifiedOn`]: now
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedOci.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        //console.log('itemUpdated...', itemUpdated)
                        return itemUpdated
                    } else {
                        return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                    }
                    
                } else {
                    return new Error(`Oci no existe con este id: ${id}!`)
                }

            } catch (error) {
                logger.error("Error MongoDB updatingOci: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el status del Proyecto!`)
        }
    }

    // Delete Oci
    async deleteOci(
            id, 
            project, 
            ociKNumber, 
            userModificator
        ) {
        const ociNumberK = parseInt(ociKNumber)
                
        if (id && project) {
            
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                
                if (itemMongoDB) {
                    
                    if(itemMongoDB.project[0].oci[ociNumberK].visible) {
                        var deleteOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    [`project.0.oci.${ociNumberK}.visible`]: Boolean(false),
                                    [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                    [`project.0.oci.${ociNumberK}.modifiedOn`]: now,
                                    [`project.0.modificator`]: userModificator,
                                    [`project.0.modifiedOn`]: now,
                                    modificator: userModificator,
                                    modifiedOn: now
                                }
                            },
                            { new: true }
                        )

                    } else {
                        var deleteOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    [`project.0.oci.${ociNumberK}.visible`]: Boolean(true),
                                    [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                    [`project.0.oci.${ociNumberK}.modifiedOn`]: now,
                                    [`project.0.modificator`]: userModificator,
                                    [`project.0.modifiedOn`]: now,
                                    modificator: userModificator,
                                    modifiedOn: now
                                }
                            },
                            { new: true }
                        )
                    }

                    if(deleteOci.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        return itemUpdated

                    } else {
                        return new Error(`No se eliminó la OCI del proyecto`)
                    }
                    
                } else {
                    return new Error(`OCI no existe con este id: ${id}!`)
                }

            } catch (error) {
                logger.error("Error MongoDB deletingOci from project: ", error)
            }

        } else {
            return new Error(`No se pudo eliminar la OCI!`)
        }
    }

    // Delete Ot from Oci
    async deleteOt(
        id, 
        project, 
        ociKNumber,
        otKNumber,
        userModificator
    ) {
    const ociNumberK = parseInt(ociKNumber)
    const otNumberK = parseInt(otKNumber)
            
    if (id && project) {
        
        try {
            const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
            
            if (itemMongoDB) {
                
                if(itemMongoDB.project[0].oci[ociNumberK].otProject[otNumberK].visible) {
                    var deleteOt = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.visible`]: Boolean(false),
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modifiedOn`]: now,
                                [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: now,
                                [`project.0.modificator`]: userModificator,
                                [`project.0.modifiedOn`]: now,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )

                } else {
                    var deleteOt = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.visible`]: Boolean(true),
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modifiedOn`]: now,
                                [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: now,
                                [`project.0.modificator`]: userModificator,
                                [`project.0.modifiedOn`]: now,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )
                }

                if(deleteOt.acknowledged) {
                    const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                    return itemUpdated

                } else {
                    return new Error(`No se eliminó la OT del proyecto`)
                }
                
            } else {
                return new Error(`OT no existe con este id: ${id}!`)
            }

        } catch (error) {
            logger.error("Error MongoDB deletingOt from Oci: ", error)
        }

    } else {
        return new Error(`No se pudo eliminar la OT!`)
    }
}

    // Delete Project by Project Id
    async deleteProjectById(id, project, userModificator) {
                        
        if (id) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                //console.log('itemMongoDB...', itemMongoDB)
                if (itemMongoDB) {
                    
                    if(itemMongoDB.project[0].visible) {
                        var deleteProject = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    'project.0.visible': Boolean(false),
                                    'project.0.modificator': userModificator,
                                    'project.0.modifiedOn': now,
                                    modificator: userModificator,
                                    modifiedOn: now
                                }
                            },
                            { new: true }
                        )

                    } else {
                        var deleteProject = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    'project.0.visible': Boolean(true),
                                    'project.0.modificator': userModificator,
                                    'project.0.modifiedOn': now,
                                    modificator: userModificator,
                                    modifiedOn: now
                                }
                            },
                            { new: true }
                        )
                    }

                    if(deleteProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        return itemUpdated

                    } else {
                        return new Error(`No se eliminó el proyecto`)
                    }
                    
                } else {
                    return new Error(`Proyecto no existe con este id: ${id}!`)
                }

            } catch (error) {
                logger.error("Error MongoDB deletingProject: ", error)
            }

        } else {
            return new Error(`No se pudo eliminar el Proyecto!`)
        }
    }

    async disconnet() {
        await this.disconnection
    }

}

module.exports = ProyectosDaoMongoDB