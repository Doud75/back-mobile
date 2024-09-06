import {createRace, pendingRace, closeRace, joinRace, stopRace} from '../controller/raceController.js'

export default async function (server) {
  server.post('/create-race', createRace)
  server.post('/close-race', closeRace)
  server.post('/stop-race', stopRace)
  server.get('/race', pendingRace)
  server.post('/join-race', joinRace)
}
