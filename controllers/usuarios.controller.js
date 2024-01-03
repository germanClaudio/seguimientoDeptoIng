const UserService = require("../services/users.service.js")
const bCrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')

const multer = require('multer')
// const path = require('path')

let now = require('../utils/formatDate.js')
let imageNotFound = "../../../src/images/upload/LogoClientImages/noImageFound.png"

class UsersController {  
    constructor(){
        this.users = new UserService()
      }

       
    getAllUsers = async (req, res) => {
        const usuarios = await this.users.getAllUsers()
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        //const usuario = await this.users.getUserByUsername(username)

        try {
            if(usuarios.error) return res.status(400).json({msg: 'No hay usuarios cargados!'}) 
            res.render('addNewUser', {
                usuarios,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getAllUsers',
                error: error
            })
        }
    }

    getUserById = async (req, res) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const usuario = await this.users.getUserById(id)

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if(!usuario) return res.status(404).json({msg: 'Usuario no encontrado'})
            
            res.render('userDetails', {
                usuario,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getUserById',
                error: error
            })
        }
    }

    getUserByUsername = async (req, res) => {
        const { username } = req.params
        
        const usuario = await this.users.getUserByUsername(username)
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
                
        try {
            if(!usuario) return res.status(404).json({msg: 'Usuario no encontrado'})
            
            res.render('userDetails', {
                usuario,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getUserByUsername',
                error: error
            })
        }
    }

    getUserByUsernameAndPassword = async (req, res) => {
        const { username } = req.params
        const { password } = req.body
        const usuario = await this.users.getUserByUsernameAndPassword(username, password)
        try {
            if(!usuario) return res.status(404).json({msg: 'Username desconocido o password incorrecto!!'})
            res.status(200).json({ Data: usuario })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getUserByUsername',
                error: error
            })
        }
    }

    createNewUser = async (req, res) => {
        //------ Storage User Avatar Image in folder AvatarUsersImages/ --------
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {  
                cb(null, './public/src/images/upload/AvatarUsersImages/') // Path de acceso a carpeta donde se guardan las Imagenes
            },                                     
            filename: function(req, file, cb) {
                cb(null, file.originalname) //+ path.extname(file.originalname)) //originalname
            }
        })
        
        const upload = multer({
            storage: storage
        }).single('imageAvatarUser')


        upload(req, res, async (err) => {
            // console.log('files: ', req.files)
            let username = res.locals.username
            let userInfo = res.locals.userInfo
            let userManager = await this.users.getUserByUsername(username)
            const userId = userManager._id
            const userCreator = await this.users.getUserById(userId)
            
            const user = [{
                name: userCreator.name,
                lastName: userCreator.lastName,
                username: userCreator.username,
                email: userCreator.email
            }]

            const modificator = [{
                name: "",
                lastName: "",
                username: "",
                email: ""
            }]

            const cookie = req.session.cookie
            const time = cookie.expires
            const expires = new Date(time)

            if(req.body.password != req.body.confirmPassword) {
                const error = new Error('Los password no coinciden, no se agregó el usuario')
                error.httpStatusCode = 400
                return error
            }

            const usernameInput = req.body.username.replace(/[!@#$%^&*]/g, "")

            const newUser = {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                username: usernameInput,
                avatar: req.body.imageTextAvatarUser || imageNotFound,
                password: req.body.password,
                permiso: req.body.permiso,
                status: req.body.status === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                admin: req.body.admin === 'on' ? Boolean(true) : Boolean(false),
                creator: user,
                timestamp: now,
                modificator: modificator,
                modifiedOn: '',
                visible: true
            }
            console.log('newUser: ', newUser)
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try {
                const usuario = await this.users.addNewUser(newUser)
                const usuarioLog = await this.users.getUserByUsername(username)
                
                if(!usuarioLog) return res.status(404).json({ Msg: 'Usuario no guardado' })
                    res.render('addNewUser', {
                        usuario,
                        username,
                        userInfo,
                        expires
                    })
        
            } catch (error) {
                res.status(500).json({
                    status: false,
                    error: error
                })
            }
        })
    }

    updateUser = async (req, res) => {
        const id = req.params.id

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userToModify = await this.users.getUserById(id)
        const userLogged = await this.users.getUserById(userId)

        const userModificator = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        if(userToModify && userLogged) {
            //------ Storage Avatar Image in folder AvatarUsersImages/ --------
            const storage = multer.diskStorage({
                destination: function(req, file, cb) {  
                    cb(null, './public/src/images/upload/AvatarUsersImages/') // Path de acceso a carpeta donde se guardan las Imagenes
                },                                      
                filename: function(req, file, cb) {
                cb(null, file.originalname ) //+ path.extname(file.originalname)) //originalname
                }
            })
                    
            const upload = multer({
                storage: storage
            }).single('imageAvatarUser')
            
            upload(req, res, async (err) => {
                
                const updatedUser = {
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username,
                    avatar: req.body.imageTextAvatarUser || imageNotFound,
                    permiso: req.body.permisoHidden,
                    status: req.body.status === 'on' ? Boolean(true) : Boolean(false),
                    admin: req.body.admin === 'on' ? Boolean(true) : Boolean(false),
                    modificator: userModificator,
                    modifiedOn: now
                }
                
                if (err) {
                    const error = new Error('No se agregó ningún archivo')
                    error.httpStatusCode = 400
                    return error
                }
                            
                try {
                    const usuario = await this.users.updateUser(id, updatedUser, userModificator)

                    if(!usuario) return res.status(404).json({ Msg: 'Usuario no guardado' })
                        res.render('addNewUser', {
                            usuario,
                            username,
                            userInfo,
                            expires
                        })

                } catch (error) {
                    res.status(500).json({
                        status: false,
                        error: error
                    })
                }
            })

        } else {
            return res.status(404).json({ Msg: 'Usuario no existe' })
        }
    }

    searchUsers = async (req, res) => {
        const users = await this.users.getAllUsers()
        
        try {
            if(users.error) return res.status(400).json({msg: 'No hay usuarios cargados!'}) 
            res.send({
                usersAll: users
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getAllUsers',
                error: error
            })
        }
    }

    deleteUserById = async (req, res) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const userModificator = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const usuario = await this.users.deleteUserById(id, userModificator)

            if(!usuario) return res.status(404).json({ Msg: 'Usuario no eliminado' })
            res.render('addNewUser', {
                usuario,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }


    login = async (req, res) => {
        const { username, password, sessionStarted } = req.body
        let visits = req.session.visits

        const cookie = req.session.cookie
        const time = cookie.expires
        let expires = new Date(time)
        
        if (sessionStarted) {
            req.session.cookie.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            expires = req.session.cookie.expires
        }

        let boolean = false
        try {
            const user = await this.users.getUserByUsername(username)

                function isValidPassword(user, password) {
                    const bCrypto = bCrypt.compareSync(password, user.password)
                    return bCrypto
                }
            
            boolean = isValidPassword(user, password)
            
            if (boolean) {
                const usuario = await this.users.getUserByUsernameAndPassword(username, user.password)
                const userInfo = await this.users.getUserByUsername(username)
                
                if (!usuario) {
                    return res.render('register', {
                        flag: false,
                        fail: false
                    }) 
                }
                else if (usuario && userInfo.status ) {
                    const access_token = generateToken(usuario)
                    //const cart = await this.carts.getCartByUserId(userInfo._id)
                   
                    req.session.admin = true
                    req.session.username = userInfo.username    
                    return res.render('index', {
                        userInfo,
                        username,
                        visits,
                        expires
                    })
                }
                else {
                    return res.render('notAuthorizated', {
                        userInfo,
                        username,
                        visits,
                        expires
                    })
                }
            
            } else {
                const flag = true
                const fail = true
                return res.render('login', {
                    flag,
                    fail
                })
            }
    
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
     }

    // -------------- registra un nuevo usuario ------------------------------
    registerNewUser = async (req, res) => { 
        
        const yaExiste = await this.users.getUserByUsername(req.body.username) 
        const usuario = await this.users.registerNewUser(req.body)
    
        try {
            if (yaExiste) {
                const username = yaExiste.username
                return res.render('register', {
                    username,
                    flag: true, 
                    fail: true
                })
            }
           
            const username = usuario.username
            res.render('login', {
                username,
                flag: true,
                fail: false
            })
       
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - RegisterNewUser',
                error: error
            })
        }
    }
}

module.exports = { UsersController }