const ContainerMongoDB = require('../../contenedores/usuarios/containerMongoDB.js')

const Usuarios = require('../../models/usuarios.models.js')
const logger = require('../../utils/winston.js')
const now = require('../../utils/formatDate.js')

const bCrypt = require('bcrypt')

const fs = require('fs')
const util = require('util')


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
    
    async createNewUser(newUser) {
        console.log('usuariosDaoMongoDB: ',newUser)
        if (newUser) {
            let username = newUser.username || "";
            let password = newUser.password || "";
            
            const users = await Usuarios.findOne({username: `${newUser.username}`})
            
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

                    const nuevoUsuario = {
                        name: newUser.name,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        username: newUser.username,
                        avatar: newUser.avatar,

                        password: password,
                        permiso: newUser.permiso,
                        status: newUser.status,
                        admin: newUser.admin,
                        
                        creator: newUser.creator,
                        timestamp: newUser.timestamp,
                        modificator: newUser.modificator,
                        modifiedOn: '',
                        visible: newUser.visible
                    }             

                    const newUserCreated = new Usuarios(nuevoUsuario)
                    await newUserCreated.save()
                    //logger.info('User created: ' + newUserCreated.username)

                    let avatarUserString = nuevoUsuario.avatar
                    let sectionString = avatarUserString.split('/')
                    let avatarFileName = sectionString[sectionString.length - 1]
                    
                    //////////////////// phone text message //////////////////////
                    const accountSid = process.env.TWILIO_ACCOUNTSID;
                    const authToken = process.env.TWILIO_AUTH_TOKEN;
                    const fromPhone = process.env.PHONE_SENDER;
                    const toPhone = process.env.PHONE_RECEIVER;
                    const client = require("twilio")(accountSid, authToken);
                    
                    ;(async () => {
                        try {
                            const message = await client.messages.create({
                                body: `El usuario ${nuevoUsuario.name} ${nuevoUsuario.lastName}, se registro exitosamente!`,
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

                    const readFile = util.promisify(fs.readFile)
                    const imagePath = './public/src/images/logo01-negro.png'
                    const image = await readFile(imagePath)
                    const base64Image = image.toString('base64')

                    const html = `<h5 style="color: #000000;">El usuario ${nuevoUsuario.name} ${nuevoUsuario.lastName}, se registro exitosamente en la base de datos!</h5>
                                    <p>Este mensaje fue enviado automaticamente por la App Web Seguimiento Ingeneiría por un nuevo registro.</p>
                                    <p>Si Usted no autorizó este registro, ingrese a la App y elimine el usuario.</p>
                                    <br>
                                    <p>Muchas gracias por utilizar nuestros servicios.</p>
                                    <p>--------------------------------------------------</p>
                                    <p>El Equipo de Seguimiento Ingeneiría - Prodismo IT</p>
                                    <img src="data:image/jpeg;base64,${base64Image}" alt="Logo Prodismo" width="168" height="30">`
                    
                    const mailOptions = {
                        from: 'Servidor NodeJS - Prodismo IT - G. Montalbetti (C)2024',
                        to: TEST_EMAIL,
                        subject: 'Nuevo Registro Seguimiento Ingenieria - Prodismo - by G. Montalbetti (C)2024',
                        html: html,
                        attachments: [
                            {
                                path: `./public/src/images/upload/AvatarUsersImages/${avatarFileName}`
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
                    return newUserCreated
                } catch (error) {
                    logger.error(error)
                    return new Error (`No se pudo crear el Usuario! Error Try-catch`)
                }
            }   
        } else {
            return new Error (`No se pudo crear el Usuario! error else/if`)
        }
    }

    // async registerNewUser(usuario) {
    //     if (usuario) {
    //         let username = usuario.username || "";
    //         let password = usuario.password || "";
    //         username = username.replace(/[!@#$%^&*]/g, "")

    //         const users = await Usuarios.findOne({username: `${usuario.username}`})
           
    //         if(users) {
    //             return false
    //         }

    //         if (!username || !password ) {
    //             process.exit(1)
    //         } else {
    //             try {
    //                 function createHash(password) {
    //                     return bCrypt.hashSync(
    //                               password,
    //                               bCrypt.genSaltSync(10),
    //                               null);
    //                 }
    //                 password = createHash(password)
        
    //                 const nuevoUsuario = { 
    //                     name: usuario.name,
    //                     lastName: usuario.lastName,
    //                     email: usuario.email,
    //                     username: username,
    //                     avatar: usuario.avatar,
    //                     password: password,
    //                     status: true,
    //                     admin: false,
    //                     permiso: usuario.permiso,
    //                     timestamp: now,
    //                 }             

    //                 const newUser = new Usuarios(nuevoUsuario)
    //                 await newUser.save()
    //                 logger.info('User Registrated: ' + newUser)
                    
    //                 // //////////////////// phone text message //////////////////////
    //                 const accountSid = process.env.TWILIO_ACCOUNTSID;
    //                 const authToken = process.env.TWILIO_AUTH_TOKEN;
    //                 const fromPhone = process.env.PHONE_SENDER;
    //                 const toPhone = process.env.PHONE_RECEIVER;
    //                 const client = require("twilio")(accountSid, authToken);
                    
    //                 ;(async () => {
    //                     try {
    //                         const message = await client.messages.create({
    //                             body: `El usuario ${newUser.name} ${newUser.lastName}, se registro exitosamente!`,
    //                             from: fromPhone, 
    //                             to: toPhone
    //                         })
    //                         logger.info(message)
    //                     } catch (error) {
    //                         logger.error(error)
    //                     }
    //                 })()
                    
    //                 //////////////////// gmail to Administrator //////////////////////
    //                 const { createTransport } = require('nodemailer')
    //                 const TEST_EMAIL = process.env.TEST_EMAIL
    //                 const PASS_EMAIL = process.env.PASS_EMAIL
                    
    //                 const transporter = createTransport({
    //                     service: 'gmail',
    //                     port: 587,
    //                     auth: {
    //                         user: TEST_EMAIL,
    //                         pass: PASS_EMAIL
    //                     },
    //                     tls: {
    //                         rejectUnauthorized: false
    //                     }
    //                 })
                    
    //                 const mailOptions = {
    //                     from: 'Servidor NodeJS - @Gmail - Prodismo - German Montalbetti (C)2023',
    //                     to: TEST_EMAIL,
    //                     subject: 'Mail nuevo Registro Usuario desde NodeJS - @Gmail - Prodismo - German Montalbetti (C)2023',
    //                     html: `<h3 style="color: green;">El usuario ${newUser.name} ${newUser.lastName}, se registro exitosamente en la base de datos!</h3>`,
    //                     attachments: [
    //                         {
    //                             path: `${nuevoUsuario.avatar}`
    //                         }
    //                     ]
    //                 }
                    
    //                 ;(async () => {
    //                     try {
    //                         const info = await transporter.sendMail(mailOptions)
    //                         logger.info(info)
    //                     } catch (err) {
    //                         logger.error(err)
    //                     }
    //                 })()

    //                 return newUser

    //             } catch (error) {
    //                 logger.error(error)
    //                 return new Error (`No se pudo crear el Usuario!`)
    //             }
    //         }   
    //     } else {
    //         return new Error (`No se pudo crear el Usuario!`)
    //     }

    // }

    async updateUser(id, updatedUser, userModificator) {
        // console.log('id:',id,' - updatedUser: ', updatedUser)
        if (updatedUser && userModificator) {

            try {
                const userMongoDB = await Usuarios.findById( { _id: id } ) //`${id}`
            
                updatedUser.avatar != '' ? updatedUser.avatar : userMongoDB.avatar
                updatedUser.name != '' ? updatedUser.name : userMongoDB.name
                updatedUser.lastName != '' ? updatedUser.lastName : userMongoDB.lastName
                updatedUser.email != '' ? updatedUser.email : userMongoDB.email
                updatedUser.username != '' ? updatedUser.username : userMongoDB.username
                
                if(userMongoDB) {
                    var updatedFinalUser = await Usuarios.updateOne(
                        { _id: userMongoDB._id  },
                        {
                            $set: {
                                name: updatedUser.name,
                                lastName: updatedUser.lastName,
                                email: updatedUser.email,
                                username: updatedUser.username,
                                avatar: updatedUser.avatar,
                                admin: updatedUser.admin,
                                status: updatedUser.status,
                                permiso: updatedUser.permiso,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )

                    if(updatedFinalUser.acknowledged) {
                        const itemUpdated = await Usuarios.findById({ _id: id })
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }

                } else {
                    return new Error(`No existe el item Usuario con este id: ${itemUpdated._id} `)
                }

            } catch (error) {
                logger.error("Error MongoDB updateUser: ", error)
                return new Error (`No se pudo actualizar el Usuario!`)
            }

        } else {
            logger.info('El Ususario no existe! ', updatedUser)
            return new Error (`No se pudo actualizar el Usuario!`)
        }
    }

    async deleteUserById(id, userModificator) {
        
        if(id){
            try {
                const userMongoDB = await Usuarios.findById({_id: id })
            
                if(userMongoDB) {
                    let inactive = Boolean(false)
                    var userDeleted = await Usuarios.updateOne(
                        { _id: id }, 
                        {
                            $set: {
                                visible: inactive,
                                status: inactive,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )

                    if(userDeleted.acknowledged) {
                        const itemUpdated = await Usuarios.findById({ _id: id })
                        return itemUpdated

                    } else {
                        return new Error(`No se eliminó el item: ${userMongoDB._id}`)
                    }
                    
                } else {
                    return new Error (`El Usuario no existe con ese Id: ${id}!`)
                }

            } catch (error) {
                logger.error("Error MongoDB deleteUser: ",error)
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