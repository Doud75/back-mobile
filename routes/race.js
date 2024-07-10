import {createRace, getPendingRace, closeRace, joinRace} from '../controller/raceController.js'

export default async function (server) {
  server.post('/create-race', createRace)
  server.post('/close-race', closeRace)
  server.get('/race', getPendingRace)
  server.post('/join-race', joinRace)
}
