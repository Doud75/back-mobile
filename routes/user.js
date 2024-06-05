import {getUser, getOneUser, signIn} from '../controller/userController.js'

export default async function (server) {
  server.get('/users', getUser)
  server.get('/user', getOneUser)
  server.post('/login', signIn)
}
