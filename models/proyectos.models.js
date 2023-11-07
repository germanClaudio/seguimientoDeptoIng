const { Schema, model, mongoose } = require('mongoose')
const now = require('../utils/formatDate.js')

// ------- Client Schema -------------
let ClientSchema = new Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clientes",
    },
    name: { 
        type: String
    },
    logo: { 
        type: String
    },
})

// ------- Creator Schema -------------
let creatorSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
    },
    name: { 
        type: String,
    },
    lastName: {
        type: String,
    },
    username:{
        type: String,
    },
    email: {
        type: String,
    }
})

// ------- OT Information R-14 Schema ---------
let otInformationR14Schema = new Schema({
    // otInfoR14Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    procesoR14: { 
        type: String,
        default: 'noAplica',
    },
    aprobadoR14: {
        type: String,
        default: 'noAplica',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },
})

// ------- OT Information Proceso Schema ---------
let otInformationProcesoSchema = new Schema({
    // otInfoR14Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    proceso: { 
        type: String,
        default: 'noAplica',
    },
    horasProceso: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },
})

// ------- OT Information Diseno Schema ---------
let otInformationDisenoSchema = new Schema({
    // otInfoR14Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    avDiseno: { 
        type: String,
        default: 'noAplica',
    },
    primerRev50: {
        type: Number,
        default: 0,
    },
    segundaRev80: {
        type: Number,
        default: 0,
    },
    envCliente: {
        type: String,
        default: 'noAplica',
    },
    revCliente: {
        type: String,
        default: 'noAplica',
    },
    ldmProv: {
        type: String,
        default: 'noAplica',
    },
    rev100: {
        type: Number,
        default: 0,
    },
    aprobCliente: {
        type: String,
        default: 'noAplica',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },
})

// ------- OT Information Info80% Schema ---------
let otInformationInfo80Schema = new Schema({
    // otInfoR14Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    ldmAvanCG: { 
        type: String,
        default: 'noAplica',
    },
    ldmAvanT: {
        type: String,
        default: 'noAplica',
    },
    ldm80: {
        type: String,
        default: 'noAplica',
    },
    infoModelo: {
        type: String,
        default: 'noAplica',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },
})

// ------- OT Information Info100% Schema ---------
let otInformationInfo100Schema = new Schema({
    // otInfoR14Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    ldm100: { 
        type: String,
        default: 'noAplica',
    },
    info100: {
        type: String,
        default: 'noAplica',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },
})

// ------- OT Information Sim0 Schema ---------
let otInformationSim0Schema = new Schema({
    // otInfoR14Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    sim0: { 
        type: String,
        default: 'noAplica',
    },
    docuS0: {
        type: String,
        default: 'noAplica',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },
})

// ------- OT Information Sim1 Schema ---------
let otInformationSim1Schema = new Schema({
    // otInfoR14Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    sim1: { 
        type: String,
        default: 'noAplica',
    },
    video: {
        type: String,
        default: 'noAplica',
    },
    informe: {
        type: String,
        default: 'noAplica',
    },
    ppt: {
        type: String,
        default: 'noAplica',
    },
    s1pOp20: {
        type: String,
        default: 'noAplica',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },
})

// ------- OT Information Sim2_3 Schema ---------
let otInformationSim2_3Schema = new Schema({
    // otInfoR14Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    sim2: { 
        type: String,
        default: 'noAplica',
    },
    reporte: {
        type: String,
        default: 'noAplica',
    },
    dfnProdismo: {
        type: String,
        default: 'noAplica',
    },
    sim3: {
        type: String,
        default: 'noAplica',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },
})

// ------- OT Information Sim4 Schema ---------
let otInformationSim4Schema = new Schema({
    // otInfoR14Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    matEnsayo: { 
        type: String,
        default: 'noAplica',
    },
    masMenos10: {
        type: String,
        default: 'noAplica',
    },
    mpAlternativo: {
        type: String,
        default: 'noAplica',
    },
    reuSim: {
        type: String,
        default: 'noAplica',
    },
    informe : {
        type: String,
        default: 'noAplica',
    },
    gc1: {
        type: String,
        default: 'noAplica',
    },
    gc2: {
        type: String,
        default: 'noAplica',
    },
    hsSim: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },
})

// ------- OT Information Sim4 Schema ---------
let otInformationSim5Schema = new Schema({
    // otInfoR14Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    grillado: { 
        type: String,
        default: 'noAplica',
    },
    mpEnsayada: {
        type: String,
        default: 'noAplica',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },
})

// ------- OT Information Schema ---------
let otInformationSchema = new Schema({
    otInfoR14: [otInformationR14Schema],
    otInfoProceso: [otInformationProcesoSchema],
    otInfoDiseno: [otInformationDisenoSchema],
    otInfoInfo80: [otInformationInfo80Schema],
    otInfoInfo100: [otInformationInfo100Schema],
    otInfoSim0: [otInformationSim0Schema],
    otInfoSim1: [otInformationSim1Schema],
    otInfoSim2_3: [otInformationSim2_3Schema],
    otInfoSim4: [otInformationSim4Schema],
    otInfoSim5: [otInformationSim5Schema],

})

// ------- OT Project Schema -------------
let otProjectSchema = new Schema({
    otId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    otNumber: { 
        type: Number,
        maxlength: 4,
    },
    opNumber: {
        type: String,
        maxlength: 50,
    },
    opDescription: {
        type: String,
        maxlength: 150,
    },
    otStatus:{
        type: Boolean,
        default: true,
    },
    otDesign:{
        type: String,
        maxlength: 150,
    },
    otSimulation:{
        type: String,
        maxlength: 150,
    },
    otSupplier:{
        type: String,
        maxlength: 150,
    },
    otInformation: [otInformationSchema],
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
    },

})

// ------- OCI Project Schema -------------
let ociProjectSchema = new Schema({
    ociId: {
        type: mongoose.Schema.Types.ObjectId
    },
    ociNumber: {
        type: Number, maxlength: 4
    },
    ociDescription: {
        type: String, maxlength: 50
    },
    ociStatus: {
        type: Boolean, default: true
    },
    otProject: [otProjectSchema]
    
})

// ------- Project Schema -------------
let projectSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    projectName: {
        type: String,
        maxlength: 100
    },
    projectDescription: {
        type: String,
        maxlength: 250
    },
    prioProject: {
        type: Number,
        value: 1,
        maxlength: 10,
        min: [1, 'Prio can not be less than 1']
    },
    imageProject: { 
        type: String,
        maxlength: 1000,
        value: 'https://orbis-alliance.com/wp-content/themes/consultix/images/no-image-found-360x260.png'
    },
    codeProject:{
        type: String,
        maxlength: 15,
    },
    statusProject:{
        type: Boolean,
        default: true,
    },
    levelProject:{
        type: Boolean,
        default: true,
    },
    oci: [ociProjectSchema],
})

// ------- Complete Project per Client Schema -------------
const ProyectoSchema = new Schema({
    creator: [creatorSchema],
    client: [ClientSchema],
    project: [projectSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
        default: now,
    },
},{
    versionKey: false
})

module.exports = model('Projects', ProyectoSchema)