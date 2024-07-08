import {getPlayer, getOnePlayer, signIn} from '../controller/playerController.js'

export default async function (server) {
  server.get('/getPlayer', getPlayer)
  server.get('/getOnePlayer', getOnePlayer)
  server.post('/signin', signIn)
}
