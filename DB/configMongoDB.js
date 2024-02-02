const mongoose = require('mongoose')
mongoose.set('strictQuery', false) // seteo Mongoose Eliminar si no hace nada!!
const logger = require('../utils/winston.js')
const ClientsSchema = require('../models/clientes.models.js')
const UserSchema = require('../models/usuarios.models.js')
//------------
const SessionSchema = require('../models/sessions.models.js')

module.exports = class dbConnection {
    
    constructor(cnxStr) {
        this.cnxStr = cnxStr
        this.clientes = mongoose.model('Clientes', ClientsSchema)
        this.usuarios = mongoose.model('Usuarios', UserSchema)
        this.sessions = mongoose.model('Sessions', SessionSchema)
    }
    
    // -------- Conecta a la base de datos MONGO ----------
    async dbConnection() {
        try {
            mongoose.connect(this.cnxStr, { //createConnection or connect
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            logger.info('Connected to MongoDB Server <-123->')
           
        } catch (error) {
           logger.error('Error connection to DB: '+error)
        }
    }

    // -------- Desonecta de la base de datos MONGO ----------
    async dbDisconnection() {
        try {
            mongoose.disconnect()
            logger.info('Disconnected from MongoDB Server <-321->')
        } catch (error) {
           logger.error('Error on disconnection from DB: '+error)
        }
    }

}