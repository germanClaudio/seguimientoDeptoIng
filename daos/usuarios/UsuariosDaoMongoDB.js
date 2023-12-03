const ContainerMongoDB = require('../../contenedores/usuarios/containerMongoDB.js')

const Usuarios = require('../../models/usuarios.models.js')
const logger = require('../../utils/winston.js')
const now = require('../../utils/formatDate.js')

const bCrypt = require('bcrypt');

class UsuariosDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        await this.connection
        console.log('Connected to MongoDB Server 1-2-3 - UsuariosDaoFactory.js')
   }

   async getAllUsers(){
       try {
           const users = await Usuarios.find()
           if (!users) {
                return new Error ('No hay usuarios en la DB!')
           } else {
                return users    
           }
        } catch (error) {
            logger.error("Error MongoDB getUsers: ",error)
            return new Error ('No hay usuarios en la DB!')
        }
    }

    async getUserById(id){
        if(id){
            try {
                const user = await Usuarios.findOne( {_id: `${id}`} )
                if ( user === undefined || user === null) {
                    return new Error (`El Usuario no existe con ese ID${id}!`)
                } else {
                    return user    
                }
            } catch (error) {
                logger.error(error)
            }
        } else {
            return new Error (`El Usuario no existe con ese ID${id}!`)
        }
    }
    
    async getUserByUsername(username){
        if(username){
            try {
                const user = await Usuarios.findOne( { username: `${username}` })
                
                 if ( user === undefined || user === null) {
                    return false
                 } else {
                    return user    
                 }
            } catch (error) {
                logger.error('Aca esta el error: ', error)
            }
        } else {
            return logger.error('Aca esta el error(username invalid)')
        }
    }

    async searchUsers(permiso) {
        if(permiso){
            try {
                const users = await Usuarios.find( { permiso: `simulacion` })
                
                 if (!users) {
                    return false
                 } else {
                    return users
                 }
            } catch (error) {
                logger.error('Aca esta el error: ', error)
            }
        } else {
            return logger.error('Aca esta el error(permiso: invalid)')
        }
    }
    
    async getUserByUsernameAndPassword(username, password) {
        if(username || password) {
            try {
                const user = await Usuarios.findOne( {username: `${username}`, password: `${password}` } )
                if ( user === undefined || user === null || password !== user.password ) {
                    return false    
                } else {
                    return true
                }
            } catch (error) {
                logger.error(error)
            }
        } else {
            return new Error (`Usuario no existe o password incorrecto!`)
        }
    }
    
    async createNewUser(usuario) {
        console.log('usuariosDaoMongoDB: ',usuario)
        if (usuario) {
            let username = usuario.username || "";
            let password = usuario.password || "";
            username = username.replace(/[!@#$%^&*]/g, "")

            const users = await Usuarios.findOne({username: `${usuario.username}`})
            
            if (users) {
                return false
            }

            if (!username || !password ) {
                process.exit(1)
            } else {
                try {
                    function createHash(password) {
                        return bCrypt.hashSync(
                                  password,
                                  bCrypt.genSaltSync(10),
                                  null);
                    }
                    password = createHash(password)

                    const creator = [{
                        creatorName: usuario.userNameHidden,
                        creatorLastName: usuario.userLastNameHidden,
                        creatorId: usuario.userIdHidden,
                    }]
                    const modificator = []
                    const modified = ""
        
                    const nuevoUsuario = { 
                        name: usuario.name,
                        lastName: usuario.lastName,
                        email: usuario.email,
                        username: username,
                        avatar: usuario.avatar,
                        password: password,
                        status: true,
                        admin: false,
                        permiso: usuario.permiso,
                        timestamp: now,
                        creator: creator,
                        modificator: modificator,
                        modifiedOn: modified
                    }             

                    const newUser = new Usuarios(nuevoUsuario)
                    await newUser.save()
                    logger.info('User created: ' + newUser)
                    
                    //////////////////// phone text message //////////////////////
                    const accountSid = process.env.TWILIO_ACCOUNTSID;
                    const authToken = process.env.TWILIO_AUTH_TOKEN;
                    const fromPhone = process.env.PHONE_SENDER;
                    const toPhone = process.env.PHONE_RECEIVER;
                    const client = require("twilio")(accountSid, authToken);
                    
                    ;(async () => {
                        try {
                            const message = await client.messages.create({
                                body: `El usuario ${newUser.name} ${newUser.lastName}, se registro exitosamente!`,
                                from: fromPhone, 
                                to: toPhone
                            })
                            logger.info(message)
                        } catch (error) {
                            logger.error(error)
                        }
                    })()
                    
                    //////////////////// gmail to Administrator //////////////////////
                    const { createTransport } = require('nodemailer')
                    const TEST_EMAIL = process.env.TEST_EMAIL
                    const PASS_EMAIL = process.env.PASS_EMAIL
                    
                    const transporter = createTransport({
                        service: 'gmail',
                        port: 587,
                        auth: {
                            user: TEST_EMAIL,
                            pass: PASS_EMAIL
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    })
                    
                    const mailOptions = {
                        from: 'Servidor NodeJS - @Gmail - Prodismo - German Montalbetti (C)2023',
                        to: TEST_EMAIL,
                        subject: 'Mail nuevo Registro Usuario desde NodeJS - @Gmail - Prodismo - German Montalbetti (C)2023',
                        html: `<h3 style="color: green;">El usuario ${newUser.name} ${newUser.lastName}, se registro exitosamente en la base de datos!</h3>`,
                        attachments: [
                            {
                                path: `${nuevoUsuario.avatar}`
                            }
                        ]
                    }
                    
                    ;(async () => {
                        try {
                            const info = await transporter.sendMail(mailOptions)
                            logger.info(info)
                        } catch (err) {
                            logger.error(err)
                        }
                    })()
                    return newUser
                } catch (error) {
                    logger.error(error)
                    return new Error (`No se pudo crear el Usuario! Error Try-catch`)
                }
            }   
        } else {
            return new Error (`No se pudo crear el Usuario! error else/if`)
        }
    }

    async registerNewUser(usuario) {
        if (usuario) {
            let username = usuario.username || "";
            let password = usuario.password || "";
            username = username.replace(/[!@#$%^&*]/g, "")

            const users = await Usuarios.findOne({username: `${usuario.username}`})
           
            if(users) {
                return false
            }

            if (!username || !password ) {
                process.exit(1)
            } else {
                try {
                    function createHash(password) {
                        return bCrypt.hashSync(
                                  password,
                                  bCrypt.genSaltSync(10),
                                  null);
                    }
                    password = createHash(password)
        
                    const nuevoUsuario = { 
                        name: usuario.name,
                        lastName: usuario.lastName,
                        email: usuario.email,
                        username: username,
                        avatar: usuario.avatar,
                        password: password,
                        status: true,
                        admin: false,
                        permiso: usuario.permiso,
                        timestamp: now,
                    }             

                    const newUser = new Usuarios(nuevoUsuario)
                    await newUser.save()
                    logger.info('User Registrated: ' + newUser)
                    
                    // //////////////////// phone text message //////////////////////
                    const accountSid = process.env.TWILIO_ACCOUNTSID;
                    const authToken = process.env.TWILIO_AUTH_TOKEN;
                    const fromPhone = process.env.PHONE_SENDER;
                    const toPhone = process.env.PHONE_RECEIVER;
                    const client = require("twilio")(accountSid, authToken);
                    
                    ;(async () => {
                        try {
                            const message = await client.messages.create({
                                body: `El usuario ${newUser.name} ${newUser.lastName}, se registro exitosamente!`,
                                from: fromPhone, 
                                to: toPhone
                            })
                            logger.info(message)
                        } catch (error) {
                            logger.error(error)
                        }
                    })()
                    
                    //////////////////// gmail to Administrator //////////////////////
                    const { createTransport } = require('nodemailer')
                    const TEST_EMAIL = process.env.TEST_EMAIL
                    const PASS_EMAIL = process.env.PASS_EMAIL
                    
                    const transporter = createTransport({
                        service: 'gmail',
                        port: 587,
                        auth: {
                            user: TEST_EMAIL,
                            pass: PASS_EMAIL
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    })
                    
                    const mailOptions = {
                        from: 'Servidor NodeJS - @Gmail - Prodismo - German Montalbetti (C)2023',
                        to: TEST_EMAIL,
                        subject: 'Mail nuevo Registro Usuario desde NodeJS - @Gmail - Prodismo - German Montalbetti (C)2023',
                        html: `<h3 style="color: green;">El usuario ${newUser.name} ${newUser.lastName}, se registro exitosamente en la base de datos!</h3>`,
                        attachments: [
                            {
                                path: `${nuevoUsuario.avatar}`
                            }
                        ]
                    }
                    
                    ;(async () => {
                        try {
                            const info = await transporter.sendMail(mailOptions)
                            logger.info(info)
                        } catch (err) {
                            logger.error(err)
                        }
                    })()

                    return newUser

                } catch (error) {
                    logger.error(error)
                    return new Error (`No se pudo crear el Usuario!`)
                }
            }   
        } else {
            return new Error (`No se pudo crear el Usuario!`)
        }

    }

    async updateUser(userToUpdate, userModificator) {
        const userMongoDB = await Usuarios.findById( { _id: `${userToUpdate.id}` } )
        const userMongoDBModificator = await Usuarios.findById( { _id: `${userModificator.id}`} )
        //console.log('UserToModify: ', userToUpdate)        
        //console.log('UserModificator: ', userMongoDBModificator)
        
        if (userMongoDB && userMongoDBModificator) {
            try {
                let adminValue
                let statusValue
                userToUpdate.admin === 'on' ? adminValue = true : adminValue = false
                userToUpdate.status === 'on' ? statusValue = true : statusValue = false

                //console.log('adminValue: ', adminValue, ' - statusValue: ', statusValue)
                
                let modificatorArr = [{
                    modificatorName: userMongoDBModificator.name,
                    modificatorLastName: userMongoDBModificator.lastName,
                    modificatorId: userMongoDBModificator._id,
                }]
               
                 const newValues = {
                    name: userToUpdate.name,
                    lastName: userToUpdate.lastName,
                    email: userToUpdate.email,
                    username: userToUpdate.username,
                    avatar: userToUpdate.avatar,
                    password: userToUpdate.password,
                    admin: adminValue,
                    status: statusValue,
                    permiso: userToUpdate.permiso,
                    modificator: modificatorArr,
                    modifiedOn: now,
                    timestamp: userToUpdate.timestamp,
                    creator: userToUpdate.creator,
                }

                const userUpdated = await Usuarios.findOneAndUpdate(
                    { _id: userToUpdate.id },
                    newValues,
                    { new: true })
                    //console.log('UserNewData----: ', userUpdated)
                
                return userUpdated
               
            } catch (error) {
                logger.error("Error MongoDB updateUser: ", error)
                return new Error (`No se pudo actualizar el Usuario!`)
            }
        } else {
            logger.info('El Ususario no existe! ', userMongoDB)
            return new Error (`No se pudo actualizar el Usuario!`)
        }
    }

    async deleteUserById(id) {
        if(id){
            const userMongoDB = await Usuarios.findById({_id: `${id}`})
            
            if(userMongoDB) {
                try {
                    const newValues = {
                        name: userMongoDB.name,
                        lastName: userMongoDB.lastName,
                        email: userMongoDB.email,
                        username: userMongoDB.username,
                        password: userMongoDB.password,
                        admin: userMongoDB.admin,
                        active: false,
                        permiso: userMongoDB.permiso,
                        timestamp: now,
                    }
                    const user = await Usuarios.findOneAndUpdate(
                        { _id: id }, newValues , { new: true })
                    return user

                } catch (error) {
                    logger.error("Error MongoDB deleteUser: ",error)
                }
            } else {
                return new Error (`El Usuario no existe con ese Id: ${id}!`)
            }
        } else {
            return new Error (`El Usuario no existe con ese ID${id}!`)
        }    
    }

    async disconnet() {
        await this.disconnection
        console.log('Disconnected from MongoDB Server')
    }
}

module.exports = UsuariosDaoMongoDB 