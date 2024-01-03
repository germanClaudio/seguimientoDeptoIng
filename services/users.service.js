const UsuariosDaoFactory = require('../daos/usuarios/UsuariosDaoFactory.js')
const usuariosDao = UsuariosDaoFactory.getDaoUsers()

class UserService {
    constructor() {
        this.usuarios = usuariosDao
    }

    async login() {
        return await this.usuarios.login(username, password)
    }
    
    // return all users from DB
    async getAllUsers() {
        return await this.usuarios.getAllUsers()
    }
    
    // return one user by username
    async getUserByUsername(username) {
        return await this.usuarios.getUserByUsername(username)
    }

    // return one user by id
    async getUserById(id) {
        return await this.usuarios.getUserById(id)
    }

    // return one user by username & password
    async getUserByUsernameAndPassword(username, password) {
        return await this.usuarios.getUserByUsernameAndPassword(username, password)
    }
    
    // add new user
    async registerNewUser(user) {
        return await this.usuarios.registerNewUser(user)
    }

    // Register new user
    async addNewUser(newUser) {
        return await this.usuarios.createNewUser(newUser)
    }
    
    // update one user by Id
    async updateUser(id, updatedUser, userLogged) {
        return await this.usuarios.updateUser(id, updatedUser, userLogged)
    }

    // search user sort by permission
    async searchUsers(permiso) {
        return await this.usuarios.searchUsers(permiso)
    }
    
    // delete one user by Id
    async deleteUserById(id, user) {
        return await this.usuarios.deleteUserById(id, user)
    }
}

module.exports = UserService