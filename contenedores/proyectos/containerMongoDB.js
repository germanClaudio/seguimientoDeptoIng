const { dbConnection, dbDisconnection } = require('../../DB/configMongoDB.js')

class ContenedorMongoDB {
    constructor(cnxStr) {
        this.cnxStr = cnxStr
        this.connection = dbConnection
        this.disconnection = dbDisconnection
    }
}

module.exports = ContenedorMongoDB