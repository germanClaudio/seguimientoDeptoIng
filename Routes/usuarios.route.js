const { Router } = require('express')
const routerUsers = Router()
//const crypto = require('crypto')
//const { countVisits } = require('../middlewares/countVisits/countVisits.middleware')
const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const GetUsers = require('../controllers/usuarios.controller.js')
const getUsers = GetUsers.UsersController
const users = new getUsers()

//---------------- Get All Users in DB ------------------
routerUsers.get('/', checkAuthentication, authUserMiddleware, users.getAllUsers)

//---------------- Get User by Id  ----------------------
routerUsers.get('/:id', checkAuthentication, authUserMiddleware, users.getUserById)

//---------------- Create a New User  -------------------
routerUsers.post('/newUser', checkAuthentication, authUserMiddleware, users.createNewUser)

//---------------- Update a User  -----------------------
routerUsers.post('/update/:id', checkAuthentication, authUserMiddleware, users.updateUser)

//---------------- Delete a User  -----------------------
routerUsers.get('/delete/:id', checkAuthentication, authUserMiddleware, users.deleteUserById)

//---------------- Search a User sort by permission -----------------------
routerUsers.get('/searchUsers/:all', checkAuthentication, authUserMiddleware, users.searchUsers)

//routerUsers.get('/username/:username', users.getUserByUsername)

//routerUsers.post('/register', checkAuthentication, authUserMiddleware, users.createNewUser)


routerUsers.get("/auth-bloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
  
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || !users[username]) {
      process.exit(1)
    }
  
    const { salt, hash } = users[username];
    const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
  
    if (crypto.timingSafeEqual(hash, encryptHash)) {
      res.sendStatus(200);
    } else {
      process.exit(1)
    }
})

routerUsers.get("/auth-nobloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || !users[username]) {
      process.exit(1)
    }
    crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
      if (users[username].hash.toString() === hash.toString()) {
        res.sendStatus(200);
      } else {
        process.exit(1)
      }
    });
});

module.exports = routerUsers