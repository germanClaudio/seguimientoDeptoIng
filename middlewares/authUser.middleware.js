const ContainerUsers = require('../daos/usuarios/UsuariosDaoFactory.js')
const containerUser = ContainerUsers.getDaoUsers()

// const ContainerProduct = require('../daos/productos/ProductosDaoFactory.js')
// const containerProduct = ContainerProduct.getDao()

const ContainerClient = require('../daos/clientes/ClientesDaoFactory.js')
const containerClient = ContainerClient.getDao()

const authUserMiddleware = async (req, res, next) => {
    res.locals.username = req.session.username
    res.locals.userInfo = await containerUser.getUserByUsername(req.session.username)
    
        let username = res.locals.username
        let userInfo = res.locals.userInfo

    if (!req.session?.username || !req.session?.admin) {
        return res.render('notAuthorizated', {
            username,
            userInfo
        })     
    } 
    next()
}

// const authClientMiddleware = async (req, res, next) => {
//         const { id } = req.params
//         res.locals.username = req.session.username
//         res.locals.userInfo = await containerUser.getUserByUsername(req.session.username)
//         res.locals.cliente = await containerClient.getClientById(id)

//         let username = res.locals.username
//         let userInfo = res.locals.userInfo
//         let cliente = res.locals.client

//     if (!req.session?.username || !req.session?.admin) {
//         return res.render('notAuthorizated', { username, userInfo, cliente })     
//     } 
//     next()
// }

const authProductMiddleware = async (req, res, next) => {
    const { id } = req.params
    res.locals.username = req.session.username
    res.locals.userInfo = await containerUser.getUserByUsername(req.session.username)
    //res.locals.producto = await containerProduct.getProductById(id)
    res.locals.cliente = await containerClient.getClientById(id)

    let username = res.locals.username
    let userInfo = res.locals.userInfo
    //let product = res.locals.product
    let cliente = res.locals.client

if (!req.session?.username || !req.session?.admin) {
    return res.render('notAuthorizated', {
        username,
        userInfo,
        cliente
    })     
} 
next()
}

module.exports = { 
    authUserMiddleware,
    authProductMiddleware,
    // authClientMiddleware
}