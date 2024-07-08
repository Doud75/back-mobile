import {createRace} from '../controller/raceController.js'

export default async function (server) {
  server.post('/createRace', createRace)
}
