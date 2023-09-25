const { Schema, model, mongoose } = require('mongoose')
const now = require('../utils/formatDate.js')

const ClientsSchema = new Schema({
    creator: {
        type: Array,
    },
    name: {
        type: String,
        maxlength: 100,
        unique: true
    },
    code: {
        type: String,
        maxlength: 4
    },
    logo: { 
        type: String,
        maxlength: 900
    },
    status:{
        type: Boolean,
        default: true
    },
    project: {
        type: Number,
        default: 0,
        maxlength: 100,
        min: [0, 'Proyectos can not be less than 0.']
    },
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
        default: now
    }
},{
    versionKey: false
})

module.exports = model('Clientes', ClientsSchema)