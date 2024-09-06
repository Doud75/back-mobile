import {signIn} from '../controller/playerController.js'

export default async function (server) {
  server.post('/signin', signIn)
}
