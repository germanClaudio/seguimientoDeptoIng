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

// ------- OT Project Schema -------------
let otProjectSchema = new Schema({
    otId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    otName: { 
        type: String,
        maxlength: 150,
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